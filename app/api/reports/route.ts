import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export const dynamic = 'force-dynamic';
export const revalidate = 60; // Cache for 60 seconds to balance freshness and performance

// GET: Fetch published reports for public website
export async function GET(request: NextRequest) {
  try {
    // Fetch all published reports with optimized query
    const result = await sql`
      SELECT id, year, class_type, monthly_data, created_at
      FROM reports
      WHERE published = true
      ORDER BY year DESC, class_type ASC
    `;

    // Early return if no data
    if (result.rows.length === 0) {
      return NextResponse.json(
        { success: true, data: {}, count: 0 },
        {
          headers: {
            'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120',
          },
        }
      );
    }

    // Transform data to match the format expected by the frontend
    const reportsByYear: Record<string, Record<string, any[]>> = {};

    result.rows.forEach((row) => {
      const year = row.year.toString();
      const classType = row.class_type;
      const monthlyData = row.monthly_data;

      if (!reportsByYear[year]) {
        reportsByYear[year] = {};
      }

      // Normalize data to ensure all required fields exist
      const normalizedData = monthlyData.map((monthData: any) => {
        const indian = monthData.indian ?? 0;
        const nonIndian = monthData.nonIndian ?? 0;
        const total = monthData.total ?? (indian + nonIndian);
        
        return {
          month: monthData.month,
          indian,
          nonIndian,
          total
        };
      });

      reportsByYear[year][classType] = normalizedData;
    });

    return NextResponse.json(
      {
        success: true,
        data: reportsByYear,
        count: result.rows.length
      },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120',
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
