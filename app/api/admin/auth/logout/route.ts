import { NextRequest, NextResponse } from 'next/server';
import { invalidateSession } from '@/lib/sessions';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    // Try Authorization header first
    const auth = request.headers.get('authorization') || '';
    let token = auth.startsWith('Bearer ') ? auth.slice(7) : null;

    // If no header token, attempt to read body as JSON, form data, or plain text
    if (!token) {
      try {
        const ct = request.headers.get('content-type') || '';
        if (ct.includes('application/json')) {
          const body = await request.json();
          token = body?.token || null;
        } else if (ct.includes('application/x-www-form-urlencoded') || ct.includes('text/plain')) {
          const text = await request.text();
          // Try URLSearchParams first
          try {
            const params = new URLSearchParams(text);
            token = params.get('token') || text || null;
          } catch (e) {
            token = text || null;
          }
        } else {
          // Fallback: try parse as JSON or text
          const text = await request.text();
          try { const parsed = JSON.parse(text); token = parsed?.token || null; } catch { token = text || null; }
        }
      } catch (err) {
        // ignore parse errors
      }
    }

    if (!token) {
      return NextResponse.json({ success: false, error: 'Missing token' }, { status: 400 });
    }

    await invalidateSession(token);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Error invalidating session on logout', err);
    return NextResponse.json({ success: false, error: 'Failed to logout' }, { status: 500 });
  }
}
