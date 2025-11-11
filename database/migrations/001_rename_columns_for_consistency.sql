-- Database Migration: Column Rename for Consistency
-- Date: 2024
-- Description: Rename blob_url columns to more descriptive names (video_url, image_url, thumbnail_image_url)

-- IMPORTANT: Run this on production database BEFORE deploying the updated code
-- Make sure to backup database before running these commands

-- ===================================================================
-- MIGRATION STEPS
-- ===================================================================

-- Step 1: Rename blob_url to video_url in home_video table
ALTER TABLE home_video 
RENAME COLUMN blob_url TO video_url;

-- Step 2: Rename thumbnail_url to thumbnail_image_url in home_video table  
ALTER TABLE home_video 
RENAME COLUMN thumbnail_url TO thumbnail_image_url;

-- Step 3: Rename blob_url to image_url in home_hero_images table
ALTER TABLE home_hero_images 
RENAME COLUMN blob_url TO image_url;

-- ===================================================================
-- VERIFICATION QUERIES
-- ===================================================================

-- Verify home_video table structure
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'home_video' 
  AND column_name IN ('video_url', 'thumbnail_image_url')
ORDER BY column_name;

-- Expected output:
-- column_name          | data_type | is_nullable
-- thumbnail_image_url  | text      | YES
-- video_url            | text      | YES

-- Verify home_hero_images table structure
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'home_hero_images' 
  AND column_name = 'image_url';

-- Expected output:
-- column_name | data_type | is_nullable
-- image_url   | text      | NO

-- ===================================================================
-- ROLLBACK (if needed)
-- ===================================================================

-- If you need to rollback these changes:
-- ALTER TABLE home_video RENAME COLUMN video_url TO blob_url;
-- ALTER TABLE home_video RENAME COLUMN thumbnail_image_url TO thumbnail_url;
-- ALTER TABLE home_hero_images RENAME COLUMN image_url TO blob_url;

-- ===================================================================
-- NOTES
-- ===================================================================
-- 1. These column renames do NOT affect data - only column names change
-- 2. Indexes and constraints remain intact
-- 3. Make sure no write operations are happening during migration
-- 4. Coordinate this migration with code deployment
-- 5. The application code has already been updated to use new column names
-- 6. After migration, deploy the updated application code immediately
