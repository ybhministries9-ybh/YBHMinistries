import { NextRequest, NextResponse } from 'next/server';
import { getAllStories, createStory, updateStory, deleteStories } from '@/lib/db';
import { resolveSessionAndActorFromAuthHeader } from '@/lib/sessions';

export async function GET() {
  try {
    const stories = await getAllStories();
    return NextResponse.json({ success: true, data: stories });
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
      createdBy: actor || null,
    });

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

    const updated = await updateStory(id, updates);
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
    const count = await deleteStories(ids);
    return NextResponse.json({ success: true, count, message: `${count} deleted` });
  } catch (err: any) {
    console.error('DELETE /api/admin/stories error', err);
    return NextResponse.json({ success: false, error: 'Failed to delete stories' }, { status: 500 });
  }
}
