import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { getActorName } from '@/lib/sessions';

export const dynamic = 'force-dynamic';

// POST: Bulk update display_order for worship items
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const items: Array<{ id: string | number; display_order: number }> = data?.items || [];
    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ success: false, error: 'No items provided' }, { status: 400 });
    }

    // resolve actor for audit fields if available
    const auth = request.headers.get('authorization') || '';
    const token = auth.startsWith('Bearer ') ? auth.slice(7) : auth || null;
    const actor = await getActorName(token);

    // Update items in a simple loop; could be wrapped in a transaction if supported
    for (const it of items) {
      const id = String(it.id);
      const order = Number(it.display_order);
      if (!id || Number.isNaN(order)) continue;
      await sql`
        UPDATE worship
        SET display_order = ${order}, updated_by = ${actor}, updated_at = CURRENT_TIMESTAMP
        WHERE id = ${id}
      `;
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Error updating worship order:', err);
    return NextResponse.json({ success: false, error: 'Failed to update order' }, { status: 500 });
  }
}
