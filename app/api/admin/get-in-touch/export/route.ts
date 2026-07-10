import { NextRequest, NextResponse } from 'next/server';
import { resolveSessionAndActorFromAuthHeader, readOnlyResponse } from '@/lib/sessions';
import { sql } from '@vercel/postgres';
import { 
  generateExcelBuffer, 
  formatISTDate, 
  buildDateRangeCondition, 
  generateExportFilename 
} from '@/lib/exportUtils';

export async function GET(request: NextRequest) {
  try {
    // Verify admin authentication
    const resolved = await resolveSessionAndActorFromAuthHeader(request.headers.get('authorization') || '');
    if (!resolved) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }
    const denied = readOnlyResponse(resolved);
    if (denied) return denied;

    const url = new URL(request.url);
    const q = url.searchParams.get('q') || undefined;
    const month = url.searchParams.get('month') || undefined;
    const year = url.searchParams.get('year') || undefined;

    // Build query with filters
    let query = 'SELECT id, name, email, phone, message, location, hear_about_us, other_hear_about_us, status, created_at FROM get_in_touch';
    const values: any[] = [];
    const conditions: string[] = [];

    // Add search filter
    if (q && q.trim().length > 0) {
      const searchPattern = `%${q.trim()}%`;
      // include hear_about_us and other_hear_about_us in searchable fields
      conditions.push(`(name ILIKE $${values.length + 1} OR email ILIKE $${values.length + 2} OR phone ILIKE $${values.length + 3} OR location ILIKE $${values.length + 4} OR hear_about_us ILIKE $${values.length + 5} OR other_hear_about_us ILIKE $${values.length + 6})`);
      values.push(searchPattern, searchPattern, searchPattern, searchPattern, searchPattern, searchPattern);
    }

    // Add date range filter
    const dateFilter = buildDateRangeCondition(month, year, values.length);
    if (dateFilter) {
      conditions.push(dateFilter.condition);
      values.push(...dateFilter.values);
    }

    if (conditions.length > 0) {
      query += ` WHERE ${conditions.join(' AND ')}`;
    }

    query += ' ORDER BY created_at DESC';

    // Execute query
    const result = values.length > 0 
      ? await sql.query(query, values)
      : await sql.query(query);

    // Transform data for Excel export
    const exportData = result.rows.map(record => ({
      'ID': record.id,
      'Name': record.name,
      'Email': record.email || '',
      'Phone': record.phone || '',
      'Location': record.location || '',
      'Status': !record.status || String(record.status).toLowerCase() === 'new' ? 'Submitted' : record.status,
      'How did you hear about us?': (record.hear_about_us || '') + (record.other_hear_about_us ? `: ${record.other_hear_about_us}` : ''),
      'Message': record.message || '',
      'Submitted Date': formatISTDate(record.created_at)
    }));

    // Generate Excel file
    const excelBuffer = await generateExcelBuffer({
      data: exportData,
      sheetName: 'Get In Touch',
      filename: generateExportFilename('get-in-touch-export', month, year),
      columnWidths: [
        { wch: 8 },  // ID
        { wch: 25 }, // Name
        { wch: 30 }, // Email
        { wch: 15 }, // Phone
        { wch: 20 }, // Location
        { wch: 12 }, // Status
        { wch: 30 }, // How did you hear about us?
        { wch: 50 }, // Message
        { wch: 15 }  // Submitted Date
      ]
    });

    const filename = generateExportFilename('get-in-touch-export', month, year);

    // Return the Excel file
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
    logger.error('GET /api/admin/get-in-touch/export error', { error: err?.message });
    return NextResponse.json({ success: false, error: 'Failed to export data' }, { status: 500 });
  }
}
