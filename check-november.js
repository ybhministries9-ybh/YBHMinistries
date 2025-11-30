require('dotenv').config({ path: '.env.local' });
const { sql } = require('@vercel/postgres');

async function checkData() {
  try {
    const result = await sql`
      SELECT year, class_type, monthly_data 
      FROM reports 
      WHERE published = true
    `;
    
    // Debug output: enabled when DEBUG env var is set (e.g. DEBUG=1)
    if (process.env.DEBUG) {
      console.debug('=== Report Data ===');
      result.rows.forEach(row => {
        console.debug(`\nYear: ${row.year}, Class: ${row.class_type}`);
        console.debug('Monthly Data:');
        row.monthly_data.forEach(month => {
          console.debug(`  ${month.month}: indian=${month.indian}, nonIndian=${month.nonIndian}, total=${month.total}`);
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
