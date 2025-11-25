import { NextRequest, NextResponse } from 'next/server';
import { verifySession } from '@/lib/sessions';
import { sql } from '@vercel/postgres';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const auth = request.headers.get('authorization') || '';
    const token = auth.startsWith('Bearer ') ? auth.slice(7) : auth || null;
    if (!token) return NextResponse.json({ success: false, error: 'Missing token' }, { status: 401 });

    const session = await verifySession(token);
    if (!session) return NextResponse.json({ success: false, error: 'Invalid or expired session' }, { status: 401 });

    const res = await sql`SELECT id, name, email, role, status FROM users WHERE id = ${session.user_id} LIMIT 1`;
    if (!res.rows.length) return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 });
    const user = res.rows[0];
    return NextResponse.json({ success: true, user });
  } catch (err) {
    console.error('Error in GET /api/admin/auth/me', err);
    return NextResponse.json({ success: false, error: 'Failed to fetch current user' }, { status: 500 });
  }
}
