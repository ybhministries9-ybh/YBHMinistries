-- Migration: Remove title and description columns from home_hero_images table
-- Date: 2025-11-10
-- Description: These fields are no longer needed in the admin UI

-- Remove title column
ALTER TABLE home_hero_images DROP COLUMN IF EXISTS title;

-- Remove description column
ALTER TABLE home_hero_images DROP COLUMN IF EXISTS description;

-- Verify the changes
-- SELECT * FROM home_hero_images LIMIT 1;
