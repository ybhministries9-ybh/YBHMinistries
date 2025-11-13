import { NextRequest, NextResponse } from 'next/server';
import { put, del } from '@vercel/blob';
import { 
  getAllGalleryItems, 
  getGalleryItemsByCategory, 
  addGalleryItems, 
  updateGalleryItem, 
  deleteGalleryItems 
} from '@/lib/db';

/**
 * GET /api/admin/gallery
 * Fetch all gallery items (including inactive ones for admin)
 * Query params: ?category=guinness-events (optional)
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    
    let items;
    if (category && category !== 'all') {
      // Get items for specific category
      items = await getGalleryItemsByCategory(category);
    } else {
      // Get all items
      items = await getAllGalleryItems();
    }
    
    return NextResponse.json({
      success: true,
      data: items,
      count: items.length,
    });
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
    
    // Handle file upload
    if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData();
      const files = formData.getAll('files') as File[];
      const category = formData.get('category') as string;
      const createdBy = formData.get('created_by') as string | null;
      
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

      for (const file of files) {
        // Upload to Vercel Blob
        const blob = await put(`gallery/${category}/${Date.now()}-${file.name}`, file, {
          access: 'public',
          addRandomSuffix: true,
        });

        uploadedItems.push({
          category,
          media_type: 'image' as const,
          url: blob.url,
        });
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

    const items = await addGalleryItems(body.items, body.created_by);

    return NextResponse.json({
      success: true,
      data: items,
      count: items.length
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

    const { id, updated_by, ...updates } = body;
    const updatedItem = await updateGalleryItem(id, updates);

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

    // Fetch items to check if they are blob URLs and need deletion
    const { sql } = await import('@vercel/postgres');
    const placeholders = itemIds.map((_, i) => `$${i + 1}`).join(',');
    const { rows } = await sql.query(
      `SELECT id, url, media_type FROM gallery_items WHERE id IN (${placeholders})`,
      itemIds
    );

    // Delete blob storage files for images (not for YouTube videos)
    for (const item of rows) {
      if (item.media_type === 'image' && item.url.includes('blob.vercel-storage.com')) {
        try {
          await del(item.url);
        } catch (error) {
          console.warn(`Failed to delete blob for item ${item.id}:`, error);
          // Continue with database deletion even if blob deletion fails
        }
      }
    }

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
