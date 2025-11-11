-- Migration: Remove unused columns from home_video table
-- Date: 2025-11-10
-- Reason: video_url, title, description, and duration are not required. Keep only blob_url and thumbnail_url.

-- ============================================
-- Drop unused columns from home_video
-- ============================================

-- Drop the video_url column (redundant with blob_url)
ALTER TABLE home_video 
DROP COLUMN IF EXISTS video_url;

-- Drop the title column (not needed)
ALTER TABLE home_video 
DROP COLUMN IF EXISTS title;

-- Drop the description column (not needed)
ALTER TABLE home_video 
DROP COLUMN IF EXISTS description;

-- Drop the duration column (not needed)
ALTER TABLE home_video 
DROP COLUMN IF EXISTS duration;

-- ============================================
-- Verification Query (Run after migration)
-- ============================================

-- Verify the columns are removed
-- SELECT * FROM home_video LIMIT 1;

-- Expected result: Should only show id, blob_url, thumbnail_url, is_active, 
-- created_at, updated_at, created_by, updated_by columns
