-- Add thumbnail and medium URL columns to home_hero_images
ALTER TABLE IF EXISTS home_hero_images
ADD COLUMN IF NOT EXISTS thumbnail_url text;

ALTER TABLE IF EXISTS home_hero_images
ADD COLUMN IF NOT EXISTS medium_url text;

-- Create a simple processing queue table
CREATE TABLE IF NOT EXISTS image_processing_queue (
  id serial PRIMARY KEY,
  hero_image_id integer NOT NULL,
  r2_bucket text,
  r2_key text,
  status text DEFAULT 'pending', -- pending | processing | done | failed
  attempts integer DEFAULT 0,
  last_error text,
  created_at timestamptz DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamptz DEFAULT CURRENT_TIMESTAMP
);

-- Index for quick lookup of pending items
CREATE INDEX IF NOT EXISTS idx_image_processing_queue_status ON image_processing_queue(status);
