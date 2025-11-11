-- Migration: Make thumbnail_url required in home_video table
-- Date: 2025-01-10
-- Reason: Thumbnail is now mandatory for all videos

-- First, update any existing videos with NULL thumbnail to have a default value
-- (This ensures no data loss during the migration)
UPDATE home_video 
SET thumbnail_url = 'https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Home/hero/16x9/00.jpg'
WHERE thumbnail_url IS NULL;

-- Alter the column to make it NOT NULL
ALTER TABLE home_video 
ALTER COLUMN thumbnail_url SET NOT NULL;

-- Verification: This query should return no rows after the migration
SELECT * FROM home_video WHERE thumbnail_url IS NULL;

-- Expected result: Empty result set (0 rows)
