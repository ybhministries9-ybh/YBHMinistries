-- Migration: Remove medium_image_url and thumbnail_orig_url from home_video
-- Date: 2025-11-20
-- Purpose: Clean up unused thumbnail variant columns now that only a single
-- `thumbnail_image_url` is used across the app.

BEGIN;

-- Safely drop columns if they exist
ALTER TABLE IF EXISTS home_video
  DROP COLUMN IF EXISTS medium_image_url;

ALTER TABLE IF EXISTS home_video
  DROP COLUMN IF EXISTS thumbnail_orig_url;

COMMIT;

-- Verification: list remaining columns for the home_video table
-- SELECT column_name, data_type FROM information_schema.columns
-- WHERE table_name = 'home_video' ORDER BY column_name;
