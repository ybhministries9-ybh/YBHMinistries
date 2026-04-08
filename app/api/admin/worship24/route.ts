import { NextRequest, NextResponse } from 'next/server';
import { getWorship24, getWorship24ById, deleteWorship24 } from '@/lib/db';
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
      const rec = await getWorship24ById(id);
      return NextResponse.json({ success: true, data: rec });
    }

    const limit = Number(url.searchParams.get('limit') || '50');
    const offset = Number(url.searchParams.get('offset') || '0');
    const q = url.searchParams.get('q') || undefined;
    const month = url.searchParams.get('month') || undefined;
    const year = url.searchParams.get('year') || undefined;
    const result = await getWorship24({ limit: Math.min(limit, 500), offset: Math.max(0, offset), q, month, year });
    return NextResponse.json({ success: true, data: result.rows, total: result.total });
  } catch (err: any) {
    const { logger } = await import('@/lib/logger');
    logger.error('GET /api/admin/worship24 error', { error: err?.message });
    return NextResponse.json({ success: false, error: 'Failed to fetch submissions' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const resolved = await resolveSessionAndActorFromAuthHeader(request.headers.get('authorization') || '');
    if (!resolved) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });

    const url = new URL(request.url);
    const id = Number(url.searchParams.get('id'));
    if (!id) return NextResponse.json({ success: false, error: 'Missing id' }, { status: 400 });

    const deleted = await deleteWorship24(id);
    if (!deleted) return NextResponse.json({ success: false, error: 'Record not found' }, { status: 404 });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    const { logger } = await import('@/lib/logger');
    logger.error('DELETE /api/admin/worship24 error', { error: err?.message });
    return NextResponse.json({ success: false, error: 'Failed to delete booking' }, { status: 500 });
  }
}
