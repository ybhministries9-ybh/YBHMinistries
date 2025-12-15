import { NextRequest, NextResponse } from 'next/server';
import { del } from '@vercel/blob';
import { uploadBuffer, getPublicUrl, parseKeyFromUrl, deleteObject, PRIVATE_BUCKET, getPresignedGetUrl } from '@/lib/r2';
import { createHeroImage, updateHeroImage, deleteHeroImage, deleteHeroImages, reorderHeroImages, getActiveHeroImages } from '@/lib/db';
import { sql } from '@vercel/postgres';
import { verifySession, getActorName } from '@/lib/sessions';
import { withApiGuard, streamUploadGuard, safeParseJson, ApiError } from '@/lib/apiGuard';
import processHeroImageById, { processBufferToVariants } from '@/lib/imageProcessor';

/**
 * GET /api/admin/home/hero-images
 * Fetch all hero images (including inactive ones for admin)
 */
export async function GET(request: NextRequest) {
  try {
    // For admin, we want to fetch images for management. Include presigned URLs so the admin UI can preview private objects.
    const images = await getActiveHeroImages(); // TODO: Create getAllHeroImages() for admin if needed

    const enhanced = await Promise.all(images.map(async (img: any) => {
      const image_url = img.image_url || img.url || '';
      const parsed = parseKeyFromUrl(image_url);
      if (parsed && parsed.key) {
        try {
          const bucket = parsed.bucket || PRIVATE_BUCKET;
          const signedUrl = await getPresignedGetUrl(parsed.key, 3600, bucket || undefined);
          return { ...img, signedUrl };
        } catch (err) {
          console.error('Failed to create presigned URL for admin image preview', parsed, err);
          return { ...img };
        }
      }
      return { ...img };
    }));

    return NextResponse.json({
      success: true,
      data: enhanced,
      count: enhanced.length,
    });
  } catch (error: any) {
    console.error('Error fetching hero images:', error);
    const errorMessage = error?.message || 'Failed to fetch hero images';
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
 * POST /api/admin/home/hero-images
 * Upload new hero image(s)
 */
export const POST = withApiGuard(async (request: NextRequest) => {
  // Enforce upload limits for hero images and prevent slow parsing
  await streamUploadGuard(request, 5_000_000);
  const parsePromise = request.formData();
  const timeout = new Promise((_, rej) => setTimeout(() => rej(new ApiError(408, 'Request timeout')), 20_000));
  const formData = await Promise.race([parsePromise, timeout]) as FormData;
  const files = formData.getAll('files') as File[];
  // verify session and resolve actor
  const auth = request.headers.get('authorization') || '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : auth || null;
  const session = await verifySession(token);
  if (!session) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  const createdBy = await getActorName(token);

  if (!files || files.length === 0) {
    return NextResponse.json({ success: false, error: 'No files provided' }, { status: 400 });
  }

  const uploadedImages = [];

  for (const file of files) {
    // Upload to Cloudflare R2 using server-side helper
    const originalName = file.name || `upload-${Date.now()}`;
    const sanitized = originalName.replace(/[^a-zA-Z0-9.\-_/]/g, '_');
    const baseKey = `home/hero/${Date.now()}-${sanitized}`;

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Convert uploaded image to WebP (resize to sensible max width) and upload as the canonical image
    try {
      const webpBuffer = await (await import('sharp')).default(buffer).resize({ width: 2000, withoutEnlargement: true }).webp({ quality: 80 }).toBuffer();
      const webpKey = `${baseKey}.webp`;
      await uploadBuffer(webpKey, webpBuffer, 'image/webp', PRIVATE_BUCKET, 'public, max-age=31536000, immutable');
      const storageRef = `r2://${PRIVATE_BUCKET}/${webpKey}`;

      // Save to database using internal r2:// reference
      const heroImage = await createHeroImage(storageRef, undefined, createdBy);

      // Generate medium + thumb variants synchronously (webp) and store refs in DB
      try {
        const { thumbRef, mediumRef } = await processBufferToVariants(buffer, 'home/hero', PRIVATE_BUCKET);
        try {
          await sql.query(`UPDATE home_hero_images SET thumbnail_url = $1, medium_url = $2, updated_at = CURRENT_TIMESTAMP WHERE id = $3`, [thumbRef, mediumRef, heroImage.id]);
        } catch (updErr) {
          console.error('Failed to update hero image with variant refs', heroImage.id, updErr);
        }
      } catch (variantErr) {
        console.error('Failed to create medium/thumb variants', variantErr);
      }

      uploadedImages.push(heroImage);
    } catch (convErr) {
      console.error('Failed to convert/upload webp original for', sanitized, convErr);
      // Fallback: upload original file as before so admin can still use it
      const key = `${baseKey}${file.name?.includes('.') ? '' : ''}`;
      await uploadBuffer(key, buffer, file.type || 'application/octet-stream', PRIVATE_BUCKET);
      const storageRef = `r2://${PRIVATE_BUCKET}/${key}`;
      const heroImage = await createHeroImage(storageRef, undefined, createdBy);
      // enqueue older processing path for later
      try {
        const insertSql = `INSERT INTO image_processing_queue (hero_image_id, r2_bucket, r2_key, status) VALUES ($1, $2, $3, 'pending')`;
        await sql.query(insertSql, [heroImage.id, PRIVATE_BUCKET, key]);
      } catch (qerr) {
        console.error('Failed to enqueue image processing for', heroImage.id, qerr);
      }
      uploadedImages.push(heroImage);
    }
  }

  return NextResponse.json({
    success: true,
    data: uploadedImages,
    count: uploadedImages.length
  });
});

/**
 * PATCH /api/admin/home/hero-images
 * Update hero image or reorder images
 */
export async function PATCH(request: NextRequest) {
  try {
    const body = await safeParseJson(request, 200 * 1024);
    
    // Handle reordering
    if (body.action === 'reorder' && body.images) {
      // Extract IDs from the images array
      const imageIds = body.images.map((img: any) => img.id);
      await reorderHeroImages(imageIds);
      return NextResponse.json({
        success: true,
        message: 'Images reordered successfully'
      });
    }
    
    // Handle update
    if (body.id) {
      const { id, ...updates } = body;
      // verify session and resolve actor for update
      const auth = request.headers.get('authorization') || '';
      const token = auth.startsWith('Bearer ') ? auth.slice(7) : auth || null;
      const session = await verifySession(token);
      if (!session) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
      const actor = await getActorName(token);

      // attach updated_by
      const updatedImage = await updateHeroImage(id, { ...updates, updated_by: actor });
      return NextResponse.json({
        success: true,
        data: updatedImage
      });
    }

    return NextResponse.json(
      { success: false, error: 'Invalid request' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Error in PATCH /api/admin/home/hero-images:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update hero images' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/admin/home/hero-images
 * Delete hero image(s) - supports single or bulk delete
 */
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const ids = searchParams.get('ids');

    // Bulk delete
    if (ids) {
      const imageIds = ids.split(',').map(id => parseInt(id.trim())).filter(id => !isNaN(id));
      
      if (imageIds.length === 0) {
        return NextResponse.json(
          { success: false, error: 'No valid image IDs provided' },
          { status: 400 }
        );
      }

      // Fetch image, thumbnail, and medium URLs before deleting from database
      const placeholders = imageIds.map((_, i) => `$${i + 1}`).join(', ');
      const query = `SELECT id, image_url, thumbnail_url, medium_url FROM home_hero_images WHERE id IN (${placeholders})`;
      const result = await sql.query(query, imageIds);
      const rows = result.rows;

      const blobUrls = rows.map((row: any) => ({
        id: row.id,
        image_url: row.image_url,
        thumbnail_url: row.thumbnail_url,
        medium_url: row.medium_url,
      }));

      // verify session for delete
      const auth = request.headers.get('authorization') || '';
      const token = auth.startsWith('Bearer ') ? auth.slice(7) : auth || null;
      const session = await verifySession(token);
      if (!session) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });

      // Delete from database
      await deleteHeroImages(imageIds);
      // Also remove any queued processing entries for these hero images
      try {
        const delPlaceholders = imageIds.map((_, i) => `$${i + 1}`).join(', ');
        await sql.query(`DELETE FROM image_processing_queue WHERE hero_image_id IN (${delPlaceholders})`, imageIds);
      } catch (queueDelErr) {
        console.error('Failed to delete queue rows for hero images', imageIds, queueDelErr);
      }

      // Delete from Vercel Blob storage (parallel for better performance)
      // Delete storage objects for original, thumbnail and medium
      const deletions = blobUrls.flatMap((row) => {
        const urls = [row.image_url, row.thumbnail_url, row.medium_url].filter(Boolean);
        return urls.map(async (url: string) => {
          try {
            if (url.includes('blob.vercel-storage.com')) {
              return del(url).catch(err => { console.error('Failed deleting vercel blob', url, err); return null; });
            }
            const parsed = parseKeyFromUrl(url);
            if (parsed && parsed.key) {
              return deleteObject(parsed.key, parsed.bucket || undefined).catch(err => { console.error('Failed deleting r2 object', parsed, err); return null; });
            }
            return null;
          } catch (err) {
            console.error('Error deleting media url', url, err);
            return null;
          }
        });
      });

      await Promise.all(deletions);

      return NextResponse.json({
        success: true,
        message: `${imageIds.length} image(s) deleted successfully`
      });
    }
    
    // Single delete
    if (id) {
      const imageId = parseInt(id);
      
      // Fetch image, thumbnail, and medium URLs before deleting from database
      const { rows } = await sql`SELECT id, image_url, thumbnail_url, medium_url FROM home_hero_images WHERE id = ${imageId}`;
      const row = rows[0] || {};
      const blobUrl = row.image_url;
      const thumbUrl = row.thumbnail_url;
      const mediumUrl = row.medium_url;

      // verify session for delete
      const auth = request.headers.get('authorization') || '';
      const token = auth.startsWith('Bearer ') ? auth.slice(7) : auth || null;
      const session = await verifySession(token);
      if (!session) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });

      // Delete from database
      await deleteHeroImage(imageId);
      // Delete any queue rows for this hero
      try {
        await sql`DELETE FROM image_processing_queue WHERE hero_image_id = ${imageId}`;
      } catch (qe) {
        console.error('Failed to delete queue rows for hero', imageId, qe);
      }

      // Delete from storage: handle Vercel blobs and R2 URLs
      // Delete all known URLs (original, thumbnail, medium)
      const urlsToDelete = [blobUrl, thumbUrl, mediumUrl].filter(Boolean);
      for (const url of urlsToDelete) {
        try {
          if (url.includes('blob.vercel-storage.com')) {
            await del(url).catch(err => console.error('Failed deleting vercel blob', url, err));
          } else {
            const parsed = parseKeyFromUrl(url);
            if (parsed && parsed.key) await deleteObject(parsed.key, parsed.bucket || undefined).catch(err => console.error('Failed deleting r2 object', parsed, err));
          }
        } catch (err) {
          console.error('Failed deleting media during single delete', url, err);
        }
      }

      return NextResponse.json({
        success: true,
        message: 'Image deleted successfully'
      });
    }

    return NextResponse.json(
      { success: false, error: 'Image ID(s) required' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Error in DELETE /api/admin/home/hero-images:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete hero image(s)' },
      { status: 500 }
    );
  }
}
