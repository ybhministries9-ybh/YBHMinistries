import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import crypto from 'crypto';
import { sendInviteEmail } from '@/lib/email';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const id = data?.id || null;
    if (!id) return NextResponse.json({ success: false, error: 'id required' }, { status: 400 });

    // Generate token
    const rawToken = crypto.randomBytes(32).toString('hex');
    const tokenHash = crypto.createHash('sha256').update(rawToken).digest('hex');
    const expiresAt = new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString();

    const result = await sql`
      UPDATE users SET
        invite_token_hash = ${tokenHash},
        invite_expires_at = ${expiresAt},
        status = 'Invited',
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ${id}
      RETURNING *
    `;

    if (!result.rows.length) return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 });

    const user = result.rows[0];
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || 'http://localhost:3000';
    const link = `${siteUrl}/admin/accept-invite?token=${rawToken}`;

    // send email (best-effort) and include provider response for debugging
    const emailRes = await sendInviteEmail(user.email, user.name || null, link);

    const resp: any = { success: true, data: { id: user.id } };
    resp.email = emailRes.dev ? 'logged' : 'sent';
    resp.providerResponse = emailRes;

    return NextResponse.json(resp);
  } catch (err) {
    console.error('Error in POST /api/admin/users/invite', err);
    return NextResponse.json({ success: false, error: 'Failed to create invite' }, { status: 500 });
  }
}
