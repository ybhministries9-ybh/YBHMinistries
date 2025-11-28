import { NextRequest, NextResponse } from 'next/server';
import { del } from '@vercel/blob';
import { parseKeyFromUrl, deleteObject } from '@/lib/r2';
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

// Relaxed validation for creating books: allow missing cover_image initially
function validateBookForCreate(data: any) {
  const errors: Record<string, string> = {};
  if (!data.title || String(data.title).trim().length === 0) errors.title = 'Title is required';
  else if (String(data.title).length > TITLE_MAX) errors.title = `Title must be at most ${TITLE_MAX} characters`;

  if (!data.author || String(data.author).trim().length === 0) errors.author = 'Author is required';
  else if (String(data.author).length > AUTHOR_MAX) errors.author = `Author must be at most ${AUTHOR_MAX} characters`;

  if (!data.language || String(data.language).trim().length === 0) errors.language = 'Language is required';
  else if (String(data.language).length > LANGUAGE_MAX) errors.language = `Language must be at most ${LANGUAGE_MAX} characters`;

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
    if (type === 'books') validationErrors = validateBookForCreate(data);
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
        // If caller does not supply published for new worship entries, default to true
        const worshipPublished = typeof data.published === 'boolean' ? data.published : true;
        result = await sql`
          INSERT INTO worship (
            youtube_url, title, date_posted, display_order, published, created_by, updated_by
          ) VALUES (
            ${data.youtube_url}, ${data.title || null}, ${data.date_posted || null}, ${data.display_order || null}, ${worshipPublished},
            ${actor2}, ${actor2}
          )
          RETURNING *
        `;
        break;

      case 'sermons':
        // Default published to true for new sermons if caller didn't specify
        const sermonPublished = typeof data.published === 'boolean' ? data.published : true;
        result = await sql`
          INSERT INTO sermons (
            youtube_url, title, date_posted, display_order, published, created_by, updated_by
          ) VALUES (
            ${data.youtube_url}, ${data.title || null}, ${data.date_posted || null}, ${data.display_order || null}, ${sermonPublished},
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
    // Allow a minimal publish/unpublish update for `books` when the client only sends { published: true|false }
    const isBooksPartialPublish = (type === 'books' && typeof data === 'object' && data !== null && Object.keys(data).length === 1 && Object.prototype.hasOwnProperty.call(data, 'published'));

    // Server-side validation for updates (skip full book validation when doing a minimal publish update)
    let validationErrors: Record<string, string> | null = null;
    if (!isBooksPartialPublish) {
      if (type === 'books') validationErrors = validateBook(data);
      else if (type === 'worship') validationErrors = validateWorship(data);
      else if (type === 'sermons') validationErrors = validateSermon(data);
      else if (type === 'bibleStudies') validationErrors = validateBibleStudy(data);

      if (validationErrors) {
        return NextResponse.json({ success: false, errors: validationErrors }, { status: 400 });
      }
    }

    // resolve actor (server-side)
    const actor = await getActorName((request.headers.get('authorization') || '').startsWith('Bearer ') ? (request.headers.get('authorization') || '').slice(7) : (request.headers.get('authorization') || '') || null);

    let result;

    switch (type) {
      case 'books':
        // If this is a minimal publish/unpublish update, only touch the `published` column.
        if (isBooksPartialPublish) {
          result = await sql`
            UPDATE books
            SET published = ${data.published},
                updated_by = ${actor},
                updated_at = CURRENT_TIMESTAMP
            WHERE id = ${id}
            RETURNING *
          `;
        } else {
          // full update for books (server-side validation already performed above)
          // Attempt to delete any removed additional images (and old cover if replaced) from storage
          try {
            const selectRes = await sql`SELECT cover_image, additional_images FROM books WHERE id = ${id}`;
            const row = selectRes.rows[0];
            if (row) {
              const oldCover = row.cover_image;
              const oldAdditional: string[] = Array.isArray(row.additional_images) ? row.additional_images : [];
              const newAdditional: string[] = Array.isArray(data.additional_images) ? data.additional_images : [];

              // Helper to attempt deletion from Vercel Blob or R2 (depending on URL form)
              const tryDelete = async (url: string) => {
                if (!url || typeof url !== 'string') return;
                try {
                  if (url.includes('blob.vercel-storage.com')) {
                    try { await del(url); return; } catch (e) { console.error('Vercel blob delete failed for', url, e); }
                  }

                  if (url.startsWith('r2://')) {
                    const parsed = parseKeyFromUrl(url);
                    if (parsed && parsed.key) {
                      try { await deleteObject(parsed.key, parsed.bucket || undefined); return; } catch (e) { console.error('R2 deleteObject failed for', parsed, e); }
                    }
                  }

                  const parsed2 = parseKeyFromUrl(url);
                  if (parsed2 && parsed2.key) {
                    try { await deleteObject(parsed2.key, parsed2.bucket || undefined); return; } catch (e) { console.error('R2 deleteObject failed for parsed public URL', parsed2, e); }
                  }
                } catch (err) {
                  console.error('Failed to delete blob/R2 object for URL', url, err);
                }
              };

              // If cover was replaced, delete the old cover (and not equal to new)
              if (oldCover && typeof data.cover_image === 'string' && oldCover !== data.cover_image) {
                await tryDelete(oldCover);
              }

              // Delete any additional images that were removed
              const toDelete = oldAdditional.filter(x => x && !newAdditional.includes(x));
              for (const url of toDelete) {
                await tryDelete(url);
              }
            }
          } catch (err) {
            console.error('Error while attempting to delete replaced/removed book images:', err);
          }

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
        }
        break;

      case 'worship':
        // Preserve existing title, date_posted and display_order when caller doesn't supply them
        result = await sql`
          UPDATE worship
          SET youtube_url = ${data.youtube_url},
              title = COALESCE(${data.title}, title),
              date_posted = COALESCE(${data.date_posted}, date_posted),
              display_order = COALESCE(${data.display_order}, display_order),
              published = ${data.published},
              updated_by = ${actor},
              updated_at = CURRENT_TIMESTAMP
          WHERE id = ${id}
          RETURNING *
        `;
        break;

      case 'sermons':
        // Preserve existing title, date_posted and display_order when caller doesn't supply them
        result = await sql`
          UPDATE sermons
          SET youtube_url = ${data.youtube_url},
              title = COALESCE(${data.title}, title),
              date_posted = COALESCE(${data.date_posted}, date_posted),
              display_order = COALESCE(${data.display_order}, display_order),
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
        // Fetch image URLs before deleting the DB record so we can remove blobs (Vercel Blob or R2)
        try {
          const selectRes = await sql`SELECT cover_image, additional_images FROM books WHERE id = ${id}`;
          const row = selectRes.rows[0];
          if (row) {
            const coverUrl = row.cover_image;
            const additional = row.additional_images || [];

            // Helper to attempt deletion from Vercel Blob or R2 (depending on URL form)
            const tryDelete = async (url: string) => {
              if (!url || typeof url !== 'string') return;
              try {
                // Vercel Blob (legacy) - use @vercel/blob del
                if (url.includes('blob.vercel-storage.com')) {
                  try { await del(url); return; } catch (e) { console.error('Vercel blob delete failed for', url, e); }
                }

                // r2:// URL - parse bucket/key and call deleteObject
                if (url.startsWith('r2://')) {
                  const parsed = parseKeyFromUrl(url);
                  if (parsed && parsed.key) {
                    try {
                      await deleteObject(parsed.key, parsed.bucket || undefined);
                      return;
                    } catch (e) {
                      console.error('R2 deleteObject failed for', parsed, e);
                    }
                  }
                }

                // Otherwise try to parse public URL into bucket/key and delete from R2
                const parsed2 = parseKeyFromUrl(url);
                if (parsed2 && parsed2.key) {
                  try {
                    await deleteObject(parsed2.key, parsed2.bucket || undefined);
                    return;
                  } catch (e) {
                    console.error('R2 deleteObject failed for parsed public URL', parsed2, e);
                  }
                }
              } catch (err) {
                console.error('Failed to delete blob/R2 object for URL', url, err);
              }
            };

            // Attempt to delete cover
            if (coverUrl) await tryDelete(coverUrl);

            // Delete additional images
            if (Array.isArray(additional)) {
              for (const img of additional) {
                if (img && typeof img === 'string') {
                  await tryDelete(img);
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
