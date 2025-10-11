// Database connection debugging script
// Run this on your A2 Hosting server to identify the exact issue

const { Client } = require('pg');

const testConfigurations = [
  {
    name: 'Current Configuration',
    config: {
      host: 'localhost',
      port: 5432,
      user: 'benafaco_calcfort_user',
      password: 'Iv8.cTCIhVLc',
      database: 'benafaco_calcfort_prod'
    }
  },
  {
    name: 'Without Port',
    config: {
      host: 'localhost',
      user: 'benafaco_calcfort_user', 
      password: 'Iv8.cTCIhVLc',
      database: 'benafaco_calcfort_prod'
    }
  },
  {
    name: 'With benafaco prefix',
    config: {
      host: 'localhost',
      port: 5432,
      user: 'benafaco_benafaco_calcfort_user',
      password: 'Iv8.cTCIhVLc',
      database: 'benafaco_benafaco_calcfort_prod'
    }
  },
  {
    name: 'Alternative host',
    config: {
      host: '127.0.0.1',
      port: 5432,
      user: 'benafaco_calcfort_user',
      password: 'Iv8.cTCIhVLc',
      database: 'benafaco_calcfort_prod'
    }
  },
  {
    name: 'Main user account',
    config: {
      host: 'localhost',
      port: 5432,
      user: 'benafaco',
      password: 'Iv8.cTCIhVLc',
      database: 'benafaco_calcfort_prod'
    }
  }
];

async function testConnection(name, config) {
  const client = new Client(config);
  
  try {
    console.log(`\n🔍 Testing: ${name}`);
    console.log(`   Host: ${config.host}${config.port ? ':' + config.port : ''}`);
    console.log(`   User: ${config.user}`);
    console.log(`   Database: ${config.database}`);
    
    await client.connect();
    console.log('✅ Connection successful!');
    
    const result = await client.query('SELECT current_database(), current_user, version()');
    console.log('📊 Connection details:');
    console.log(`   Database: ${result.rows[0].current_database}`);
    console.log(`   User: ${result.rows[0].current_user}`);
    console.log(`   Version: ${result.rows[0].version.split(' ')[0]} ${result.rows[0].version.split(' ')[1]}`);
    
    // Test if we can create/read from tables
    try {
      await client.query('SELECT 1 FROM "User" LIMIT 1');
      console.log('✅ Can access User table');
    } catch (e) {
      console.log('❌ Cannot access User table:', e.message);
    }
    
    await client.end();
    return true;
    
  } catch (error) {
    console.log(`❌ Connection failed: ${error.message}`);
    console.log(`   Error code: ${error.code}`);
    try {
      await client.end();
    } catch (e) {
      // Ignore cleanup errors
    }
    return false;
  }
}

async function main() {
  console.log('🔧 PostgreSQL Connection Diagnostic Tool');
  console.log('==========================================');
  
  let successCount = 0;
  
  for (const test of testConfigurations) {
    const success = await testConnection(test.name, test.config);
    if (success) {
      successCount++;
      console.log('🎉 This configuration works! Use this in your .env.local file.');
    }
  }
  
  console.log(`\n📋 Summary: ${successCount}/${testConfigurations.length} configurations worked`);
  
  if (successCount === 0) {
    console.log('\n🔧 Troubleshooting suggestions:');
    console.log('1. Check if PostgreSQL service is running');
    console.log('2. Verify database and user exist in cPanel');
    console.log('3. Reset the database user password in cPanel');
    console.log('4. Check if user has proper privileges on the database');
    console.log('5. Try connecting with the main cPanel user account');
  }
}

main().catch(console.error);