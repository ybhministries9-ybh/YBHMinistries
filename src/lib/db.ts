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
        image_url, display_order, created_by
      ) VALUES (
        ${blobUrl}, 
        ${displayOrder},
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
    // Deactivate all existing videos
    await sql`UPDATE home_video SET is_active = false`;

    // Insert new video
    const { rows } = await sql<HomeVideo>`
      INSERT INTO home_video (
        video_url, thumbnail_image_url, created_by
      ) VALUES (
        ${blobUrl}, 
        ${thumbnailUrl || null},
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
