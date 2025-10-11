// Test Prisma connection string formats specifically
const { Client } = require('pg');

const connectionStrings = [
  {
    name: 'Current format (with SSL disabled)',
    url: 'postgresql://benafaco_calcfort_user:Iv8.cTCIhVLc@localhost:5432/benafaco_calcfort_prod?sslmode=disable'
  },
  {
    name: 'Without SSL parameter',
    url: 'postgresql://benafaco_calcfort_user:Iv8.cTCIhVLc@localhost:5432/benafaco_calcfort_prod'
  },
  {
    name: 'Without port',
    url: 'postgresql://benafaco_calcfort_user:Iv8.cTCIhVLc@localhost/benafaco_calcfort_prod'
  },
  {
    name: 'With connect_timeout',
    url: 'postgresql://benafaco_calcfort_user:Iv8.cTCIhVLc@localhost:5432/benafaco_calcfort_prod?connect_timeout=10'
  },
  {
    name: 'With sslmode=prefer',
    url: 'postgresql://benafaco_calcfort_user:Iv8.cTCIhVLc@localhost:5432/benafaco_calcfort_prod?sslmode=prefer'
  },
  {
    name: 'With sslmode=allow',
    url: 'postgresql://benafaco_calcfort_user:Iv8.cTCIhVLc@localhost:5432/benafaco_calcfort_prod?sslmode=allow'
  },
  {
    name: 'With schema parameter',
    url: 'postgresql://benafaco_calcfort_user:Iv8.cTCIhVLc@localhost:5432/benafaco_calcfort_prod?schema=public'
  }
];

async function testPrismaFormat(name, connectionString) {
  const client = new Client({ connectionString });
  
  try {
    console.log(`\n🔍 Testing: ${name}`);
    console.log(`   Connection string: ${connectionString.replace(':Iv8.cTCIhVLc@', ':***@')}`);
    
    await client.connect();
    console.log('✅ Connection successful!');
    
    // Test a simple query
    const result = await client.query('SELECT current_user, current_database()');
    console.log(`✅ Query successful - User: ${result.rows[0].current_user}, DB: ${result.rows[0].current_database}`);
    
    // Test if tables exist
    try {
      const tableCheck = await client.query(`
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name IN ('User', 'VerificationCode')
        ORDER BY table_name
      `);
      console.log(`✅ Found ${tableCheck.rows.length} expected tables:`, tableCheck.rows.map(r => r.table_name));
    } catch (e) {
      console.log('⚠️  Could not check tables:', e.message);
    }
    
    await client.end();
    return connectionString;
    
  } catch (error) {
    console.log(`❌ Failed: ${error.message}`);
    if (error.code) {
      console.log(`   Error code: ${error.code}`);
    }
    try {
      await client.end();
    } catch (e) {
      // Ignore cleanup errors
    }
    return null;
  }
}

async function main() {
  console.log('🔧 Prisma Connection String Testing');
  console.log('====================================');
  
  const workingConnections = [];
  
  for (const test of connectionStrings) {
    const result = await testPrismaFormat(test.name, test.url);
    if (result) {
      workingConnections.push({ name: test.name, url: result });
    }
  }
  
  console.log('\n📋 Summary:');
  console.log(`${workingConnections.length}/${connectionStrings.length} connection strings worked\n`);
  
  if (workingConnections.length > 0) {
    console.log('🎉 Working connection strings (use one of these):');
    workingConnections.forEach((conn, index) => {
      console.log(`${index + 1}. ${conn.name}`);
      console.log(`   DATABASE_URL="${conn.url}"`);
      console.log('');
    });
  } else {
    console.log('❌ No connection strings worked. This suggests a deeper issue.');
    console.log('Try checking:');
    console.log('- PostgreSQL service status');
    console.log('- Firewall settings');
    console.log('- Node.js pg module installation');
  }
}

main().catch(console.error);