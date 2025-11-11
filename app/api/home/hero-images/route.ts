import { NextRequest, NextResponse } from 'next/server';
import { getActiveHeroImages } from '@/lib/db';

/**
 * GET /api/home/hero-images
 * Fetch all active hero images
 */
export async function GET(request: NextRequest) {
  try {
    const images = await getActiveHeroImages();
    
    return NextResponse.json({
      success: true,
      data: images,
      count: images.length
    });
  } catch (error) {
    console.error('Error in GET /api/home/hero-images:', error);
    
    // Return fallback images if database fails
    const fallbackImages = [
      "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Home/hero/16x9/00.jpg",
      "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Home/hero/16x9/01.jpg",
      "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Home/hero/16x9/1.jpg",
      "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Home/hero/16x9/10%281%29.jpg",
      "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Home/hero/16x9/10.jpg",
      "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Home/hero/16x9/10a.jpg",
      "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Home/hero/16x9/11.jpg",
      "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Home/hero/16x9/11a.jpg",
      "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Home/hero/16x9/12.jpg",
      "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Home/hero/16x9/13.jpg",
      "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Home/hero/16x9/14.jpg",
      "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Home/hero/16x9/15.jpg",
      "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Home/hero/16x9/16.jpg",
      "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Home/hero/16x9/17.jpg",
      "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Home/hero/16x9/18.jpg",
      "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Home/hero/16x9/2.jpg",
      "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Home/hero/16x9/3.jpg",
      "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Home/hero/16x9/4.jpg",
      "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Home/hero/16x9/5.jpg",
      "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Home/hero/16x9/6.jpg",
      "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Home/hero/16x9/7.jpg",
      "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Home/hero/16x9/8.jpg",
      "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Home/hero/16x9/9.jpg"
    ];
    
    return NextResponse.json({
      success: true,
      data: fallbackImages.map((url, index) => ({
        id: index + 1,
        image_url: url,
        display_order: index + 1,
        is_active: true
      })),
      count: fallbackImages.length,
      fallback: true
    });
  }
}
