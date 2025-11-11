import { NextRequest, NextResponse } from 'next/server';
import { getActiveAboutHeroImage } from '@/lib/db';

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

    return NextResponse.json({
      success: true,
      data: {
        image_url: heroImage.image_url,
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
