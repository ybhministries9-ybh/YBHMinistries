// Vercel Serverless Function for Reordering Hero Images
// POST /api/hero-images/reorder with body: { imageIds: [3, 1, 2, 4] }

import type { VercelRequest, VercelResponse } from '@vercel/node';
import { sql } from '@vercel/postgres';
import { logger } from '../../lib/logger';

async function handleReorder(req: VercelRequest, res: VercelResponse) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { imageIds } = req.body;

    if (!Array.isArray(imageIds)) {
      return res.status(400).json({ error: 'imageIds must be an array' });
    }

    // Update display_order for each image based on array position
    // Parallelize updates instead of awaiting each one sequentially
    await Promise.all(imageIds.map((id: number, i: number) =>
      sql`
        UPDATE hero_images
        SET display_order = ${i}
        WHERE id = ${id}
      `
    ));

    return res.status(200).json({ success: true, message: 'Images reordered successfully' });
  } catch (error) {
    logger.error('Reorder error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

export default handleReorder;
