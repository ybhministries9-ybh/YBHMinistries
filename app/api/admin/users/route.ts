import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { hashPassword } from '@/lib/password';
import { getActorName, verifySession } from '@/lib/sessions';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    // allow public reads for users list (admin mutations remain protected)

    const { searchParams } = new URL(request.url);
    const q = searchParams.get('q') || null;
    // Basic list; optional search by name or email via q
    let result;
    if (q) {
      const like = `%${q}%`;
      result = await sql`SELECT * FROM users WHERE name ILIKE ${like} OR email ILIKE ${like} ORDER BY created_at DESC`;
    } else {
      result = await sql`SELECT * FROM users ORDER BY created_at DESC`;
    }
    return NextResponse.json({ success: true, data: result.rows });
  } catch (err) {
    console.error('Error in GET /api/admin/users', err);
    return NextResponse.json({ success: false, error: 'Failed to fetch users' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const auth = request.headers.get('authorization') || '';
    const token = auth.startsWith('Bearer ') ? auth.slice(7) : auth || null;
    const session = await verifySession(token);
    if (!session) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });

    const data = await request.json();
    const actor = await getActorName(token);
    // normalize email to lowercase for storage
    if (data.email) data.email = String(data.email).toLowerCase();
    if (!data || !data.name || !data.email) return NextResponse.json({ success: false, error: 'name & email required' }, { status: 400 });

    // Check duplicate email
    const existing = await sql`SELECT id FROM users WHERE email = ${data.email} LIMIT 1`;
    if (existing.rows.length) return NextResponse.json({ success: false, error: 'Email already in use' }, { status: 409 });

    const role = data.role || 'Viewer';
    const status = data.status || 'Active';

    // Set a default password and require reset on first login
    const DEFAULT_PASSWORD = process.env.DEFAULT_USER_PASSWORD || 'YbhWelcome@123';
    const passwordHash = hashPassword(DEFAULT_PASSWORD);

    const result = await sql`
      INSERT INTO users (name, email, role, status, password_hash, must_reset_password, created_by, updated_by)
      VALUES (${data.name}, ${data.email}, ${role}, ${status}, ${passwordHash}, true, ${actor}, ${actor})
      RETURNING *
    `;


    return NextResponse.json({ success: true, data: result.rows[0] }, { status: 201 });
  } catch (err) {
    console.error('Error in POST /api/admin/users', err);
    return NextResponse.json({ success: false, error: 'Failed to create user' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const auth = request.headers.get('authorization') || '';
    const token = auth.startsWith('Bearer ') ? auth.slice(7) : auth || null;
    const session = await verifySession(token);
    if (!session) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ success: false, error: 'id required' }, { status: 400 });

    const data = await request.json();
    const actor = await getActorName(token);

    // Resolve actor role to enforce permissions
    const actorUser = await sql`SELECT id, role FROM users WHERE id = ${session.user_id} LIMIT 1`;
    const actorRole = actorUser.rows.length ? actorUser.rows[0].role : null;
    const actorId = actorUser.rows.length ? String(actorUser.rows[0].id) : null;

    // If updating email, ensure uniqueness (emails stored lowercase)
    if (data.email) {
      data.email = String(data.email).toLowerCase();
      const dup = await sql`SELECT id FROM users WHERE email = ${data.email} AND id <> ${id} LIMIT 1`;
      if (dup.rows.length) return NextResponse.json({ success: false, error: 'Email already in use' }, { status: 409 });
    }

    // Non-super admins may only update their own profile and may not change role/status
    if (actorRole !== 'Super Admin') {
      if (id !== actorId) {
        return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 });
      }
      if (data.role || data.status) {
        return NextResponse.json({ success: false, error: 'Insufficient privileges to change role or status' }, { status: 403 });
      }
    }

    const result = await sql`
      UPDATE users SET
        name = ${data.name},
        email = ${data.email},
        role = ${data.role},
        status = ${data.status},
        updated_by = ${actor},
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ${id}
      RETURNING *
    `;

    if (!result.rows.length) return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 });

    return NextResponse.json({ success: true, data: result.rows[0] });
  } catch (err) {
    console.error('Error in PUT /api/admin/users', err);
    return NextResponse.json({ success: false, error: 'Failed to update user' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const auth = request.headers.get('authorization') || '';
    const token = auth.startsWith('Bearer ') ? auth.slice(7) : auth || null;
    const session = await verifySession(token);
    if (!session) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ success: false, error: 'id required' }, { status: 400 });

    // Prevent deleting Super Admins by role check (optional): ensure caller knows
    const select = await sql`SELECT role FROM users WHERE id = ${id}`;
    if (!select.rows.length) return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 });
    // Prevent deleting yourself
    if (String(session.user_id) === String(id)) {
      return NextResponse.json({ success: false, error: 'Cannot delete yourself' }, { status: 403 });
    }

    if (select.rows[0].role === 'Super Admin') {
      return NextResponse.json({ success: false, error: 'Cannot delete Super Admin' }, { status: 403 });
    }

    const result = await sql`DELETE FROM users WHERE id = ${id} RETURNING id`;
    if (!result.rows.length) return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 });

    return NextResponse.json({ success: true, message: 'Deleted' });
  } catch (err) {
    console.error('Error in DELETE /api/admin/users', err);
    return NextResponse.json({ success: false, error: 'Failed to delete user' }, { status: 500 });
  }
}
