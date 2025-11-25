import { NextRequest, NextResponse } from 'next/server';
import { uploadBuffer, PRIVATE_BUCKET } from '@/lib/r2';

/**
 * POST /api/admin/upload/thumbnail
 * Upload thumbnail file to Vercel Blob
 */
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { success: false, error: 'No file provided' },
        { status: 400 }
      );
    }

    // Upload original to private R2 bucket and return a single reference
    const sanitized = file.name.replace(/[^a-zA-Z0-9.\-_/]/g, '_');
    const origKey = `home/video/thumbnails/orig/${Date.now()}-${sanitized}`;
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
  } catch (error) {
    console.error('Error uploading thumbnail:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to upload thumbnail' },
      { status: 500 }
    );
  }
}
