import { NextRequest, NextResponse } from 'next/server';
import { getAllStories, createStory, updateStory, deleteStories } from '@/lib/db';
import { parseKeyFromUrl, getPresignedGetUrl, headObject, getPublicUrl, deleteObject } from '@/lib/r2';
import { del } from '@/lib/vercelBlob';
import { resolveSessionAndActorFromAuthHeader } from '@/lib/sessions';
import { sql } from '@vercel/postgres';

export async function GET() {
  try {
    const stories = await getAllStories();
    // Enrich stories with signed URL for thumbnail to enable admin preview of private objects
    const enhanced = await Promise.all(stories.map(async (s: any) => {
      if (!s?.thumbnail_url) return s;
      const val = s.thumbnail_url;
      // If it's already an absolute URL, leave it
      if (val.startsWith('http://') || val.startsWith('https://')) return { ...s, signedThumbUrl: val };
      const parsed = parseKeyFromUrl(val);
      if (parsed?.key) {
        try {
          const head = await headObject(parsed.key, parsed.bucket || undefined);
          if (!head) return { ...s };
          const url = await getPresignedGetUrl(parsed.key, 3600, parsed.bucket || undefined);
          return { ...s, signedThumbUrl: url };
        } catch (e) {
          // Fallback: try to build a public url using getPublicUrl
          try {
            const pub = getPublicUrl(parsed.key, parsed.bucket || undefined);
            if (pub && !pub.startsWith('r2://')) return { ...s, signedThumbUrl: pub };
          } catch (err) {}
          return { ...s };
        }
      }
      return { ...s };
    }));
    return NextResponse.json({ success: true, data: enhanced });
  } catch (err: any) {
    console.error('GET /api/admin/stories error', err);
    return NextResponse.json({ success: false, error: 'Failed to fetch stories' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const resolved = await resolveSessionAndActorFromAuthHeader(request.headers.get('authorization') || '');
    if (!resolved) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    const { actor } = resolved;

    const body = await request.json();
    // Basic validation to avoid DB constraint errors
    const title = String(body.title || '').trim();
    if (!title) {
      return NextResponse.json({ success: false, error: 'Title is required' }, { status: 400 });
    }
    if (title.length > 255) {
      return NextResponse.json({ success: false, error: 'Title too long (max 255 characters)' }, { status: 400 });
    }
    const story = await createStory({
      title,
      location: body.location || body.summary || null,
      category: body.category || null,
      role: body.role || null,
      body: body.body || null,
      // include optional email for text stories
      email: body.email || null,
      media_type: body.media_type === 'video' ? 'video' : 'text',
      video_url: body.video_url || null,
      thumbnail_url: body.thumbnail_url || null,
      date: body.date || null,
      // include status/visibility/featured if provided by UI (defaults handled in createStory)
      status: body.status || undefined,
      is_visible: typeof body.is_visible === 'boolean' ? body.is_visible : undefined,
      featured: typeof body.featured === 'boolean' ? body.featured : undefined,
      createdBy: actor || null,
    });

    // Attach signed URL to response if we can
    try {
      if (story.thumbnail_url) {
        const parsed = parseKeyFromUrl(story.thumbnail_url);
        if (parsed?.key) {
          const head = await headObject(parsed.key, parsed.bucket || undefined);
          if (head) {
            const signedUrl = await getPresignedGetUrl(parsed.key, 3600, parsed.bucket || undefined);
            (story as any).signedThumbUrl = signedUrl;
          }
        }
      }
    } catch (e) {}
    return NextResponse.json({ success: true, data: story });
  } catch (err: any) {
    console.error('POST /api/admin/stories error', err);
    return NextResponse.json({ success: false, error: 'Failed to create story' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const resolved = await resolveSessionAndActorFromAuthHeader(request.headers.get('authorization') || '');
    if (!resolved) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    const { actor } = resolved;

    const body = await request.json();
    const id = Number(body.id || body.storyId);
    if (!id) return NextResponse.json({ success: false, error: 'Missing id' }, { status: 400 });

    const updates: any = { ...body };
    // ensure updated_by for audit
    updates.updated_by = actor || null;

    // Fetch existing row so we can delete the previous thumbnail when it changes
    const { rows: currentRows } = await sql`SELECT id, thumbnail_url FROM stories WHERE id = ${id}`;
    const currentRow = currentRows[0] || {};

    const updated = await updateStory(id, updates);
    // Attach signed URL if available
    try {
      if (updated.thumbnail_url) {
        const parsed = parseKeyFromUrl(updated.thumbnail_url);
        if (parsed?.key) {
          const head = await headObject(parsed.key, parsed.bucket || undefined);
          if (head) {
            const signedUrl = await getPresignedGetUrl(parsed.key, 3600, parsed.bucket || undefined);
            (updated as any).signedThumbUrl = signedUrl;
          }
        }
      }
    } catch (e) {}
    // If thumbnail changed, delete the old thumbnail from storage (best-effort)
    try {
      const old = currentRow.thumbnail_url;
      const now = updated.thumbnail_url;
      if (old && old !== now) {
        if (old.includes('blob.vercel-storage.com')) {
          // Vercel blob deletion
          try { await del(old).catch(err => console.error('Failed deleting vercel blob', old, err)); } catch (err) { console.error('Failed to del vercel blob (outer)', err); }
        } else {
          const parsedOld = parseKeyFromUrl(old);
          if (parsedOld?.key) {
            try { await deleteObject(parsedOld.key, parsedOld.bucket || undefined).catch(err => console.error('Failed deleting r2 object', parsedOld, err)); } catch (err) { console.error('Failed deleteObject (outer)', err); }
          }
        }
      }
    } catch (e) {
      console.error('Failed deleting previous story thumbnail (non-fatal)', e);
    }
    return NextResponse.json({ success: true, data: updated });
  } catch (err: any) {
    console.error('PUT /api/admin/stories error', err);
    return NextResponse.json({ success: false, error: 'Failed to update story' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const resolved = await resolveSessionAndActorFromAuthHeader(request.headers.get('authorization') || '');
    if (!resolved) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });

    const { searchParams } = new URL(request.url);
    const idsParam = searchParams.get('ids') || searchParams.get('id');
    if (!idsParam) return NextResponse.json({ success: false, error: 'Missing ids' }, { status: 400 });
    const ids = idsParam.split(',').map(s => Number(s)).filter(Boolean);
    if (ids.length === 0) return NextResponse.json({ success: false, error: 'No valid ids provided' }, { status: 400 });

    // Fetch thumbnails (and any other storage refs) so we can delete them from storage
    const placeholders = ids.map((_, i) => `$${i + 1}`).join(', ');
    const query = `SELECT id, thumbnail_url FROM stories WHERE id IN (${placeholders})`;
    const { rows } = await sql.query(query, ids);
    const storageRows = rows || [];

    // Delete from database
    const count = await deleteStories(ids);

    // Remove from storage in parallel (best-effort). Do not block the response on storage failures.
    const deletions = storageRows.flatMap((r: any) => {
      const urls = [r.thumbnail_url].filter(Boolean);
      return urls.map(async (url: string) => {
        try {
          if (url.includes('blob.vercel-storage.com')) {
            return del(url).catch(err => { console.error('Failed deleting vercel blob', url, err); return null; });
          }
          const parsed = parseKeyFromUrl(url);
          if (parsed?.key) return deleteObject(parsed.key, parsed.bucket || undefined).catch(err => { console.error('Failed deleting r2 object', parsed, err); return null; });
          return null;
        } catch (err) {
          console.error('Error deleting story storage url', url, err);
          return null;
        }
      });
    });

    // Fire and forget: delete storage objects but wait for them in background to report any errors logged
    try {
      await Promise.allSettled(deletions);
    } catch (err) {
      console.error('Non-fatal error during storage cleanup for story deletions', err);
    }

    return NextResponse.json({ success: true, count, message: `${count} deleted` });
  } catch (err: any) {
    console.error('DELETE /api/admin/stories error', err);
    return NextResponse.json({ success: false, error: 'Failed to delete stories' }, { status: 500 });
  }
}
