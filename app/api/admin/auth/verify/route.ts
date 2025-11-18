import { NextRequest, NextResponse } from 'next/server';
import { verifySession } from '@/lib/sessions';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const auth = request.headers.get('authorization') || '';
    const token = auth.startsWith('Bearer ') ? auth.slice(7) : auth || null;
    if (!token) return NextResponse.json({ success: false, error: 'Missing token' }, { status: 401 });

    const session = await verifySession(token);
    if (!session) return NextResponse.json({ success: false, error: 'Invalid or expired session' }, { status: 401 });

    return NextResponse.json({ success: true, session: { id: session.id, user_id: session.user_id, expires_at: session.expires_at } });
  } catch (err) {
    console.error('Error verifying session token', err);
    return NextResponse.json({ success: false, error: 'Failed to verify token' }, { status: 500 });
  }
}
