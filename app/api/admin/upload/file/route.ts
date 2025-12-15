import { NextRequest, NextResponse } from 'next/server';
import { put } from '@/lib/vercelBlob';
import { withApiGuard, streamUploadGuard, ApiError } from '@/lib/apiGuard';

/**
 * POST /api/admin/upload/file
 * FormData: file, pathPrefix (optional)
 * Uploads provided file to Vercel Blob under given prefix (default: resources/files)
 */
export const POST = withApiGuard(async (request: NextRequest) => {
  // Guard stream and content-length
  await streamUploadGuard(request, 5_000_000);

  // Parse formData with a timeout to avoid slowloris-like hangs
  const parsePromise = request.formData();
  const timeout = new Promise((_, rej) => setTimeout(() => rej(new ApiError(408, 'Request timeout')), 15_000));
  const formData = await Promise.race([parsePromise, timeout]) as FormData;

  const file = formData.get('file') as File;
  const pathPrefix = String(formData.get('pathPrefix') || 'resources/files');

  if (!file) {
    return NextResponse.json({ success: false, error: 'No file provided' }, { status: 400 });
  }

  // Ensure no leading/trailing slashes
  const cleanedPrefix = pathPrefix.replace(/^\/+|\/+$/g, '');

  const blob = await put(`${cleanedPrefix}/${Date.now()}-${file.name}`, file, {
    access: 'public',
    addRandomSuffix: true,
  });

  return NextResponse.json({ success: true, url: blob.url });
});
