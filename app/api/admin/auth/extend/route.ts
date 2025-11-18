import { NextRequest, NextResponse } from 'next/server';
import { verifySession, extendSession } from '@/lib/sessions';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const auth = request.headers.get('authorization') || '';
    const token = auth.startsWith('Bearer ') ? auth.slice(7) : auth || null;
    if (!token) return NextResponse.json({ success: false, error: 'Missing token' }, { status: 401 });

    const session = await verifySession(token);
    if (!session) return NextResponse.json({ success: false, error: 'Invalid or expired session' }, { status: 401 });

    const extended = await extendSession(token);
    if (!extended) return NextResponse.json({ success: false, error: 'Failed to extend session' }, { status: 500 });

    return NextResponse.json({ success: true, expiresAt: new Date(extended.expires_at).toISOString() });
  } catch (err) {
    console.error('Error in extend session', err);
    return NextResponse.json({ success: false, error: 'Failed to extend session' }, { status: 500 });
  }
}
