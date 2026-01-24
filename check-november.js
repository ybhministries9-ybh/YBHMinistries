require('dotenv').config({ path: '.env.local' });
const { sql } = require('@vercel/postgres');

async function checkData() {
  try {
    const result = await sql`
      SELECT year, class_type, monthly_data 
      FROM reports 
      WHERE published = true
    `;
    
    // Debug output removed
  } catch (error) {
    console.error('Error:', error);
  } finally {
    process.exit(0);
  }
}

checkData();
