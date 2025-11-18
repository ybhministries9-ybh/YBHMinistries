import { NextResponse } from 'next/server';
import { getAllStories } from '@/lib/db';

export async function GET() {
  try {
    const stories = await getAllStories();
    // Return visible stories for the public site (do not require 'Approved' status)
    const filtered = stories.filter(s => s.is_visible);
    return NextResponse.json({ success: true, data: filtered });
  } catch (err) {
    console.error('GET /api/stories error', err);
    return NextResponse.json({ success: false, error: 'Failed to fetch stories' }, { status: 500 });
  }
}
