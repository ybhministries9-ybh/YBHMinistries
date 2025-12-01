import { NextResponse } from 'next/server';
import { createGetInTouch } from '../../../src/lib/db';
import validateEmail from '../../../src/lib/validateEmail';
import { sanitizeInput, requireJson, checkBodySize, rateLimit } from '../../../src/lib/security';
import { getInTouchSchema } from '../../../src/lib/schemas';

// Server-side API route to accept GET (optional) and POST to store submissions
export async function POST(request: Request) {
  try {
    // Content checks: require JSON and limit body size
    if (!requireJson(request)) {
      return NextResponse.json({ error: 'Content-Type must be application/json' }, { status: 400 });
    }
    if (!checkBodySize(request, 64 * 1024)) {
      return NextResponse.json({ error: 'Payload too large' }, { status: 413 });
    }

    // Simple per-IP rate limiting
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || 'unknown';
    const rl = await rateLimit(`get-in-touch:${ip}`, 20, 60 * 60 * 1000);
    if (!rl.ok) {
      return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
    }

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

    // Sanitize inputs early
    const nameClean = sanitizeInput(name, 100);
    const messageClean = sanitizeInput(message, 4000);
    const phoneClean = sanitizeInput(phone, 50);
    const locationClean = sanitizeInput(body?.location, 200);

    const parsed = getInTouchSchema.safeParse({ name: nameClean, email: email ? sanitizeInput(String(email).trim(), 254) : undefined, phone: phoneClean, message: messageClean, location: locationClean });
    if (!parsed.success) {
      return NextResponse.json({ error: 'validation_error', details: parsed.error.format() }, { status: 400 });
    }

    // Basic server-side validation
    if (!nameClean || nameClean.length < 2) {
      return NextResponse.json({ error: 'Name is required and must be at least 2 characters.' }, { status: 400 });
    }
    // Email is optional; if provided, validate using our validator
    let emailVal: string | null = null;
    if (email !== undefined && email !== null && String(email).trim().length > 0) {
      const emailInput = sanitizeInput(String(email).trim(), 254) || '';
      const v = validateEmail(emailInput, { allowInternational: false });
      if (!v.valid) {
        return NextResponse.json({ error: 'Invalid email address', details: v.errors }, { status: 400 });
      }
      emailVal = v.normalized || null;
    }
    if (!messageClean || messageClean.length < 10) {
      return NextResponse.json({ error: 'Message is required and must be at least 10 characters.' }, { status: 400 });
    }

    // Phone (required) - basic validation for presence, length and allowed characters
    if (!phoneClean || phoneClean.length === 0) {
      return NextResponse.json({ error: 'Phone is required.' }, { status: 400 });
    }
    if (phoneClean.length < 7 || phoneClean.length > 30) {
      return NextResponse.json({ error: 'Phone number must be between 7 and 30 characters.' }, { status: 400 });
    }
    const phoneRe = /^[0-9+()\-\.\s]+$/;
    if (!phoneRe.test(phoneClean)) {
      return NextResponse.json({ error: 'Phone number contains invalid characters.' }, { status: 400 });
    }
    const phoneVal = phoneClean;

    // Prefer explicit location from the client; fall back to null.
    const location = locationClean;
    const userAgent = request.headers.get('user-agent') || null;

    // Log the exact payload we will send to DB (only in non-production)
    if (process.env.NODE_ENV !== 'production') {
      try {
        console.debug('/api/get-in-touch payload for DB:', {
          name: nameClean,
          email: emailVal,
          phone: phoneVal,
          messageLen: messageClean.length,
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
        name: nameClean,
        email: emailVal,
        message: messageClean,
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
