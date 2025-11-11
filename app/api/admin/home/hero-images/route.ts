import { NextRequest, NextResponse } from 'next/server';
import { put, del } from '@vercel/blob';
import { createHeroImage, updateHeroImage, deleteHeroImage, deleteHeroImages, reorderHeroImages, getActiveHeroImages } from '@/lib/db';
import { sql } from '@vercel/postgres';

/**
 * GET /api/admin/home/hero-images
 * Fetch all hero images (including inactive ones for admin)
 */
export async function GET(request: NextRequest) {
  try {
    // For admin, we want to fetch ALL images, not just active ones
    // Modify the query to get all images
    const images = await getActiveHeroImages(); // TODO: Create getAllHeroImages() for admin
    
    return NextResponse.json({
      success: true,
      data: images,
      count: images.length,
    });
  } catch (error) {
    console.error('Error fetching hero images:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch hero images' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin/home/hero-images
 * Upload new hero image(s)
 */
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const files = formData.getAll('files') as File[];
    const createdBy = formData.get('created_by') as string | null;
    
    if (!files || files.length === 0) {
      return NextResponse.json(
        { success: false, error: 'No files provided' },
        { status: 400 }
      );
    }

    const uploadedImages = [];

    for (const file of files) {
      // Upload to Vercel Blob
      const blob = await put(`home/hero/${Date.now()}-${file.name}`, file, {
        access: 'public',
        addRandomSuffix: true,
      });

      // Save to database
      const heroImage = await createHeroImage(
        blob.url,
        undefined,
        createdBy
      );

      uploadedImages.push(heroImage);
    }

    return NextResponse.json({
      success: true,
      data: uploadedImages,
      count: uploadedImages.length
    });
  } catch (error) {
    console.error('Error in POST /api/admin/home/hero-images:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to upload hero images' },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/admin/home/hero-images
 * Update hero image or reorder images
 */
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    
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
      const updatedImage = await updateHeroImage(id, updates);
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

      // Fetch blob URLs before deleting from database
      const placeholders = imageIds.map((_, i) => `$${i + 1}`).join(', ');
      const query = `SELECT image_url FROM home_hero_images WHERE id IN (${placeholders})`;
      const result = await sql.query(query, imageIds);
      const blobUrls = result.rows.map((row: any) => row.image_url);

      // Delete from database
      await deleteHeroImages(imageIds);

      // Delete from Vercel Blob storage (parallel for better performance)
      const blobDeletions = blobUrls
        .filter(url => url && url.includes('blob.vercel-storage.com'))
        .map(url => 
          del(url).catch(blobError => {
            console.error(`Failed to delete blob: ${url}`, blobError);
            return null; // Don't fail the whole operation
          })
        );
      
      await Promise.all(blobDeletions);

      return NextResponse.json({
        success: true,
        message: `${imageIds.length} image(s) deleted successfully`
      });
    }
    
    // Single delete
    if (id) {
      const imageId = parseInt(id);
      
      // Fetch blob URL before deleting from database
      const { rows } = await sql`SELECT image_url FROM home_hero_images WHERE id = ${imageId}`;
      const blobUrl = rows[0]?.image_url;

      // Delete from database
      await deleteHeroImage(imageId);

      // Delete from Vercel Blob storage
      if (blobUrl && blobUrl.includes('blob.vercel-storage.com')) {
        try {
          await del(blobUrl);
        } catch (blobError) {
          console.error(`Failed to delete blob: ${blobUrl}`, blobError);
          // Don't fail the whole operation if blob deletion fails
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
