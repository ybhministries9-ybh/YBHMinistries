import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export const dynamic = 'force-dynamic';
export const revalidate = 60; // Cache for 60 seconds

// GET: Fetch all published resources
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type'); // books, worship, sermons, bibleStudies

    if (!type) {
      return NextResponse.json(
        { success: false, error: 'Type parameter is required' },
        { status: 400 }
      );
    }

    let result;

    switch (type) {
      case 'books':
        result = await sql`
          SELECT id, title, author, price, pages, language,
                 cover_image, additional_images, description,
                 publish_date, created_at
          FROM books
          WHERE published = true
          ORDER BY created_at DESC
        `;
        break;

      case 'worship':
        result = await sql`
          SELECT id, youtube_url, title, date_posted, display_order, created_at
          FROM worship
          WHERE published = true
          ORDER BY date_posted DESC NULLS LAST, created_at DESC
        `;
        break;

      case 'sermons':
        result = await sql`
          SELECT id, youtube_url, created_at
          FROM sermons
          WHERE published = true
          ORDER BY created_at DESC
        `;
        break;

      case 'bibleStudies':
        result = await sql`
          SELECT id, title, author, pages, study_date as date,
                 file_type, file_url, thumbnail_url, description, created_at
          FROM bible_studies
          WHERE published = true
          ORDER BY study_date DESC, created_at DESC
        `;
        break;

      default:
        return NextResponse.json(
          { success: false, error: 'Invalid type parameter' },
          { status: 400 }
        );
    }

    return NextResponse.json(
      {
        success: true,
        data: result.rows,
        count: result.rows.length
      },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120',
        },
      }
    );
  } catch (error) {
    console.error('Error fetching resources:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch resources' },
      { status: 500 }
    );
  }
}
