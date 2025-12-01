import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { getVisibleApprovedStories } from '@/lib/db';
import { parseKeyFromUrl, getPresignedGetUrl, headObject, getPublicUrl } from '@/lib/r2';
import { sanitizeInput, requireJson, checkBodySize, rateLimit } from '@/lib/security';
import { storySchema } from '@/lib/schemas';

export async function GET() {
  try {
    // Use targeted DB query to fetch only public-facing stories.
    const stories = await getVisibleApprovedStories();
    // convert thumbnail_url (r2:// refs) to signed URLs or public URLs for client display
    const enhanced = await Promise.all(stories.map(async (s: any) => {
      if (!s?.thumbnail_url) return s;
      const raw = s.thumbnail_url;
      if (raw.startsWith('http://') || raw.startsWith('https://')) return { ...s, thumbnail_url: raw };
      const parsed = parseKeyFromUrl(raw);
      if (!parsed?.key) return { ...s };
      try {
        const head = await headObject(parsed.key, parsed.bucket || undefined);
        if (!head) return { ...s };
        const url = await getPresignedGetUrl(parsed.key, 3600, parsed.bucket || undefined);
        return { ...s, thumbnail_url: url };
      } catch (e) {
        try {
          const pub = getPublicUrl(parsed.key, parsed.bucket || undefined);
          if (pub && !pub.startsWith('r2://')) return { ...s, thumbnail_url: pub };
        } catch (err) {}
        return { ...s };
      }
    }));
    return NextResponse.json({ success: true, data: enhanced });
  } catch (err) {
    console.error('GET /api/stories error', err);
    return NextResponse.json({ success: false, error: 'Failed to fetch stories' }, { status: 500 });
  }
}

// Public submission endpoint for testimonies
export async function POST(request: Request) {
  try {
    if (!requireJson(request)) return NextResponse.json({ success: false, error: 'Content-Type must be application/json' }, { status: 400 });
    if (!checkBodySize(request, 128 * 1024)) return NextResponse.json({ success: false, error: 'Payload too large' }, { status: 413 });

    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || 'unknown';
    const rl = await rateLimit(`stories:${ip}`, 10, 60 * 60 * 1000);
    if (!rl.ok) return NextResponse.json({ success: false, error: 'Too many requests' }, { status: 429 });

    const body = await request.json();
    // Basic server-side validation & sanitization
    const name = sanitizeInput(body.name, 100);
    const email = sanitizeInput(body.email, 254);
    const role = sanitizeInput(body.role, 50);
    const categoryKey = sanitizeInput(body.category, 50);
    const location = sanitizeInput(body.location, 100);
    const testimony = sanitizeInput(body.testimony, 5000);

    const parsed = storySchema.safeParse({ name, email: email || undefined, role, category: categoryKey, location, testimony });
    if (!parsed.success) return NextResponse.json({ success: false, error: 'validation_error', details: parsed.error.format() }, { status: 400 });
    // email optional but validate if present
    if (email) {
      const emailRe = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      if (!emailRe.test(email)) return NextResponse.json({ success: false, error: 'Invalid email' }, { status: 400 });
    }
    if (!role || role.length < 2) return NextResponse.json({ success: false, error: 'Invalid role' }, { status: 400 });
    if (!categoryKey) return NextResponse.json({ success: false, error: 'Category is required' }, { status: 400 });
    if (!location || location.length < 2) return NextResponse.json({ success: false, error: 'Invalid location' }, { status: 400 });
    if (!testimony || testimony.length < 50) return NextResponse.json({ success: false, error: 'Testimony is too short' }, { status: 400 });

    // Map category key to display name (server-side canonical mapping)
    const TAB_TO_CATEGORY: Record<string, string> = {
      guinness: 'Guinness World Records',
      asian: 'Asian Book of Records',
      ingenious: 'Ingenious Charm World Record',
      songwriting: 'Song Writing Classes',
      bibleschool: 'Bible School Training',
      hallel: 'Hallel Summer Kids Training'
    };

    const category = TAB_TO_CATEGORY[categoryKey] || categoryKey;

    // reCAPTCHA removed: not enforced

    // Insert into DB with prepared statements (sql tagged template) and mark as In-Review and text media
    const date = new Date().toISOString().split('T')[0];
    const { rows } = await sql`
      INSERT INTO stories (title, date, location, category, role, body, media_type, video_url, thumbnail_url, status, is_visible, email, created_by, updated_by)
      VALUES (
        ${name}, ${date}, ${location}, ${category}, ${role}, ${testimony}, 'text', NULL, NULL, 'In-Review', false, ${email || null}, 'admin', 'admin'
      ) RETURNING *
    `;

    const created = rows[0];
    return NextResponse.json({ success: true, data: created }, { status: 201 });
  } catch (err) {
    console.error('POST /api/stories error', err);
    return NextResponse.json({ success: false, error: 'Failed to create story' }, { status: 500 });
  }
}
