// Vercel Serverless Function for Individual Hero Image Operations
// Handles PUT (update), DELETE, and PATCH (toggle) for specific hero images

import type { VercelRequest, VercelResponse } from '@vercel/node';
import { sql } from '@vercel/postgres';

async function handleHeroImageById(req: VercelRequest, res: VercelResponse) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { id } = req.query;
  const imageId = parseInt(id as string);

  if (isNaN(imageId)) {
    return res.status(400).json({ error: 'Invalid image ID' });
  }

  try {
    if (req.method === 'GET') {
      const result = await sql`
        SELECT id, desktop_url, mobile_url, alt_text, display_order, is_active, created_at, updated_at
        FROM hero_images
        WHERE id = ${imageId}
      `;

      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Image not found' });
      }

      const row = result.rows[0];
      const image = {
        id: row.id,
        desktopUrl: row.desktop_url,
        mobileUrl: row.mobile_url,
        altText: row.alt_text,
        displayOrder: row.display_order,
        isActive: row.is_active,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
      };

      return res.status(200).json({ image });
    }

    if (req.method === 'PUT') {
      const { desktopUrl, mobileUrl, altText, displayOrder } = req.body;

      const result = await sql`
        UPDATE hero_images
        SET 
          desktop_url = COALESCE(${desktopUrl}, desktop_url),
          mobile_url = COALESCE(${mobileUrl}, mobile_url),
          alt_text = COALESCE(${altText}, alt_text),
          display_order = COALESCE(${displayOrder}, display_order)
        WHERE id = ${imageId}
        RETURNING id, desktop_url, mobile_url, alt_text, display_order, is_active, created_at, updated_at
      `;

      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Image not found' });
      }

      const row = result.rows[0];
      const image = {
        id: row.id,
        desktopUrl: row.desktop_url,
        mobileUrl: row.mobile_url,
        altText: row.alt_text,
        displayOrder: row.display_order,
        isActive: row.is_active,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
      };

      return res.status(200).json({ image });
    }

    if (req.method === 'PATCH') {
      // Toggle visibility or partial update
      const { isActive } = req.body;

      const result = await sql`
        UPDATE hero_images
        SET is_active = ${isActive}
        WHERE id = ${imageId}
        RETURNING id, desktop_url, mobile_url, alt_text, display_order, is_active, created_at, updated_at
      `;

      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Image not found' });
      }

      const row = result.rows[0];
      const image = {
        id: row.id,
        desktopUrl: row.desktop_url,
        mobileUrl: row.mobile_url,
        altText: row.alt_text,
        displayOrder: row.display_order,
        isActive: row.is_active,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
      };

      return res.status(200).json({ image });
    }

    if (req.method === 'DELETE') {
      const result = await sql`
        DELETE FROM hero_images
        WHERE id = ${imageId}
        RETURNING id
      `;

      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Image not found' });
      }

      return res.status(200).json({ success: true, message: 'Image deleted' });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Hero image operation error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

export default handleHeroImageById;
