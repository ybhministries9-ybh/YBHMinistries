import { NextRequest, NextResponse } from 'next/server';
import { getHMSStudents, getHMSStudentById, updateHMSStudent, deleteHMSStudent } from '@/lib/db';
import { resolveSessionAndActorFromAuthHeader } from '@/lib/sessions';

const HMS_STUDENT_FORM_URL = 'https://ybhministries.org/contact/student-form';

export async function GET(request: NextRequest) {
  try {
    const resolved = await resolveSessionAndActorFromAuthHeader(request.headers.get('authorization') || '');
    if (!resolved) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });

    const url = new URL(request.url);
    const idParam = url.searchParams.get('id');
    if (idParam) {
      const id = Number(idParam);
      if (!id) return NextResponse.json({ success: false, error: 'Invalid id' }, { status: 400 });
      const rec = await getHMSStudentById(id);
      return NextResponse.json({ success: true, data: rec });
    }

    const limit = Number(url.searchParams.get('limit') || '50');
    const offset = Number(url.searchParams.get('offset') || '0');
    const q = url.searchParams.get('q') || undefined;
    const month = url.searchParams.get('month') || undefined;
    const year = url.searchParams.get('year') || undefined;
    const status = url.searchParams.get('status') || undefined;
    const result = await getHMSStudents({
      limit: Math.min(limit, 200),
      offset: Math.max(0, offset),
      q,
      month,
      year,
      status,
    });
    return NextResponse.json({ success: true, data: result.rows, total: result.total });
  } catch (err: any) {
    console.error('GET /api/admin/hms-students error', err);
    return NextResponse.json({ success: false, error: 'Failed to fetch HMS students' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const resolved = await resolveSessionAndActorFromAuthHeader(request.headers.get('authorization') || '');
    if (!resolved) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    const { actor } = resolved;

    const body = await request.json();
    const id = Number(body.id || body.studentId);
    if (!id) return NextResponse.json({ success: false, error: 'Missing id' }, { status: 400 });

    const staffMessage = typeof body.staffMessage === 'string' ? body.staffMessage.slice(0, 100).trim() : '';
    const whatsappLink = typeof body.whatsappLink === 'string' ? body.whatsappLink.slice(0, 300).trim() : '';

    const updates = { ...(body.updates || body) };
    updates.updated_by = actor || null;

    const updated = await updateHMSStudent(id, updates);

    let emailSent = false;
    if ((updates.status === 'Accepted' || updates.status === 'Rejected' || updates.status === 'Enrolled') && updated) {
      try {
        const record = await getHMSStudentById(id);
        if (record?.email) {
          const { sendTransactional } = await import('../../../../src/lib/email');
          const logoUrl = 'https://pub-4aa39e08f95c43bd82cfca8220114a91.r2.dev/logo/ybh.png';
          const escapeHtml = (value: string) => value
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');

          const requestDate = (() => {
            try {
              const dt = new Date(String(record.created_at));
              if (isNaN(dt.getTime())) return String(record.created_at || '');
              return dt.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
            } catch {
              return String(record.created_at || '');
            }
          })();

          let subject: string;
          const plainBodyLines: string[] = [];
          const htmlBodyLines: string[] = [];
          const bodyParagraphStyle = 'margin:0 0 12px 0;color:#333; font-size:15px; line-height:1.5;';

          if (updates.status === 'Accepted') {
            subject = 'YBH Ministries - HMS Enrollment Accepted';
            plainBodyLines.push(`Thank you for your request. We're pleased to let you know that your HMS Enrollment request dated ${requestDate} has been accepted.`);
            htmlBodyLines.push(`<p style="${bodyParagraphStyle}">Thank you for your request. We're pleased to let you know that your HMS Enrollment request dated ${escapeHtml(requestDate)} has been accepted.</p>`);

            if (whatsappLink) {
              plainBodyLines.push(`Please join this WhatsApp group to complete the enrollment: ${whatsappLink}`);
              htmlBodyLines.push(`<p style="${bodyParagraphStyle}">Please join this WhatsApp group to complete the enrollment: <strong><a href="${escapeHtml(whatsappLink)}" style="color:#1a73e8;text-decoration:underline;">${escapeHtml(whatsappLink)}</a></strong></p>`);
            }
          } else if (updates.status === 'Enrolled') {
            subject = 'YBH Ministries - HMS Enrollment Completed';
            plainBodyLines.push(`Congratulations! Your HMS Enrollment request dated ${requestDate} has been successfully processed, and you're now fully enrolled.`);
            htmlBodyLines.push(`<p style="${bodyParagraphStyle}">Congratulations! Your HMS Enrollment request dated ${escapeHtml(requestDate)} has been successfully processed, and you're now fully enrolled.</p>`);

            if (staffMessage) {
              plainBodyLines.push(`Message from HMS staff: ${staffMessage}.`);
              htmlBodyLines.push(`<p style="${bodyParagraphStyle}"><strong>Message from HMS staff:</strong> ${escapeHtml(staffMessage)}.</p>`);
            }
          } else {
            subject = 'YBH Ministries - HMS Enrollment Rejected';
            plainBodyLines.push(`Thank you for your interest in HMS. We're sorry that your HMS Enrollment request dated ${requestDate} could not be approved.`);
            htmlBodyLines.push(`<p style="${bodyParagraphStyle}">Thank you for your interest in HMS. We're sorry that your HMS Enrollment request dated ${escapeHtml(requestDate)} could not be approved.</p>`);

            if (staffMessage) {
              plainBodyLines.push(`Message from HMS staff: ${staffMessage}.`);
              htmlBodyLines.push(`<p style="${bodyParagraphStyle}"><strong>Message from HMS staff:</strong> ${escapeHtml(staffMessage)}.</p>`);
            }

            plainBodyLines.push('If you wish to proceed, please submit a new request with all the required details included.');
            htmlBodyLines.push(`<p style="${bodyParagraphStyle}">If you wish to proceed, please submit a new request with all the required details included.</p>`);
            plainBodyLines.push(`Enrollment form: ${HMS_STUDENT_FORM_URL}`);
            htmlBodyLines.push(
              `<p style="${bodyParagraphStyle}">Enrollment form: <a href="${HMS_STUDENT_FORM_URL}" style="color:#111;text-decoration:underline;">${HMS_STUDENT_FORM_URL}</a></p>`
            );
          }

          const html = `
          <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#111;padding:9px;">
              <div style="text-align:center;background:#000;padding:20px;color:#fff;">
                <img src="${logoUrl}" alt="YBH" width="110" style="display:block;margin:0 auto;"/>
              </div>
              <div style="margin-top:24px;">
                <h2 style="margin:0 0 12px 0; color:#111; font-size:20px;">Hi ${escapeHtml(record.full_name || '')},</h2>
                ${htmlBodyLines.join('')}
                <p style="margin:18px 0 0 0;color:#333; font-size:15px; line-height:1.5;">Regards,<br/>YBH Ministries</p>
                <p style="margin:8px 0 0 0; color:#555; font-size:13px; font-style:italic;">Note:- This is a system-generated confirmation of your message. Please do not reply to this email.</p>
              </div>
          </div>`;

          const plain = [
            `Hi ${record.full_name || ''},`,
            '',
            ...plainBodyLines,
            '',
            'Regards,',
            'YBH Ministries',
          ].join('\n');

          await sendTransactional({
            to: record.email,
            subject,
            text: plain,
            html,
            from: process.env.EMAIL_FROM,
          });
          emailSent = true;
        }
      } catch (emailErr) {
        console.error('HMS status email failed', emailErr);
      }
    }

    return NextResponse.json({ success: true, data: updated, emailSent });
  } catch (err: any) {
    console.error('PUT /api/admin/hms-students error', err);
    return NextResponse.json({ success: false, error: 'Failed to update HMS student' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const resolved = await resolveSessionAndActorFromAuthHeader(request.headers.get('authorization') || '');
    if (!resolved) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });

    const url = new URL(request.url);
    const id = Number(url.searchParams.get('id'));
    if (!id) return NextResponse.json({ success: false, error: 'Missing id' }, { status: 400 });

    const deleted = await deleteHMSStudent(id);
    if (!deleted) return NextResponse.json({ success: false, error: 'Record not found' }, { status: 404 });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error('DELETE /api/admin/hms-students error', err);
    return NextResponse.json({ success: false, error: 'Failed to delete HMS student' }, { status: 500 });
  }
}
