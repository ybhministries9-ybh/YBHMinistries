import { NextResponse } from 'next/server';
import { createGetInTouch } from '../../../src/lib/db';
import validateEmail from '../../../src/lib/validateEmail';

// Server-side API route to accept GET (optional) and POST to store submissions
export async function POST(request: Request) {
  try {
    let body: any = null;
    try {
      body = await request.json();
    } catch (parseErr: any) {
      // Log and return a 400 if the incoming body is not valid JSON
      console.error('Invalid JSON body in /api/get-in-touch:', parseErr);
      // Try to read raw text for debugging
      let rawBody: string | null = null;
      try {
        rawBody = await request.text();
      } catch (tErr) {
        rawBody = null;
      }
      return NextResponse.json({ error: 'Invalid JSON body', details: parseErr.message, rawBody }, { status: 400 });
    }
    const { name, email, message, phone } = body || {};

    // Basic server-side validation
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return NextResponse.json({ error: 'Name is required and must be at least 2 characters.' }, { status: 400 });
    }
    // Email is optional; if provided, validate using our validator
    let emailVal: string | null = null;
    if (email !== undefined && email !== null && String(email).trim().length > 0) {
      const emailInput = String(email).trim();
      const v = validateEmail(emailInput, { allowInternational: false });
      if (!v.valid) {
        return NextResponse.json({ error: 'Invalid email address', details: v.errors }, { status: 400 });
      }
      emailVal = v.normalized || null;
    }
    if (!message || typeof message !== 'string' || message.trim().length < 10) {
      return NextResponse.json({ error: 'Message is required and must be at least 10 characters.' }, { status: 400 });
    }

    // Phone (required) - basic validation for presence, length and allowed characters
    if (!phone || typeof phone !== 'string' || phone.trim().length === 0) {
      return NextResponse.json({ error: 'Phone is required.' }, { status: 400 });
    }
    const phoneStr = String(phone).trim();
    if (phoneStr.length < 7 || phoneStr.length > 30) {
      return NextResponse.json({ error: 'Phone number must be between 7 and 30 characters.' }, { status: 400 });
    }
    const phoneRe = /^[0-9+()\-\.\s]+$/;
    if (!phoneRe.test(phoneStr)) {
      return NextResponse.json({ error: 'Phone number contains invalid characters.' }, { status: 400 });
    }
    const phoneVal = phoneStr;

    // Prefer explicit location from the client; fall back to null.
    const location = (body && body.location) ? String(body.location).trim() : null;
    const userAgent = request.headers.get('user-agent') || null;

    // Log the exact payload we will send to DB (only in non-production)
    if (process.env.NODE_ENV !== 'production') {
      try {
        console.debug('/api/get-in-touch payload for DB:', {
          name: name.trim(),
          email: emailVal,
          phone: phoneVal,
          messageLen: message.trim().length,
          location,
          userAgent,
        });
      } catch (e) {
        // ignore logging errors
      }
    }

    let saved;
    try {
      saved = await createGetInTouch({
        name: name.trim(),
        email: emailVal,
        message: message.trim(),
        phone: phoneVal,
        location,
        user_agent: userAgent,
      });
    } catch (dbErr: any) {
      console.error('DB error in createGetInTouch:', dbErr);
      // Do not leak internal DB errors to the client. Return a generic message.
      return NextResponse.json({ error: 'DB error', details: 'An internal error occurred while saving the submission.' }, { status: 500 });
    }

    if (!saved || !('id' in saved)) {
      console.error('createGetInTouch returned no row or missing id', saved);
      return NextResponse.json({ error: 'Failed to save submission', details: saved }, { status: 500 });
    }

    return NextResponse.json({ success: true, id: (saved as any).id });
  } catch (err: any) {
    console.error('Error in /api/get-in-touch:', err);
    // Avoid returning stack traces or internal error messages to clients.
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ ok: true });
}
