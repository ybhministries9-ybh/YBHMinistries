-- Add thumbnail and medium columns to gallery_items to store processed image variants
ALTER TABLE IF EXISTS gallery_items
ADD COLUMN IF NOT EXISTS thumbnail_url text;

ALTER TABLE IF EXISTS gallery_items
ADD COLUMN IF NOT EXISTS medium_url text;

-- Ensure bucket column exists (already present in some schemas)
-- Note: we do not store bucket per-item. All images are written to the private bucket configured
-- via the `R2_PRIVATE_BUCKET` environment variable. Keeping bucket column is unnecessary.
