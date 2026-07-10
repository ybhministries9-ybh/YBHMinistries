import { NextRequest, NextResponse } from 'next/server';
import { put, del } from '@/lib/vercelBlob';
import { sql } from '@vercel/postgres';
import { withApiGuard, safeParseJson } from '@/lib/apiGuard';
import { resolveSessionAndActorFromAuthHeader, readOnlyResponse } from '@/lib/sessions';

export const dynamic = 'force-dynamic';

export const POST = withApiGuard(async (request: NextRequest) => {
  const resolved = await resolveSessionAndActorFromAuthHeader(request.headers.get('authorization') || '');
  if (!resolved) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  const denied = readOnlyResponse(resolved);
  if (denied) return denied;

  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) return NextResponse.json({ success: false, error: 'Server config: BLOB_READ_WRITE_TOKEN missing' }, { status: 500 });

  const { id, dataUrl } = await safeParseJson(request, 300 * 1024);
  if (!id) return NextResponse.json({ success: false, error: 'id is required' }, { status: 400 });
  if (!dataUrl || typeof dataUrl !== 'string' || !dataUrl.startsWith('data:image')) return NextResponse.json({ success: false, error: 'dataUrl is required (data:image...).' }, { status: 400 });

  // Delete existing blob if present
  try {
    const existing = await sql`SELECT qr_image_url FROM donations_upi WHERE id = ${id}`;
    const row = existing.rows[0];
    if (row && row.qr_image_url && typeof row.qr_image_url === 'string' && row.qr_image_url.includes('blob.vercel-storage.com')) {
      try {
        await del(row.qr_image_url);
      } catch (err) {
        console.error('Failed to delete existing QR blob:', err && (err as any).message ? (err as any).message : err);
      }
    }
  } catch (err) {
    console.error('Failed to check existing QR image for deletion:', err && (err as any).message ? (err as any).message : err);
  }

  const base64 = dataUrl.split(',')[1];
  const buffer = Buffer.from(base64, 'base64');

  const filename = `qr_${Date.now()}.png`;
  const pathname = `donations/upi/${id}/${filename}`;
  const blob = await put(pathname, buffer, {
    access: 'public',
    contentType: 'image/png',
    token,
  });

  const result = await sql`UPDATE donations_upi SET qr_image_url = ${blob.url}, updated_at = CURRENT_TIMESTAMP WHERE id = ${id} RETURNING *`;
  if (!result.rows.length) return NextResponse.json({ success: false, error: 'UPI entry not found' }, { status: 404 });

  return NextResponse.json({ success: true, url: blob.url, row: result.rows[0] });
});
