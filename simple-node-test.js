// Simple Node.js PostgreSQL test (bypassing Prisma)
console.log('🔍 Testing Node.js PostgreSQL connection directly...\n');

try {
  console.log('1. Checking if pg module is available...');
  const { Client } = require('pg');
  console.log('✅ pg module loaded successfully\n');
  
  console.log('2. Testing connection with exact same credentials as psql...');
  
  const client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'benafaco_calcfort_user',
    password: 'Iv8.cTCIhVLc',
    database: 'benafaco_calcfort_prod'
  });
  
  client.connect()
    .then(() => {
      console.log('✅ Node.js connection successful!');
      return client.query('SELECT current_user, current_database(), version()');
    })
    .then(result => {
      console.log('✅ Query successful!');
      console.log(`   User: ${result.rows[0].current_user}`);
      console.log(`   Database: ${result.rows[0].current_database}`);
      console.log(`   PostgreSQL: ${result.rows[0].version.split(' ')[1]}`);
      return client.end();
    })
    .then(() => {
      console.log('✅ Connection closed successfully');
      console.log('\n🎉 Node.js can connect! The issue is likely with Prisma configuration.');
      console.log('\nNext steps:');
      console.log('1. Check if .env.local is properly loaded in your app');
      console.log('2. Verify Prisma client generation');
      console.log('3. Check for any Prisma-specific SSL requirements');
    })
    .catch(error => {
      console.log('❌ Node.js connection failed:', error.message);
      console.log('Error code:', error.code);
      console.log('\nThis suggests the issue is NOT with credentials, but with:');
      console.log('- Node.js environment differences vs psql');
      console.log('- SSL configuration requirements');
      console.log('- Connection pooling settings');
      console.log('- Network/firewall restrictions for Node.js processes');
    });

} catch (error) {
  console.log('❌ Could not load pg module:', error.message);
  console.log('\nTry installing pg module:');
  console.log('npm install pg @types/pg');
}