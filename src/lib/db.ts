import { sql } from '@vercel/postgres';

/**
 * Database utility for Vercel Postgres
 * Provides connection and query helpers
 */

export interface HeroImage {
  id: number;
  image_url: string;
  display_order: number;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
  created_by: string | null;
  updated_by: string | null;
}

export interface HomeVideo {
  id: number;
  video_url: string | null; // Nullable to allow video-only deletion
  thumbnail_image_url: string | null;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
  created_by: string | null;
  updated_by: string | null;
}

export interface AboutHeroImage {
  id: number;
  image_url: string;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
  created_by: string | null;
  updated_by: string | null;
}

/**
 * Test database connection
 */
export async function testConnection(): Promise<boolean> {
  try {
    await sql`SELECT 1`;
    return true;
  } catch (error) {
    console.error('Database connection failed:', error);
    return false;
  }
}

/**
 * Get all active hero images in display order
 */
export async function getActiveHeroImages(): Promise<HeroImage[]> {
  try {
    const { rows } = await sql<HeroImage>`
      SELECT * FROM home_hero_images 
      WHERE is_active = true 
      ORDER BY display_order ASC
    `;
    return rows;
  } catch (error) {
    console.error('Error fetching hero images:', error);
    throw error;
  }
}

/**
 * Get active home video
 */
export async function getActiveHomeVideo(): Promise<HomeVideo | null> {
  try {
    const { rows } = await sql<HomeVideo>`
      SELECT * FROM home_video 
      WHERE is_active = true 
      ORDER BY created_at DESC 
      LIMIT 1
    `;
    return rows[0] || null;
  } catch (error) {
    console.error('Error fetching home video:', error);
    throw error;
  }
}

/**
 * Create a new hero image
 */
export async function createHeroImage(
  blobUrl: string,
  displayOrder?: number,
  createdBy?: string
): Promise<HeroImage> {
  try {
    // Get max display order if not provided
    if (displayOrder === undefined) {
      const { rows } = await sql`
        SELECT COALESCE(MAX(display_order), 0) + 1 as next_order 
        FROM home_hero_images
      `;
      displayOrder = rows[0].next_order;
    }

    const { rows } = await sql<HeroImage>`
      INSERT INTO home_hero_images (
        image_url, display_order, created_by, updated_by
      ) VALUES (
        ${blobUrl}, 
        ${displayOrder},
        ${createdBy || null},
        ${createdBy || null}
      )
      RETURNING *
    `;
    return rows[0];
  } catch (error) {
    console.error('Error creating hero image:', error);
    throw error;
  }
}

/**
 * Update hero image
 */
export async function updateHeroImage(
  id: number,
  updates: {
    image_url?: string;
    display_order?: number;
    is_active?: boolean;
    updated_by?: string;
  }
): Promise<HeroImage> {
  try {
    const updateFields: string[] = [];
    const values: any[] = [];
    let paramIndex = 1;

    if (updates.image_url !== undefined) {
      updateFields.push(`image_url = $${paramIndex++}`);
      values.push(updates.image_url);
    }
    if (updates.display_order !== undefined) {
      updateFields.push(`display_order = $${paramIndex++}`);
      values.push(updates.display_order);
    }
    if (updates.is_active !== undefined) {
      updateFields.push(`is_active = $${paramIndex++}`);
      values.push(updates.is_active);
    }
    if (updates.updated_by !== undefined) {
      updateFields.push(`updated_by = $${paramIndex++}`);
      values.push(updates.updated_by);
    }

    values.push(id);

    const query = `
      UPDATE home_hero_images 
      SET ${updateFields.join(', ')}
      WHERE id = $${paramIndex}
      RETURNING *
    `;

    const result = await sql.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error('Error updating hero image:', error);
    throw error;
  }
}

/**
 * Delete hero image
 */
export async function deleteHeroImage(id: number): Promise<void> {
  try {
    await sql`DELETE FROM home_hero_images WHERE id = ${id}`;
  } catch (error) {
    console.error('Error deleting hero image:', error);
    throw error;
  }
}

/**
 * Delete multiple hero images
 */
export async function deleteHeroImages(ids: number[]): Promise<void> {
  try {
    if (ids.length === 0) return;
    
    // Use SQL IN clause to delete multiple rows
    const placeholders = ids.map((_, i) => `$${i + 1}`).join(', ');
    const query = `DELETE FROM home_hero_images WHERE id IN (${placeholders})`;
    await sql.query(query, ids);
  } catch (error) {
    console.error('Error deleting hero images:', error);
    throw error;
  }
}

/**
 * Reorder hero images
 */
export async function reorderHeroImages(
  imageIds: number[]
): Promise<void> {
  try {
    // First, set all display_order values to negative to avoid unique constraint violations
    for (let i = 0; i < imageIds.length; i++) {
      await sql`
        UPDATE home_hero_images 
        SET display_order = ${-(i + 1)} 
        WHERE id = ${imageIds[i]}
      `;
    }
    
    // Then, set them to the correct positive values
    for (let i = 0; i < imageIds.length; i++) {
      await sql`
        UPDATE home_hero_images 
        SET display_order = ${i + 1} 
        WHERE id = ${imageIds[i]}
      `;
    }
  } catch (error) {
    console.error('Error reordering hero images:', error);
    throw error;
  }
}

/**
 * Create or update home video (replaces existing video)
 */
export async function upsertHomeVideo(
  blobUrl: string,
  thumbnailUrl?: string,
  createdBy?: string
): Promise<HomeVideo> {
  try {
    // Deactivate any currently active video(s) and record who performed the change
    await sql`
      UPDATE home_video
      SET is_active = false,
          updated_at = CURRENT_TIMESTAMP,
          updated_by = ${createdBy || null}
      WHERE is_active = true
    `;

    // Insert new video
    const { rows } = await sql<HomeVideo>`
      INSERT INTO home_video (
        video_url, thumbnail_image_url, created_by, updated_by
      ) VALUES (
        ${blobUrl}, 
        ${thumbnailUrl || null},
        ${createdBy || null},
        ${createdBy || null}
      )
      RETURNING *
    `;
    return rows[0];
  } catch (error) {
    console.error('Error upserting home video:', error);
    throw error;
  }
}

/**
 * Delete home video
 */
export async function deleteHomeVideo(id: number): Promise<void> {
  try {
    await sql`DELETE FROM home_video WHERE id = ${id}`;
  } catch (error) {
    console.error('Error deleting home video:', error);
    throw error;
  }
}

/**
 * Get active about hero image
 */
export async function getActiveAboutHeroImage(): Promise<AboutHeroImage | null> {
  try {
    const { rows } = await sql<AboutHeroImage>`
      SELECT * FROM about_hero_image 
      WHERE is_active = true 
      ORDER BY created_at DESC 
      LIMIT 1
    `;
    return rows[0] || null;
  } catch (error) {
    console.error('Error fetching about hero image:', error);
    throw error;
  }
}

/**
 * Create or update about hero image (ensures only one record exists)
 */
export async function upsertAboutHeroImage(
  imageUrl: string,
  createdBy?: string
): Promise<AboutHeroImage> {
  try {
    // Check if a record already exists
    const { rows: existingRows } = await sql<AboutHeroImage>`
      SELECT * FROM about_hero_image LIMIT 1
    `;

    if (existingRows.length > 0) {
      // Update existing record
      const { rows } = await sql<AboutHeroImage>`
        UPDATE about_hero_image 
        SET 
          image_url = ${imageUrl},
          updated_at = CURRENT_TIMESTAMP,
          updated_by = ${createdBy || null},
          is_active = true
        WHERE id = ${existingRows[0].id}
        RETURNING *
      `;
      return rows[0];
    } else {
      // Insert new record
      const { rows } = await sql<AboutHeroImage>`
        INSERT INTO about_hero_image (
          image_url, created_by, updated_by
        ) VALUES (
          ${imageUrl}, 
          ${createdBy || null},
          ${createdBy || null}
        )
        RETURNING *
      `;
      return rows[0];
    }
  } catch (error) {
    console.error('Error upserting about hero image:', error);
    throw error;
  }
}

/**
 * Delete about hero image
 */
export async function deleteAboutHeroImage(id: number): Promise<void> {
  try {
    await sql`DELETE FROM about_hero_image WHERE id = ${id}`;
  } catch (error) {
    console.error('Error deleting about hero image:', error);
    throw error;
  }
}

// ==================== GALLERY FUNCTIONS ====================

export interface GalleryItem {
  id: number;
  category: string;
  media_type: 'image' | 'video';
  url: string;
  title: string;
  date: string;
  created_at: string;
  created_by: string;
  updated_at: string;
}

export interface Story {
  id: number;
  title: string;
  location: string | null;
  category?: string | null;
  role?: string | null;
  body: string | null;
  media_type: 'text' | 'video';
  video_url?: string | null;
  thumbnail_url?: string | null;
  status: string;
  is_visible: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  created_by?: string | null;
  updated_by?: string | null;
}

/** STORIES CRUD **/
export async function getAllStories(): Promise<Story[]> {
  try {
    const { rows } = await sql<Story>`
      SELECT * FROM stories WHERE is_active = true ORDER BY created_at DESC
    `;
    return rows;
  } catch (error) {
    console.error('Error fetching stories:', error);
    throw error;
  }
}

/**
 * Get visible & approved stories for public consumption.
 * Select only the columns required by the public site to reduce payload size.
 */
export async function getVisibleApprovedStories(): Promise<any[]> {
  try {
    const { rows } = await sql`
      SELECT id, title, location, role, status, category, body, media_type, video_url, thumbnail_url, date, created_by, email
      FROM stories
      WHERE is_active = true AND is_visible = true AND status = 'Approved'
      ORDER BY created_at DESC
    `;
    return rows;
  } catch (error) {
    console.error('Error fetching visible approved stories:', error);
    throw error;
  }
}

export async function createStory(payload: {
  title: string;
  location?: string | null;
  role?: string | null;
  category?: string | null;
  body?: string | null;
  email?: string | null;
  media_type?: 'text' | 'video';
  video_url?: string | null;
  thumbnail_url?: string | null;
  date?: string | null;
  createdBy?: string | null;
}): Promise<Story> {
  try {
    const { rows } = await sql<Story>`
      INSERT INTO stories (
        title, date, location, category, role, body, email, media_type, video_url, thumbnail_url, status, is_visible, created_by, updated_by
      ) VALUES (
        ${payload.title}, ${payload.date || null}, ${payload.location || null}, ${payload.category || null}, ${payload.role || null}, ${payload.body || null}, ${payload.email || null}, ${payload.media_type || 'text'}, ${payload.video_url || null}, ${payload.thumbnail_url || null}, 'Submitted', true, ${payload.createdBy || null}, ${payload.createdBy || null}
      ) RETURNING *
    `;
    return rows[0];
  } catch (error) {
    console.error('Error creating story:', error);
    throw error;
  }
}

export async function updateStory(id: number, updates: Partial<{
  title: string;
  date: string | null;
  location: string | null;
  category: string | null;
  role: string | null;
  body: string | null;
  media_type: 'text' | 'video';
  video_url: string | null;
  thumbnail_url: string | null;
  status: string;
  is_visible: boolean;
  updated_by: string | null;
}>): Promise<Story> {
  try {
    const setClauses: string[] = [];
    const values: any[] = [];
    let idx = 1;
    if (updates.date !== undefined) { setClauses.push(`date = $${idx++}`); values.push(updates.date); }
    if (updates.title !== undefined) { setClauses.push(`title = $${idx++}`); values.push(updates.title); }
    if (updates.location !== undefined) { setClauses.push(`location = $${idx++}`); values.push(updates.location); }
    if (updates.category !== undefined) { setClauses.push(`category = $${idx++}`); values.push(updates.category); }
    if (updates.role !== undefined) { setClauses.push(`role = $${idx++}`); values.push(updates.role); }
    if (updates.body !== undefined) { setClauses.push(`body = $${idx++}`); values.push(updates.body); }
    if (updates.media_type !== undefined) { setClauses.push(`media_type = $${idx++}`); values.push(updates.media_type); }
    if (updates.video_url !== undefined) { setClauses.push(`video_url = $${idx++}`); values.push(updates.video_url); }
    if (updates.thumbnail_url !== undefined) { setClauses.push(`thumbnail_url = $${idx++}`); values.push(updates.thumbnail_url); }
    if ((updates as any).email !== undefined) { setClauses.push(`email = $${idx++}`); values.push((updates as any).email); }
    if (updates.status !== undefined) { setClauses.push(`status = $${idx++}`); values.push(updates.status); }
    if (updates.is_visible !== undefined) { setClauses.push(`is_visible = $${idx++}`); values.push(updates.is_visible); }
    if (updates.updated_by !== undefined) { setClauses.push(`updated_by = $${idx++}`); values.push(updates.updated_by); }

    if (setClauses.length === 0) {
      const { rows } = await sql<Story>`SELECT * FROM stories WHERE id = ${id}`;
      return rows[0];
    }

    // always update timestamp
    setClauses.push(`updated_at = CURRENT_TIMESTAMP`);

    values.push(id);
    const query = `UPDATE stories SET ${setClauses.join(', ')} WHERE id = $${idx} RETURNING *`;
    const { rows } = await sql.query<Story>(query, values);
    return rows[0];
  } catch (error) {
    console.error('Error updating story:', error);
    throw error;
  }
}

export async function deleteStories(ids: number[]): Promise<number> {
  try {
    if (!ids || ids.length === 0) return 0;
    const placeholders = ids.map((_, i) => `$${i + 1}`).join(', ');
    const result = await sql.query(`DELETE FROM stories WHERE id IN (${placeholders})`, ids);
    return result.rowCount || 0;
  } catch (error) {
    console.error('Error deleting stories:', error);
    throw error;
  }
}

/**
 * Get all gallery items
 */
export async function getAllGalleryItems(): Promise<GalleryItem[]> {
  try {
    const { rows } = await sql<GalleryItem>`
      SELECT * FROM gallery_items 
      ORDER BY created_at DESC
    `;
    return rows;
  } catch (error) {
    console.error('Error fetching all gallery items:', error);
    throw error;
  }
}

/**
 * Get gallery items by category
 */
export async function getGalleryItemsByCategory(category: string): Promise<GalleryItem[]> {
  try {
    const { rows } = await sql<GalleryItem>`
      SELECT * FROM gallery_items 
      WHERE category = ${category}
      ORDER BY created_at DESC
    `;
    return rows;
  } catch (error) {
    console.error('Error fetching gallery items by category:', error);
    throw error;
  }
}

/**
 * Add multiple gallery items
 */
export async function addGalleryItems(
  items: Array<{
    category: string;
    media_type: 'image' | 'video';
    url: string;
    title?: string;
    date?: string;
    created_by?: string;
  }>,
  defaultCreatedBy?: string
): Promise<GalleryItem[]> {
  try {
    const insertedItems: GalleryItem[] = [];
    
    for (const item of items) {
      const { rows } = await sql<GalleryItem>`
        INSERT INTO gallery_items (
          category, media_type, url, title, date, created_by, updated_by
        ) VALUES (
          ${item.category},
          ${item.media_type},
          ${item.url},
          ${item.title || 'Untitled'},
          ${item.date || new Date().toISOString().split('T')[0]},
          ${item.created_by || defaultCreatedBy || null},
          ${item.created_by || defaultCreatedBy || null}
        )
        RETURNING *
      `;
      insertedItems.push(rows[0]);
    }
    
    return insertedItems;
  } catch (error) {
    console.error('Error adding gallery items:', error);
    throw error;
  }
}

/**
 * Update a gallery item
 */
export async function updateGalleryItem(
  id: number,
  updates: {
    category?: string;
    media_type?: 'image' | 'video';
    url?: string;
    title?: string;
    date?: string;
  }
): Promise<GalleryItem> {
  try {
    const setClauses: string[] = [];
    const values: any[] = [];
    let paramIndex = 1;

    if (updates.category !== undefined) {
      setClauses.push(`category = $${paramIndex++}`);
      values.push(updates.category);
    }
    if (updates.media_type !== undefined) {
      setClauses.push(`media_type = $${paramIndex++}`);
      values.push(updates.media_type);
    }
    if (updates.url !== undefined) {
      setClauses.push(`url = $${paramIndex++}`);
      values.push(updates.url);
    }
    if (updates.title !== undefined) {
      setClauses.push(`title = $${paramIndex++}`);
      values.push(updates.title);
    }
    if (updates.date !== undefined) {
      setClauses.push(`date = $${paramIndex++}`);
      values.push(updates.date);
    }

    setClauses.push(`updated_at = CURRENT_TIMESTAMP`);
    values.push(id);

    const query = `
      UPDATE gallery_items 
      SET ${setClauses.join(', ')}
      WHERE id = $${paramIndex}
      RETURNING *
    `;

    const { rows } = await sql.query<GalleryItem>(query, values);
    return rows[0];
  } catch (error) {
    console.error('Error updating gallery item:', error);
    throw error;
  }
}

/**
 * Delete gallery items by IDs
 */
export async function deleteGalleryItems(ids: number[]): Promise<number> {
  try {
    if (ids.length === 0) {
      return 0;
    }

    // Create placeholders for the IN clause
    const placeholders = ids.map((_, index) => `$${index + 1}`).join(', ');
    const query = `DELETE FROM gallery_items WHERE id IN (${placeholders})`;
    
    const result = await sql.query(query, ids);
    return result.rowCount || 0;
  } catch (error) {
    console.error('Error deleting gallery items:', error);
    throw error;
  }
}
