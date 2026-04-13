import { NextRequest, NextResponse } from 'next/server';
import { uploadBuffer, PRIVATE_BUCKET } from '@/lib/r2';
import { withApiGuard, streamUploadGuard, ApiError } from '@/lib/apiGuard';
import { rateLimit } from '@/lib/security';

const MAX_UPLOAD_BYTES = 3_000_000;
const ALLOWED_TYPES = new Set(['image/jpeg', 'image/jpg', 'image/png']);

export const POST = withApiGuard(async (request: NextRequest) => {
  await streamUploadGuard(request, MAX_UPLOAD_BYTES);

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || 'unknown';
  const rl = await rateLimit(`stories-upload:${ip}`, 10, 60 * 60 * 1000);
  if (!rl.ok) return NextResponse.json({ success: false, error: 'Too many requests' }, { status: 429 });

  const parsePromise = request.formData();
  const timeout = new Promise((_, rej) => setTimeout(() => rej(new ApiError(408, 'Request timeout')), 15_000));
  const formData = await Promise.race([parsePromise, timeout]) as FormData;
  const file = formData.get('file') as File | null;

  if (!file) {
    return NextResponse.json({ success: false, error: 'No file provided' }, { status: 400 });
  }
  if (!ALLOWED_TYPES.has((file.type || '').toLowerCase())) {
    return NextResponse.json({ success: false, error: 'Only JPG, JPEG, and PNG files are allowed' }, { status: 400 });
  }
  if (file.size > MAX_UPLOAD_BYTES) {
    return NextResponse.json({ success: false, error: 'Image must be 3MB or smaller' }, { status: 400 });
  }

  const sanitized = file.name.replace(/[^a-zA-Z0-9.\-_/]/g, '_');
  const key = `stories/public/thumbnails/orig/${Date.now()}-${sanitized}`;
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer as ArrayBuffer);
  await uploadBuffer(key, buffer, file.type || 'application/octet-stream', PRIVATE_BUCKET);

  const storageRef = `r2://${PRIVATE_BUCKET}/${key}`;
  return NextResponse.json({ success: true, url: storageRef });
}, { allowMultipartPaths: ['/api/stories/upload'], multipartMaxBytes: MAX_UPLOAD_BYTES });
