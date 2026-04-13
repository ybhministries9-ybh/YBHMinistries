import { sql } from '@vercel/postgres';
import { logger } from './logger';

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
    logger.error('Database connection failed', error);
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
    logger.error('Error fetching hero images', error);
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
    logger.error('Error fetching home video', error);
    throw error;
  }
}

/**
 * Create a new hero image
 */
export async function createHeroImage(
  blobUrl: string,
  mobileBlobUrl?: string | null,
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
        image_url, mobile_image_url, display_order, created_by, updated_by
      ) VALUES (
        ${blobUrl}, 
        ${mobileBlobUrl || null},
        ${displayOrder},
        ${createdBy || null},
        ${createdBy || null}
      )
      RETURNING *
    `;
    return rows[0];
  } catch (error) {
    logger.error('Error creating hero image', error);
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
    logger.error('Error updating hero image', error);
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
    logger.error('Error deleting hero image', error);
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
    logger.error('Error deleting hero images', error);
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
    logger.error('Error reordering hero images', error);
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
    logger.error('Error upserting home video', error);
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
    logger.error('Error deleting home video', error);
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
    logger.error('Error fetching about hero image', error);
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
    logger.error('Error upserting about hero image', error);
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
    logger.error('Error deleting about hero image', error);
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
  thumbnail_url?: string | null;
  medium_url?: string | null;
}

export interface Story {
  id: number;
  title: string;
  date?: string | null;
  location: string | null;
  category?: string | null;
  role?: string | null;
  body: string | null;
  email?: string | null;
  phone?: string | null;
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

export interface HMSStudentRecord {
  id: number;
  full_name: string;
  date_of_birth: string;
  gender: string;
  address?: string | null;
  city_state_zip?: string | null;
  phone_number?: string | null;
  email?: string | null;
  parent_guardian_name?: string | null;
  parent_guardian_contact?: string | null;

  program_applying_for?: any[] | null;
  instrument_specialization?: any[] | null;
  instrument_other?: string | null;
  preferred_class_type?: any[] | null;
  preferred_schedule?: any[] | null;
  course_type?: any[] | null;

  years_of_experience?: number | null;
  previous_training?: string | null;
  music_exam_certifications?: string | null;
  performance_experience?: any[] | null;
  performance_other?: string | null;

  goals?: string | null;

  volunteer_interested?: boolean;
  volunteer_areas?: any[] | null;

  emergency_name: string;
  emergency_relationship: string;
  emergency_contact: string;

  status?: string;
  created_at?: string;
  updated_at?: string;
}

/**
 * Persist a new HMS student enrolment record into the database
 */
export async function createHMSStudent(payload: {
  full_name: string;
  date_of_birth: string;
  gender: string;
  address?: string | null;
  city_state_zip?: string | null;
  phone_number?: string | null;
  email?: string | null;
  parent_guardian_name?: string | null;
  parent_guardian_contact?: string | null;

  program_applying_for?: any[] | null;
  instrument_specialization?: any[] | null;
  instrument_other?: string | null;
  preferred_class_type?: any[] | null;
  preferred_schedule?: any[] | null;
  course_type?: any[] | null;

  years_of_experience?: number | null;
  previous_training?: string | null;
  music_exam_certifications?: string | null;
  performance_experience?: any[] | null;
  performance_other?: string | null;

  goals?: string | null;

  volunteer_interested?: boolean;
  volunteer_areas?: any[] | null;

  emergency_name: string;
  emergency_relationship: string;
  emergency_contact: string;
  hear_about_us?: string | null;
  other_hear_about_us?: string | null;
  createdBy?: string | null;
}): Promise<HMSStudentRecord> {
  try {
    const { rows } = await sql<HMSStudentRecord>`
      INSERT INTO hms_students (
        full_name, date_of_birth, gender, address, city_state_zip, phone_number, email, parent_guardian_name, parent_guardian_contact,
        program_applying_for, instrument_specialization, instrument_other, preferred_class_type, preferred_schedule, course_type,
        years_of_experience, previous_training, music_exam_certifications, performance_experience, performance_other,
        goals, volunteer_interested, volunteer_areas,
        emergency_name, emergency_relationship, emergency_contact,
        hear_about_us, other_hear_about_us,
        status, created_by, updated_by
      ) VALUES (
        ${payload.full_name}, ${payload.date_of_birth}, ${payload.gender}, ${payload.address || null}, ${payload.city_state_zip || null}, ${payload.phone_number || null}, ${payload.email || null}, ${payload.parent_guardian_name || null}, ${payload.parent_guardian_contact || null},
        ${payload.program_applying_for ? JSON.stringify(payload.program_applying_for) : null}, ${payload.instrument_specialization ? JSON.stringify(payload.instrument_specialization) : null}, ${payload.instrument_other || null}, ${payload.preferred_class_type ? JSON.stringify(payload.preferred_class_type) : null}, ${payload.preferred_schedule ? JSON.stringify(payload.preferred_schedule) : null}, ${payload.course_type ? JSON.stringify(payload.course_type) : null},
        ${payload.years_of_experience || null}, ${payload.previous_training || null}, ${payload.music_exam_certifications || null}, ${payload.performance_experience ? JSON.stringify(payload.performance_experience) : null}, ${payload.performance_other || null},
        ${payload.goals || null}, ${payload.volunteer_interested || false}, ${payload.volunteer_areas ? JSON.stringify(payload.volunteer_areas) : null},
        ${payload.emergency_name}, ${payload.emergency_relationship}, ${payload.emergency_contact},
        ${payload.hear_about_us || 'Unknown'}, ${payload.other_hear_about_us || null},
        'Submitted', ${payload.createdBy || null}, ${payload.createdBy || null}
      ) RETURNING *
    `;

    return rows[0];
  } catch (error) {
    logger.error('Error creating HMS student record:', error);
    throw error;
  }
}

/**
 * Persist a Get In Touch submission
 */
export async function createGetInTouch(payload: {
  name: string;
  email?: string | null;
  message: string;
  phone: string;
  location?: string | null;
  user_agent?: string | null;
  hearAboutUs?: string | null;
  otherHearAboutUs?: string | null;
  createdBy?: string | null;
}) {
  try {
    // No debug logging here to avoid leaking data in logs.
    const { rows } = await sql`
      INSERT INTO get_in_touch (
        name, email, phone, message, location, hear_about_us, other_hear_about_us, user_agent, status, created_by, updated_by
      ) VALUES (
        ${payload.name}, ${payload.email || null}, ${payload.phone}, ${payload.message}, ${payload.location || null}, ${payload.hearAboutUs || 'Unknown'}, ${payload.otherHearAboutUs || null}, ${payload.user_agent || null}, 'Submitted', ${payload.createdBy ?? 'public'}, ${payload.createdBy ?? 'public'}
      ) RETURNING *
    `;
    return rows[0];
  } catch (error) {
    logger.error('Error creating get_in_touch record:', error);
    // Re-throw with additional context for the API route to surface in non-prod
    throw new Error(`DB createGetInTouch error: ${error && (error as any).message ? (error as any).message : String(error)}`);
  }
}

/**
 * Persist a Worship24 booking submission
 */
export async function createWorship24(payload: {
  name: string;
  email?: string | null;
  phone: string;
  location?: string | null;
  message: string;
  booking_date: string; // YYYY-MM-DD
  timeslot: string;
  facebook_link?: string | null;
  user_agent?: string | null;
  createdBy?: string | null;
}) {
  try {
    const { rows } = await sql`
      INSERT INTO worship24 (
        name, email, phone, location, message, booking_date, timeslot, facebook_link, user_agent, status, created_by, updated_by
      ) VALUES (
        ${payload.name}, ${payload.email || null}, ${payload.phone}, ${payload.location || null}, ${payload.message}, ${payload.booking_date}, ${payload.timeslot}, ${payload.facebook_link || null}, ${payload.user_agent || null}, 'Submitted', ${payload.createdBy ?? 'public'}, ${payload.createdBy ?? 'public'}
      ) RETURNING *
    `;
    return rows[0];
  } catch (error) {
    logger.error('Error creating worship24 record:', error);
    throw new Error(`DB createWorship24 error: ${error && (error as any).message ? (error as any).message : String(error)}`);
  }
}

export async function getWorship24(opts?: { limit?: number; offset?: number; q?: string; month?: string; year?: string; status?: string }) {
  try {
    const limit = opts?.limit || 50;
    const offset = opts?.offset || 0;

    const conditions: string[] = [];
    const values: any[] = [];
    let valueIndex = 1;

    if (opts?.q && String(opts.q).trim().length > 0) {
      const q = `%${String(opts.q).trim()}%`;
      // Search only the fields stored on worship24 submissions.
      conditions.push(`(name ILIKE $${valueIndex} OR email ILIKE $${valueIndex + 1} OR phone ILIKE $${valueIndex + 2} OR location ILIKE $${valueIndex + 3})`);
      values.push(q, q, q, q);
      valueIndex += 4;
    }

    // Add status filter
    if (opts?.status && opts.status.trim().length > 0) {
      conditions.push(`status = $${valueIndex}`);
      values.push(opts.status.trim());
      valueIndex += 1;
    }

    // Filter by booking_date (not created_at). Support month+year, year-only, and month-only filters.
    if (opts?.month && opts?.year) {
      const startDate = `${opts.year}-${String(opts.month).padStart(2, '0')}-01`;
      const nextMonth = parseInt(opts.month) === 12 ? 1 : parseInt(opts.month) + 1;
      const nextYear = parseInt(opts.month) === 12 ? parseInt(opts.year) + 1 : parseInt(opts.year);
      const endDate = `${nextYear}-${String(nextMonth).padStart(2, '0')}-01`;
      conditions.push(`DATE(booking_date AT TIME ZONE 'UTC' AT TIME ZONE 'Asia/Kolkata') >= $${valueIndex} AND DATE(booking_date AT TIME ZONE 'UTC' AT TIME ZONE 'Asia/Kolkata') < $${valueIndex + 1}`);
      values.push(startDate, endDate);
      valueIndex += 2;
    } else if (opts?.year) {
      const startDate = `${opts.year}-01-01`;
      const endDate = `${parseInt(opts.year) + 1}-01-01`;
      conditions.push(`DATE(booking_date AT TIME ZONE 'UTC' AT TIME ZONE 'Asia/Kolkata') >= $${valueIndex} AND DATE(booking_date AT TIME ZONE 'UTC' AT TIME ZONE 'Asia/Kolkata') < $${valueIndex + 1}`);
      values.push(startDate, endDate);
      valueIndex += 2;
    } else if (opts?.month) {
      // month-only filter across all years
      const m = parseInt(String(opts.month));
      if (!Number.isNaN(m) && m >= 1 && m <= 12) {
        conditions.push(`EXTRACT(MONTH FROM (booking_date AT TIME ZONE 'UTC' AT TIME ZONE 'Asia/Kolkata')) = $${valueIndex}`);
        values.push(m);
        valueIndex += 1;
      }
    }

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

    const countQuery = `SELECT COUNT(*) as count FROM worship24 ${whereClause}`;
    const countResult = await sql.query(countQuery, values.length > 0 ? values : undefined);
    const total = Number(countResult.rows[0]?.count || 0);

    values.push(limit, offset);
    const query = `
      SELECT id, name, email, phone, message, location, booking_date, timeslot, facebook_link, user_agent, status, created_at, updated_at
      FROM worship24
      ${whereClause}
      ORDER BY created_at DESC
      LIMIT $${valueIndex} OFFSET $${valueIndex + 1}
    `;
    const result = await sql.query(query, values);
    return { rows: result.rows, total };
  } catch (error) {
    logger.error('Error fetching worship24 records:', error);
    throw error;
  }
}

export async function getWorship24ById(id: number) {
  try {
    const { rows } = await sql`
      SELECT id, name, email, phone, message, location, booking_date, timeslot, facebook_link, user_agent, status, created_at, updated_at
      FROM worship24
      WHERE id = ${id}
      LIMIT 1
    `;
    return rows[0] || null;
  } catch (error) {
    logger.error('Error fetching worship24 by id:', error);
    throw error;
  }
}

export async function deleteWorship24(id: number): Promise<boolean> {
  try {
    const { rowCount } = await sql`DELETE FROM worship24 WHERE id = ${id}`;
    return (rowCount ?? 0) > 0;
  } catch (error) {
    logger.error('Error deleting worship24:', error);
    throw error;
  }
}

export async function updateWorship24(id: number, updates: Partial<{ status: string; updated_by: string | null }>) {
  try {
    const setClauses: string[] = [];
    const values: any[] = [];
    let idx = 1;

    if (updates.status !== undefined) {
      setClauses.push(`status = $${idx++}`);
      values.push(updates.status);
    }
    if (updates.updated_by !== undefined) {
      setClauses.push(`updated_by = $${idx++}`);
      values.push(updates.updated_by);
    }

    if (setClauses.length === 0) {
      const { rows } = await sql`SELECT * FROM worship24 WHERE id = ${id} LIMIT 1`;
      return rows[0] || null;
    }

    setClauses.push(`updated_at = CURRENT_TIMESTAMP`);
    const query = `UPDATE worship24 SET ${setClauses.join(', ')} WHERE id = $${idx} RETURNING *`;
    values.push(id);

    const result = await sql.query(query, values);
    return result.rows[0] || null;
  } catch (error) {
    logger.error('Error updating worship24:', error);
    throw error;
  }
}

export async function getWorship24Years() {
  try {
    const result = await sql`
      SELECT DISTINCT EXTRACT(YEAR FROM booking_date AT TIME ZONE 'UTC' AT TIME ZONE 'Asia/Kolkata') AS year
      FROM worship24
      WHERE booking_date IS NOT NULL
      ORDER BY year DESC
    `;
    return result.rows.map((r: any) => (r.year !== null ? Number(r.year) : null)).filter((y: any) => y != null);
  } catch (error) {
    logger.error('Error fetching worship24 years:', error);
    throw error;
  }
}

/**
 * Get recent Get In Touch submissions for admin listing
 */
export async function getGetInTouch(opts?: { limit?: number; offset?: number; q?: string; month?: string; year?: string; status?: string }) {
  try {
    const limit = opts?.limit || 50;
    const offset = opts?.offset || 0;
    
    const conditions: string[] = [];
    const values: any[] = [];
    let valueIndex = 1;
    
    // Add search filter
    if (opts?.q && String(opts.q).trim().length > 0) {
      const q = `%${String(opts.q).trim()}%`;
      conditions.push(`(name ILIKE $${valueIndex} OR email ILIKE $${valueIndex + 1} OR phone ILIKE $${valueIndex + 2} OR location ILIKE $${valueIndex + 3})`);
      values.push(q, q, q, q);
      valueIndex += 4;
    }
    
    // Add status filter
    if (opts?.status && opts.status.trim().length > 0) {
      conditions.push(`status = $${valueIndex}`);
      values.push(opts.status.trim());
      valueIndex += 1;
    }
    
    // Add month/year filters
    if (opts?.month && opts?.year) {
      const startDate = `${opts.year}-${String(opts.month).padStart(2, '0')}-01`;
      const nextMonth = parseInt(opts.month) === 12 ? 1 : parseInt(opts.month) + 1;
      const nextYear = parseInt(opts.month) === 12 ? parseInt(opts.year) + 1 : parseInt(opts.year);
      const endDate = `${nextYear}-${String(nextMonth).padStart(2, '0')}-01`;
      conditions.push(`DATE(created_at AT TIME ZONE 'UTC' AT TIME ZONE 'Asia/Kolkata') >= $${valueIndex} AND DATE(created_at AT TIME ZONE 'UTC' AT TIME ZONE 'Asia/Kolkata') < $${valueIndex + 1}`);
      values.push(startDate, endDate);
      valueIndex += 2;
    } else if (opts?.year) {
      const startDate = `${opts.year}-01-01`;
      const endDate = `${parseInt(opts.year) + 1}-01-01`;
      conditions.push(`DATE(created_at AT TIME ZONE 'UTC' AT TIME ZONE 'Asia/Kolkata') >= $${valueIndex} AND DATE(created_at AT TIME ZONE 'UTC' AT TIME ZONE 'Asia/Kolkata') < $${valueIndex + 1}`);
      values.push(startDate, endDate);
      valueIndex += 2;
    }
    
    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';
    
    // Get total count
    const countQuery = `SELECT COUNT(*) as count FROM get_in_touch ${whereClause}`;
    const countResult = await sql.query(countQuery, values.length > 0 ? values : undefined);
    const total = Number(countResult.rows[0]?.count || 0);
    
    // Get paginated results
    values.push(limit, offset);
    const query = `
      SELECT id, name, email, phone, message, location, hear_about_us, other_hear_about_us, user_agent, status, created_at, updated_at
      FROM get_in_touch
      ${whereClause}
      ORDER BY created_at DESC
      LIMIT $${valueIndex} OFFSET $${valueIndex + 1}
    `;
    const result = await sql.query(query, values);
    return { rows: result.rows, total };
  } catch (error) {
    logger.error('Error fetching get_in_touch records:', error);
    throw error;
  }
}

export async function getGetInTouchById(id: number) {
  try {
    const { rows } = await sql`
      SELECT id, name, email, phone, message, location, hear_about_us, other_hear_about_us, user_agent, status, created_at, updated_at
      FROM get_in_touch
      WHERE id = ${id}
      LIMIT 1
    `;
    return rows[0] || null;
  } catch (error) {
    logger.error('Error fetching get_in_touch by id:', error);
    throw error;
  }
}

export async function deleteGetInTouch(id: number): Promise<boolean> {
  try {
    const { rowCount } = await sql`DELETE FROM get_in_touch WHERE id = ${id}`;
    return (rowCount ?? 0) > 0;
  } catch (error) {
    logger.error('Error deleting get_in_touch:', error);
    throw error;
  }
}

export async function updateGetInTouch(id: number, updates: Partial<{ status: string; updated_by: string | null }>) {
  try {
    const setClauses: string[] = [];
    const values: any[] = [];
    let idx = 1;

    if (updates.status !== undefined) {
      setClauses.push(`status = $${idx++}`);
      values.push(updates.status);
    }
    if (updates.updated_by !== undefined) {
      setClauses.push(`updated_by = $${idx++}`);
      values.push(updates.updated_by);
    }

    if (setClauses.length === 0) {
      const { rows } = await sql`SELECT * FROM get_in_touch WHERE id = ${id} LIMIT 1`;
      return rows[0] || null;
    }

    setClauses.push(`updated_at = CURRENT_TIMESTAMP`);
    const query = `UPDATE get_in_touch SET ${setClauses.join(', ')} WHERE id = $${idx} RETURNING *`;
    values.push(id);

    const result = await sql.query(query, values);
    return result.rows[0] || null;
  } catch (error) {
    logger.error('Error updating get_in_touch:', error);
    throw error;
  }
}

/**
 * Fetch a page of HMS student enrolments for admin listing
 */
export async function getHMSStudents(opts?: { limit?: number; offset?: number; q?: string; month?: string; year?: string; status?: string }) {
  try {
    const limit = opts?.limit || 50;
    const offset = opts?.offset || 0;
    
    const conditions: string[] = [];
    const values: any[] = [];
    let valueIndex = 1;
    
    // Add search filter
    if (opts?.q && String(opts.q).trim().length > 0) {
      const q = `%${String(opts.q).trim()}%`;
      conditions.push(`(full_name ILIKE $${valueIndex} OR email ILIKE $${valueIndex + 1} OR phone_number ILIKE $${valueIndex + 2})`);
      values.push(q, q, q);
      valueIndex += 3;
    }
    
    // Add status filter
    if (opts?.status && opts.status.trim().length > 0) {
      conditions.push(`status = $${valueIndex}`);
      values.push(opts.status.trim());
      valueIndex += 1;
    }
    
    // Add month/year filters
    if (opts?.month && opts?.year) {
      const startDate = `${opts.year}-${String(opts.month).padStart(2, '0')}-01`;
      const nextMonth = parseInt(opts.month) === 12 ? 1 : parseInt(opts.month) + 1;
      const nextYear = parseInt(opts.month) === 12 ? parseInt(opts.year) + 1 : parseInt(opts.year);
      const endDate = `${nextYear}-${String(nextMonth).padStart(2, '0')}-01`;
      conditions.push(`DATE(created_at AT TIME ZONE 'UTC' AT TIME ZONE 'Asia/Kolkata') >= $${valueIndex} AND DATE(created_at AT TIME ZONE 'UTC' AT TIME ZONE 'Asia/Kolkata') < $${valueIndex + 1}`);
      values.push(startDate, endDate);
      valueIndex += 2;
    } else if (opts?.year) {
      const startDate = `${opts.year}-01-01`;
      const endDate = `${parseInt(opts.year) + 1}-01-01`;
      conditions.push(`DATE(created_at AT TIME ZONE 'UTC' AT TIME ZONE 'Asia/Kolkata') >= $${valueIndex} AND DATE(created_at AT TIME ZONE 'UTC' AT TIME ZONE 'Asia/Kolkata') < $${valueIndex + 1}`);
      values.push(startDate, endDate);
      valueIndex += 2;
    }
    
    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';
    
    // Get total count
    const countQuery = `SELECT COUNT(*) as count FROM hms_students ${whereClause}`;
    const countResult = await sql.query(countQuery, values.length > 0 ? values : undefined);
    const total = Number(countResult.rows[0]?.count || 0);
    
    // Get paginated results
    values.push(limit, offset);
    const query = `
      SELECT *
      FROM hms_students
      ${whereClause}
      ORDER BY created_at DESC
      LIMIT $${valueIndex} OFFSET $${valueIndex + 1}
    `;
    const result = await sql.query(query, values);
    return { rows: result.rows, total };
  } catch (error) {
    logger.error('Error fetching HMS students:', error);
    throw error;
  }
}

export async function getHMSStudentById(id: number) {
  try {
    const { rows } = await sql<HMSStudentRecord>`SELECT * FROM hms_students WHERE id = ${id} LIMIT 1`;
    return rows[0] || null;
  } catch (error) {
    logger.error('Error fetching HMS student by id:', error);
    throw error;
  }
}

export async function updateHMSStudent(id: number, updates: Partial<any>) {
  try {
    const setClauses: string[] = [];
    const values: any[] = [];
    let idx = 1;

    const allowed = [
      'full_name','date_of_birth','gender','address','city_state_zip','phone_number','email','parent_guardian_name','parent_guardian_contact',
      'program_applying_for','instrument_specialization','instrument_other','preferred_class_type','preferred_schedule','course_type',
      'years_of_experience','previous_training','music_exam_certifications','performance_experience','performance_other','goals',
      'volunteer_interested','volunteer_areas','emergency_name','emergency_relationship','emergency_contact','hear_about_us','other_hear_about_us','status','updated_by'
    ];

    for (const key of Object.keys(updates)) {
      if (!allowed.includes(key)) continue;
      let val: any = (updates as any)[key];
      // JSON stringify arrays/objects for storage
      if (Array.isArray(val) || typeof val === 'object') val = JSON.stringify(val);
      setClauses.push(`${key} = $${idx++}`);
      values.push(val);
    }

    if (setClauses.length === 0) {
      const { rows } = await sql<HMSStudentRecord>`SELECT * FROM hms_students WHERE id = ${id} LIMIT 1`;
      return rows[0] || null;
    }

    // always update timestamp
    setClauses.push(`updated_at = CURRENT_TIMESTAMP`);
    const query = `UPDATE hms_students SET ${setClauses.join(', ')} WHERE id = $${idx} RETURNING *`;
    values.push(id);

    const result = await sql.query<HMSStudentRecord>(query, values);
    return result.rows[0];
  } catch (error) {
    logger.error('Error updating HMS student:', error);
    throw error;
  }
}

export async function deleteHMSStudent(id: number): Promise<boolean> {
  try {
    const { rowCount } = await sql`DELETE FROM hms_students WHERE id = ${id}`;
    return (rowCount ?? 0) > 0;
  } catch (error) {
    logger.error('Error deleting HMS student:', error);
    throw error;
  }
}

/** STORIES CRUD **/
export async function getAllStories(): Promise<Story[]> {
  try {
    const { rows } = await sql<Story>`
      SELECT * FROM stories WHERE is_active = true ORDER BY created_at DESC
    `;
    return rows;
  } catch (error) {
    logger.error('Error fetching stories:', error);
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
      SELECT id, title, location, role, status, category, body, media_type, video_url, thumbnail_url, date, created_by, email, phone
      FROM stories
      WHERE is_active = true AND is_visible = true AND status = 'Approved'
      ORDER BY created_at DESC
    `;
    return rows;
  } catch (error) {
    logger.error('Error fetching visible approved stories:', error);
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
  phone?: string | null;
  media_type?: 'text' | 'video';
  video_url?: string | null;
  thumbnail_url?: string | null;
  date?: string | null;
  createdBy?: string | null;
  status?: string;
  is_visible?: boolean;
  featured?: boolean;
}): Promise<Story> {
  try {
    const { rows } = await sql<Story>`
      INSERT INTO stories (
        title, date, location, category, role, body, email, phone, media_type, video_url, thumbnail_url, status, is_visible, created_by, updated_by
      ) VALUES (
        ${payload.title}, ${payload.date || null}, ${payload.location || null}, ${payload.category || null}, ${payload.role || null}, ${payload.body || null}, ${payload.email || null}, ${payload.phone || null}, ${payload.media_type || 'text'}, ${payload.video_url || null}, ${payload.thumbnail_url || null}, ${payload.status || 'Submitted'}, ${typeof payload.is_visible === 'boolean' ? payload.is_visible : true}, ${payload.createdBy || null}, ${payload.createdBy || null}
      ) RETURNING *
    `;
    return rows[0];
  } catch (error) {
    logger.error('Error creating story:', error);
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
  phone: string | null;
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
    if ((updates as any).phone !== undefined) { setClauses.push(`phone = $${idx++}`); values.push((updates as any).phone); }
    if (updates.status !== undefined) { setClauses.push(`status = $${idx++}`); values.push(updates.status); }
    if (updates.is_visible !== undefined) { setClauses.push(`is_visible = $${idx++}`); values.push(updates.is_visible); }
    // NOTE: the `featured` column may not exist in all deployments/databases.
    // We intentionally do not attempt to update `featured` here to avoid SQL errors
    // on schemas that do not include this column. If you need `featured` support,
    // add the column to the `stories` table and re-enable handling.
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
    logger.error('Error updating story:', error);
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
    logger.error('Error deleting stories:', error);
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
    logger.error('Error fetching all gallery items:', error);
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
    logger.error('Error fetching gallery items by category:', error);
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
    thumbnail_url?: string | null;
    medium_url?: string | null;
  }>,
  defaultCreatedBy?: string
): Promise<GalleryItem[]> {
  try {
    const insertedItems: GalleryItem[] = [];
    
    for (const item of items) {
      const { rows } = await sql<GalleryItem>`
        INSERT INTO gallery_items (
          category, media_type, url, title, date, created_by, updated_by, thumbnail_url, medium_url
        ) VALUES (
          ${item.category},
          ${item.media_type},
          ${item.url},
          ${item.title || 'Untitled'},
          ${item.date || new Date().toISOString().split('T')[0]},
          ${item.created_by || defaultCreatedBy || null},
          ${item.created_by || defaultCreatedBy || null},
          ${item.thumbnail_url || null},
          ${item.medium_url || null}
        )
        RETURNING *
      `;
      insertedItems.push(rows[0]);
    }
    
    return insertedItems;
  } catch (error) {
    logger.error('Error adding gallery items:', error);
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
    logger.error('Error updating gallery item:', error);
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
    logger.error('Error deleting gallery items:', error);
    throw error;
  }
}
