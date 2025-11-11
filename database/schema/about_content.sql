-- About Page Content Schema
-- Table for managing About page hero image

-- Drop table if exists (for development/testing)
-- DROP TABLE IF EXISTS about_hero_image;

-- Create about_hero_image table
CREATE TABLE IF NOT EXISTS about_hero_image (
  id SERIAL PRIMARY KEY,
  image_url TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_by VARCHAR(255),
  updated_by VARCHAR(255)
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_about_hero_image_active ON about_hero_image(is_active);
CREATE INDEX IF NOT EXISTS idx_about_hero_image_created_at ON about_hero_image(created_at);

-- Clean up: Keep only the most recent record (if any exist)
DO $$
DECLARE
  latest_id INTEGER;
BEGIN
  -- Get the ID of the most recent record
  SELECT id INTO latest_id
  FROM about_hero_image
  ORDER BY created_at DESC
  LIMIT 1;
  
  -- Delete all other records if any exist
  IF latest_id IS NOT NULL THEN
    DELETE FROM about_hero_image WHERE id != latest_id;
  END IF;
END $$;

-- Insert default/sample data only if table is empty
INSERT INTO about_hero_image (image_url, is_active, created_by) 
SELECT 
  'https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/defaults/about-default.jpg',
  true,
  'system'
WHERE NOT EXISTS (SELECT 1 FROM about_hero_image);

-- Comments for documentation
COMMENT ON TABLE about_hero_image IS 'Stores hero image URL for the About page';
COMMENT ON COLUMN about_hero_image.image_url IS 'URL of the hero image (stored in Vercel Blob)';
COMMENT ON COLUMN about_hero_image.is_active IS 'Only one image should be active at a time';
