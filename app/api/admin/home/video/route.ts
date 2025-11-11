import { NextRequest, NextResponse } from 'next/server';
import { put, del } from '@vercel/blob';
import { upsertHomeVideo, getActiveHomeVideo } from '@/lib/db';
import { sql } from '@vercel/postgres';

/**
 * GET /api/admin/home/video
 * Fetch current home video
 */
export async function GET(request: NextRequest) {
  try {
    const video = await getActiveHomeVideo();
    
    return NextResponse.json({
      success: true,
      data: video,
    });
  } catch (error: any) {
    console.error('Error fetching home video:', error);
    const errorMessage = error?.message || 'Failed to fetch video';
    const isDatabaseError = errorMessage.includes('relation') || errorMessage.includes('does not exist');
    
    return NextResponse.json(
      { 
        success: false, 
        error: isDatabaseError 
          ? 'Database tables not initialized. Please run database/schema/home_content.sql in your database.' 
          : errorMessage 
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin/home/video
 * Upload new home video (replaces existing video)
 */
export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get('content-type');
    
    // Handle file upload
    if (contentType?.includes('multipart/form-data')) {
      const formData = await request.formData();
      const file = formData.get('file') as File;
      const thumbnailFile = formData.get('thumbnail') as File | null;
      const createdBy = formData.get('created_by') as string | null;
      
      if (!file) {
        return NextResponse.json(
          { success: false, error: 'No video file provided' },
          { status: 400 }
        );
      }

      // Get existing video record
      const existingVideo = await getActiveHomeVideo();

      // Upload video to Vercel Blob first
      let videoBlob;
      try {
        videoBlob = await put(`home/video/${Date.now()}-${file.name}`, file, {
          access: 'public',
          addRandomSuffix: true,
        });
      } catch (uploadError) {
        console.error('Error uploading video to blob storage:', uploadError);
        return NextResponse.json(
          { success: false, error: 'Failed to upload video file. The file may be too large or there was a network issue.' },
          { status: 500 }
        );
      }

      // Upload thumbnail if provided
      let thumbnailUrl: string | undefined;
      if (thumbnailFile) {
        try {
          const thumbnailBlob = await put(
            `home/video/thumbnails/${Date.now()}-${thumbnailFile.name}`,
            thumbnailFile,
            {
              access: 'public',
              addRandomSuffix: true,
            }
          );
          thumbnailUrl = thumbnailBlob.url;
          
          // Delete old thumbnail blob if we're replacing it
          if (existingVideo?.thumbnail_image_url && existingVideo.thumbnail_image_url.includes('blob.vercel-storage.com')) {
            try {
              await del(existingVideo.thumbnail_image_url);
            } catch (blobError) {
              console.error(`Failed to delete old thumbnail blob: ${existingVideo.thumbnail_image_url}`, blobError);
            }
          }
        } catch (thumbError) {
          console.error('Error uploading thumbnail:', thumbError);
          // Continue without thumbnail if it fails
        }
      } else if (existingVideo?.thumbnail_image_url) {
        // Preserve existing thumbnail if no new one provided
        thumbnailUrl = existingVideo.thumbnail_image_url;
      }

      // Delete old video blob after successful upload
      if (existingVideo?.video_url && existingVideo.video_url.includes('blob.vercel-storage.com')) {
        try {
          await del(existingVideo.video_url);
        } catch (blobError) {
          console.error(`Failed to delete old video blob: ${existingVideo.video_url}`, blobError);
        }
      }

      // Update or insert video record in database
      let homeVideo;
      if (existingVideo) {
        // Update existing record
        await sql`
          UPDATE home_video 
          SET video_url = ${videoBlob.url}, 
              thumbnail_image_url = ${thumbnailUrl || null},
              updated_at = CURRENT_TIMESTAMP,
              updated_by = ${createdBy || null}
          WHERE id = ${existingVideo.id}
        `;
        
        // Fetch updated record
        const result = await sql`SELECT * FROM home_video WHERE id = ${existingVideo.id}`;
        homeVideo = result.rows[0];
      } else {
        // Insert new record
        homeVideo = await upsertHomeVideo(
          videoBlob.url,
          thumbnailUrl,
          createdBy || undefined
        );
      }

      return NextResponse.json({
        success: true,
        data: homeVideo,
        message: existingVideo ? 'Video replaced successfully' : 'Video uploaded successfully'
      });
    }
    
    // Handle URL submission
    else {
      const body = await request.json();
      const { video_url, thumbnail_image_url, created_by } = body;

      if (!video_url) {
        return NextResponse.json(
          { success: false, error: 'Video URL is required' },
          { status: 400 }
        );
      }

      // Get existing video record
      const existingVideo = await getActiveHomeVideo();

      // Determine final thumbnail URL (preserve existing if not provided)
      const finalThumbnailUrl = thumbnail_image_url || (existingVideo?.thumbnail_image_url || null);

      // Delete old video blob if it's different and from blob storage
      if (existingVideo?.video_url && 
          existingVideo.video_url !== video_url && 
          existingVideo.video_url.includes('blob.vercel-storage.com')) {
        try {
          await del(existingVideo.video_url);
        } catch (blobError) {
          console.error(`Failed to delete old video blob: ${existingVideo.video_url}`, blobError);
        }
      }

      // Delete old thumbnail blob only if we're replacing it with a new one
      if (thumbnail_image_url && 
          existingVideo?.thumbnail_image_url && 
          existingVideo.thumbnail_image_url !== thumbnail_image_url && 
          existingVideo.thumbnail_image_url.includes('blob.vercel-storage.com')) {
        try {
          await del(existingVideo.thumbnail_image_url);
        } catch (blobError) {
          console.error(`Failed to delete old thumbnail blob: ${existingVideo.thumbnail_image_url}`, blobError);
        }
      }

      // Update or insert video record in database
      let homeVideo;
      if (existingVideo) {
        // Update existing record
        await sql`
          UPDATE home_video 
          SET video_url = ${video_url}, 
              thumbnail_image_url = ${finalThumbnailUrl},
              updated_at = CURRENT_TIMESTAMP,
              updated_by = ${created_by || null}
          WHERE id = ${existingVideo.id}
        `;
        
        // Fetch updated record
        const result = await sql`SELECT * FROM home_video WHERE id = ${existingVideo.id}`;
        homeVideo = result.rows[0];
      } else {
        // Insert new record
        homeVideo = await upsertHomeVideo(
          video_url,
          finalThumbnailUrl,
          created_by
        );
      }

      return NextResponse.json({
        success: true,
        data: homeVideo,
        message: existingVideo ? 'Video replaced successfully' : 'Video uploaded successfully'
      });
    }
  } catch (error) {
    console.error('Error in POST /api/admin/home/video:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to upload home video' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/admin/home/video
 * Delete home video
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

    // Fetch video URL before updating database
    const { rows } = await sql`
      SELECT video_url 
      FROM home_video 
      WHERE id = ${videoId}
    `;

    const videoUrl = rows[0]?.video_url;

    // Delete video from Vercel Blob storage first
    if (videoUrl && videoUrl.includes('blob.vercel-storage.com')) {
      try {
        await del(videoUrl);
      } catch (blobError) {
        console.error(`Failed to delete video blob: ${videoUrl}`, blobError);
      }
    }

    // Update database to set video_url to NULL (keeps thumbnail_image_url intact)
    await sql`UPDATE home_video SET video_url = NULL, updated_at = CURRENT_TIMESTAMP WHERE id = ${videoId}`;
    
    return NextResponse.json({
      success: true,
      message: 'Video deleted successfully'
    });
  } catch (error) {
    console.error('Error in DELETE /api/admin/home/video:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete home video' },
      { status: 500 }
    );
  }
}
