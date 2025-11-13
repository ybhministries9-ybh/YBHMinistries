import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export const dynamic = 'force-dynamic';

// GET: Fetch all reports for admin (published and unpublished)
export async function GET(request: NextRequest) {
  try {
    const result = await sql`
      SELECT id, year, class_type, monthly_data, published, created_at, updated_at
      FROM reports
      ORDER BY year DESC, class_type ASC
    `;

    const reports = result.rows.map(row => ({
      id: row.id.toString(),
      year: row.year,
      classType: row.class_type,
      data: row.monthly_data,
      published: row.published,
      createdAt: row.created_at,
      updatedAt: row.updated_at
    }));

    return NextResponse.json({
      success: true,
      data: reports,
      count: reports.length
    });
  } catch (error) {
    console.error('Error fetching reports:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch reports' },
      { status: 500 }
    );
  }
}

// POST: Create a new report
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { year, classType, data, published } = body;

    // Validate required fields
    if (!year || !classType || !data) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: year, classType, data' },
        { status: 400 }
      );
    }

    // Validate data is an array with 12 months
    if (!Array.isArray(data) || data.length !== 12) {
      return NextResponse.json(
        { success: false, error: 'Data must be an array of 12 monthly records' },
        { status: 400 }
      );
    }

    // Check if report already exists for this year and class type
    const existing = await sql`
      SELECT id FROM reports
      WHERE year = ${year} AND class_type = ${classType}
    `;

    if (existing.rows.length > 0) {
      return NextResponse.json(
        { success: false, error: 'Report already exists for this year and class type' },
        { status: 409 }
      );
    }

    // Insert new report
    const result = await sql`
      INSERT INTO reports (year, class_type, monthly_data, published)
      VALUES (${year}, ${classType}, ${JSON.stringify(data)}::jsonb, ${published || false})
      RETURNING id, year, class_type, monthly_data, published, created_at, updated_at
    `;

    const newReport = result.rows[0];

    return NextResponse.json({
      success: true,
      data: {
        id: newReport.id.toString(),
        year: newReport.year,
        classType: newReport.class_type,
        data: newReport.monthly_data,
        published: newReport.published,
        createdAt: newReport.created_at,
        updatedAt: newReport.updated_at
      },
      message: 'Report created successfully'
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating report:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create report' },
      { status: 500 }
    );
  }
}

// PUT: Update an existing report
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, year, classType, data, published } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Report ID is required' },
        { status: 400 }
      );
    }

    // Build update query dynamically based on provided fields
    const updates: string[] = [];
    const values: any[] = [];
    let paramCount = 1;

    if (year !== undefined) {
      updates.push(`year = $${paramCount++}`);
      values.push(year);
    }
    if (classType !== undefined) {
      updates.push(`class_type = $${paramCount++}`);
      values.push(classType);
    }
    if (data !== undefined) {
      updates.push(`monthly_data = $${paramCount++}::jsonb`);
      values.push(JSON.stringify(data));
    }
    if (published !== undefined) {
      updates.push(`published = $${paramCount++}`);
      values.push(published);
    }

    if (updates.length === 0) {
      return NextResponse.json(
        { success: false, error: 'No fields to update' },
        { status: 400 }
      );
    }

    // Add id as the last parameter
    values.push(parseInt(id));

    const query = `
      UPDATE reports
      SET ${updates.join(', ')}
      WHERE id = $${paramCount}
      RETURNING id, year, class_type, monthly_data, published, created_at, updated_at
    `;

    const result = await sql.query(query, values);

    if (result.rows.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Report not found' },
        { status: 404 }
      );
    }

    const updatedReport = result.rows[0];

    return NextResponse.json({
      success: true,
      data: {
        id: updatedReport.id.toString(),
        year: updatedReport.year,
        classType: updatedReport.class_type,
        data: updatedReport.monthly_data,
        published: updatedReport.published,
        createdAt: updatedReport.created_at,
        updatedAt: updatedReport.updated_at
      },
      message: 'Report updated successfully'
    });
  } catch (error) {
    console.error('Error updating report:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update report' },
      { status: 500 }
    );
  }
}

// DELETE: Delete a report
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Report ID is required' },
        { status: 400 }
      );
    }

    const result = await sql`
      DELETE FROM reports
      WHERE id = ${parseInt(id)}
      RETURNING id
    `;

    if (result.rows.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Report not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Report deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting report:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete report' },
      { status: 500 }
    );
  }
}
