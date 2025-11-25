-- Add thumbnail_orig_url column to home_video to track the original uploaded thumbnail
ALTER TABLE IF EXISTS home_video
ADD COLUMN IF NOT EXISTS thumbnail_orig_url text;

-- Ensure existing rows have NULL for new column
UPDATE home_video SET thumbnail_orig_url = NULL WHERE thumbnail_orig_url IS NULL;
-- Add thumbnail_orig_url column to home_video so we can remove original uploaded files
ALTER TABLE IF EXISTS home_video
ADD COLUMN IF NOT EXISTS thumbnail_orig_url text;

-- Backfill with NULL (no-op)
UPDATE home_video SET thumbnail_orig_url = NULL WHERE thumbnail_orig_url IS NULL;
