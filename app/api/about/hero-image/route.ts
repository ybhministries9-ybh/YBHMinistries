import { NextRequest, NextResponse } from 'next/server';
import { getActiveAboutHeroImage } from '@/lib/db';
import { parseKeyFromUrl, getPresignedGetUrl, headObject, getPublicUrl } from '@/lib/r2';

const FALLBACK_IMAGE_URL = 'https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/defaults/about-default.jpg';

/**
 * GET /api/about/hero-image
 * Fetch active about hero image for public display
 */
export async function GET(request: NextRequest) {
  try {
    const heroImage = await getActiveAboutHeroImage();
    
    // If no image found in database, return fallback URL
    if (!heroImage) {
      return NextResponse.json({
        success: true,
        data: {
          image_url: FALLBACK_IMAGE_URL,
          is_fallback: true
        },
      });
    }

    // Convert R2 references to presigned URLs when possible. If presign fails,
    // attempt to construct a public URL using `NEXT_PUBLIC_R2_PUBLIC_URL` via
    // `getPublicUrl()` to avoid returning `r2://` to the client.
    const toAccessible = async (val?: string | null) => {
      if (!val) return null;
      if (val.startsWith('http://') || val.startsWith('https://')) return val;
      const parsed = parseKeyFromUrl(val);
      if (parsed?.key) {
        try {
          const head = await headObject(parsed.key, parsed.bucket || undefined);
          if (!head) return null;
          const url = await getPresignedGetUrl(parsed.key, 3600, parsed.bucket || undefined);
          return url;
        } catch (e) {
          console.warn('presign failed for', val, e);
          try {
            const pub = getPublicUrl(parsed.key, parsed.bucket || undefined);
            if (pub && !pub.startsWith('r2://')) return pub;
          } catch (err) {
            // ignore
          }
          return null;
        }
      }
      return null;
    };

    const accessible = await toAccessible(heroImage.image_url as string | null);
    return NextResponse.json({
      success: true,
      data: {
        image_url: accessible || heroImage.image_url,
        is_fallback: false
      },
    });
  } catch (error) {
    console.error('Error fetching about hero image:', error);
    
    // On database error, return fallback URL
    return NextResponse.json({
      success: true,
      data: {
        image_url: FALLBACK_IMAGE_URL,
        is_fallback: true,
        error: 'Database connection failed, using fallback image'
      },
    });
  }
}
