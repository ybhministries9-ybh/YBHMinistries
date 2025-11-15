import { NextRequest, NextResponse } from 'next/server';
import { put } from '@vercel/blob';

/**
 * POST /api/admin/upload/file
 * FormData: file, pathPrefix (optional)
 * Uploads provided file to Vercel Blob under given prefix (default: resources/files)
 */
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
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
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json({ success: false, error: 'Failed to upload file' }, { status: 500 });
  }
}
