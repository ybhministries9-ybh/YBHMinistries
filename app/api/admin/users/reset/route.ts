import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { hashPassword } from '@/lib/password';
import { verifySession } from '@/lib/sessions';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const auth = request.headers.get('authorization') || '';
    const token = auth.startsWith('Bearer ') ? auth.slice(7) : auth || null;
    const session = await verifySession(token);
    if (!session) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });

    const data = await request.json();
    const id = data?.id || null;
    if (!id) return NextResponse.json({ success: false, error: 'id required' }, { status: 400 });

    const DEFAULT_PASSWORD = process.env.DEFAULT_USER_PASSWORD || 'YbhWelcome@123';
    const passwordHash = hashPassword(DEFAULT_PASSWORD);

    const result = await sql`
      UPDATE users SET password_hash = ${passwordHash}, must_reset_password = false, updated_at = CURRENT_TIMESTAMP
      WHERE id = ${id}
      RETURNING *
    `;

    if (!result.rows.length) return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 });

    return NextResponse.json({ success: true, data: { id: result.rows[0].id } });
  } catch (err) {
    console.error('Error in POST /api/admin/users/reset', err);
    return NextResponse.json({ success: false, error: 'Failed to reset password' }, { status: 500 });
  }
}
