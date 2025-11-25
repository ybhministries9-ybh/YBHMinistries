import { NextRequest, NextResponse } from 'next/server';
import { uploadBuffer, PRIVATE_BUCKET } from '@/lib/r2';

/**
 * POST /api/admin/upload/event-image
 * Upload a single event image to the private R2 bucket under
 * news/events/<uniqueId>/orig/<filename>
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
  } catch (error) {
    console.error('Error uploading event image:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to upload event image' },
      { status: 500 }
    );
  }
}
