import { NextRequest, NextResponse } from 'next/server';
import { put, del } from '@vercel/blob';
import { 
  getAllGalleryItems, 
  getGalleryItemsByCategory, 
  addGalleryItems, 
  updateGalleryItem, 
  deleteGalleryItems 
} from '@/lib/db';
import { getActorName, verifySession } from '@/lib/sessions';
import { extractYouTubeId } from '@/lib/youtube';

/**
 * GET /api/admin/gallery
 * Fetch all gallery items (including inactive ones for admin)
 * Query params: ?category=guinness-events (optional)
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    
    // allow public reads for gallery (admin mutations remain protected)

    let items;
    if (category && category !== 'all') {
      // Get items for specific category
      items = await getGalleryItemsByCategory(category);
    } else {
      // Get all items
      items = await getAllGalleryItems();
    }
    
    // For admin responses, convert any r2:// references into presigned GET URLs so the admin UI can display thumbnails
    try {
      const { parseKeyFromUrl, getPresignedGetUrl } = await import('@/lib/r2');
      const enhanced = await Promise.all(items.map(async (it: any) => {
        if (it.media_type === 'image') {
          try {
            if (it.thumbnail_url && it.thumbnail_url.startsWith('r2://')) {
              const parsed = parseKeyFromUrl(it.thumbnail_url);
              if (parsed && parsed.key) {
                const pres = await getPresignedGetUrl(parsed.key, 300, parsed.bucket || undefined);
                it.thumbnail_url = pres;
              }
            }
            if (it.medium_url && it.medium_url.startsWith('r2://')) {
              const parsed2 = parseKeyFromUrl(it.medium_url);
              if (parsed2 && parsed2.key) {
                const pres2 = await getPresignedGetUrl(parsed2.key, 300, parsed2.bucket || undefined);
                it.medium_url = pres2;
              }
            }
            // Also convert original url if stored as r2://
            if (it.url && it.url.startsWith('r2://')) {
              const parsed3 = parseKeyFromUrl(it.url);
              if (parsed3 && parsed3.key) {
                const pres3 = await getPresignedGetUrl(parsed3.key, 300, parsed3.bucket || undefined);
                it.url = pres3;
              }
            }
          } catch (e) {
            // ignore presign errors for specific items
          }
        }
        return it;
      }));

      return NextResponse.json({
        success: true,
        data: enhanced,
        count: enhanced.length,
      });
    } catch (err) {
      // If r2 utilities fail, fallback to returning raw items
      return NextResponse.json({ success: true, data: items, count: items.length });
    }
  } catch (error: any) {
    console.error('Error fetching gallery items:', error);
    const errorMessage = error?.message || 'Failed to fetch gallery items';
    const isDatabaseError = errorMessage.includes('relation') || errorMessage.includes('does not exist');
    
    return NextResponse.json(
      { 
        success: false, 
        error: isDatabaseError 
          ? 'Database tables not initialized. Please run database/schema/gallery_items.sql in your database.' 
          : errorMessage 
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin/gallery
 * Add new gallery items (supports single or multiple items)
 * Body: { items: [{ category, media_type, url, title?, date? }], created_by? }
 * OR for file upload: FormData with files and metadata
 */
export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get('content-type') || '';

    // verify session for admin and resolve actor
    const auth = request.headers.get('authorization') || '';
    const token = auth.startsWith('Bearer ') ? auth.slice(7) : auth || null;
    const session = await verifySession(token);
    if (!session) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    
    // Handle file upload
    if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData();
      const files = formData.getAll('files') as File[];
      const category = formData.get('category') as string;
      // resolve actor for created_by
      const createdBy = await getActorName(token);
      
      if (!files || files.length === 0) {
        return NextResponse.json(
          { success: false, error: 'No files provided' },
          { status: 400 }
        );
      }

      if (!category) {
        return NextResponse.json(
          { success: false, error: 'Category is required' },
          { status: 400 }
        );
      }

      const uploadedItems = [];

      // We'll upload originals + variants to R2 private bucket
      const { uploadBuffer, PRIVATE_BUCKET } = await import('@/lib/r2');
      const { processBufferToVariants } = await import('@/lib/imageProcessor');

      const targetBucket = process.env.R2_PRIVATE_BUCKET || process.env.R2_BUCKET || 'ybh-pstore';

      for (const file of files) {
        try {
          const arrayBuffer = await file.arrayBuffer();
          const buffer = Buffer.from(arrayBuffer);
          const timestamp = Date.now();
          const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '-');
          const baseKey = `gallery/${category}/${timestamp}-${safeName}`;

          // upload original
          const originalKey = `${baseKey}/original-${safeName}`;
          await uploadBuffer(originalKey, buffer, file.type || 'application/octet-stream', targetBucket, 'private');
          const originalRef = `r2://${targetBucket}/${originalKey}`;

          // create variants (thumb + medium) and upload
          const { thumbRef, mediumRef } = await processBufferToVariants(buffer, `gallery/${category}/${timestamp}`, targetBucket);

          uploadedItems.push({
            category,
            media_type: 'image' as const,
            url: originalRef,
            thumbnail_url: thumbRef,
            medium_url: mediumRef,
          });
        } catch (e) {
          console.error('Error processing upload for file', file.name, e);
          // continue with next file
        }
      }

      // Save to database
      const items = await addGalleryItems(uploadedItems, createdBy || undefined);

      return NextResponse.json({
        success: true,
        data: items,
        count: items.length
      });
    }
    
    // Handle JSON body (for URL inputs)
    const body = await request.json();
    
    if (!body.items || !Array.isArray(body.items) || body.items.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Items array is required' },
        { status: 400 }
      );
    }

    // Validate items
    for (const item of body.items) {
      if (!item.category || !item.media_type || !item.url) {
        return NextResponse.json(
          { success: false, error: 'Each item must have category, media_type, and url' },
          { status: 400 }
        );
      }
    }

    // For any video items, fetch YouTube metadata (title + published date) server-side
    const itemErrors: Array<{ index: number; message: string }> = [];
    try {
      const ytKey = process.env.YOUTUBE_API_KEY;
      if (ytKey) {
        for (let idx = 0; idx < body.items.length; idx++) {
          const item = body.items[idx];
          if (item.media_type === 'video') {
            try {
              const vid = extractYouTubeId(item.url) || String(item.url || '').trim();
              if (!vid) {
                itemErrors.push({ index: idx, message: 'Invalid YouTube URL' });
                continue;
              }
              const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${encodeURIComponent(vid)}&key=${encodeURIComponent(ytKey)}`;
              const r = await fetch(url);
              if (!r.ok) {
                const txt = await r.text().catch(() => 'YouTube API error');
                itemErrors.push({ index: idx, message: `YouTube API error: ${r.status} ${txt}` });
                continue;
              }
              const j = await r.json();
              const it = j.items?.[0];
              if (!it || !it.snippet) {
                itemErrors.push({ index: idx, message: 'YouTube video not found' });
                continue;
              }
              item.title = it.snippet.title || item.title;
              if (it.snippet.publishedAt) item.date = it.snippet.publishedAt.split('T')[0];
            } catch (e) {
              itemErrors.push({ index: idx, message: 'Failed to fetch YouTube metadata' });
            }
          }
        }
      } else {
        // No API key - can't fetch metadata
        for (let idx = 0; idx < body.items.length; idx++) {
          const item = body.items[idx];
          if (item.media_type === 'video') {
            itemErrors.push({ index: idx, message: 'Server missing YOUTUBE_API_KEY; metadata not fetched' });
          }
        }
      }
    } catch (err) {
      // ignore overall metadata fetch errors, but record a generic error for video items
      for (let idx = 0; idx < body.items.length; idx++) {
        const item = body.items[idx];
        if (item.media_type === 'video') {
          itemErrors.push({ index: idx, message: 'Unexpected error fetching YouTube metadata' });
        }
      }
    }

    // Build list of items to save: skip video items that had metadata errors
    const toSave: typeof body.items = [];
    for (let idx = 0; idx < body.items.length; idx++) {
      const it = body.items[idx];
      if (it.media_type === 'video') {
        // if there was an error for this index, skip saving
        if (itemErrors.find(e => e.index === idx)) continue;
        toSave.push(it);
      } else {
        toSave.push(it);
      }
    }

    if (toSave.length === 0) {
      // Nothing valid to save
      return NextResponse.json({ success: false, error: 'No valid items to save', errors: itemErrors }, { status: 400 });
    }

    // resolve actor for created_by (server-side)
    const actor = await getActorName(token);
    const saved = await addGalleryItems(toSave, actor);

    return NextResponse.json({
      success: true,
      data: saved,
      count: saved.length,
      errors: itemErrors
    });
  } catch (error) {
    console.error('Error in POST /api/admin/gallery:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to add gallery items' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/admin/gallery
 * Update gallery item
 * Body: { id, ...updates, updated_by? }
 */
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    
    if (!body.id) {
      return NextResponse.json(
        { success: false, error: 'Item ID is required' },
        { status: 400 }
      );
    }

    const { id, ...updates } = body;
    // verify session and resolve actor
    const auth2 = request.headers.get('authorization') || '';
    const token2 = auth2.startsWith('Bearer ') ? auth2.slice(7) : auth2 || null;
    const session2 = await verifySession(token2);
    if (!session2) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    const actor2 = await getActorName(token2);

    const updatedItem = await updateGalleryItem(id, { ...updates, updated_by: actor2 });

    return NextResponse.json({
      success: true,
      data: updatedItem
    });
  } catch (error) {
    console.error('Error in PUT /api/admin/gallery:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update gallery item' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/admin/gallery
 * Delete gallery items - supports single or bulk delete
 * Query params: ?id=1 OR ?ids=1,2,3
 */
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const ids = searchParams.get('ids');

    let itemIds: number[] = [];

    if (ids) {
      // Bulk delete
      itemIds = ids.split(',').map(id => parseInt(id.trim())).filter(id => !isNaN(id));
    } else if (id) {
      // Single delete
      const parsedId = parseInt(id);
      if (isNaN(parsedId)) {
        return NextResponse.json(
          { success: false, error: 'Invalid item ID' },
          { status: 400 }
        );
      }
      itemIds = [parsedId];
    }

    if (itemIds.length === 0) {
      return NextResponse.json(
        { success: false, error: 'No valid item IDs provided' },
        { status: 400 }
      );
    }

    // Fetch items to check if they are stored in R2 (or other storage) and need deletion
    const { sql } = await import('@vercel/postgres');
    const placeholders = itemIds.map((_, i) => `$${i + 1}`).join(',');
    const { rows } = await sql.query(
      `SELECT id, url, media_type, thumbnail_url, medium_url FROM gallery_items WHERE id IN (${placeholders})`,
      itemIds
    );

    // Delete storage files for images (original + variants)
    // Use R2 utilities when possible; fall back to Vercel Blob `del` for blob URLs.
    const { parseKeyFromUrl, deleteObject } = await import('@/lib/r2');

    for (const item of rows) {
      if (item.media_type !== 'image') continue;

      const urlsToDelete = new Set<string>();
      if (item.url) urlsToDelete.add(item.url);
      if (item.thumbnail_url) urlsToDelete.add(item.thumbnail_url);
      if (item.medium_url) urlsToDelete.add(item.medium_url);

      for (const u of Array.from(urlsToDelete)) {
        try {
          if (!u) continue;

          // If stored as r2://bucket/key or public R2 URL, try parsing and deleting via R2 SDK
          if (u.startsWith('r2://') || u.includes('.r2.cloudflarestorage.com') || u.includes('.r2.dev')) {
            const parsed = parseKeyFromUrl(u);
            if (parsed && parsed.key) {
              try {
                await deleteObject(parsed.key, parsed.bucket || undefined);
                continue; // deleted
              } catch (err) {
                console.warn(`R2 delete failed for ${u}:`, err);
                // fall through to other checks
              }
            }
          }

          // If it's a Vercel blob URL, use del
          if (typeof u === 'string' && u.includes('blob.vercel-storage.com')) {
            try {
              await del(u);
              continue;
            } catch (err) {
              console.warn(`Vercel blob delete failed for ${u}:`, err);
            }
          }

          // As a last resort, attempt a signed URL fetch DELETE if it looks like an HTTP URL (best-effort)
          try {
            if (u.startsWith('http')) {
              await fetch(u, { method: 'DELETE' }).then(r => {
                if (!r.ok) throw new Error(`HTTP DELETE failed: ${r.status}`);
              });
            }
          } catch (err) {
            console.warn(`Failed to delete via HTTP for ${u}:`, err);
          }
        } catch (error) {
          console.warn(`Failed to delete storage for item ${item.id} url=${u}:`, error);
          // Continue with next URL/item
        }
      }
    }

    // verify session for delete
    const auth3 = request.headers.get('authorization') || '';
    const token3 = auth3.startsWith('Bearer ') ? auth3.slice(7) : auth3 || null;
    const session3 = await verifySession(token3);
    if (!session3) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });

    // Delete from database
    await deleteGalleryItems(itemIds);

    return NextResponse.json({
      success: true,
      message: `${itemIds.length} item${itemIds.length > 1 ? 's' : ''} deleted successfully`,
      count: itemIds.length
    });
  } catch (error) {
    console.error('Error in DELETE /api/admin/gallery:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete gallery items' },
      { status: 500 }
    );
  }
}
