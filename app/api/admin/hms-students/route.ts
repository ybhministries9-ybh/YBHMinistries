import { NextRequest, NextResponse } from 'next/server';
import { getHMSStudents, getHMSStudentById, updateHMSStudent } from '@/lib/db';
import { resolveSessionAndActorFromAuthHeader } from '@/lib/sessions';

export async function GET(request: NextRequest) {
  try {
    const resolved = await resolveSessionAndActorFromAuthHeader(request.headers.get('authorization') || '');
    if (!resolved) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });

    const url = new URL(request.url);
    const idParam = url.searchParams.get('id');
    if (idParam) {
      const id = Number(idParam);
      if (!id) return NextResponse.json({ success: false, error: 'Invalid id' }, { status: 400 });
      const rec = await getHMSStudentById(id);
      return NextResponse.json({ success: true, data: rec });
    }

    const limit = Number(url.searchParams.get('limit') || '50');
    const offset = Number(url.searchParams.get('offset') || '0');
    const q = url.searchParams.get('q') || undefined;
    const month = url.searchParams.get('month') || undefined;
    const year = url.searchParams.get('year') || undefined;
    const result = await getHMSStudents({ limit: Math.min(limit, 200), offset: Math.max(0, offset), q, month, year });
    return NextResponse.json({ success: true, data: result.rows, total: result.total });
  } catch (err: any) {
    console.error('GET /api/admin/hms-students error', err);
    return NextResponse.json({ success: false, error: 'Failed to fetch HMS students' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const resolved = await resolveSessionAndActorFromAuthHeader(request.headers.get('authorization') || '');
    if (!resolved) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    const { actor } = resolved;

    const body = await request.json();
    const id = Number(body.id || body.studentId);
    if (!id) return NextResponse.json({ success: false, error: 'Missing id' }, { status: 400 });

    const updates = { ...(body.updates || body) };
    updates.updated_by = actor || null;

    const updated = await updateHMSStudent(id, updates);
    return NextResponse.json({ success: true, data: updated });
  } catch (err: any) {
    console.error('PUT /api/admin/hms-students error', err);
    return NextResponse.json({ success: false, error: 'Failed to update HMS student' }, { status: 500 });
  }
}
