import { NextResponse } from 'next/server';

// Simple in-memory cache for serverless lifetime (TTL 24 hours)
const cache = new Map<string, { value: any; expires: number }>();

export async function GET(req: Request, context: any) {
  // Support both plain params and Promise-wrapped params (Next.js types differ between versions)
  let id: string | undefined;
  try {
    if (context && context.params) {
      const p = context.params;
      // If params is a Promise (some Next versions), await it
      const resolved = typeof p.then === 'function' ? await p : p;
      id = resolved?.id;
    }
  } catch (e) {
    // ignore
  }
  if (!id) {
    return NextResponse.json({ error: 'Missing id param' }, { status: 400 });
  }
  const key = process.env.YOUTUBE_API_KEY;
  if (!key) {
    return NextResponse.json({ error: 'Missing YouTube API key' }, { status: 500 });
  }

  const now = Date.now();
  const cached = cache.get(id);
  if (cached && cached.expires > now) {
    return NextResponse.json(cached.value);
  }

  try {
    const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&id=${encodeURIComponent(id)}&key=${encodeURIComponent(key)}`;
    const res = await fetch(url);
    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json({ error: 'YouTube API error', details: text }, { status: res.status });
    }
    const json = await res.json();
    const item = json.items?.[0] || null;
    const value = {
      publishedAt: item?.snippet?.publishedAt || null,
      duration: item?.contentDetails?.duration || null,
      title: item?.snippet?.title || null
    };

    // Cache for 24 hours
    cache.set(id, { value, expires: now + 1000 * 60 * 60 * 24 });
    return NextResponse.json(value);
  } catch (err) {
    return NextResponse.json({ error: 'Unexpected error', details: String(err) }, { status: 500 });
  }
}
