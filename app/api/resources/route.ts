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
        // Some deploys/databases may not have migrations applied that add
        // `title`, `date_posted` or `thumbnail_url` to `sermons`. Detect
        // whether the `title` column exists and run a compatible query to
        // avoid SQL errors (500) when those columns are missing.
        try {
          // Check for the presence of the three optional columns we want to use
          const colCheck = await sql`
            SELECT
              EXISTS(SELECT 1 FROM information_schema.columns WHERE table_name = 'sermons' AND column_name = 'title') AS has_title,
              EXISTS(SELECT 1 FROM information_schema.columns WHERE table_name = 'sermons' AND column_name = 'date_posted') AS has_date_posted,
              EXISTS(SELECT 1 FROM information_schema.columns WHERE table_name = 'sermons' AND column_name = 'thumbnail_url') AS has_thumbnail_url,
              EXISTS(SELECT 1 FROM information_schema.columns WHERE table_name = 'sermons' AND column_name = 'display_order') AS has_display_order
          `;

          const row = colCheck.rows?.[0] || {};
          const hasTitle = !!row.has_title;
          const hasDatePosted = !!row.has_date_posted;
          const hasThumbnail = !!row.has_thumbnail_url;
          const hasDisplayOrder = !!row.has_display_order;

          // Select the richest available set of columns without referencing missing ones
          // If the DB has a `display_order` column, prefer ordering by it
          if (hasDisplayOrder) {
            // include display_order in selects where available
            if (hasTitle && hasDatePosted && hasThumbnail) {
              result = await sql`
                SELECT id, youtube_url, title, date_posted, thumbnail_url, display_order, created_at
                FROM sermons
                WHERE published = true
                ORDER BY display_order ASC NULLS LAST, date_posted DESC NULLS LAST, created_at DESC
              `;
            } else if (hasTitle && hasDatePosted) {
              result = await sql`
                SELECT id, youtube_url, title, date_posted, display_order, created_at
                FROM sermons
                WHERE published = true
                ORDER BY display_order ASC NULLS LAST, date_posted DESC NULLS LAST, created_at DESC
              `;
            } else if (hasTitle) {
              result = await sql`
                SELECT id, youtube_url, title, display_order, created_at
                FROM sermons
                WHERE published = true
                ORDER BY display_order ASC NULLS LAST, created_at DESC
              `;
            } else {
              result = await sql`
                SELECT id, youtube_url, display_order, created_at
                FROM sermons
                WHERE published = true
                ORDER BY display_order ASC NULLS LAST, created_at DESC
              `;
            }
          } else {
            // No display_order column — fall back to date-based ordering as before
            if (hasTitle && hasDatePosted && hasThumbnail) {
              result = await sql`
                SELECT id, youtube_url, title, date_posted, thumbnail_url, created_at
                FROM sermons
                WHERE published = true
                ORDER BY date_posted DESC NULLS LAST, created_at DESC
              `;
            } else if (hasTitle && hasDatePosted) {
              result = await sql`
                SELECT id, youtube_url, title, date_posted, created_at
                FROM sermons
                WHERE published = true
                ORDER BY date_posted DESC NULLS LAST, created_at DESC
              `;
            } else if (hasTitle) {
              result = await sql`
                SELECT id, youtube_url, title, created_at
                FROM sermons
                WHERE published = true
                ORDER BY created_at DESC
              `;
            } else {
              // Legacy fallback
              result = await sql`
                SELECT id, youtube_url, created_at
                FROM sermons
                WHERE published = true
                ORDER BY created_at DESC
              `;
            }
          }
        } catch (colErr) {
          // If anything goes wrong checking columns, fall back to the safe query
          console.error('Could not verify sermons columns, using safe fallback.', colErr);
          result = await sql`
            SELECT id, youtube_url, created_at
            FROM sermons
            WHERE published = true
            ORDER BY created_at DESC
          `;
        }
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
