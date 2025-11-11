import { NextRequest, NextResponse } from 'next/server';
import { put } from '@vercel/blob';

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

    // Upload to Vercel Blob
    const blob = await put(
      `home/video/thumbnails/${Date.now()}-${file.name}`,
      file,
      {
        access: 'public',
        addRandomSuffix: true,
      }
    );

    return NextResponse.json({
      success: true,
      url: blob.url
    });
  } catch (error) {
    console.error('Error uploading thumbnail:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to upload thumbnail' },
      { status: 500 }
    );
  }
}
