import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export const dynamic = 'force-dynamic';
export const revalidate = 0; // Disable ISR caching - always fetch fresh data

// GET: Fetch published reports for public website
export async function GET(request: NextRequest) {
  try {
    // Fetch all published reports
    const result = await sql`
      SELECT id, year, class_type, monthly_data, created_at
      FROM reports
      WHERE published = true
      ORDER BY year DESC, class_type ASC
    `;

    // Transform data to match the format expected by the frontend
    const reportsByYear: Record<string, Record<string, any[]>> = {};

    result.rows.forEach((row) => {
      const year = row.year.toString();
      const classType = row.class_type;
      const monthlyData = row.monthly_data;

      if (!reportsByYear[year]) {
        reportsByYear[year] = {};
      }

      reportsByYear[year][classType] = monthlyData;
    });

    return NextResponse.json(
      {
        success: true,
        data: reportsByYear,
        count: result.rows.length
      },
      {
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0',
        },
      }
    );
  } catch (error) {
    console.error('Error fetching reports:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch reports' },
      { status: 500 }
    );
  }
}
