import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { getAllStories } from '@/lib/db';

function sanitizeString(input: any, maxLength = 2000) {
  if (!input && input !== 0) return null;
  let s = String(input || '');
  // Strip HTML tags
  s = s.replace(/<[^>]*>/g, '');
  // Trim and collapse whitespace
  s = s.trim().replace(/\s+/g, ' ');
  if (maxLength) s = s.substring(0, maxLength);
  return s;
}

export async function GET() {
  try {
    const stories = await getAllStories();
    // Return visible stories for the public site (only approved)
    const filtered = stories.filter(s => s.is_visible && s.status && s.status.toLowerCase() === 'approved');
    return NextResponse.json({ success: true, data: filtered });
  } catch (err) {
    console.error('GET /api/stories error', err);
    return NextResponse.json({ success: false, error: 'Failed to fetch stories' }, { status: 500 });
  }
}

// Public submission endpoint for testimonies
export async function POST(request: Request) {
  try {
    const body = await request.json();
    // Basic server-side validation & sanitization
    const name = sanitizeString(body.name, 100);
    const email = sanitizeString(body.email, 254);
    const role = sanitizeString(body.role, 50);
    const categoryKey = sanitizeString(body.category, 50);
    const location = sanitizeString(body.location, 100);
    const testimony = sanitizeString(body.testimony, 5000);

    if (!name || name.length < 2) return NextResponse.json({ success: false, error: 'Invalid name' }, { status: 400 });
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
