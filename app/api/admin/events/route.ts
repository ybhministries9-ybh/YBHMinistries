import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { verifySession, getActorName } from '@/lib/sessions';
import { deleteObject, parseKeyFromUrl, PRIVATE_BUCKET } from '@/lib/r2';

/**
 * GET /api/admin/events
 * Admin endpoint to fetch all events (including unpublished)
 */
export async function GET(request: NextRequest) {
  try {
    // allow public reads for events (admin mutations remain protected)

    const result = await sql`
      SELECT 
        id,
        title,
        date,
        time,
        location,
        type,
        description,
        extended_description as "extendedDescription",
        capacity,
        image_url as "imageUrl",
        speakers,
        what_to_bring as "whatToBring",
        registration_enabled as "registrationEnabled",
        registration_description as "registrationDescription",
        national_fee as "nationalFee",
        international_fee as "internationalFee",
        registration_fee as "registrationFee",
        published,
        created_at as "createdAt",
        updated_at as "updatedAt"
      FROM events
      ORDER BY date ASC
    `;

    const events = result.rows.map(row => ({
      id: row.id.toString(),
      title: row.title,
      date: row.date instanceof Date 
        ? `${row.date.getFullYear()}-${String(row.date.getMonth() + 1).padStart(2, '0')}-${String(row.date.getDate()).padStart(2, '0')}`
        : row.date,
      time: row.time,
      location: row.location,
      type: row.type,
      description: row.description,
      extendedDescription: row.extendedDescription,
      capacity: row.capacity,
      imageUrl: row.imageUrl || '',
      speakers: row.speakers || [],
      whatToBring: row.whatToBring || [],
      registration: {
        enabled: row.registrationEnabled || false,
        description: row.registrationDescription || '',
        nationalFee: row.nationalFee,
        internationalFee: row.internationalFee,
        registrationFee: row.registrationFee
      },
      published: row.published || false
    }));

    return NextResponse.json({
      success: true,
      data: events,
      count: events.length
    });

  } catch (error) {
    console.error('Error fetching admin events:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch events',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin/events
 * Create a new event
 */
export async function POST(request: NextRequest) {
  try {
    // verify session and resolve actor
    const auth = request.headers.get('authorization') || '';
    const token = auth.startsWith('Bearer ') ? auth.slice(7) : auth || null;
    const session = await verifySession(token);
    if (!session) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    const actor = await getActorName(token);

    const body = await request.json();
    const {
      title,
      date,
      time,
      location,
      type,
      description,
      extendedDescription,
      capacity,
      imageUrl,
      speakers,
      whatToBring,
      registration,
      published
    } = body;

    // Validate required fields
    if (!title || !date || !time || !location || !type || !description || !extendedDescription || !capacity) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const result = await sql`
      INSERT INTO events (
        title,
        date,
        time,
        location,
        type,
        description,
        extended_description,
        capacity,
        image_url,
        speakers,
        what_to_bring,
        registration_enabled,
        registration_description,
        national_fee,
        international_fee,
        registration_fee,
        published,
        created_by,
        updated_by,
        updated_at
      ) VALUES (
        ${title},
        ${date},
        ${time},
        ${location},
        ${type},
        ${description},
        ${extendedDescription},
        ${capacity},
        ${imageUrl || null},
        ${speakers || []},
        ${whatToBring || []},
        ${registration?.enabled || false},
        ${registration?.description || null},
        ${registration?.nationalFee || null},
        ${registration?.internationalFee || null},
        ${registration?.registrationFee || null},
        ${published !== undefined ? published : true}, ${actor}, ${actor}, CURRENT_TIMESTAMP
      )
      RETURNING id
    `;

    return NextResponse.json({
      success: true,
      data: { id: result.rows[0].id },
      message: 'Event created successfully'
    });

  } catch (error) {
    console.error('Error creating event:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to create event',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/admin/events
 * Update an existing event
 */
export async function PUT(request: NextRequest) {
  try {
    // verify session and resolve actor
    const auth = request.headers.get('authorization') || '';
    const token = auth.startsWith('Bearer ') ? auth.slice(7) : auth || null;
    const session = await verifySession(token);
    if (!session) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    const actor = await getActorName(token);

    const body = await request.json();
    const {
      id,
      title,
      date,
      time,
      location,
      type,
      description,
      extendedDescription,
      capacity,
      imageUrl,
      speakers,
      whatToBring,
      registration,
      published
    } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Event ID is required' },
        { status: 400 }
      );
    }

    // If the imageUrl is changing, attempt to delete the previous R2 object
    try {
      const prevRes = await sql`SELECT image_url FROM events WHERE id = ${id}`;
      const prevUrl = prevRes.rows?.[0]?.image_url;
      if (prevUrl && prevUrl !== imageUrl) {
        const parsed = parseKeyFromUrl(prevUrl);
        if (parsed && parsed.key) {
          try {
            await deleteObject(parsed.key, parsed.bucket || PRIVATE_BUCKET);
          } catch (e) {
            // Log but don't fail the whole update if delete fails
            console.warn('Failed to delete previous event image from R2', e);
          }
        }
      }
    } catch (e) {
      console.warn('Error checking previous event image for deletion', e);
    }
    await sql`
      UPDATE events
      SET
        title = ${title},
        date = ${date},
        time = ${time},
        location = ${location},
        type = ${type},
        description = ${description},
        extended_description = ${extendedDescription},
        capacity = ${capacity},
        image_url = ${imageUrl || null},
        speakers = ${speakers || []},
        what_to_bring = ${whatToBring || []},
        registration_enabled = ${registration?.enabled || false},
        registration_description = ${registration?.description || null},
        national_fee = ${registration?.nationalFee || null},
        international_fee = ${registration?.internationalFee || null},
        registration_fee = ${registration?.registrationFee || null},
        published = ${published !== undefined ? published : true},
        updated_at = CURRENT_TIMESTAMP,
        updated_by = ${actor}
      WHERE id = ${id}
    `;

    return NextResponse.json({
      success: true,
      message: 'Event updated successfully'
    });

  } catch (error) {
    console.error('Error updating event:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to update event',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/admin/events
 * Delete an event by ID
 */
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Event ID is required' },
        { status: 400 }
      );
    }

    // verify session for delete
    const auth = request.headers.get('authorization') || '';
    const token = auth.startsWith('Bearer ') ? auth.slice(7) : auth || null;
    const session = await verifySession(token);
    if (!session) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });

    // Attempt to delete the stored image from R2 (if any) before removing DB record
    try {
      const prevRes = await sql`SELECT image_url FROM events WHERE id = ${id}`;
      const prevUrl = prevRes.rows?.[0]?.image_url;
      if (prevUrl) {
        const parsed = parseKeyFromUrl(prevUrl);
        if (parsed && parsed.key) {
          try {
            await deleteObject(parsed.key, parsed.bucket || PRIVATE_BUCKET);
          } catch (e) {
            console.warn('Failed to delete event image from R2 during event delete', e);
          }
        }
      }
    } catch (e) {
      console.warn('Error while attempting to delete event image before DB delete', e);
    }

    await sql`DELETE FROM events WHERE id = ${id}`;

    return NextResponse.json({
      success: true,
      message: 'Event deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting event:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to delete event',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
