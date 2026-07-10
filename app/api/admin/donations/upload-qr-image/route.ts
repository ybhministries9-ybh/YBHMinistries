import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { uploadBuffer, deleteObject, parseKeyFromUrl, PRIVATE_BUCKET } from '@/lib/r2';
import { resolveSessionAndActorFromAuthHeader, readOnlyResponse } from '@/lib/sessions';
import { withApiGuard, streamUploadGuard, ApiError } from '@/lib/apiGuard';

export const dynamic = 'force-dynamic';

/**
 * Upload a QR code image file to R2 private bucket under /Donate/<upi_id>/
 * This endpoint accepts FormData with:
 * - id: UPI entry ID
 * - file: Image file (PNG/JPG)
 */
export const POST = withApiGuard(async (request: NextRequest) => {
  // verify session
  const resolved = await resolveSessionAndActorFromAuthHeader(request.headers.get('authorization') || '');
  if (!resolved) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  const denied = readOnlyResponse(resolved);
  if (denied) return denied;

  await streamUploadGuard(request, 5_000_000);
  const parsePromise = request.formData();
  const timeout = new Promise((_, rej) => setTimeout(() => rej(new ApiError(408, 'Request timeout')), 15_000));
  const formData = await Promise.race([parsePromise, timeout]) as FormData;

  const id = formData.get('id');
  const file = formData.get('file');

  if (!id) return NextResponse.json({ success: false, error: 'id is required' }, { status: 400 });
  if (!file || !(file instanceof File)) return NextResponse.json({ success: false, error: 'No file uploaded' }, { status: 400 });

  // Validate file type
  const allowedMime = ['image/png', 'image/jpeg', 'image/jpg'];
  const fileType = file.type || '';
  const fileName = file.name || '';
  const ext = (fileName.split('.').pop() || '').toLowerCase();
  const allowedExt = ['png', 'jpg', 'jpeg'];
  const mimeOk = allowedMime.includes(fileType.toLowerCase());
  const extOk = allowedExt.includes(ext);
  if (!mimeOk && !extOk) return NextResponse.json({ success: false, error: 'Unsupported file type. Only PNG and JPG images are allowed.' }, { status: 415 });

  // Validate file size (max 5MB)
  const maxSizeMB = 5;
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  if ((file as any).size > maxSizeBytes) return NextResponse.json({ success: false, error: `File too large. Maximum allowed size is ${maxSizeMB}MB.` }, { status: 413 });

  // Check if UPI entry exists
  const existingRes = await sql`SELECT id, qr_image_url FROM donations_upi WHERE id = ${String(id)}`;
  if (existingRes.rows.length === 0) return NextResponse.json({ success: false, error: 'UPI entry not found' }, { status: 404 });

  const existingRow = existingRes.rows[0];
  if (existingRow.qr_image_url && typeof existingRow.qr_image_url === 'string') {
    const oldUrl = existingRow.qr_image_url;
    if (oldUrl.startsWith('r2://')) {
      try {
        const parsed = parseKeyFromUrl(oldUrl);
        if (parsed.key) await deleteObject(parsed.key, parsed.bucket || undefined);
      } catch (err) {
        console.error('Failed to delete existing QR image from R2:', err && (err as any).message ? (err as any).message : err);
      }
    }
  }

  const arrayBuffer = await (file as File).arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const timestamp = Date.now();
  const sanitizedName = fileName.replace(/[^a-zA-Z0-9.-]/g, '_');
  const finalFilename = `qr_${timestamp}_${sanitizedName}`;
  const key = `Donate/${id}/${finalFilename}`;
  const bucket = PRIVATE_BUCKET || process.env.R2_PRIVATE_BUCKET || process.env.R2_BUCKET;
  await uploadBuffer(key, buffer, (file as File).type || 'image/png', bucket as string);
  const r2Url = `r2://${bucket}/${key}`;

  const result = await sql`
    UPDATE donations_upi 
    SET qr_image_url = ${r2Url}, updated_at = CURRENT_TIMESTAMP 
    WHERE id = ${String(id)} 
    RETURNING *
  `;
  if (!result.rows.length) return NextResponse.json({ success: false, error: 'Failed to update UPI entry' }, { status: 500 });

  return NextResponse.json({ success: true, url: r2Url, row: result.rows[0] });
}, { allowMultipartPaths: ['/api/admin/donations/upload-qr-image'], multipartMaxBytes: 5_000_000 });
