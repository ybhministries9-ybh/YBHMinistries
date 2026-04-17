import { NextResponse } from 'next/server';
import { resolveSessionAndActorFromAuthHeader } from '@/lib/sessions';
import { getActiveWorship24ByDate } from '@/lib/db';

export async function GET(request: Request) {
  try {
    const resolved = await resolveSessionAndActorFromAuthHeader(request.headers.get('authorization') || '');
    if (!resolved) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });

    const url = new URL(request.url);
    const date = url.searchParams.get('date');
    if (!date) return NextResponse.json({ success: false, error: 'Missing date' }, { status: 400 });

    // basic validation for YYYY-MM-DD
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return NextResponse.json({ success: false, error: 'Invalid date format' }, { status: 400 });

    try {
      const rows = await getActiveWorship24ByDate(date);
      return NextResponse.json({ success: true, data: rows });
    } catch (e) {
      return NextResponse.json({ success: false, error: 'DB error' }, { status: 500 });
    }
  } catch {
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
