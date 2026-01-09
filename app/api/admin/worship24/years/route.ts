import { NextRequest, NextResponse } from 'next/server';
import { getWorship24Years } from '@/lib/db';
import { resolveSessionAndActorFromAuthHeader } from '@/lib/sessions';

export async function GET(request: NextRequest) {
  try {
    const resolved = await resolveSessionAndActorFromAuthHeader(request.headers.get('authorization') || '');
    if (!resolved) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });

    const years = await getWorship24Years();
    return NextResponse.json({ success: true, data: years });
  } catch (err: any) {
    const { logger } = await import('@/lib/logger');
    logger.error('GET /api/admin/worship24/years error', { error: err?.message });
    return NextResponse.json({ success: false, error: 'Failed to fetch years' }, { status: 500 });
  }
}
