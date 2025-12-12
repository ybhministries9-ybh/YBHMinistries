// Vercel Serverless Function for Hero Images API
// This file should be placed in /api/hero-images.ts for Vercel deployment

import type { VercelRequest, VercelResponse } from '@vercel/node';
import { logger } from '@/lib/logger';
import { sql } from '@vercel/postgres';

export interface HeroImage {
  id: number;
  desktopUrl: string;
  mobileUrl: string;
  altText: string;
  displayOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// GET /api/hero-images - List all hero images (or only active ones)
// POST /api/hero-images - Create new hero image
async function handleHeroImages(req: VercelRequest, res: VercelResponse) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    if (req.method === 'GET') {
      // Get query parameter to filter active only
      const activeOnly = req.query.activeOnly === 'true';
      
      let query;
      if (activeOnly) {
        query = await sql`
          SELECT id, desktop_url, mobile_url, alt_text, display_order, is_active, created_at, updated_at
          FROM hero_images
          WHERE is_active = true
          ORDER BY display_order ASC, id ASC
        `;
      } else {
        query = await sql`
          SELECT id, desktop_url, mobile_url, alt_text, display_order, is_active, created_at, updated_at
          FROM hero_images
          ORDER BY display_order ASC, id ASC
        `;
      }

      // Convert snake_case to camelCase
      const images = query.rows.map(row => ({
        id: row.id,
        desktopUrl: row.desktop_url,
        mobileUrl: row.mobile_url,
        altText: row.alt_text,
        displayOrder: row.display_order,
        isActive: row.is_active,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
      }));

      // small short-circuit cache for callers (10s) to reduce DB hits for frequent page loads
      res.setHeader('Cache-Control', 'public, max-age=10');
      return res.status(200).json({ images });
    }

    if (req.method === 'POST') {
      const { desktopUrl, mobileUrl, altText = 'Ministry Hero Image', displayOrder } = req.body;

      if (!desktopUrl || !mobileUrl) {
        return res.status(400).json({ error: 'Desktop and mobile URLs are required' });
      }

      // Get next order if not provided
      let order = displayOrder;
      if (order === undefined || order === null) {
        const maxOrderResult = await sql`
          SELECT COALESCE(MAX(display_order), -1) + 1 as next_order
          FROM hero_images
        `;
        order = maxOrderResult.rows[0].next_order;
      }

      const result = await sql`
        INSERT INTO hero_images (desktop_url, mobile_url, alt_text, display_order, is_active)
        VALUES (${desktopUrl}, ${mobileUrl}, ${altText}, ${order}, true)
        RETURNING id, desktop_url, mobile_url, alt_text, display_order, is_active, created_at, updated_at
      `;

      const newImage = result.rows[0];
      const image = {
        id: newImage.id,
        desktopUrl: newImage.desktop_url,
        mobileUrl: newImage.mobile_url,
        altText: newImage.alt_text,
        displayOrder: newImage.display_order,
        isActive: newImage.is_active,
        createdAt: newImage.created_at,
        updatedAt: newImage.updated_at,
      };

      return res.status(201).json({ image });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    logger.error('Hero images API error', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

export default handleHeroImages;
