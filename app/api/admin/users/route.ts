import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { hashPassword } from '@/lib/password';
import { resolveSessionAndActorFromAuthHeader, ADMIN_ROLES } from '@/lib/sessions';

export const dynamic = 'force-dynamic';

// User Management is off-limits to Viewers entirely -- no read, no write,
// regardless of how the page/API is reached (sidebar hidden client-side is
// not enough on its own, since the API must also refuse a direct call).
function isViewer(role: string | null) {
  return String(role || '') === ADMIN_ROLES.VIEWER;
}

export async function GET(request: NextRequest) {
  try {
    const resolved = await resolveSessionAndActorFromAuthHeader(request.headers.get('authorization') || '');
    if (!resolved) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    if (isViewer(resolved.role)) return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 });

    const { searchParams } = new URL(request.url);
    const q = searchParams.get('q') || null;
    // Return both Active and Inactive users -- only soft-deleted users
    // (status = 'Deleted') are excluded from the list.
    let result;
    if (q) {
      const like = `%${q}%`;
      result = await sql`SELECT * FROM users WHERE status <> 'Deleted' AND (name ILIKE ${like} OR email ILIKE ${like}) ORDER BY created_at DESC`;
    } else {
      result = await sql`SELECT * FROM users WHERE status <> 'Deleted' ORDER BY created_at DESC`;
    }
    return NextResponse.json({ success: true, data: result.rows });
  } catch (err) {
    console.error('Error in GET /api/admin/users', err);
    return NextResponse.json({ success: false, error: 'Failed to fetch users' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const resolved = await resolveSessionAndActorFromAuthHeader(request.headers.get('authorization') || '');
    if (!resolved) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    if (isViewer(resolved.role)) return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 });
    const actor = resolved.actor;

    const data = await request.json();
    // normalize email to lowercase for storage
    if (data.email) data.email = String(data.email).toLowerCase();
    if (!data || !data.name || !data.email) return NextResponse.json({ success: false, error: 'name & email required' }, { status: 400 });

    // Check for existing user with this email that is Active
    const existing = await sql`SELECT id, status FROM users WHERE email = ${data.email} AND status = 'Active' LIMIT 1`;
    if (existing.rows.length) {
      // User is active - show error
      return NextResponse.json({ success: false, error: 'A user with this email already exists and is active' }, { status: 409 });
    }

    // If there's a deleted user with this email, update their email to free it up for the new user
    const deletedUser = await sql`SELECT id FROM users WHERE email = ${data.email} AND status = 'Deleted' LIMIT 1`;
    if (deletedUser.rows.length) {
      // Append timestamp to old email to make it unique
      const timestamp = Date.now();
      await sql`UPDATE users SET email = ${data.email + '_deleted_' + timestamp} WHERE id = ${deletedUser.rows[0].id}`;
    }

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
    const resolved = await resolveSessionAndActorFromAuthHeader(request.headers.get('authorization') || '');
    if (!resolved) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    if (isViewer(resolved.role)) return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 });
    const { session, actor } = resolved;

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ success: false, error: 'id required' }, { status: 400 });

    const data = await request.json();

    const actorRole = resolved.role;
    const actorId = String(session.user_id);

    // If updating email, ensure uniqueness among Active users (emails stored lowercase)
    if (data.email) {
      data.email = String(data.email).toLowerCase();
      const dup = await sql`SELECT id FROM users WHERE email = ${data.email} AND id <> ${id} AND status = 'Active' LIMIT 1`;
      if (dup.rows.length) return NextResponse.json({ success: false, error: 'Email already in use' }, { status: 409 });
    }

    // Non-super admins may only update their own profile and may not change role/status
    if (actorRole !== ADMIN_ROLES.SUPER_ADMIN) {
      if (id !== actorId) {
        return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 });
      }
      if (data.role || data.status) {
        return NextResponse.json({ success: false, error: 'Insufficient privileges to change role or status' }, { status: 403 });
      }
    }

    // Nobody may change their own status -- prevents a user (including a
    // Super Admin) from accidentally locking themselves out.
    if (id === actorId && data.status) {
      const current = await sql`SELECT status FROM users WHERE id = ${id} LIMIT 1`;
      if (current.rows.length && String(data.status) !== current.rows[0].status) {
        return NextResponse.json({ success: false, error: 'Cannot change your own status' }, { status: 403 });
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
    const resolved = await resolveSessionAndActorFromAuthHeader(request.headers.get('authorization') || '');
    if (!resolved) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    if (isViewer(resolved.role)) return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 });
    const { session } = resolved;

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

    if (select.rows[0].role === ADMIN_ROLES.SUPER_ADMIN) {
      return NextResponse.json({ success: false, error: 'Cannot delete Super Admin' }, { status: 403 });
    }

    // Soft delete: Update status to 'Deleted' instead of permanent deletion
    const result = await sql`
      UPDATE users SET
        status = 'Deleted',
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ${id}
      RETURNING id
    `;
    if (!result.rows.length) return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 });

    return NextResponse.json({ success: true, message: 'User deleted successfully' });
  } catch (err) {
    console.error('Error in DELETE /api/admin/users', err);
    return NextResponse.json({ success: false, error: 'Failed to delete user' }, { status: 500 });
  }
}
