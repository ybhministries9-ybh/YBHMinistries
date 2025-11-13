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
    const images = items
      .filter(item => item.media_type === 'image')
      .map(item => ({ id: item.id, url: item.url }));
    
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
