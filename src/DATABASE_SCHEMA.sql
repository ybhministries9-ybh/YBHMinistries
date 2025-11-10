-- ============================================================================
-- YESHUA BETH HALLEL MINISTRIES - HERO IMAGES DATABASE SCHEMA
-- ============================================================================
-- Run this SQL in your Vercel Postgres (Neon) database
-- ============================================================================

-- Create hero_images table
CREATE TABLE hero_images (
  id SERIAL PRIMARY KEY,
  desktop_url TEXT NOT NULL,
  mobile_url TEXT NOT NULL,
  alt_text TEXT DEFAULT 'Ministry Hero Image',
  display_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Index for fast queries on active images (used by frontend)
CREATE INDEX idx_hero_images_active_order ON hero_images(display_order, id) 
  WHERE is_active = true;

-- Index for admin queries (all images)
CREATE INDEX idx_hero_images_order ON hero_images(display_order, id);

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to call the function before any UPDATE
CREATE TRIGGER update_hero_images_updated_at 
  BEFORE UPDATE ON hero_images 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- VERIFICATION QUERIES
-- ============================================================================

-- Check if table was created successfully
SELECT table_name 
FROM information_schema.tables 
WHERE table_name = 'hero_images';

-- Check table structure
\d hero_images

-- ============================================================================
-- SAMPLE DATA (Optional - for testing)
-- ============================================================================
-- Uncomment to insert sample data for testing

/*
INSERT INTO hero_images (desktop_url, mobile_url, alt_text, display_order) VALUES
('https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Home/hero/16x9/00.jpg', 
 'https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Home/hero/9x16/00.jpg', 
 'Ministry Event - Worship Service', 0),

('https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Home/hero/16x9/01.jpg', 
 'https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Home/hero/9x16/01.jpg', 
 'Ministry Event - Praise and Worship', 1),

('https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Home/hero/16x9/02.jpg', 
 'https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Home/hero/9x16/02.jpg', 
 'Ministry Event - Community Gathering', 2);
*/

-- ============================================================================
-- USEFUL QUERIES FOR MANAGEMENT
-- ============================================================================

-- View all images ordered by display order
SELECT id, alt_text, display_order, is_active 
FROM hero_images 
ORDER BY display_order;

-- View only active images (what frontend will show)
SELECT id, desktop_url, mobile_url, alt_text 
FROM hero_images 
WHERE is_active = true 
ORDER BY display_order;

-- Count total and active images
SELECT 
  COUNT(*) as total_images,
  SUM(CASE WHEN is_active = true THEN 1 ELSE 0 END) as active_images
FROM hero_images;

-- Toggle image visibility
UPDATE hero_images SET is_active = NOT is_active WHERE id = 1;

-- Update display order
UPDATE hero_images SET display_order = 0 WHERE id = 5;

-- Delete an image
DELETE FROM hero_images WHERE id = 1;

-- ============================================================================
-- BULK INSERT TEMPLATE (for your 23 images)
-- ============================================================================
-- Replace the URLs with your actual Vercel Blob URLs

/*
INSERT INTO hero_images (desktop_url, mobile_url, alt_text, display_order) VALUES
('https://YOUR-BLOB-URL/16x9/00.jpg', 'https://YOUR-BLOB-URL/9x16/00.jpg', 'Ministry Event', 0),
('https://YOUR-BLOB-URL/16x9/01.jpg', 'https://YOUR-BLOB-URL/9x16/01.jpg', 'Ministry Event', 1),
('https://YOUR-BLOB-URL/16x9/02.jpg', 'https://YOUR-BLOB-URL/9x16/02.jpg', 'Ministry Event', 2),
('https://YOUR-BLOB-URL/16x9/03.jpg', 'https://YOUR-BLOB-URL/9x16/03.jpg', 'Ministry Event', 3),
('https://YOUR-BLOB-URL/16x9/04.jpg', 'https://YOUR-BLOB-URL/9x16/04.jpg', 'Ministry Event', 4),
('https://YOUR-BLOB-URL/16x9/05.jpg', 'https://YOUR-BLOB-URL/9x16/05.jpg', 'Ministry Event', 5),
('https://YOUR-BLOB-URL/16x9/06.jpg', 'https://YOUR-BLOB-URL/9x16/06.jpg', 'Ministry Event', 6),
('https://YOUR-BLOB-URL/16x9/07.jpg', 'https://YOUR-BLOB-URL/9x16/07.jpg', 'Ministry Event', 7),
('https://YOUR-BLOB-URL/16x9/08.jpg', 'https://YOUR-BLOB-URL/9x16/08.jpg', 'Ministry Event', 8),
('https://YOUR-BLOB-URL/16x9/09.jpg', 'https://YOUR-BLOB-URL/9x16/09.jpg', 'Ministry Event', 9),
('https://YOUR-BLOB-URL/16x9/10.jpg', 'https://YOUR-BLOB-URL/9x16/10.jpg', 'Ministry Event', 10),
('https://YOUR-BLOB-URL/16x9/11.jpg', 'https://YOUR-BLOB-URL/9x16/11.jpg', 'Ministry Event', 11),
('https://YOUR-BLOB-URL/16x9/12.jpg', 'https://YOUR-BLOB-URL/9x16/12.jpg', 'Ministry Event', 12),
('https://YOUR-BLOB-URL/16x9/13.jpg', 'https://YOUR-BLOB-URL/9x16/13.jpg', 'Ministry Event', 13),
('https://YOUR-BLOB-URL/16x9/14.jpg', 'https://YOUR-BLOB-URL/9x16/14.jpg', 'Ministry Event', 14),
('https://YOUR-BLOB-URL/16x9/15.jpg', 'https://YOUR-BLOB-URL/9x16/15.jpg', 'Ministry Event', 15),
('https://YOUR-BLOB-URL/16x9/16.jpg', 'https://YOUR-BLOB-URL/9x16/16.jpg', 'Ministry Event', 16),
('https://YOUR-BLOB-URL/16x9/17.jpg', 'https://YOUR-BLOB-URL/9x16/17.jpg', 'Ministry Event', 17),
('https://YOUR-BLOB-URL/16x9/18.jpg', 'https://YOUR-BLOB-URL/9x16/18.jpg', 'Ministry Event', 18),
('https://YOUR-BLOB-URL/16x9/19.jpg', 'https://YOUR-BLOB-URL/9x16/19.jpg', 'Ministry Event', 19),
('https://YOUR-BLOB-URL/16x9/20.jpg', 'https://YOUR-BLOB-URL/9x16/20.jpg', 'Ministry Event', 20),
('https://YOUR-BLOB-URL/16x9/21.jpg', 'https://YOUR-BLOB-URL/9x16/21.jpg', 'Ministry Event', 21),
('https://YOUR-BLOB-URL/16x9/22.jpg', 'https://YOUR-BLOB-URL/9x16/22.jpg', 'Ministry Event', 22);
*/

-- ============================================================================
-- BACKUP AND RESTORE
-- ============================================================================

-- Backup all hero images to CSV (run in psql)
\copy (SELECT * FROM hero_images ORDER BY display_order) TO 'hero_images_backup.csv' CSV HEADER;

-- Restore from CSV
\copy hero_images(desktop_url, mobile_url, alt_text, display_order, is_active) FROM 'hero_images_backup.csv' CSV HEADER;

-- ============================================================================
-- END OF SCHEMA
-- ============================================================================
