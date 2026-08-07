import { NextResponse } from 'next/server';
import { createWorship24Bulk, getBookedTimeslotsForDate } from '../../../src/lib/db';
import validateEmail from '../../../src/lib/validateEmail';
import { sanitizeInput, requireJson, checkBodySize, rateLimit, verifyRecaptcha, isHoneypotFilled } from '../../../src/lib/security';

export const runtime = 'nodejs';

// Maximum number of timeslots a single booking may reserve for one date.
// The limit applies per date — other dates keep their own full allowance.
const MAX_SLOTS_PER_DAY = 4;
// Upper bound on dates per submission, guarding against crafted payloads
const MAX_DATES_PER_BOOKING = 12;

const PHONE_RE = /^[0-9+()\-.\s]+$/;

const DATE_FORMAT = new Intl.DateTimeFormat('en-US', { month: 'short', day: '2-digit', year: 'numeric' });

type Selection = { date: string; timeslots: string[] };

function isSecondSaturdayDate(dateStr: string) {
  const d = new Date(dateStr + 'T00:00:00');
  if (isNaN(d.getTime()) || d.getDay() !== 6) return false;
  const first = new Date(d.getFullYear(), d.getMonth(), 1);
  const firstSatDate = 1 + ((6 - first.getDay() + 7) % 7);
  return d.getDate() === firstSatDate + 7;
}

/**
 * Normalise the request body into an ordered list of `{ date, timeslots }`.
 * Accepted shapes, in order of preference:
 *   1. selections: [{ date, timeslots: [...] }]   (multi-date)
 *   2. date + timeslots: [...]                    (single date, multi-slot)
 *   3. date + timeslot: '...'                     (legacy single slot)
 */
function parseSelections(body: any): Selection[] {
  const raw: unknown[] = Array.isArray(body?.selections) && body.selections.length > 0
    ? body.selections
    : [{ date: body?.date, timeslots: body?.timeslots ?? body?.timeslot }];

  const byDate = new Map<string, string[]>();
  for (const item of raw) {
    const entry = item as { date?: unknown; timeslots?: unknown; timeslot?: unknown };
    const date = sanitizeInput(entry?.date, 20);
    if (!date) continue;

    const source = entry?.timeslots ?? entry?.timeslot;
    const slots = Array.isArray(source) ? source : (source ? [source] : []);
    const existing = byDate.get(date) ?? [];
    for (const s of slots) {
      const cleaned = sanitizeInput(s, 200);
      if (cleaned && !existing.includes(cleaned)) existing.push(cleaned);
    }
    if (existing.length > 0) byDate.set(date, existing);
  }

  return [...byDate.entries()]
    .map(([date, timeslots]) => ({ date, timeslots }))
    .sort((a, b) => a.date.localeCompare(b.date));
}

export async function POST(request: Request) {
  try {
    if (!requireJson(request)) return NextResponse.json({ error: 'Content-Type must be application/json' }, { status: 400 });
    if (!checkBodySize(request, 128 * 1024)) return NextResponse.json({ error: 'Payload too large' }, { status: 413 });

    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || 'unknown';
    const rl = await rateLimit(`worship24:${ip}`, 20, 60 * 60 * 1000);
    if (!rl.ok) return NextResponse.json({ error: 'Too many requests' }, { status: 429 });

    let body: any = null;
    try { body = await request.json(); } catch { return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 }); }

    // Honeypot check
    if (isHoneypotFilled(body)) return NextResponse.json({ error: 'bot detected' }, { status: 400 });

    // reCAPTCHA verification when configured – log failures but do not block
    try {
      const token = body?.recaptchaToken || body?.recaptcha_token;
      const rc = await verifyRecaptcha(token);
      if (!rc.ok && !rc.skipped) {
        try { const { logger } = await import('@/lib/logger'); logger.warn('reCAPTCHA verification failed for worship24 submission', { details: rc }); } catch {}
      }
    } catch (e) {
      try { const { logger } = await import('@/lib/logger'); logger.warn('reCAPTCHA verification error for worship24', { error: String(e) }); } catch {}
    }

    const name = sanitizeInput(body?.name, 200);
    const emailRaw = body?.email ? String(body.email).trim() : undefined;
    const email = emailRaw ? sanitizeInput(emailRaw, 254) : undefined;
    const phone = sanitizeInput(body?.phone, 50);
    const location = sanitizeInput(body?.location, 200);
    // message is optional in the form but NOT NULL in the table
    const message = sanitizeInput(body?.message, 4000) ?? '';
    const facebook_link = sanitizeInput(body?.facebook, 300);

    const selections = parseSelections(body);

    if (!name || name.length < 2) return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    if (!phone || phone.length < 7) return NextResponse.json({ error: 'Phone is required' }, { status: 400 });
    if (!PHONE_RE.test(phone)) return NextResponse.json({ error: 'Phone contains invalid characters' }, { status: 400 });
    // Message is optional for Worship24; do not enforce a minimum length here.
    if (selections.length === 0) return NextResponse.json({ error: 'Date and timeslot are required' }, { status: 400 });
    if (selections.length > MAX_DATES_PER_BOOKING) {
      return NextResponse.json({ error: `You can book a maximum of ${MAX_DATES_PER_BOOKING} dates at a time` }, { status: 400 });
    }

    const now = new Date();
    for (const sel of selections) {
      if (!isSecondSaturdayDate(sel.date)) {
        return NextResponse.json({ error: 'Date must be the 2nd Saturday of the month' }, { status: 400 });
      }
      // ensure month/year not before current
      const d = new Date(sel.date + 'T00:00:00');
      if (d.getFullYear() < now.getFullYear() || (d.getFullYear() === now.getFullYear() && d.getMonth() < now.getMonth())) {
        return NextResponse.json({ error: 'Previous months are not allowed' }, { status: 400 });
      }
      // the maximum applies per date; other dates are unaffected
      if (sel.timeslots.length > MAX_SLOTS_PER_DAY) {
        return NextResponse.json({ error: `You can select a maximum of ${MAX_SLOTS_PER_DAY} slots per date` }, { status: 400 });
      }
    }

    // email optional but validate if present
    let emailVal: string | null = null;
    if (email && email.length > 0) {
      const v = validateEmail(email, { allowInternational: false });
      if (!v.valid) return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
      emailVal = v.normalized || null;
    }

    // Pre-check availability for a friendly error naming the clashing slots.
    // The unique index is still the source of truth against races below.
    try {
      const bookedPerDate = await Promise.all(selections.map((sel) => getBookedTimeslotsForDate(sel.date)));
      for (let i = 0; i < selections.length; i++) {
        const booked = new Set(bookedPerDate[i]);
        const conflicts = selections[i].timeslots.filter((s) => booked.has(s));
        if (conflicts.length > 0) {
          return NextResponse.json({ error: `Timeslot already taken on ${selections[i].date}: ${conflicts.join(', ')}` }, { status: 409 });
        }
      }
    } catch {
      return NextResponse.json({ error: 'DB error' }, { status: 500 });
    }

    // One row per timeslot across every selected date, written in a single
    // atomic statement — no partial bookings are possible.
    let savedRows: any[];
    try {
      savedRows = await createWorship24Bulk(
        selections.flatMap((sel) => sel.timeslots.map((timeslot) => ({ booking_date: sel.date, timeslot }))),
        {
          name,
          email: emailVal,
          phone,
          location,
          message,
          facebook_link: facebook_link || null,
          user_agent: request.headers.get('user-agent') || null,
        }
      );
    } catch (dbErr: unknown) {
      // A unique-violation means someone took a slot between the check and the insert
      const code = dbErr && typeof dbErr === 'object' && 'code' in dbErr ? String((dbErr as { code?: unknown }).code) : '';
      const msg = dbErr && typeof dbErr === 'object' && 'message' in dbErr ? String((dbErr as { message?: unknown }).message) : '';
      if (code === '23505' || msg.toLowerCase().includes('duplicate') || msg.toLowerCase().includes('unique')) {
        return NextResponse.json({ error: 'Timeslot already taken' }, { status: 409 });
      }
      return NextResponse.json({ error: 'DB error' }, { status: 500 });
    }

    // Send confirmation to submitter (if email provided) and notify admin
    try {
      const { sendTransactional } = await import('../../../src/lib/email');
      const logoUrl = 'https://pub-4aa39e08f95c43bd82cfca8220114a91.r2.dev/logo/ybh.png';

      const fields: Array<{ label: string; value: string }> = [];
      const push = (label: string, val?: any) => { if (val !== undefined && val !== null) fields.push({ label, value: String(val) }); };
      // Format booking date for human-friendly emails: MMM DD, YYYY
      const formatDate = (value: string) => {
        const dt = new Date(value + 'T00:00:00');
        return isNaN(dt.getTime()) ? value : DATE_FORMAT.format(dt);
      };

      const totalSlots = savedRows.length;

      push('Full name', name);
      push('Email', emailVal || '');
      push('Phone', phone);
      push('Location', location || '');
      // One line per booked date listing that date's timeslots
      for (const sel of selections) {
        push(`Booking date — ${formatDate(sel.date)}`, sel.timeslots.join(', '));
      }
      push('Facebook', facebook_link || '');
      push('Message', message || '');

      const htmlFields = fields.map(f => `
                    <div style="margin-bottom:12px;">
                      <div style="font-weight:600; color:#333;font-size:15px;line-height:1.5;">${f.label}</div>
                      <div style="color:#555;font-size:15px;line-height:1.5;">${f.value}</div>
                    </div>`).join('');

      const html = `
          <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#111;padding:9px;">
              <div style="text-align:center;background:#000;padding:20px;color:#fff;">
                <img src="${logoUrl}" alt="YBH" width="110" style="display:block;margin:0 auto;"/>
              </div>
              <div style="margin-top:24px;">
                <h2 style="margin:0 0 8px 0;font-size:15px;line-height:1.5;">Hi ${name || ''},</h2>
                <p style="margin:0 0 12px 0;color:#333;font-size:15px;line-height:1.5;">Thank you for booking ${totalSlots > 1 ? 'slots' : 'a slot'} for the <strong>24 Hours Worship</strong>. We've received your request and will review it shortly.</p>

                ${htmlFields}

                <p style="margin:16px 0 0 0;color:#333;font-size:15px;line-height:1.5;">Regards,<br/>YBH Ministries</p>
                <p style="margin:8px 0 0 0; color:#555; font-size:13px; font-style:italic;">Note:- This is a system-generated confirmation of your message. Please do not reply to this email.</p>            
              </div>
          </div>`;

      // Confirmation for submitter
      if (emailVal) {
        const subject = `YBH Ministries — 24 Hours Worship booking received`;
        const slotWord = totalSlots > 1 ? 'slots' : 'a slot';
        const plainLines = [`Hi ${name || ''},`, '', `Thank you for booking ${slotWord} for the 24 Hours Worship. We’ve received your request and will review it shortly.`, '', 'Booking details:', ''];
        for (const f of fields) plainLines.push(`${f.label}: ${f.value}`);
        plainLines.push('', 'Regards,', 'YBH Ministries');
        const plain = plainLines.join('\n');


        try {
          await sendTransactional({ to: emailVal, subject, text: plain, html, from: process.env.EMAIL_FROM });
        } catch (e) {
          try { const { logger } = await import('../../../src/lib/logger'); logger.error('worship24: failed to send confirmation', { error: String(e) }); } catch {}
        }
      }

      // NOTE: admin notification removed — only send confirmation to submitter.
    } catch (err) {
      try { const { logger } = await import('../../../src/lib/logger'); logger.error('worship24: email send failed', { error: String(err) }); } catch {}
    }

    return NextResponse.json({
      success: true,
      // `id` is the first created row, kept for backwards compatibility
      id: savedRows[0]?.id,
      ids: savedRows.map((r) => r?.id),
      selections,
    });
  } catch (_err: any) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    // support query param ?date=YYYY-MM-DD to fetch booked slots for that date
    const url = new URL(request.url);
    const date = url.searchParams.get('date');
    if (date) {
      try {
        const booked = await getBookedTimeslotsForDate(date);
        return NextResponse.json({ success: true, booked });
      } catch {
        return NextResponse.json({ success: false, error: 'DB error' }, { status: 500 });
      }
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
