import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

// GET - Fetch active ministries only (public)
// Cache for 5 minutes to reduce database load
export const revalidate = 300;

export async function GET() {
  try {
    const { rows } = await sql`
      SELECT id, name, slug, is_active
      FROM ministries
      WHERE is_active = true
      ORDER BY name ASC
    `;

    // Return as direct array for easier consumption on frontend
    return NextResponse.json(rows, { 
      status: 200,
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600'
      }
    });
  } catch (error) {
    console.error('Error fetching ministries:', error);
    return NextResponse.json(
      { error: 'Failed to fetch ministries' },
      { status: 500 }
    );
  }
}
