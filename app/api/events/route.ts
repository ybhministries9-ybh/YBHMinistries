import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { parseKeyFromUrl, getPresignedGetUrl } from '@/lib/r2';

/**
 * GET /api/events
 * Public endpoint to fetch upcoming published events
 * Query params: none (returns all upcoming published events)
 */
export async function GET(request: NextRequest) {
  try {
    // Fetch all upcoming published events ordered by date
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
        video_url as "videoUrl",
        speakers,
        what_to_bring as "whatToBring",
        registration_enabled as "registrationEnabled",
        "24hrsworship_enabled" as "enable24hrWorshipForm",
        registration_description as "registrationDescription",
        national_fee as "nationalFee",
        international_fee as "internationalFee",
        registration_fee as "registrationFee"
      FROM events
      WHERE date >= CURRENT_DATE AND published = true
      ORDER BY date ASC
    `;

    // Transform the data to match the frontend Event interface
    const events = result.rows.map(row => ({
      id: row.id,
      title: row.title,
      date: row.date instanceof Date 
        ? `${row.date.getFullYear()}-${String(row.date.getMonth() + 1).padStart(2, '0')}-${String(row.date.getDate()).padStart(2, '0')}`
        : row.date, // Format as YYYY-MM-DD using local date components
      time: row.time,
      location: row.location,
      type: row.type,
      description: row.description,
      extendedDescription: row.extendedDescription,
      capacity: row.capacity,
      imageUrl: row.imageUrl,
      videoUrl: row.videoUrl || '',
      speakers: row.speakers || [],
      whatToBring: row.whatToBring || [],
      registration: {
        enabled: row.registrationEnabled || false,
        enable24hrWorshipForm: row.enable24hrWorshipForm || false,
        description: row.registrationDescription,
        nationalFee: row.nationalFee,
        internationalFee: row.internationalFee,
        registrationFee: row.registrationFee
      }
    }));

    // Resolve any R2 references to presigned HTTPS URLs so browsers can load them
    for (const ev of events) {
      try {
        if (typeof ev.imageUrl === 'string' && ev.imageUrl.startsWith('r2://')) {
          const parsed = parseKeyFromUrl(ev.imageUrl);
          if (parsed && parsed.key) {
            try {
              const presigned = await getPresignedGetUrl(parsed.key, 3600, parsed.bucket || undefined);
              ev.imageUrl = presigned;
            } catch (e) {
              // leave original imageUrl if presign fails
              console.warn('presign get failed for event image', e);
            }
          }
        }
      } catch (e) {
        // ignore per-event errors
      }
    }

    return NextResponse.json({
      success: true,
      data: events,
      count: events.length
    });

  } catch (error) {
    console.error('Error fetching events:', error);
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
