export default async function DebugPage() {
  let debugInfo: any = {};
  
  try {
    // Environment variables (with partial masking for security)
    debugInfo.environment = {
      nodeEnv: process.env.NODE_ENV,
      hasNextAuthUrl: !!process.env.NEXTAUTH_URL,
      nextAuthUrl: process.env.NEXTAUTH_URL,
      hasNextAuthSecret: !!process.env.NEXTAUTH_SECRET,
      nextAuthSecretLength: process.env.NEXTAUTH_SECRET?.length || 0,
      hasDatabaseUrl: !!process.env.DATABASE_URL,
      databaseUrlMasked: process.env.DATABASE_URL ? 
        process.env.DATABASE_URL.replace(/:([^:@]+)@/, ':***@') : 'Not set',
      hasSmtpHost: !!process.env.SMTP_HOST,
      smtpHost: process.env.SMTP_HOST,
      hasSmtpUser: !!process.env.SMTP_USER,
      smtpUser: process.env.SMTP_USER
    };

    // Test Prisma client with detailed error info
    debugInfo.prisma = {};
    
    // Skip database connections during build time
    const isBuild = process.env.NEXT_PHASE === 'phase-production-build';
    if (isBuild || process.env.SKIP_DB_CHECK === '1') {
      debugInfo.prisma.skipped = `Database checks skipped during build (${isBuild ? 'NEXT_PHASE=phase-production-build' : 'SKIP_DB_CHECK=1'})`;
    } else {
      try {
        console.log('🔍 Testing Prisma import...');
        const { prisma } = await import('@/lib/prisma');
        debugInfo.prisma.import = 'Success';
        
        console.log('🔍 Testing Prisma connection...');
        await prisma.$connect();
        debugInfo.prisma.connection = 'Success';
        
        console.log('🔍 Testing basic query...');
        const result = await prisma.$queryRaw`SELECT current_database() as db, current_user as user, now() as time`;
        debugInfo.prisma.query = { success: true, result };
        
        console.log('🔍 Testing tables exist...');
        const tables = await prisma.$queryRaw`
          SELECT table_name 
          FROM information_schema.tables 
          WHERE table_schema = 'public' 
          ORDER BY table_name
        `;
        debugInfo.prisma.tables = tables;
        
        await prisma.$disconnect();
        debugInfo.prisma.disconnect = 'Success';
        
      } catch (error: any) {
        console.error('🚨 Prisma error:', error);
        debugInfo.prisma.error = {
          message: error.message,
          code: error.code,
          name: error.name,
          stack: error.stack?.split('\n').slice(0, 5) // First 5 lines of stack
        };
      }
    }
    
    // Test email service
    debugInfo.email = {};
    
    // Skip email tests during build time
    if (isBuild || process.env.SKIP_DB_CHECK === '1') {
      debugInfo.email.skipped = `Email tests skipped during build (${isBuild ? 'NEXT_PHASE=phase-production-build' : 'SKIP_DB_CHECK=1'})`;
    } else {
      try {
        console.log('🔍 Testing email service import...');
        const { emailService } = await import('@/lib/email');
        debugInfo.email.import = 'Success';
        debugInfo.email.configured = emailService ? 'Yes' : 'No';
        
        console.log('🔍 Testing email connection...');
        const testResult = await emailService.testConnection();
        debugInfo.email.connection = testResult ? 'Success' : 'Failed';
        
      } catch (error: any) {
        console.error('🚨 Email service error:', error);
        debugInfo.email.error = error.message;
      }
    }

    // Test packages availability
    debugInfo.packages = {};
    try {
      require('pg');
      debugInfo.packages.pg = 'Available';
    } catch (error: any) {
      debugInfo.packages.pg = `Missing: ${error.message}`;
    }

    try {
      require('@prisma/client');
      debugInfo.packages.prismaClient = 'Available';
    } catch (error: any) {
      debugInfo.packages.prismaClient = `Missing: ${error.message}`;
    }

    // System info
    debugInfo.system = {
      nodeVersion: process.version,
      platform: process.platform,
      arch: process.arch,
      cwd: process.cwd(),
      timestamp: new Date().toISOString()
    };
    
  } catch (error: any) {
    console.error('🚨 Debug page error:', error);
    debugInfo.generalError = {
      message: error.message,
      stack: error.stack?.split('\n').slice(0, 10)
    };
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'monospace', backgroundColor: '#f5f5f5' }}>
      <h1 style={{ color: '#333' }}>🔍 Detailed Debug Information</h1>
      <div style={{ backgroundColor: 'white', padding: '15px', borderRadius: '5px', marginBottom: '20px' }}>
        <h2>Environment Variables</h2>
        <pre style={{ fontSize: '12px', overflow: 'auto' }}>{JSON.stringify(debugInfo.environment, null, 2)}</pre>
      </div>
      
      <div style={{ backgroundColor: 'white', padding: '15px', borderRadius: '5px', marginBottom: '20px' }}>
        <h2>Database (Prisma)</h2>
        <pre style={{ fontSize: '12px', overflow: 'auto' }}>{JSON.stringify(debugInfo.prisma, null, 2)}</pre>
      </div>
      
      <div style={{ backgroundColor: 'white', padding: '15px', borderRadius: '5px', marginBottom: '20px' }}>
        <h2>Email Service</h2>
        <pre style={{ fontSize: '12px', overflow: 'auto' }}>{JSON.stringify(debugInfo.email, null, 2)}</pre>
      </div>
      
      <div style={{ backgroundColor: 'white', padding: '15px', borderRadius: '5px', marginBottom: '20px' }}>
        <h2>Package Dependencies</h2>
        <pre style={{ fontSize: '12px', overflow: 'auto' }}>{JSON.stringify(debugInfo.packages, null, 2)}</pre>
      </div>
      
      <div style={{ backgroundColor: 'white', padding: '15px', borderRadius: '5px', marginBottom: '20px' }}>
        <h2>System Information</h2>
        <pre style={{ fontSize: '12px', overflow: 'auto' }}>{JSON.stringify(debugInfo.system, null, 2)}</pre>
      </div>

      {debugInfo.generalError && (
        <div style={{ backgroundColor: '#ffebee', padding: '15px', borderRadius: '5px', border: '1px solid #f44336' }}>
          <h2 style={{ color: '#f44336' }}>❌ General Error</h2>
          <pre style={{ fontSize: '12px', overflow: 'auto' }}>{JSON.stringify(debugInfo.generalError, null, 2)}</pre>
        </div>
      )}
      
      <p style={{ marginTop: '20px', fontSize: '14px', color: '#666' }}>
        🔍 Check browser console and server logs for additional details.<br/>
        🚨 Errors are logged with emoji prefixes for easy identification.
      </p>
    </div>
  );
}