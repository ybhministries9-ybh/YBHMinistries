import { NextRequest, NextResponse } from 'next/server';
import { resolveSessionAndActorFromAuthHeader } from '@/lib/sessions';
import { sql } from '@vercel/postgres';
import {
  generateExcelBuffer,
  formatISTDate,
  buildDateRangeCondition,
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

    let query = 'SELECT id, name, email, phone, booking_date, timeslot, facebook_link, location, message, status, created_at FROM worship24';
    const values: any[] = [];
    const conditions: string[] = [];

    if (q && q.trim().length > 0) {
      const searchPattern = `%${q.trim()}%`;
      conditions.push(`(name ILIKE $${values.length + 1} OR email ILIKE $${values.length + 2} OR phone ILIKE $${values.length + 3} OR location ILIKE $${values.length + 4})`);
      values.push(searchPattern, searchPattern, searchPattern, searchPattern);
    }

    const dateFilter = buildDateRangeCondition(month, year, values.length);
    if (dateFilter) {
      conditions.push(dateFilter.condition);
      values.push(...dateFilter.values);
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

    const excelBuffer = await generateExcelBuffer({
      data: exportData,
      sheetName: 'Worship24',
      filename: generateExportFilename('worship24-export', month, year),
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

    const filename = generateExportFilename('worship24-export', month, year);

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
