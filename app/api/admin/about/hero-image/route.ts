import { NextRequest, NextResponse } from 'next/server';
import { put, del } from '@vercel/blob';
import { getActiveAboutHeroImage, upsertAboutHeroImage, deleteAboutHeroImage } from '@/lib/db';
import { sql } from '@vercel/postgres';
import { verifySession, getActorName } from '@/lib/sessions';

/**
 * GET /api/admin/about/hero-image
 * Fetch active about hero image
 */
export async function GET(request: NextRequest) {
  try {
    const heroImage = await getActiveAboutHeroImage();
    
    return NextResponse.json({
      success: true,
      data: heroImage,
    });
  } catch (error) {
    console.error('Error fetching about hero image:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch about hero image' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin/about/hero-image
 * Upload new hero image (file or URL)
 */
export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get('content-type');

    // Handle file upload
    if (contentType?.includes('multipart/form-data')) {
      const formData = await request.formData();
      const file = formData.get('file') as File;
      // verify session and resolve actor
      const auth = request.headers.get('authorization') || '';
      const token = auth.startsWith('Bearer ') ? auth.slice(7) : auth || null;
      const session = await verifySession(token);
      if (!session) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
      const createdBy = await getActorName(token);

      if (!file) {
        return NextResponse.json(
          { success: false, error: 'No file provided' },
          { status: 400 }
        );
      }

      // Get existing image for cleanup
      const existingImage = await getActiveAboutHeroImage();

      // Upload to Vercel Blob
      const blob = await put(`about/hero/${Date.now()}-${file.name}`, file, {
        access: 'public',
        addRandomSuffix: true,
      });

      // Delete old image blob if exists
      if (existingImage?.image_url && existingImage.image_url.includes('blob.vercel-storage.com')) {
        try {
          await del(existingImage.image_url);
        } catch (blobError) {
          console.error(`Failed to delete old image blob: ${existingImage.image_url}`, blobError);
        }
      }

      // Save to database
      const heroImage = await upsertAboutHeroImage(
        blob.url,
        createdBy || undefined
      );

      return NextResponse.json({
        success: true,
        data: heroImage,
        message: 'Hero image uploaded successfully'
      });
    }
    
    // Handle URL submission
    else {
      const body = await request.json();
      // verify session and resolve actor
      const auth2 = request.headers.get('authorization') || '';
      const token2 = auth2.startsWith('Bearer ') ? auth2.slice(7) : auth2 || null;
      const session2 = await verifySession(token2);
      if (!session2) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
      const actor = await getActorName(token2);
      const { image_url } = body;

      if (!image_url) {
        return NextResponse.json(
          { success: false, error: 'Image URL is required' },
          { status: 400 }
        );
      }

      // Get existing image for cleanup
      const existingImage = await getActiveAboutHeroImage();

      // Delete old image blob if it's different and from blob storage
      if (existingImage?.image_url && 
          existingImage.image_url !== image_url && 
          existingImage.image_url.includes('blob.vercel-storage.com')) {
        try {
          await del(existingImage.image_url);
        } catch (blobError) {
          console.error(`Failed to delete old image blob: ${existingImage.image_url}`, blobError);
        }
      }

      // Save to database
      const heroImage = await upsertAboutHeroImage(
        image_url,
        actor
      );

      return NextResponse.json({
        success: true,
        data: heroImage,
        message: 'Hero image URL saved successfully'
      });
    }
  } catch (error) {
    console.error('Error in POST /api/admin/about/hero-image:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to upload hero image' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/admin/about/hero-image
 * Delete hero image
 */
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Image ID is required' },
        { status: 400 }
      );
    }

    const imageId = parseInt(id);

    // verify session for delete
    const auth = request.headers.get('authorization') || '';
    const token = auth.startsWith('Bearer ') ? auth.slice(7) : auth || null;
    const session = await verifySession(token);
    if (!session) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });

    // Get image URL before deleting from database
    const { rows } = await sql`
      SELECT image_url 
      FROM about_hero_image 
      WHERE id = ${imageId}
    `;

    const imageUrl = rows[0]?.image_url;

    // Delete from database
    await deleteAboutHeroImage(imageId);

    // Delete from Vercel Blob storage
    if (imageUrl && imageUrl.includes('blob.vercel-storage.com')) {
      try {
        await del(imageUrl);
      } catch (blobError) {
        console.error(`Failed to delete image blob: ${imageUrl}`, blobError);
        // Don't fail the whole operation if blob deletion fails
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Hero image deleted successfully'
    });
  } catch (error) {
    console.error('Error in DELETE /api/admin/about/hero-image:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete hero image' },
      { status: 500 }
    );
  }
}
