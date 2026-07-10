import { NextRequest, NextResponse } from 'next/server';
import { uploadBuffer, PRIVATE_BUCKET } from '@/lib/r2';
import { withApiGuard, streamUploadGuard, ApiError } from '@/lib/apiGuard';
import { resolveSessionAndActorFromAuthHeader, readOnlyResponse } from '@/lib/sessions';

/**
 * POST /api/admin/upload/event-image
 * Upload a single event image to the private R2 bucket under
 * news/events/<uniqueId>/orig/<filename>
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

  const sanitized = file.name.replace(/[^a-zA-Z0-9.\-_/]/g, '_');
  const { randomUUID } = await import('crypto');
  const uniqueId = (randomUUID && typeof randomUUID === 'function') ? randomUUID() : String(Date.now());
  const origKey = `news/events/${uniqueId}/orig/${sanitized}`;
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer as ArrayBuffer);

  await uploadBuffer(origKey, buffer, file.type || 'application/octet-stream', PRIVATE_BUCKET);

  // best-effort head check (non-fatal)
  try {
    const { headObject } = await import('@/lib/r2');
    const head = await headObject(origKey, PRIVATE_BUCKET);
    if (!head) {
      // retry once
      await uploadBuffer(origKey, buffer, file.type || 'application/octet-stream', PRIVATE_BUCKET);
    }
  } catch (e) {
    // ignore head check failures
  }

  const storageRef = `r2://${PRIVATE_BUCKET}/${origKey}`;
  return NextResponse.json({ success: true, url: storageRef, key: origKey, id: uniqueId });
}, { allowMultipartPaths: ['/api/admin/upload/event-image'], multipartMaxBytes: 5_000_000 });
