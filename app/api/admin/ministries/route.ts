import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';

// GET - Fetch all ministries (admin)
export async function GET() {
  try {
    const { rows } = await sql`
      SELECT id, name, slug, is_active, created_by, updated_by, created_at, updated_at
      FROM ministries
      ORDER BY name ASC
    `;

    return NextResponse.json({ ministries: rows }, { status: 200 });
  } catch (error) {
    console.error('Error fetching ministries:', error);
    
    // Check if it's a database initialization error
    if (error instanceof Error && error.message.includes('relation "ministries" does not exist')) {
      return NextResponse.json(
        { 
          error: 'Database not initialized. Please run the ministries.sql schema file.',
          details: 'The ministries table does not exist in the database.'
        },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to fetch ministries' },
      { status: 500 }
    );
  }
}

// PUT - Update ministry visibility
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, is_active } = body;

    if (!id) {
      return NextResponse.json(
        { error: 'Ministry ID is required' },
        { status: 400 }
      );
    }

    if (is_active === undefined) {
      return NextResponse.json(
        { error: 'is_active field is required' },
        { status: 400 }
      );
    }

    // TODO: Get actual user from session when authentication is implemented
    const updatedBy = 'admin'; // Default admin user
    
    const { rows } = await sql`
      UPDATE ministries
      SET is_active = ${is_active}, 
          updated_by = ${updatedBy},
          updated_at = CURRENT_TIMESTAMP
      WHERE id = ${id}
      RETURNING id, name, slug, is_active, updated_by, updated_at
    `;

    if (rows.length === 0) {
      return NextResponse.json(
        { error: 'Ministry not found' },
        { status: 404 }
      );
    }

    // Invalidate the cache for the public ministries API
    revalidatePath('/api/ministries');
    
    // Also revalidate the ministries page
    revalidatePath('/ministries');

    return NextResponse.json({ ministry: rows[0] }, { status: 200 });
  } catch (error) {
    console.error('Error updating ministry visibility:', error);
    return NextResponse.json(
      { error: 'Failed to update ministry visibility' },
      { status: 500 }
    );
  }
}
