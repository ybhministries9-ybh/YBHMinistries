import { NextRequest, NextResponse } from 'next/server';
import { uploadBuffer, PRIVATE_BUCKET } from '@/lib/r2';
import { withApiGuard, streamUploadGuard, ApiError } from '@/lib/apiGuard';
import { resolveSessionAndActorFromAuthHeader, readOnlyResponse } from '@/lib/sessions';

/**
 * POST /api/admin/upload/thumbnail
 * Upload thumbnail file to Vercel Blob
 */
export const POST = withApiGuard(async (request: NextRequest) => {
  const resolved = await resolveSessionAndActorFromAuthHeader(request.headers.get('authorization') || '');
  if (!resolved) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }
  const denied = readOnlyResponse(resolved);
  if (denied) return denied;

  await streamUploadGuard(request, 5_000_000);

  const parsePromise = request.formData();
  const timeout = new Promise((_, rej) => setTimeout(() => rej(new ApiError(408, 'Request timeout')), 15_000));
  const formData = await Promise.race([parsePromise, timeout]) as FormData;

  const file = formData.get('file') as File;

  if (!file) {
    return NextResponse.json({ success: false, error: 'No file provided' }, { status: 400 });
  }

  // Upload original to private R2 bucket and return a single reference
  const sanitized = file.name.replace(/[^a-zA-Z0-9.\-_/]/g, '_');
  // allow callers to pass a destination path as a query param ?dest=stories/text/thumbnails/orig
  const { searchParams } = new URL(request.url);
  let dest = String(searchParams.get('dest') || '').trim();
  // sanitize dest: remove leading/trailing slashes, disallow traversal/absolute, and remove unsafe characters
  dest = dest.replace(/^\/+|\/+$/g, '').replace(/\.\./g, '_').replace(/[^a-zA-Z0-9._\-\/]/g, '_');
  const defaultDest = `home/video/thumbnails/orig`;
  const folder = dest.length > 0 ? dest : defaultDest;
  const origKey = `${folder}/${Date.now()}-${sanitized}`;
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer as ArrayBuffer);
  // Upload original, verify it exists (one retry on failure)
  await uploadBuffer(origKey, buffer, file.type || 'application/octet-stream', PRIVATE_BUCKET);
  try {
    const parsedKey = origKey;
    const head = await (await import('@/lib/r2')).headObject(parsedKey, PRIVATE_BUCKET);
    if (!head) {
      // retry once
      await uploadBuffer(origKey, buffer, file.type || 'application/octet-stream', PRIVATE_BUCKET);
    }
  } catch (e) {
    console.warn('orig head check failed (non-fatal)', e);
  }
  // Return only the original uploaded reference
  try {
    const storageRef = `r2://${PRIVATE_BUCKET}/${origKey}`;
    return NextResponse.json({ success: true, url: storageRef });
  } catch (e) {
    console.error('Failed to return upload reference', e);
    const storageRef = `r2://${PRIVATE_BUCKET}/${origKey}`;
    return NextResponse.json({ success: true, url: storageRef });
  }
}, { allowMultipartPaths: ['/api/admin/upload/thumbnail'], multipartMaxBytes: 5_000_000 });
