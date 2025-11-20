import { NextRequest, NextResponse } from 'next/server';
import { del } from '@vercel/blob';
import { uploadBuffer, parseKeyFromUrl, deleteObject, PRIVATE_BUCKET, getPresignedGetUrl, headObject } from '@/lib/r2';
import { upsertHomeVideo, getActiveHomeVideo } from '@/lib/db';
import { sql } from '@vercel/postgres';
import { verifySession, getActorName, resolveSessionAndActorFromAuthHeader } from '@/lib/sessions';

/**
 * GET /api/admin/home/video
 * Fetch current home video
 */
export async function GET(request: NextRequest) {
  try {
    const video = await getActiveHomeVideo();

    // If stored values point to R2 (r2:// or public R2 URL), convert to presigned GET URLs for admin preview
    if (video) {
      try {
        // helper to convert a stored url/ref to presigned URL when possible
        const toPresigned = async (val?: string | null) => {
          if (!val) return null;
          if (val.startsWith('http://') || val.startsWith('https://')) return val;
          const parsed = parseKeyFromUrl(val);
          if (parsed?.key) {
            // check existence before generating presigned URL
            try {
              const head = await headObject(parsed.key, parsed.bucket || PRIVATE_BUCKET);
              if (!head) return null;
              const presigned = await getPresignedGetUrl(parsed.key, 3600, parsed.bucket || PRIVATE_BUCKET);
              return presigned;
            } catch (e) {
              console.warn('headObject/presign failed for', val, e);
              return null;
            }
          }
          return null;
        };

        const presignedThumb = await toPresigned(video.thumbnail_image_url as string | null);
        const presignedVideo = await toPresigned(video.video_url as string | null);

        if (presignedVideo) video.video_url = presignedVideo as any;
        if (presignedThumb) video.thumbnail_image_url = presignedThumb as any;
      } catch (e) {
        console.error('Error generating presigned URLs for admin video preview', e);
      }
    }

    return NextResponse.json({ success: true, data: video });
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
      // verify session and resolve actor
      const resolved = await resolveSessionAndActorFromAuthHeader(request.headers.get('authorization') || '');
      if (!resolved) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
      const { session, actor: resolvedName } = resolved;
      
      if (!file) {
        return NextResponse.json(
          { success: false, error: 'No video file provided' },
          { status: 400 }
        );
      }

      // Get existing video record
      const existingVideo = await getActiveHomeVideo();

      // Upload video to private R2 bucket
      let videoStorageRef: string;
      try {
        const originalName = file.name || `video-${Date.now()}`;
        const sanitized = originalName.replace(/[^a-zA-Z0-9.\-_/]/g, '_');
        const key = `home/video/${Date.now()}-${sanitized}`;
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer as ArrayBuffer);
        await uploadBuffer(key, buffer, file.type || 'application/octet-stream', PRIVATE_BUCKET);
        videoStorageRef = `r2://${PRIVATE_BUCKET}/${key}`;
      } catch (uploadError) {
        console.error('Error uploading video to R2:', uploadError);
        return NextResponse.json(
          { success: false, error: 'Failed to upload video file. The file may be too large or there was a network issue.' },
          { status: 500 }
        );
      }

      // Upload thumbnail original only (do not generate medium/thumb variants)
      let thumbnailUrl: string | undefined;
      if (thumbnailFile) {
        try {
          const tname = thumbnailFile.name || `thumb-${Date.now()}`;
          const sanitizedT = tname.replace(/[^a-zA-Z0-9.\-_/]/g, '_');
          const origKey = `home/video/thumbnails/orig/${Date.now()}-${sanitizedT}`;
          const tbuf = Buffer.from(await thumbnailFile.arrayBuffer());
          // Upload original
          await uploadBuffer(origKey, tbuf, thumbnailFile.type || 'application/octet-stream', PRIVATE_BUCKET);
          thumbnailUrl = `r2://${PRIVATE_BUCKET}/${origKey}`;

          // Delete old thumbnail from storage if replacing
          if (existingVideo?.thumbnail_image_url) {
            const old = existingVideo.thumbnail_image_url;
            if (old.includes('blob.vercel-storage.com')) {
              try { await del(old); } catch (e) { console.error('Failed to delete old thumbnail blob', old, e); }
            } else {
              const parsed = parseKeyFromUrl(old);
              if (parsed?.key) {
                try { await deleteObject(parsed.key, parsed.bucket || undefined); } catch (e) { console.error('Failed to delete old thumbnail in R2', parsed, e); }
              }
            }
          }
        } catch (thumbError) {
          console.error('Error uploading thumbnail to R2:', thumbError);
        }
      } else if (existingVideo?.thumbnail_image_url) {
        thumbnailUrl = existingVideo.thumbnail_image_url;
      }

      // Delete old video from blob or R2 storage after successful upload
      if (existingVideo?.video_url) {
        const oldVideo = existingVideo.video_url;
        if (oldVideo.includes('blob.vercel-storage.com')) {
          try { await del(oldVideo); } catch (blobError) { console.error(`Failed to delete old video blob: ${oldVideo}`, blobError); }
        } else {
          const parsed = parseKeyFromUrl(oldVideo);
          if (parsed?.key) {
            try { await deleteObject(parsed.key, parsed.bucket || undefined); } catch (delErr) { console.error('Failed to delete old R2 video', parsed, delErr); }
          }
        }
      }

      // Update or insert video record in database
      let homeVideo;
      if (existingVideo) {
        // Update existing record (store only thumbnail_image_url)
        await sql`
          UPDATE home_video 
            SET video_url = ${videoStorageRef}, 
              thumbnail_image_url = ${thumbnailUrl || null},
              updated_at = CURRENT_TIMESTAMP,
              updated_by = ${resolvedName || null}
          WHERE id = ${existingVideo.id}
        `;
        
        // Fetch updated record
        const result = await sql`SELECT * FROM home_video WHERE id = ${existingVideo.id}`;
        homeVideo = result.rows[0];
      } else {
        // Insert new record (pass resolved actor)
        homeVideo = await upsertHomeVideo(
          videoStorageRef,
          thumbnailUrl,
          resolvedName
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
      // verify session and resolve actor
      const resolved = await resolveSessionAndActorFromAuthHeader(request.headers.get('authorization') || '');
      if (!resolved) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
      const { session: _session2, actor } = resolved;

      const { video_url, thumbnail_image_url } = body;

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
              updated_by = ${actor || null}
          WHERE id = ${existingVideo.id}
        `;
        
        // Fetch updated record
        const result = await sql`SELECT * FROM home_video WHERE id = ${existingVideo.id}`;
        homeVideo = result.rows[0];
      } else {
        // Insert new record (pass resolved actor)
        homeVideo = await upsertHomeVideo(
          video_url,
          finalThumbnailUrl,
          actor
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

    // verify session for delete
    const resolved = await resolveSessionAndActorFromAuthHeader(request.headers.get('authorization') || '');
    if (!resolved) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    const { session: _session, actor } = resolved;

    // Fetch video URL before updating database
    const { rows } = await sql`
      SELECT video_url 
      FROM home_video 
      WHERE id = ${videoId}
    `;

    const videoUrl = rows[0]?.video_url;

    // Delete video from Vercel Blob storage first
    if (videoUrl) {
      if (videoUrl.includes('blob.vercel-storage.com')) {
        try {
          await del(videoUrl);
        } catch (blobError) {
          console.error(`Failed to delete video blob: ${videoUrl}`, blobError);
        }
      } else {
        // Try to parse and delete from R2 if it points to an r2:// reference or r2 public URL
        try {
          const parsed = parseKeyFromUrl(videoUrl);
          if (parsed?.key) {
            try {
              await deleteObject(parsed.key, parsed.bucket || undefined);
            } catch (r2Err) {
              console.error('Failed to delete video from R2', parsed, r2Err);
            }
          }
        } catch (e) {
          console.error('Failed to parse video URL for deletion', videoUrl, e);
        }
      }
    }

    // Update database to set video_url to NULL (keeps thumbnail_image_url intact)
    await sql`
      UPDATE home_video
      SET video_url = NULL,
          updated_at = CURRENT_TIMESTAMP,
          updated_by = ${actor || null}
      WHERE id = ${videoId}
    `;
    
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
