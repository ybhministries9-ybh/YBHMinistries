import { NextRequest, NextResponse } from 'next/server';
import { getGalleryItemsByCategory, getAllGalleryItems } from '@/lib/db';

/**
 * GET /api/gallery
 * Fetch active gallery items for public display
 * Query params: ?category=guinness-events (optional)
 * Returns items grouped by media_type if no category specified
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    
    let items;
    if (category) {
      // Get active items for specific category
      items = await getGalleryItemsByCategory(category);
    } else {
      // Get all active items
      items = await getAllGalleryItems();
    }
    
    // Separate images and videos
    const imagesRaw = items
      .filter(item => item.media_type === 'image')
      .map(item => ({ id: item.id, url: item.url, thumbnail_url: item.thumbnail_url || null, medium_url: item.medium_url || null }));

    // Convert any r2:// or R2 URLs into short-lived HTTPS presigned URLs so the public site can load private objects.
    let images = imagesRaw;
    try {
      const { parseKeyFromUrl, getPresignedGetUrl } = await import('@/lib/r2');
      images = await Promise.all(imagesRaw.map(async (it) => {
        const out = { ...it } as any;
        try {
          if (out.thumbnail_url && out.thumbnail_url.startsWith('r2://')) {
            const parsed = parseKeyFromUrl(out.thumbnail_url);
            if (parsed?.key) out.thumbnail_url = await getPresignedGetUrl(parsed.key, 300, parsed.bucket || undefined);
          } else if (out.thumbnail_url && (out.thumbnail_url.includes('.r2.cloudflarestorage.com') || out.thumbnail_url.includes('.r2.dev'))) {
            const parsed = parseKeyFromUrl(out.thumbnail_url);
            if (parsed?.key) out.thumbnail_url = await getPresignedGetUrl(parsed.key, 300, parsed.bucket || undefined);
          }

          if (out.medium_url && out.medium_url.startsWith('r2://')) {
            const parsed2 = parseKeyFromUrl(out.medium_url);
            if (parsed2?.key) out.medium_url = await getPresignedGetUrl(parsed2.key, 300, parsed2.bucket || undefined);
          } else if (out.medium_url && (out.medium_url.includes('.r2.cloudflarestorage.com') || out.medium_url.includes('.r2.dev'))) {
            const parsed2 = parseKeyFromUrl(out.medium_url);
            if (parsed2?.key) out.medium_url = await getPresignedGetUrl(parsed2.key, 300, parsed2.bucket || undefined);
          }

          if (out.url && out.url.startsWith('r2://')) {
            const parsed3 = parseKeyFromUrl(out.url);
            if (parsed3?.key) out.url = await getPresignedGetUrl(parsed3.key, 300, parsed3.bucket || undefined);
          } else if (out.url && (out.url.includes('.r2.cloudflarestorage.com') || out.url.includes('.r2.dev'))) {
            const parsed3 = parseKeyFromUrl(out.url);
            if (parsed3?.key) out.url = await getPresignedGetUrl(parsed3.key, 300, parsed3.bucket || undefined);
          }
        } catch (e) {
          // ignore presign failures and return raw URL
        }
        return out;
      }));
    } catch (e) {
      // If r2 utilities are not available, fall back to raw values
      images = imagesRaw;
    }
    
    const videos = items
      .filter(item => item.media_type === 'video')
      .map(item => ({
        id: item.id.toString(),
        youtubeUrl: item.url,
        title: item.title || 'Untitled Video',
        description: '',
        date: item.date || '',
      }));
    
    return NextResponse.json({
      success: true,
      data: {
        images,
        videos,
      },
      count: items.length,
    });
  } catch (error: any) {
    console.error('Error fetching gallery items:', error);
    const errorMessage = error?.message || 'Failed to fetch gallery items';
    
    return NextResponse.json(
      { 
        success: false, 
        error: errorMessage,
        // Return empty arrays as fallback
        data: {
          images: [],
          videos: [],
        }
      },
      { status: 500 }
    );
  }
}
