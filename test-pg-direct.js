// Test PostgreSQL connection exactly as A2 Hosting recommends
import pg from 'pg';

const { Client } = pg;
const client = new Client({
    host: 'localhost',
    database: 'benafaco_calcfort_prod',
    user: 'benafaco_calcfort_user',
    password: 'Iv8.cTCIhVLc',
});

try {
    console.log('Connecting...');
    await client.connect();
    console.log('✅ Connected successfully!');
    
    const res = await client.query('SELECT current_database() as db, current_user as user, now() as time');
    console.log('✅ Query result:', res.rows[0]);
    
    await client.end();
    console.log('✅ Disconnected successfully');
} catch (error) {
    console.error('❌ Connection failed:', error.message);
    console.error('Error code:', error.code);
}