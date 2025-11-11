-- Migration: Remove redundant image_url column from home_hero_images
-- Date: 2025-11-10
-- Reason: image_url and blob_url were duplicates. Keeping only blob_url.

-- ============================================
-- Drop image_url column from home_hero_images
-- ============================================

-- Drop the image_url column if it exists
ALTER TABLE home_hero_images 
DROP COLUMN IF EXISTS image_url;

-- ============================================
-- Verification Query (Run after migration)
-- ============================================

-- Verify the column is removed
-- SELECT * FROM home_hero_images LIMIT 1;

-- Expected result: Should only show blob_url column, not image_url
