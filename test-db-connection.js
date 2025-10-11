// Simple script to test PostgreSQL database connection
// Run this after deploying to production to verify the database setup

const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

async function testConnection() {
  try {
    console.log('Connecting to PostgreSQL database...');
    await client.connect();
    console.log('✅ Connected successfully!');

    // Test basic query
    const result = await client.query('SELECT NOW() as current_time');
    console.log('✅ Database query successful:', result.rows[0]);

    // Check if our tables exist
    const tables = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      ORDER BY table_name;
    `);
    
    console.log('✅ Tables in database:');
    tables.rows.forEach(row => {
      console.log('  -', row.table_name);
    });

    // Test if we can insert/read from VerificationCode table
    try {
      const testEmail = 'test@example.com';
      const testCode = '123456';
      const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

      // Insert test record
      await client.query(
        'INSERT INTO "VerificationCode" (id, email, code, type, "expiresAt") VALUES ($1, $2, $3, $4, $5)',
        ['test-id-' + Date.now(), testEmail, testCode, 'test', expiresAt]
      );

      // Read it back
      const testResult = await client.query(
        'SELECT * FROM "VerificationCode" WHERE email = $1 AND type = $2',
        [testEmail, 'test']
      );

      if (testResult.rows.length > 0) {
        console.log('✅ VerificationCode table test successful');
        
        // Clean up test record
        await client.query(
          'DELETE FROM "VerificationCode" WHERE email = $1 AND type = $2',
          [testEmail, 'test']
        );
      }
    } catch (error) {
      console.log('❌ VerificationCode table test failed:', error.message);
    }

  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
  } finally {
    await client.end();
  }
}

testConnection();