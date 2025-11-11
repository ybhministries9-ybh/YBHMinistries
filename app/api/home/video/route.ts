import { NextRequest, NextResponse } from 'next/server';
import { getActiveHomeVideo } from '@/lib/db';

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
    
    return NextResponse.json({
      success: true,
      data: video
    });
  } catch (error) {
    console.error('Error in GET /api/home/video:', error);
    
    // Return fallback video if database fails
    return NextResponse.json({
      success: true,
      data: {
        id: 1,
        title: 'Ministry Video',
        video_url: 'https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Home/Augustine.mp4',
        thumbnail_image_url: 'https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Home/hero/16x9/00.jpg',
        is_active: true
      },
      fallback: true
    });
  }
}
