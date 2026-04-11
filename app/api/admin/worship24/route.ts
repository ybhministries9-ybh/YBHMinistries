import { NextRequest, NextResponse } from 'next/server';
import { getWorship24, getWorship24ById, updateWorship24, deleteWorship24 } from '@/lib/db';
import { resolveSessionAndActorFromAuthHeader } from '@/lib/sessions';

const ALLOWED_STATUSES = new Set(['Submitted', 'Accepted', 'Rejected', 'Archived']);

function escapeHtml(value: string) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function formatPrettyDate(raw?: string | null) {
  if (!raw) return '';
  try {
    const dt = new Date(String(raw));
    if (Number.isNaN(dt.getTime())) return String(raw);
    return dt.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
  } catch {
    return String(raw || '');
  }
}

function buildStatusEmailBody(status: 'Accepted' | 'Rejected', bookingDate: string, timeslot: string, staffMessage: string) {
  const bodyParagraphStyle = 'margin:0 0 12px 0;color:#333; font-size:15px; line-height:1.5;';
  const slotText = timeslot ? ` at ${timeslot}` : '';
  const plainBodyLines: string[] = [];
  const htmlBodyLines: string[] = [];

  if (status === 'Accepted') {
    plainBodyLines.push(`Thank you for booking a slot for 24 Hours Worship. Your booking for ${bookingDate}${slotText} has been accepted.`);
    htmlBodyLines.push(`<p style="${bodyParagraphStyle}">Thank you for booking a slot for 24 Hours Worship. Your booking for ${escapeHtml(bookingDate)}${escapeHtml(slotText)} has been accepted.</p>`);
  } else {
    plainBodyLines.push(`We're sorry that your 24 Hours Worship booking for ${bookingDate}${slotText} could not be approved.`);
    htmlBodyLines.push(`<p style="${bodyParagraphStyle}">We're sorry that your 24 Hours Worship booking for ${escapeHtml(bookingDate)}${escapeHtml(slotText)} could not be approved.</p>`);
    if (staffMessage) {
      plainBodyLines.push(`Message from 24 Hours Worship staff: ${staffMessage}.`);
      htmlBodyLines.push(`<p style="${bodyParagraphStyle}"><strong>Message from 24 Hours Worship staff:</strong> ${escapeHtml(staffMessage)}.</p>`);
    }
    plainBodyLines.push('If you wish to proceed, please submit a new booking request with a new slot and all the required details.');
    htmlBodyLines.push(`<p style="${bodyParagraphStyle}">If you wish to proceed, please submit a new booking request with a new slot and all the required details.</p>`);
  }

  return { plainBodyLines, htmlBodyLines };
}

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
    const status = url.searchParams.get('status') || undefined;
    const result = await getWorship24({ limit: Math.min(limit, 500), offset: Math.max(0, offset), q, month, year, status });
    return NextResponse.json({ success: true, data: result.rows, total: result.total });
  } catch (err: any) {
    const { logger } = await import('@/lib/logger');
    logger.error('GET /api/admin/worship24 error', { error: err?.message });
    return NextResponse.json({ success: false, error: 'Failed to fetch submissions' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const resolved = await resolveSessionAndActorFromAuthHeader(request.headers.get('authorization') || '');
    if (!resolved) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    const { actor } = resolved;

    const body = await request.json();
    const id = Number(body.id);
    if (!id) return NextResponse.json({ success: false, error: 'Missing id' }, { status: 400 });

    const nextStatus = String(body?.updates?.status || body?.status || '').trim();
    if (!ALLOWED_STATUSES.has(nextStatus)) {
      return NextResponse.json({ success: false, error: 'Invalid status' }, { status: 400 });
    }

    const staffMessage = typeof body.staffMessage === 'string' ? body.staffMessage.slice(0, 100).trim() : '';
    const updated = await updateWorship24(id, { status: nextStatus, updated_by: actor || null });
    if (!updated) return NextResponse.json({ success: false, error: 'Record not found' }, { status: 404 });

    let emailSent = false;
    if ((nextStatus === 'Accepted' || nextStatus === 'Rejected') && updated.email) {
      try {
        const { sendTransactional } = await import('@/lib/email');
        const logoUrl = 'https://pub-4aa39e08f95c43bd82cfca8220114a91.r2.dev/logo/ybh.png';
        const bookingDate = formatPrettyDate(updated.booking_date);
        const timeslot = updated.timeslot ? String(updated.timeslot).replace(/\b(am|pm)\b/gi, (match) => match.toUpperCase()) : '';
        const { plainBodyLines, htmlBodyLines } = buildStatusEmailBody(nextStatus as 'Accepted' | 'Rejected', bookingDate, timeslot, staffMessage);

        const subjectMap: Record<'Accepted' | 'Rejected', string> = {
          Accepted: 'YBH Ministries - 24 Hours Worship Booking Accepted',
          Rejected: 'YBH Ministries - 24 Hours Worship Booking Rejected',
        };

        const html = `
          <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#111;padding:9px;">
              <div style="text-align:center;background:#000;padding:20px;color:#fff;">
                <img src="${logoUrl}" alt="YBH Ministries" width="110" style="display:block;margin:0 auto;"/>
              </div>
              <div style="margin-top:24px;">
                <h2 style="margin:0 0 12px 0; color:#111; font-size:20px;">Hi ${escapeHtml(updated.name || '')},</h2>
                ${htmlBodyLines.join('')}
                <p style="margin:18px 0 0 0;color:#333; font-size:15px; line-height:1.5;">Regards,<br/>YBH Ministries</p>
                <p style="margin:8px 0 0 0; color:#555; font-size:13px; font-style:italic;">Note:- This is a system-generated confirmation of your message. Please do not reply to this email.</p>
              </div>
          </div>`;

        const plain = [
          `Hi ${updated.name || ''},`,
          '',
          ...plainBodyLines,
          '',
          'Regards,',
          'YBH Ministries',
        ].join('\n');

        const res = await sendTransactional({
          to: updated.email,
          subject: subjectMap[nextStatus as 'Accepted' | 'Rejected'],
          text: plain,
          html,
          from: process.env.EMAIL_FROM,
        });
        emailSent = !!res?.success;
      } catch (emailErr) {
        const { logger } = await import('@/lib/logger');
        logger.error('Worship24 status email failed', { error: String((emailErr as any)?.message || emailErr) });
      }
    }

    return NextResponse.json({ success: true, data: updated, emailSent });
  } catch (err: any) {
    const { logger } = await import('@/lib/logger');
    logger.error('PUT /api/admin/worship24 error', { error: err?.message });
    return NextResponse.json({ success: false, error: 'Failed to update booking' }, { status: 500 });
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
