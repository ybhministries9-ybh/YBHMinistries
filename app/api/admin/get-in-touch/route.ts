import { NextRequest, NextResponse } from 'next/server';
import { getGetInTouch, getGetInTouchById, updateGetInTouch, deleteGetInTouch } from '@/lib/db';
import { resolveSessionAndActorFromAuthHeader, readOnlyResponse } from '@/lib/sessions';

const ALLOWED_STATUSES = new Set(['Submitted', 'Accepted', 'Rejected', 'Archived']);
const GET_IN_TOUCH_URL = 'https://ybhministries.org/contact/getintouch';

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

function buildStatusEmailBody(status: 'Accepted' | 'Rejected', requestDate: string, staffMessage: string) {
  const bodyParagraphStyle = 'margin:0 0 12px 0;color:#333; font-size:15px; line-height:1.5;';
  const plainBodyLines: string[] = [];
  const htmlBodyLines: string[] = [];

  if (status === 'Accepted') {
    plainBodyLines.push(`Thank you for reaching out to YBH Ministries. Your message dated ${requestDate} has been accepted and our team will follow up with you soon.`);
    htmlBodyLines.push(`<p style="${bodyParagraphStyle}">Thank you for reaching out to YBH Ministries. Your message dated ${escapeHtml(requestDate)} has been accepted and our team will follow up with you soon.</p>`);
    if (staffMessage) {
      plainBodyLines.push(`Message from YBH staff: ${staffMessage}.`);
      htmlBodyLines.push(`<p style="${bodyParagraphStyle}"><strong>Message from YBH staff:</strong> ${escapeHtml(staffMessage)}.</p>`);
    }
  } else {
    plainBodyLines.push(`Thank you for reaching out to YBH Ministries. We're sorry that your message dated ${requestDate} could not be accepted.`);
    htmlBodyLines.push(`<p style="${bodyParagraphStyle}">Thank you for reaching out to YBH Ministries. We're sorry that your message dated ${escapeHtml(requestDate)} could not be accepted.</p>`);
    if (staffMessage) {
      plainBodyLines.push(`Message from YBH staff: ${staffMessage}.`);
      htmlBodyLines.push(`<p style="${bodyParagraphStyle}"><strong>Message from YBH staff:</strong> ${escapeHtml(staffMessage)}.</p>`);
    }
    plainBodyLines.push('If you wish to proceed, please submit a new message with all the required details included.');
    htmlBodyLines.push(`<p style="${bodyParagraphStyle}">If you wish to proceed, please submit a new message with all the required details included.</p>`);
    plainBodyLines.push(`Get In Touch page: ${GET_IN_TOUCH_URL}`);
    htmlBodyLines.push(
      `<p style="${bodyParagraphStyle}">Get In Touch page: <a href="${GET_IN_TOUCH_URL}" style="color:#111;text-decoration:underline;">${GET_IN_TOUCH_URL}</a></p>`
    );
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
      const rec = await getGetInTouchById(id);
      return NextResponse.json({ success: true, data: rec });
    }

    const limit = Number(url.searchParams.get('limit') || '50');
    const offset = Number(url.searchParams.get('offset') || '0');
    const q = url.searchParams.get('q') || undefined;
    const month = url.searchParams.get('month') || undefined;
    const year = url.searchParams.get('year') || undefined;
    const status = url.searchParams.get('status') || undefined;
    const result = await getGetInTouch({ limit: Math.min(limit, 500), offset: Math.max(0, offset), q, month, year, status });
    return NextResponse.json({ success: true, data: result.rows, total: result.total });
  } catch (err: any) {
    const { logger } = await import('@/lib/logger');
    logger.error('GET /api/admin/get-in-touch error', { error: err?.message });
    return NextResponse.json({ success: false, error: 'Failed to fetch submissions' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const resolved = await resolveSessionAndActorFromAuthHeader(request.headers.get('authorization') || '');
    if (!resolved) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    const denied = readOnlyResponse(resolved);
    if (denied) return denied;
    const { actor } = resolved;

    const body = await request.json();
    const id = Number(body.id);
    if (!id) return NextResponse.json({ success: false, error: 'Missing id' }, { status: 400 });

    const nextStatus = String(body?.updates?.status || body?.status || '').trim();
    if (!ALLOWED_STATUSES.has(nextStatus)) {
      return NextResponse.json({ success: false, error: 'Invalid status' }, { status: 400 });
    }

    const staffMessage = typeof body.staffMessage === 'string' ? body.staffMessage.slice(0, 100).trim() : '';
    const updated = await updateGetInTouch(id, { status: nextStatus, updated_by: actor || null });
    if (!updated) return NextResponse.json({ success: false, error: 'Record not found' }, { status: 404 });

    let emailSent = false;
    if ((nextStatus === 'Accepted' || nextStatus === 'Rejected') && updated.email) {
      try {
        const { sendTransactional } = await import('@/lib/email');
        const logoUrl = 'https://pub-4aa39e08f95c43bd82cfca8220114a91.r2.dev/logo/ybh.png';
        const requestDate = formatPrettyDate(updated.created_at);
        const { plainBodyLines, htmlBodyLines } = buildStatusEmailBody(nextStatus as 'Accepted' | 'Rejected', requestDate, staffMessage);

        const subjectMap: Record<'Accepted' | 'Rejected', string> = {
          Accepted: 'YBH Ministries - Get In Touch Submission Accepted',
          Rejected: 'YBH Ministries - Get In Touch Submission Rejected',
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
        logger.error('Get-in-touch status email failed', { error: String((emailErr as any)?.message || emailErr) });
      }
    }

    return NextResponse.json({ success: true, data: updated, emailSent });
  } catch (err: any) {
    const { logger } = await import('@/lib/logger');
    logger.error('PUT /api/admin/get-in-touch error', { error: err?.message });
    return NextResponse.json({ success: false, error: 'Failed to update submission' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const resolved = await resolveSessionAndActorFromAuthHeader(request.headers.get('authorization') || '');
    if (!resolved) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    const denied = readOnlyResponse(resolved);
    if (denied) return denied;

    const url = new URL(request.url);
    const id = Number(url.searchParams.get('id'));
    if (!id) return NextResponse.json({ success: false, error: 'Missing id' }, { status: 400 });

    const deleted = await deleteGetInTouch(id);
    if (!deleted) return NextResponse.json({ success: false, error: 'Record not found' }, { status: 404 });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    const { logger } = await import('@/lib/logger');
    logger.error('DELETE /api/admin/get-in-touch error', { error: err?.message });
    return NextResponse.json({ success: false, error: 'Failed to delete submission' }, { status: 500 });
  }
}
