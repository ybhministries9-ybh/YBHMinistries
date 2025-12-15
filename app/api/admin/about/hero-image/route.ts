import { NextRequest, NextResponse } from 'next/server';
import { getActiveAboutHeroImage, upsertAboutHeroImage, deleteAboutHeroImage } from '@/lib/db';
import { sql } from '@vercel/postgres';
import { verifySession, getActorName } from '@/lib/sessions';
import { uploadBuffer, parseKeyFromUrl, deleteObject, PRIVATE_BUCKET, getPresignedGetUrl, headObject, getPublicUrl } from '@/lib/r2';
import { del } from '@/lib/vercelBlob';

/**
 * GET /api/admin/about/hero-image
 * Fetch active about hero image
 */
export async function GET(request: NextRequest) {
  try {
    const heroImage = await getActiveAboutHeroImage();
    if (!heroImage) {
      return NextResponse.json({ success: true, data: null });
    }

    // presign R2 URLs for admin preview. If presign fails, fall back to a public URL
    // via `getPublicUrl()` (if configured). This avoids returning `r2://` URLs
    // to the browser which cause unknown URL scheme errors.
    const toPresigned = async (val?: string | null) => {
      if (!val) return null;
      if (val.startsWith('http://') || val.startsWith('https://')) return val;
      const parsed = parseKeyFromUrl(val);
      if (parsed?.key) {
        try {
          const head = await headObject(parsed.key, parsed.bucket || PRIVATE_BUCKET);
          if (!head) return null;
          const presigned = await getPresignedGetUrl(parsed.key, 3600, parsed.bucket || PRIVATE_BUCKET);
          return presigned;
        } catch (e) {
          console.warn('headObject/presign failed for', val, e);
          // Try a public URL base (NEXT_PUBLIC_R2_PUBLIC_URL) if available
          try {
            const pub = getPublicUrl(parsed.key, parsed.bucket || PRIVATE_BUCKET);
            // If getPublicUrl returns an r2:// reference then treat as unavailable
            if (pub && !pub.startsWith('r2://')) return pub;
          } catch (err) {
            // ignore
          }
          return null;
        }
      }
      return null;
    };

    const presigned = await toPresigned(heroImage.image_url as string | null);
    if (presigned) heroImage.image_url = presigned as any;

    return NextResponse.json({ success: true, data: heroImage });
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

      // Upload to R2 (private) and get a reference URL
      const sanitized = file.name ? file.name.replace(/[^a-zA-Z0-9.\-_/]/g, '_') : `hero-${Date.now()}`;
      const key = `about/hero/${Date.now()}-${sanitized}`;
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer as ArrayBuffer);
      await uploadBuffer(key, buffer, file.type || 'application/octet-stream', PRIVATE_BUCKET);
      const publicUrl = `r2://${PRIVATE_BUCKET}/${key}`;

      // Delete old image from Vercel Blob or R2 if exists
      if (existingImage?.image_url) {
        if (existingImage.image_url.includes('blob.vercel-storage.com')) {
          try { await del(existingImage.image_url); } catch (e) { console.error(`Failed to delete old image blob: ${existingImage.image_url}`, e); }
        } else {
          const parsed = parseKeyFromUrl(existingImage.image_url);
          if (parsed?.key) {
            try { await deleteObject(parsed.key, parsed.bucket || undefined); } catch (e) { console.error('Failed to delete old image in R2', parsed, e); }
          }
        }
      }

      // Save to database (store r2:// reference)
      const heroImage = await upsertAboutHeroImage(
        publicUrl,
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

      // Delete old image from Vercel Blob or R2 if it's different
      if (existingImage?.image_url && existingImage.image_url !== image_url) {
        if (existingImage.image_url.includes('blob.vercel-storage.com')) {
          try { await del(existingImage.image_url); } catch (e) { console.error(`Failed to delete old image blob: ${existingImage.image_url}`, e); }
        } else {
          const parsed = parseKeyFromUrl(existingImage.image_url);
          if (parsed?.key) {
            try { await deleteObject(parsed.key, parsed.bucket || undefined); } catch (e) { console.error('Failed to delete old image in R2', parsed, e); }
          }
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

    // Delete from Vercel Blob or R2
    if (imageUrl) {
      if (imageUrl.includes('blob.vercel-storage.com')) {
        try { await del(imageUrl); } catch (blobError) { console.error(`Failed to delete image blob: ${imageUrl}`, blobError); }
      } else {
        const parsed = parseKeyFromUrl(imageUrl);
        if (parsed?.key) {
          try { await deleteObject(parsed.key, parsed.bucket || undefined); } catch (r2err) { console.error('Failed to delete image from R2', parsed, r2err); }
        }
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
