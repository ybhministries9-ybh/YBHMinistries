import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || 'all';

    let result;
    switch (type) {
      case 'upi':
        result = await sql`SELECT * FROM donations_upi WHERE visible = true ORDER BY sort_order, id`;
        break;
      case 'bank':
        result = await sql`SELECT * FROM donations_bank WHERE visible = true ORDER BY sort_order, id`;
        break;
      // 'info' removed; hero content will be hardcoded
      case 'all':
      default:
        const upi = await sql`SELECT * FROM donations_upi WHERE visible = true ORDER BY sort_order, id`;
        const bank = await sql`SELECT * FROM donations_bank WHERE visible = true ORDER BY sort_order, id`;
        return NextResponse.json({ success: true, data: { upi: upi.rows, bank: bank.rows } });
    }

    return NextResponse.json({ success: true, data: result.rows });
  } catch (error) {
    console.error('Error in GET /api/donations:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch donations' }, { status: 500 });
  }
}
