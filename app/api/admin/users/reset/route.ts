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

    // Resolve actor role and id to enforce permissions
    const actorRes = await sql`SELECT id, role FROM users WHERE id = ${session.user_id} LIMIT 1`;
    const actor = actorRes.rows.length ? actorRes.rows[0] : null;
    const actorRole = actor ? actor.role : null;
    const actorId = actor ? String(actor.id) : null;

    // If the actor is Viewer or Content Manager they may only operate on themselves
    if ((actorRole === 'Viewer' || actorRole === 'Content Manager') && String(id) !== actorId) {
      return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 });
    }

    // Prevent non-super admins from modifying Super Admins
    const targetRes = await sql`SELECT id, role FROM users WHERE id = ${id} LIMIT 1`;
    if (!targetRes.rows.length) return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 });
    const targetRole = targetRes.rows[0].role;
    if (targetRole === 'Super Admin' && actorRole !== 'Super Admin') {
      return NextResponse.json({ success: false, error: 'Cannot modify Super Admin' }, { status: 403 });
    }

    // Set password to default and require reset on next login
    const DEFAULT_PASSWORD = process.env.DEFAULT_USER_PASSWORD || 'YbhWelcome@123';
    const passwordHash = hashPassword(DEFAULT_PASSWORD);

    const result = await sql`
      UPDATE users SET password_hash = ${passwordHash}, must_reset_password = true, updated_at = CURRENT_TIMESTAMP, updated_by = ${actorId}
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
