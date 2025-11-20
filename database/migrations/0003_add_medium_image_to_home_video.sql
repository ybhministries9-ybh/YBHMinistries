-- Add medium image URL column to home_video for processed thumbnails
ALTER TABLE IF EXISTS home_video
ADD COLUMN IF NOT EXISTS medium_image_url text;

-- Backfill medium_image_url with NULL for existing rows (no-op if column already exists)
UPDATE home_video SET medium_image_url = NULL WHERE medium_image_url IS NULL;
