import { NextRequest, NextResponse } from 'next/server';
import { resolveSessionAndActorFromAuthHeader } from '@/lib/sessions';
import { sql } from '@vercel/postgres';
import {
  generateExcelBuffer,
  formatISTDate,
  generateExportFilename,
} from '@/lib/exportUtils';
import { WORSHIP24_TIMESLOTS, getSecondSaturday, toYmd } from '@/lib/worship24Slots';

type Worship24Record = {
  id: number;
  name: string;
  email: string | null;
  phone: string | null;
  location: string | null;
  booking_date: string | Date | null;
  timeslot: string | null;
  status: string | null;
  facebook_link: string | null;
  message: string | null;
  created_at: string | null;
};

// The `worship24.booking_date` column comes back from the DB driver as a
// Date object, which ExcelJS stores as a real date cell -- Excel then renders
// it using the viewer's locale date format (e.g. "11/07/2026"). Open slot
// rows, by contrast, write a plain "YYYY-MM-DD" text string, so the two kinds
// of rows showed mismatched date formats in the same column. Formatting both
// to the same "YYYY-MM-DD" text string keeps every row consistent.
function formatBookingDate(bookingDate: string | Date | null | undefined): string {
  if (!bookingDate) return '';
  if (bookingDate instanceof Date) {
    if (Number.isNaN(bookingDate.getTime())) return '';
    return toYmd(bookingDate);
  }
  const raw = String(bookingDate).trim();
  if (!raw) return '';
  // Already a plain YYYY-MM-DD string -- keep as-is (avoid a timezone-shifting
  // round trip through `new Date(...)`).
  if (/^\d{4}-\d{2}-\d{2}/.test(raw)) return raw.slice(0, 10);
  const parsed = new Date(raw);
  return Number.isNaN(parsed.getTime()) ? raw : toYmd(parsed);
}

type Worship24ExportRow = {
  'Booking Date': string;
  Timeslot: string;
  Name: string;
  Email: string;
  Phone: string;
  Location: string;
  Status: string;
  Facebook: string;
  Message: string;
  'Submitted Date': string;
};

function normalizeStatus(status?: string | null): string {
  return !status || String(status).toLowerCase() === 'new' ? 'Submitted' : String(status);
}

// Appends a `status` filter condition, treating "Submitted" as also matching
// legacy rows with a NULL or 'New' status (the UI displays those as
// "Submitted" too, so the export filter should match what's shown on screen).
function appendStatusCondition(conditions: string[], values: any[], status: string | undefined): void {
  if (!status || status.trim().length === 0) return;
  const trimmedStatus = status.trim();
  if (trimmedStatus.toLowerCase() === 'submitted') {
    conditions.push(`(status IS NULL OR LOWER(status) IN ('new', 'submitted'))`);
  } else {
    conditions.push(`status = $${values.length + 1}`);
    values.push(trimmedStatus);
  }
}

function recordToRow(record: Worship24Record): Worship24ExportRow {
  return {
    'Booking Date': formatBookingDate(record.booking_date),
    Timeslot: record.timeslot || '',
    Name: record.name,
    Email: record.email || '',
    Phone: record.phone || '',
    Location: record.location || '',
    Status: normalizeStatus(record.status),
    Facebook: record.facebook_link || '',
    Message: record.message || '',
    'Submitted Date': formatISTDate(record.created_at),
  };
}

// A single space (rather than an empty string) is used for the unfilled
// columns of an open slot. Excel/ExcelJS can otherwise misrender a genuinely
// empty cell in a data row (observed as stray numbers bleeding into blank
// columns), so a space keeps the cell visually blank while still writing a
// real value to it.
const BLANK = ' ';

function emptySlotRow(bookingDate: string, timeslot: string): Worship24ExportRow {
  return {
    'Booking Date': bookingDate,
    Timeslot: timeslot,
    Name: BLANK,
    Email: BLANK,
    Phone: BLANK,
    Location: BLANK,
    Status: 'Available',
    Facebook: BLANK,
    Message: BLANK,
    'Submitted Date': BLANK,
  };
}

// Column widths, in the same order as the Worship24ExportRow keys:
// Booking Date, Timeslot, Name, Email, Phone, Location, Status,
// Facebook, Message, Submitted Date.
const EXPORT_COLUMN_WIDTHS = [
  { wch: 15 },
  { wch: 20 },
  { wch: 25 },
  { wch: 30 },
  { wch: 15 },
  { wch: 20 },
  { wch: 12 },
  { wch: 30 },
  { wch: 50 },
  { wch: 15 },
];

export async function GET(request: NextRequest) {
  try {
    const resolved = await resolveSessionAndActorFromAuthHeader(request.headers.get('authorization') || '');
    if (!resolved) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });

    const url = new URL(request.url);
    const q = url.searchParams.get('q') || undefined;
    const month = url.searchParams.get('month') || undefined;
    const year = url.searchParams.get('year') || undefined;
    const status = url.searchParams.get('status') || undefined;

    // Full-slot mode: when both month and year are selected (and there's no
    // free-text search), the 24 Hours Worship event date is fully determined
    // (2nd Saturday of that month) so every one of the 48 fixed timeslots can
    // be listed -- booked slots show their submission details, open slots
    // are exported with blank columns instead of being omitted entirely.
    const monthNum = month ? parseInt(month, 10) : NaN;
    const yearNum = year ? parseInt(year, 10) : NaN;
    const useFullSlotMode =
      !q && Number.isInteger(monthNum) && monthNum >= 1 && monthNum <= 12 && Number.isInteger(yearNum);

    let exportData: Worship24ExportRow[];

    if (useFullSlotMode) {
      const bookingDate = toYmd(getSecondSaturday(yearNum, monthNum - 1));

      const values: any[] = [bookingDate];
      const conditions: string[] = ['booking_date = $1'];

      // Status filter narrows which booked slots are shown; open slots are
      // always included regardless of the status filter since they have none.
      appendStatusCondition(conditions, values, status);

      const query = `
        SELECT id, name, email, phone, booking_date, timeslot, facebook_link, location, message, status, created_at
        FROM worship24
        WHERE ${conditions.join(' AND ')}
      `;
      const result = await sql.query(query, values);

      const recordsByTimeslot = new Map<string, Worship24Record>();
      for (const record of result.rows as Worship24Record[]) {
        if (record.timeslot) recordsByTimeslot.set(record.timeslot, record);
      }

      exportData = WORSHIP24_TIMESLOTS.map((slot) => {
        const record = recordsByTimeslot.get(slot);
        return record ? recordToRow(record) : emptySlotRow(bookingDate, slot);
      });
    } else {
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
      appendStatusCondition(conditions, values, status);

      // Filter by booking_date (not created_at) to match the admin table view,
      // which filters worship24 bookings by their booking date, not submission date.
      if (month && year && Number.isInteger(monthNum) && Number.isInteger(yearNum)) {
        const startDate = `${yearNum}-${String(monthNum).padStart(2, '0')}-01`;
        const nextMonth = monthNum === 12 ? 1 : monthNum + 1;
        const nextYear = monthNum === 12 ? yearNum + 1 : yearNum;
        const endDate = `${nextYear}-${String(nextMonth).padStart(2, '0')}-01`;
        conditions.push(`DATE(booking_date AT TIME ZONE 'UTC' AT TIME ZONE 'Asia/Kolkata') >= $${values.length + 1} AND DATE(booking_date AT TIME ZONE 'UTC' AT TIME ZONE 'Asia/Kolkata') < $${values.length + 2}`);
        values.push(startDate, endDate);
      } else if (year && Number.isInteger(yearNum)) {
        const startDate = `${yearNum}-01-01`;
        const endDate = `${yearNum + 1}-01-01`;
        conditions.push(`DATE(booking_date AT TIME ZONE 'UTC' AT TIME ZONE 'Asia/Kolkata') >= $${values.length + 1} AND DATE(booking_date AT TIME ZONE 'UTC' AT TIME ZONE 'Asia/Kolkata') < $${values.length + 2}`);
        values.push(startDate, endDate);
      } else if (month && Number.isInteger(monthNum) && monthNum >= 1 && monthNum <= 12) {
        conditions.push(`EXTRACT(MONTH FROM (booking_date AT TIME ZONE 'UTC' AT TIME ZONE 'Asia/Kolkata')) = $${values.length + 1}`);
        values.push(monthNum);
      }

      if (conditions.length > 0) query += ` WHERE ${conditions.join(' AND ')}`;
      query += ' ORDER BY created_at DESC';

      const result = values.length > 0 ? await sql.query(query, values) : await sql.query(query);
      exportData = (result.rows as Worship24Record[]).map(recordToRow);
    }

    const filename = generateExportFilename('worship24-export', month, year);

    const excelBuffer = await generateExcelBuffer({
      data: exportData,
      sheetName: 'Worship24',
      filename,
      columnWidths: EXPORT_COLUMN_WIDTHS,
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
