import { NextRequest, NextResponse } from 'next/server';
import { getActiveHomeVideo } from '@/lib/db';
import { parseKeyFromUrl, getPresignedGetUrl, headObject, getPublicUrl } from '@/lib/r2';

/**
 * GET /api/home/video
 * Fetch active home video
 */
export async function GET(request: NextRequest) {
  try {
    const video = await getActiveHomeVideo();
    
    if (!video) {
      // Return null data when no video in database
      return NextResponse.json({
        success: true,
        data: null,
        message: 'No video available'
      });
    }
    // Convert any R2 references to accessible URLs for public site display
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
          return null;
        }
      }
      return null;
    };

    const accessibleVideo = await toAccessible(video.video_url as string | null);
    if (accessibleVideo) video.video_url = accessibleVideo as any;

    const accessibleThumb = await toAccessible(video.thumbnail_image_url as string | null);
    if (accessibleThumb) video.thumbnail_image_url = accessibleThumb as any;

    // Cache public response for a short while to improve page load and SEO (stale-while-revalidate)
    return NextResponse.json(
      { success: true, data: video },
      {
        headers: {
          'Cache-Control': 'public, max-age=300, s-maxage=600, stale-while-revalidate=86400'
        }
      }
    );
  } catch (error) {
    console.error('Error in GET /api/home/video:', error);
    
    // Return fallback video if database fails
    return NextResponse.json(
      {
        success: true,
        data: {
          id: 1,
          title: 'Ministry Video',
          video_url: 'https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Home/Augustine.mp4',
          thumbnail_image_url: 'https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Home/hero/16x9/00.jpg',
          is_active: true
        },
        fallback: true
      },
      {
        headers: {
          // Short caching for fallback response as well
          'Cache-Control': 'public, max-age=60, s-maxage=120'
        }
      }
    );
  }
}
