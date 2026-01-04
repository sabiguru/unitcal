// Check what databases and users actually exist
const { Client } = require('pg');

async function checkDatabaseInfo() {
  // Try connecting with the main user account first
  const client = new Client({
    host: 'localhost',
    user: 'benafaco', // Main cPanel user
    password: 'Iv8.cTCIhVLc', // Try with same password
    database: 'postgres' // Connect to default postgres database
  });
  
  try {
    console.log('🔍 Checking database information...\n');
    await client.connect();
    console.log('✅ Connected as main user\n');
    
    // List all databases
    console.log('📊 Available databases:');
    const databases = await client.query(
      "SELECT datname FROM pg_database WHERE datistemplate = false ORDER BY datname"
    );
    databases.rows.forEach(row => {
      console.log(`   - ${row.datname}`);
    });
    
    console.log('\n👤 Available users/roles:');
    const users = await client.query(
      "SELECT rolname FROM pg_roles ORDER BY rolname"
    );
    users.rows.forEach(row => {
      console.log(`   - ${row.rolname}`);
    });
    
    console.log('\n🔐 User privileges for calcfort database:');
    try {
      const privileges = await client.query(`
        SELECT 
          r.rolname as username,
          d.datname as database,
          has_database_privilege(r.rolname, d.datname, 'CONNECT') as can_connect,
          has_database_privilege(r.rolname, d.datname, 'CREATE') as can_create
        FROM pg_roles r, pg_database d 
        WHERE d.datname LIKE '%calcfort%' 
        AND r.rolname LIKE '%calcfort%' OR r.rolname = 'benafaco'
      `);
      
      if (privileges.rows.length > 0) {
        privileges.rows.forEach(row => {
          console.log(`   User: ${row.username}`);
          console.log(`   Database: ${row.database}`);
          console.log(`   Can connect: ${row.can_connect}`);
          console.log(`   Can create: ${row.can_create}`);
          console.log('   ---');
        });
      } else {
        console.log('   No calcfort-related users found');
      }
    } catch (e) {
      console.log('   Could not check privileges:', e.message);
    }
    
    await client.end();
    
  } catch (error) {
    console.log('❌ Could not connect as main user:', error.message);
    console.log('\nTry these steps:');
    console.log('1. Check your main cPanel username and password');
    console.log('2. Verify PostgreSQL is enabled in your hosting account');
    console.log('3. Check if you need to use a different host/port');
  }
}

checkDatabaseInfo().catch(console.error);