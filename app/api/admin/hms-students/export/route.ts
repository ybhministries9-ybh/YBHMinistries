import { NextRequest, NextResponse } from 'next/server';
import { resolveSessionAndActorFromAuthHeader } from '@/lib/sessions';
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

    const url = new URL(request.url);
    const q = url.searchParams.get('q') || undefined;
    const month = url.searchParams.get('month') || undefined;
    const year = url.searchParams.get('year') || undefined;
    const status = url.searchParams.get('status') || undefined;

    // Build query with filters - excluding updated_at, createdBy, updatedBy
    let query = `
      SELECT 
        id, full_name, date_of_birth, gender, address, city_state_zip, 
        phone_number, email, parent_guardian_name, parent_guardian_contact,
        program_applying_for, instrument_specialization, instrument_other,
        preferred_class_type, preferred_schedule, course_type,
        years_of_experience, previous_training, music_exam_certifications,
        performance_experience, performance_other, goals,
        volunteer_interested, volunteer_areas,
        emergency_name, emergency_relationship, emergency_contact,
        hear_about_us, other_hear_about_us,
        status, created_at
      FROM hms_students
    `;
    const values: any[] = [];
    const conditions: string[] = [];

    // Add search filter
    if (q && q.trim().length > 0) {
      const searchPattern = `%${q.trim()}%`;
      conditions.push(`(full_name ILIKE $${values.length + 1} OR email ILIKE $${values.length + 2} OR phone_number ILIKE $${values.length + 3})`);
      values.push(searchPattern, searchPattern, searchPattern);
    }

    // Add status filter
    if (status && status.trim().length > 0) {
      conditions.push(`status = $${values.length + 1}`);
      values.push(status.trim());
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

    // Helper function to format array fields
    const formatArray = (arr: any): string => {
      if (!arr || !Array.isArray(arr)) return '';
      return arr.join(', ');
    };

    // Transform data for Excel export
    const exportData = result.rows.map(record => ({
      'ID': record.id,
      'Full Name': record.full_name,
      'Date of Birth': formatISTDate(record.date_of_birth),
      'Gender': record.gender || '',
      'Address': record.address || '',
      'City/State/Zip': record.city_state_zip || '',
      'Phone': record.phone_number || '',
      'Email': record.email || '',
      'Parent/Guardian Name': record.parent_guardian_name || '',
      'Parent/Guardian Contact': record.parent_guardian_contact || '',
      'Programs': formatArray(record.program_applying_for),
      'Instruments': formatArray(record.instrument_specialization),
      'Other Instrument': record.instrument_other || '',
      'Preferred Class Type': formatArray(record.preferred_class_type),
      'Preferred Schedule': formatArray(record.preferred_schedule),
      'Course Type': formatArray(record.course_type),
      'Years of Experience': record.years_of_experience || '',
      'Previous Training': record.previous_training || '',
      'Music Certifications': record.music_exam_certifications || '',
      'Performance Experience': formatArray(record.performance_experience),
      'Other Performance': record.performance_other || '',
      'Goals': record.goals || '',
      'Volunteer Interest': record.volunteer_interested ? 'Yes' : 'No',
      'Volunteer Areas': formatArray(record.volunteer_areas),
      'Emergency Contact Name': record.emergency_name || '',
      'Emergency Relationship': record.emergency_relationship || '',
      'Emergency Contact': record.emergency_contact || '',
      'How Did You Hear About us': record.hear_about_us ? (record.hear_about_us + (record.other_hear_about_us ? `: ${record.other_hear_about_us}` : '')) : '',
      'Status': record.status || 'Submitted',
      'Enrollment Date': formatISTDate(record.created_at)
    }));

    // Generate Excel file
    const excelBuffer = await generateExcelBuffer({
      data: exportData,
      sheetName: 'HMS Enrollments',
      filename: generateExportFilename('hms-enrollments-export', month, year),
      columnWidths: [
        { wch: 8 },  // ID
        { wch: 25 }, // Full Name
        { wch: 15 }, // Date of Birth
        { wch: 10 }, // Gender
        { wch: 30 }, // Address
        { wch: 20 }, // City/State/Zip
        { wch: 15 }, // Phone
        { wch: 30 }, // Email
        { wch: 25 }, // Parent/Guardian Name
        { wch: 15 }, // Parent/Guardian Contact
        { wch: 25 }, // Programs
        { wch: 25 }, // Instruments
        { wch: 20 }, // Other Instrument
        { wch: 20 }, // Preferred Class Type
        { wch: 20 }, // Preferred Schedule
        { wch: 20 }, // Course Type
        { wch: 15 }, // Years of Experience
        { wch: 30 }, // Previous Training
        { wch: 30 }, // Music Certifications
        { wch: 25 }, // Performance Experience
        { wch: 20 }, // Other Performance
        { wch: 40 }, // Goals
        { wch: 15 }, // Volunteer Interest
        { wch: 25 }, // Volunteer Areas
        { wch: 25 }, // Emergency Contact Name
        { wch: 20 }, // Emergency Relationship
        { wch: 15 }, // Emergency Contact
        { wch: 25 }, // How Did You Hear
        { wch: 12 }, // Status
        { wch: 15 }  // Enrollment Date
      ]
    });

    const filename = generateExportFilename('hms-enrollments-export', month, year);

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
    logger.error('GET /api/admin/hms-students/export error', { error: err?.message });
    return NextResponse.json({ success: false, error: 'Failed to export data' }, { status: 500 });
  }
}
