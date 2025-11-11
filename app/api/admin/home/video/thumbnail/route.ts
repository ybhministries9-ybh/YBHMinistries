import { NextRequest, NextResponse } from 'next/server';
import { del, put } from '@vercel/blob';
import { sql } from '@vercel/postgres';

/**
 * PUT /api/admin/home/video/thumbnail
 * Update video thumbnail
 */
export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Video ID is required' },
        { status: 400 }
      );
    }

    const videoId = parseInt(id);
    const body = await request.json();
    const { thumbnail_image_url } = body;

    if (!thumbnail_image_url) {
      return NextResponse.json(
        { success: false, error: 'Thumbnail URL is required' },
        { status: 400 }
      );
    }

    // Get existing thumbnail URL to delete it
    const { rows } = await sql`
      SELECT thumbnail_image_url FROM home_video WHERE id = ${videoId}
    `;
    const oldThumbnailUrl = rows[0]?.thumbnail_image_url;

    // Update thumbnail in database
    await sql`
      UPDATE home_video 
      SET thumbnail_image_url = ${thumbnail_image_url}, updated_at = CURRENT_TIMESTAMP
      WHERE id = ${videoId}
    `;

    // Delete old thumbnail from blob storage if it exists
    if (oldThumbnailUrl && oldThumbnailUrl.includes('blob.vercel-storage.com')) {
      try {
        await del(oldThumbnailUrl);
      } catch (blobError) {
        console.error(`Failed to delete old thumbnail: ${oldThumbnailUrl}`, blobError);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Thumbnail updated successfully'
    });
  } catch (error) {
    console.error('Error updating thumbnail:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update thumbnail' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/admin/home/video/thumbnail
 * Delete video thumbnail
 */
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Video ID is required' },
        { status: 400 }
      );
    }

    const videoId = parseInt(id);

    // Get thumbnail URL before removing from database
    const { rows } = await sql`
      SELECT thumbnail_image_url FROM home_video WHERE id = ${videoId}
    `;
    const thumbnailUrl = rows[0]?.thumbnail_image_url;

    // Remove thumbnail from database
    await sql`
      UPDATE home_video 
      SET thumbnail_image_url = NULL, updated_at = CURRENT_TIMESTAMP
      WHERE id = ${videoId}
    `;

    // Delete thumbnail from blob storage
    if (thumbnailUrl && thumbnailUrl.includes('blob.vercel-storage.com')) {
      try {
        await del(thumbnailUrl);
      } catch (blobError) {
        console.error(`Failed to delete thumbnail blob: ${thumbnailUrl}`, blobError);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Thumbnail deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting thumbnail:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete thumbnail' },
      { status: 500 }
    );
  }
}
