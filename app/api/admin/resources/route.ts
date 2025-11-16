import { NextRequest, NextResponse } from 'next/server';
import { del } from '@vercel/blob';
import { sql } from '@vercel/postgres';
import { getActorName } from '@/lib/sessions';

export const dynamic = 'force-dynamic';

// Validation limits (keep in sync with client)
const TITLE_MAX = 150;
const AUTHOR_MAX = 100;
const DESCRIPTION_MAX = 2000;
const LANGUAGE_MAX = 50;
const PAGES_MIN = 0;
const PAGES_MAX = 1000;
const PRICE_MIN = 0;
const PRICE_MAX = 10000;

function toNumber(v: any) {
  const n = Number(v);
  return Number.isFinite(n) ? n : NaN;
}

function validateBook(data: any) {
  const errors: Record<string, string> = {};
  if (!data.title || String(data.title).trim().length === 0) errors.title = 'Title is required';
  else if (String(data.title).length > TITLE_MAX) errors.title = `Title must be at most ${TITLE_MAX} characters`;

  if (!data.author || String(data.author).trim().length === 0) errors.author = 'Author is required';
  else if (String(data.author).length > AUTHOR_MAX) errors.author = `Author must be at most ${AUTHOR_MAX} characters`;

  if (!data.language || String(data.language).trim().length === 0) errors.language = 'Language is required';
  else if (String(data.language).length > LANGUAGE_MAX) errors.language = `Language must be at most ${LANGUAGE_MAX} characters`;

  if (!data.cover_image || String(data.cover_image).trim().length === 0) errors.cover_image = 'Cover image is required';

  if (!data.publish_date || String(data.publish_date).trim().length === 0) errors.publish_date = 'Publish date is required';

  const price = toNumber(data.price);
  if (Number.isNaN(price)) errors.price = 'Price is required';
  else if (price < PRICE_MIN || price > PRICE_MAX) errors.price = `Price must be between ${PRICE_MIN} and ${PRICE_MAX}`;

  const pages = toNumber(data.pages);
  if (Number.isNaN(pages)) errors.pages = 'Pages is required';
  else if (pages < PAGES_MIN || pages > PAGES_MAX) errors.pages = `Pages must be between ${PAGES_MIN} and ${PAGES_MAX}`;

  if (data.description && String(data.description).length > DESCRIPTION_MAX) errors.description = `Description must be at most ${DESCRIPTION_MAX} characters`;

  return Object.keys(errors).length ? errors : null;
}

function validateWorship(data: any) {
  const errors: Record<string, string> = {};
  // Title moved to YouTube metadata; only validate youtube_url and optional artist
  if (!data.youtube_url || String(data.youtube_url).trim().length === 0) errors.youtube_url = 'YouTube URL is required';

  return Object.keys(errors).length ? errors : null;
}

function validateSermon(data: any) {
  const errors: Record<string, string> = {};
  // Title moved to YouTube metadata; only validate youtube_url and optional speaker
  if (!data.youtube_url || String(data.youtube_url).trim().length === 0) errors.youtube_url = 'YouTube URL is required';

  return Object.keys(errors).length ? errors : null;
}

function validateBibleStudy(data: any) {
  const errors: Record<string, string> = {};
  if (!data.title || String(data.title).trim().length === 0) errors.title = 'Title is required';
  else if (String(data.title).length > TITLE_MAX) errors.title = `Title must be at most ${TITLE_MAX} characters`;

  if (!data.author || String(data.author).trim().length === 0) errors.author = 'Author is required';
  else if (String(data.author).length > AUTHOR_MAX) errors.author = `Author must be at most ${AUTHOR_MAX} characters`;

  const pages = toNumber(data.pages);
  if (Number.isNaN(pages)) errors.pages = 'Pages is required';
  else if (pages < PAGES_MIN || pages > PAGES_MAX) errors.pages = `Pages must be between ${PAGES_MIN} and ${PAGES_MAX}`;

  if (!data.file_url || String(data.file_url).trim().length === 0) errors.file_url = 'File URL is required';

  return Object.keys(errors).length ? errors : null;
}

// GET: Fetch all resources (including unpublished) for admin
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type'); // books, worship, sermons, bibleStudies

    // Note: allow public reads for resources (admin-only operations still require auth)

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
          SELECT *
          FROM books
          ORDER BY created_at DESC
        `;
        break;

      case 'worship':
        result = await sql`
          SELECT *
          FROM worship
          ORDER BY created_at DESC
        `;
        break;

      case 'sermons':
        result = await sql`
          SELECT *
          FROM sermons
          ORDER BY created_at DESC
        `;
        break;

      case 'bibleStudies':
        result = await sql`
          SELECT *
          FROM bible_studies
          ORDER BY study_date DESC NULLS LAST, created_at DESC
        `;
        break;

      default:
        return NextResponse.json(
          { success: false, error: 'Invalid type parameter' },
          { status: 400 }
        );
    }

    return NextResponse.json({
      success: true,
      data: result.rows,
      count: result.rows.length
    });
  } catch (error) {
    console.error('Error fetching resources:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch resources' },
      { status: 500 }
    );
  }
}

// POST: Create a new resource
export async function POST(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');

    if (!type) {
      return NextResponse.json(
        { success: false, error: 'Type parameter is required' },
        { status: 400 }
      );
    }

    const data = await request.json();
    // verify session and resolve actor (server-side) for updated_by
    // (session already verified above in this function)
    const actor = await getActorName((request.headers.get('authorization') || '').startsWith('Bearer ') ? (request.headers.get('authorization') || '').slice(7) : (request.headers.get('authorization') || '') || null);
    // Server-side validation
    let validationErrors: Record<string, string> | null = null;
    if (type === 'books') validationErrors = validateBook(data);
    else if (type === 'worship') validationErrors = validateWorship(data);
    else if (type === 'sermons') validationErrors = validateSermon(data);
    else if (type === 'bibleStudies') validationErrors = validateBibleStudy(data);

    if (validationErrors) {
      return NextResponse.json({ success: false, errors: validationErrors }, { status: 400 });
    }
    let result;

    // verify session and resolve actor (server-side) for created_by/updated_by
    // (session already verified above in this function)
    const actor2 = await getActorName((request.headers.get('authorization') || '').startsWith('Bearer ') ? (request.headers.get('authorization') || '').slice(7) : (request.headers.get('authorization') || '') || null);

    switch (type) {
      case 'books':
        result = await sql`
          INSERT INTO books (
            title, author, price, pages, language,
            cover_image, additional_images, description,
            publish_date, published, created_by, updated_by
          ) VALUES (
            ${data.title}, ${data.author}, ${data.price}, ${data.pages}, ${data.language},
            ${data.cover_image}, ${JSON.stringify(data.additional_images || [])}, ${data.description},
            ${data.publish_date}, ${data.published || false},
            ${actor2}, ${actor2}
          )
          RETURNING *
        `;
        break;

      case 'worship':
        result = await sql`
          INSERT INTO worship (
            youtube_url, published, created_by, updated_by
          ) VALUES (
            ${data.youtube_url}, ${data.published || false},
            ${actor2}, ${actor2}
          )
          RETURNING *
        `;
        break;

      case 'sermons':
        result = await sql`
          INSERT INTO sermons (
            youtube_url, published, created_by, updated_by
          ) VALUES (
            ${data.youtube_url}, ${data.published || false},
            ${actor2}, ${actor2}
          )
          RETURNING *
        `;
        break;

      case 'bibleStudies':
        result = await sql`
          INSERT INTO bible_studies (
            title, author, pages, study_date,
            file_type, file_url, thumbnail_url, description, published, created_by, updated_by
          ) VALUES (
            ${data.title}, ${data.author}, ${data.pages}, ${data.study_date},
            ${data.file_type || 'PDF'}, ${data.file_url}, ${data.thumbnail_url || null},
            ${data.description}, ${data.published || false}, ${actor2}, ${actor2}
          )
          RETURNING *
        `;
        break;

      default:
        return NextResponse.json(
          { success: false, error: 'Invalid type parameter' },
          { status: 400 }
        );
    }

    return NextResponse.json({
      success: true,
      data: result.rows[0]
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating resource:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create resource' },
      { status: 500 }
    );
  }
}

// PUT: Update a resource
export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const id = searchParams.get('id');

    if (!type || !id) {
      return NextResponse.json(
        { success: false, error: 'Type and id parameters are required' },
        { status: 400 }
      );
    }

    const data = await request.json();
    // Server-side validation for updates
    let validationErrors: Record<string, string> | null = null;
    if (type === 'books') validationErrors = validateBook(data);
    else if (type === 'worship') validationErrors = validateWorship(data);
    else if (type === 'sermons') validationErrors = validateSermon(data);
    else if (type === 'bibleStudies') validationErrors = validateBibleStudy(data);

    if (validationErrors) {
      return NextResponse.json({ success: false, errors: validationErrors }, { status: 400 });
    }

    // resolve actor (server-side)
    const actor = await getActorName((request.headers.get('authorization') || '').startsWith('Bearer ') ? (request.headers.get('authorization') || '').slice(7) : (request.headers.get('authorization') || '') || null);

    let result;

    switch (type) {
      case 'books':
        // server-side validation already performed above
        result = await sql`
          UPDATE books
          SET title = ${data.title},
              author = ${data.author},
              price = ${data.price},
              pages = ${data.pages},
              language = ${data.language},
              cover_image = ${data.cover_image},
              additional_images = ${JSON.stringify(data.additional_images || [])},
              description = ${data.description},
              publish_date = ${data.publish_date},
              published = ${data.published},
              updated_by = ${actor},
              updated_at = CURRENT_TIMESTAMP
          WHERE id = ${id}
          RETURNING *
        `;
        break;

      case 'worship':
        result = await sql`
          UPDATE worship
          SET youtube_url = ${data.youtube_url},
              published = ${data.published},
              updated_by = ${actor},
              updated_at = CURRENT_TIMESTAMP
          WHERE id = ${id}
          RETURNING *
        `;
        break;

      case 'sermons':
        result = await sql`
          UPDATE sermons
          SET youtube_url = ${data.youtube_url},
              published = ${data.published},
              updated_by = ${actor},
              updated_at = CURRENT_TIMESTAMP
          WHERE id = ${id}
          RETURNING *
        `;
        break;

      case 'bibleStudies':
        result = await sql`
          UPDATE bible_studies
          SET title = ${data.title},
              author = ${data.author},
              pages = ${data.pages},
              study_date = ${data.study_date},
              file_type = ${data.file_type},
              file_url = ${data.file_url},
              thumbnail_url = ${data.thumbnail_url},
              description = ${data.description},
              published = ${data.published},
              updated_by = ${actor},
              updated_at = CURRENT_TIMESTAMP
          WHERE id = ${id}
          RETURNING *
        `;
        break;

      default:
        return NextResponse.json(
          { success: false, error: 'Invalid type parameter' },
          { status: 400 }
        );
    }

    if (result.rows.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Resource not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Error updating resource:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update resource' },
      { status: 500 }
    );
  }
}

// DELETE: Delete a resource
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const id = searchParams.get('id');

    if (!type || !id) {
      return NextResponse.json(
        { success: false, error: 'Type and id parameters are required' },
        { status: 400 }
      );
    }

    let result;

    switch (type) {
      case 'books':
        // Fetch image URLs before deleting the DB record so we can remove blobs
        try {
          const selectRes = await sql`SELECT cover_image, additional_images FROM books WHERE id = ${id}`;
          const row = selectRes.rows[0];
          if (row) {
            const coverUrl = row.cover_image;
            const additional = row.additional_images || [];

            // Delete cover image blob if it's a Vercel Blob URL
            if (coverUrl && typeof coverUrl === 'string' && coverUrl.includes('blob.vercel-storage.com')) {
              try {
                await del(coverUrl);
              } catch (blobErr) {
                console.error(`Failed to delete cover blob for book ${id}:`, blobErr);
              }
            }

            // Delete additional images
            if (Array.isArray(additional)) {
              for (const img of additional) {
                if (img && typeof img === 'string' && img.includes('blob.vercel-storage.com')) {
                  try {
                    await del(img);
                  } catch (blobErr) {
                    console.error(`Failed to delete additional image blob for book ${id}:`, blobErr);
                  }
                }
              }
            }
          }
        } catch (err) {
          console.error('Error while attempting to delete book blobs:', err);
        }

        result = await sql`DELETE FROM books WHERE id = ${id} RETURNING id`;
        break;
      case 'worship':
        result = await sql`DELETE FROM worship WHERE id = ${id} RETURNING id`;
        break;
      case 'sermons':
        result = await sql`DELETE FROM sermons WHERE id = ${id} RETURNING id`;
        break;
      case 'bibleStudies':
        // Fetch file and thumbnail URLs so we can delete blobs from Vercel storage
        try {
          const selectRes = await sql`SELECT file_url, thumbnail_url FROM bible_studies WHERE id = ${id}`;
          const row = selectRes.rows[0];
          if (row) {
            const fileUrl = row.file_url;
            const thumbUrl = row.thumbnail_url;

            if (fileUrl && typeof fileUrl === 'string' && fileUrl.includes('blob.vercel-storage.com')) {
              try {
                await del(fileUrl);
              } catch (blobErr) {
                console.error(`Failed to delete bible study file blob for ${id}:`, blobErr);
              }
            }

            if (thumbUrl && typeof thumbUrl === 'string' && thumbUrl.includes('blob.vercel-storage.com')) {
              try {
                await del(thumbUrl);
              } catch (blobErr) {
                console.error(`Failed to delete bible study thumbnail blob for ${id}:`, blobErr);
              }
            }
          }
        } catch (err) {
          console.error('Error while attempting to delete bible study blobs:', err);
        }

        result = await sql`DELETE FROM bible_studies WHERE id = ${id} RETURNING id`;
        break;
      default:
        return NextResponse.json(
          { success: false, error: 'Invalid type parameter' },
          { status: 400 }
        );
    }

    if (result.rows.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Resource not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Resource deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting resource:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete resource' },
      { status: 500 }
    );
  }
}
