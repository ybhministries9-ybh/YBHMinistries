require('dotenv').config({ path: '.env.local' });
const { sql } = require('@vercel/postgres');

async function checkData() {
  try {
    const result = await sql`
      SELECT year, class_type, monthly_data 
      FROM reports 
      WHERE published = true
    `;
    
    if (process.env.NODE_ENV !== 'production') {
      console.log('=== Report Data ===');
      result.rows.forEach(row => {
        console.log(`\nYear: ${row.year}, Class: ${row.class_type}`);
        console.log('Monthly Data:');
        row.monthly_data.forEach(month => {
          console.log(`  ${month.month}: indian=${month.indian}, nonIndian=${month.nonIndian}, total=${month.total}`);
        });
      });
    }
  } catch (error) {
    console.error('Error:', error);
  } finally {
    process.exit(0);
  }
}

checkData();
