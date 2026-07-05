import { NextRequest, NextResponse } from 'next/server';
import { resolveSessionAndActorFromAuthHeader } from '@/lib/sessions';
import { sql } from '@vercel/postgres';
import {
  generateExcelBuffer,
  formatISTDate,
  generateExportFilename,
} from '@/lib/exportUtils';

export async function GET(request: NextRequest) {
  try {
    const resolved = await resolveSessionAndActorFromAuthHeader(request.headers.get('authorization') || '');
    if (!resolved) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });

    const url = new URL(request.url);
    const q = url.searchParams.get('q') || undefined;
    const month = url.searchParams.get('month') || undefined;
    const year = url.searchParams.get('year') || undefined;
    const status = url.searchParams.get('status') || undefined;

    let query = 'SELECT id, name, email, phone, booking_date, timeslot, facebook_link, location, message, status, created_at FROM worship24';
    const values: any[] = [];
    const conditions: string[] = [];

    if (q && q.trim().length > 0) {
      const searchPattern = `%${q.trim()}%`;
      conditions.push(`(name ILIKE $${values.length + 1} OR email ILIKE $${values.length + 2} OR phone ILIKE $${values.length + 3} OR location ILIKE $${values.length + 4})`);
      values.push(searchPattern, searchPattern, searchPattern, searchPattern);
    }

    // Add status filter. Legacy rows may have a NULL or 'New' status, which the
    // UI displays as "Submitted" -- treat those the same way here so the filter
    // matches what the admin sees on screen.
    if (status && status.trim().length > 0) {
      const trimmedStatus = status.trim();
      if (trimmedStatus.toLowerCase() === 'submitted') {
        conditions.push(`(status IS NULL OR LOWER(status) IN ('new', 'submitted'))`);
      } else {
        conditions.push(`status = $${values.length + 1}`);
        values.push(trimmedStatus);
      }
    }

    // Filter by booking_date (not created_at) to match the admin table view,
    // which filters worship24 bookings by their booking date, not submission date.
    if (month && year) {
      const startDate = `${year}-${String(month).padStart(2, '0')}-01`;
      const nextMonth = parseInt(month) === 12 ? 1 : parseInt(month) + 1;
      const nextYear = parseInt(month) === 12 ? parseInt(year) + 1 : parseInt(year);
      const endDate = `${nextYear}-${String(nextMonth).padStart(2, '0')}-01`;
      conditions.push(`DATE(booking_date AT TIME ZONE 'UTC' AT TIME ZONE 'Asia/Kolkata') >= $${values.length + 1} AND DATE(booking_date AT TIME ZONE 'UTC' AT TIME ZONE 'Asia/Kolkata') < $${values.length + 2}`);
      values.push(startDate, endDate);
    } else if (year) {
      const startDate = `${year}-01-01`;
      const endDate = `${parseInt(year) + 1}-01-01`;
      conditions.push(`DATE(booking_date AT TIME ZONE 'UTC' AT TIME ZONE 'Asia/Kolkata') >= $${values.length + 1} AND DATE(booking_date AT TIME ZONE 'UTC' AT TIME ZONE 'Asia/Kolkata') < $${values.length + 2}`);
      values.push(startDate, endDate);
    } else if (month) {
      const m = parseInt(String(month));
      if (!Number.isNaN(m) && m >= 1 && m <= 12) {
        conditions.push(`EXTRACT(MONTH FROM (booking_date AT TIME ZONE 'UTC' AT TIME ZONE 'Asia/Kolkata')) = $${values.length + 1}`);
        values.push(m);
      }
    }

    if (conditions.length > 0) query += ` WHERE ${conditions.join(' AND ')}`;
    query += ' ORDER BY created_at DESC';

    const result = values.length > 0 ? await sql.query(query, values) : await sql.query(query);

    const exportData = result.rows.map((record: any) => ({
      ID: record.id,
      Name: record.name,
      Email: record.email || '',
      Phone: record.phone || '',
      Location: record.location || '',
      'Booking Date': record.booking_date || '',
      Timeslot: record.timeslot || '',
      Status: !record.status || String(record.status).toLowerCase() === 'new' ? 'Submitted' : record.status,
      Facebook: record.facebook_link || '',
      Message: record.message || '',
      'Submitted Date': formatISTDate(record.created_at),
    }));

    const filename = generateExportFilename('worship24-export', month, year);

    const excelBuffer = await generateExcelBuffer({
      data: exportData,
      sheetName: 'Worship24',
      filename,
      columnWidths: [
        { wch: 8 },
        { wch: 25 },
        { wch: 30 },
        { wch: 15 },
        { wch: 20 },
        { wch: 15 },
        { wch: 20 },
        { wch: 12 },
        { wch: 30 },
        { wch: 50 },
        { wch: 15 },
      ],
    });

    return new NextResponse(excelBuffer as any, {
      status: 200,
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    });
  } catch (err: any) {
    const { logger } = await import('@/lib/logger');
    logger.error('GET /api/admin/worship24/export error', { error: err?.message });
    return NextResponse.json({ success: false, error: 'Failed to export data' }, { status: 500 });
  }
}
