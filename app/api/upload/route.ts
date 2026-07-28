import { NextRequest } from 'next/server';
import { uploadBuffer, getPublicUrl, PRIVATE_BUCKET } from '@/lib/r2';
import { resolveSessionAndActorFromAuthHeader, readOnlyResponse } from '@/lib/sessions';

export async function POST(request: NextRequest) {
  try {
    // Admin-only: this endpoint writes directly to R2 storage.
    const resolved = await resolveSessionAndActorFromAuthHeader(request.headers.get('authorization') || '').catch(() => null);
    if (!resolved) return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    const denied = readOnlyResponse(resolved);
    if (denied) return denied;

    const formData = await request.formData();
    const file = formData.get('file');
    // Sanitize folder: allow only simple path segments (no traversal)
    const rawFolder = String(formData.get('folder') || 'uploads');
    const folder = /^[a-zA-Z0-9_\/-]{1,100}$/.test(rawFolder) && !rawFolder.includes('..') && !rawFolder.startsWith('/')
      ? rawFolder.replace(/\/$/, '')
      : 'uploads';

    if (!file || !(file instanceof File)) {
      return new Response(JSON.stringify({ error: 'No file uploaded' }), { status: 400 });
    }

    // Server-side validation: only accept PNG or JPG/JPEG images
    const allowedMime = ['image/png', 'image/jpeg', 'image/jpg'];
    const fileType = file.type || '';
    const fileName = file.name || '';
    const ext = (fileName.split('.').pop() || '').toLowerCase();
    const allowedExt = ['png', 'jpg', 'jpeg'];
    const mimeOk = allowedMime.includes(fileType.toLowerCase());
    const extOk = allowedExt.includes(ext);
    if (!mimeOk && !extOk) {
      return new Response(JSON.stringify({ error: 'Unsupported file type. Only PNG and JPG images are allowed.' }), { status: 415 });
    }

    // Enforce server-side size limit (in MB). Configurable via UPLOAD_MAX_MB env var; defaults to 5MB.
    const envMaxMB = Number(process.env.UPLOAD_MAX_MB || process.env.MAX_UPLOAD_MB || 0) || 0;
    const defaultMaxMB = 5;
    const maxSizeMB = envMaxMB > 0 ? envMaxMB : defaultMaxMB;
    const maxSizeBytes = maxSizeMB * 1024 * 1024;
    try {
      // File may be a File object with .size
      const size = typeof (file as File).size === 'number' ? (file as File).size : 0;
      if (size > maxSizeBytes) {
        return new Response(JSON.stringify({ error: `File too large. Maximum allowed size is ${maxSizeMB}MB.` }), { status: 413 });
      }
    } catch {
      // If we cannot determine size, proceed and rely on later checks
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const timestamp = Date.now();
    const originalName = file.name || 'file';
    const sanitizedName = originalName.replace(/[^a-zA-Z0-9.-]/g, '_');
    const filename = `${timestamp}-${sanitizedName}`;
    const key = `${folder}/${filename}`;

    try {
      // Use the private bucket for uploaded resource assets (covers, additional images)
      const bucketToUse = PRIVATE_BUCKET || process.env.R2_PRIVATE_BUCKET || process.env.R2_BUCKET;
      await uploadBuffer(key, buffer, file.type || 'application/octet-stream', bucketToUse as string);
    } catch (e: any) {
      console.error('Upload to R2 failed:', e?.message || e);
      return new Response(JSON.stringify({ error: 'Failed to upload file to R2 storage' }), { status: 500 });
    }

    // Return an `r2://` URL to be stored in DB, plus a publicUrl for immediate preview if needed.
    const bucketToUse = PRIVATE_BUCKET || process.env.R2_PRIVATE_BUCKET || process.env.R2_BUCKET;
    const publicUrl = (() => {
      try {
        return getPublicUrl(key, bucketToUse as string);
      } catch {
        return null;
      }
    })();

    const r2Url = `r2://${bucketToUse}/${key}`;

    return new Response(JSON.stringify({
      success: true,
      url: r2Url, // store r2://bucket/key in DB
      pathname: key,
      publicUrl: publicUrl || null,
      contentType: file.type || 'application/octet-stream',
      size: file.size,
    }), { status: 200 });
  } catch (error: any) {
    console.error('/api/upload error', error);
    return new Response(JSON.stringify({ error: 'Failed to upload file' }), { status: 500 });
  }
}
