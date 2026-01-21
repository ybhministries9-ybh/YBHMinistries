-- Home Page Content Management Tables
-- Database: Vercel Postgres

-- ============================================
-- Table: home_hero_images
-- Purpose: Store hero slideshow images for home page
-- ============================================
CREATE TABLE IF NOT EXISTS home_hero_images (
    id SERIAL PRIMARY KEY,
    image_url TEXT NOT NULL, -- Vercel Blob URL for display and management
    mobile_image_url TEXT, -- Optional mobile-specific image (internal r2:// or public URL)
    mobile_thumbnail_url TEXT,
    mobile_medium_url TEXT,
    display_order INTEGER NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(255),
    updated_by VARCHAR(255),
    
    -- Indexes for better performance
    CONSTRAINT unique_display_order UNIQUE (display_order)
);

-- Index for active images ordered by display_order
CREATE INDEX idx_home_hero_images_active_order 
ON home_hero_images(display_order) 
WHERE is_active = true;

-- ============================================
-- Table: home_video
-- Purpose: Store featured video for home page (only one video at a time)
-- ============================================
CREATE TABLE IF NOT EXISTS home_video (
    id SERIAL PRIMARY KEY,
    video_url TEXT, -- Vercel Blob URL for video (nullable to allow video-only deletion)
    thumbnail_image_url TEXT, -- Video thumbnail/poster image (optional)
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(255),
    updated_by VARCHAR(255)
);

-- Index for active video
CREATE INDEX idx_home_video_active 
ON home_video(is_active, created_at DESC) 
WHERE is_active = true;

-- ============================================
-- Trigger: Update timestamp on record update
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply trigger to home_hero_images
CREATE TRIGGER update_home_hero_images_updated_at 
    BEFORE UPDATE ON home_hero_images
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Apply trigger to home_video
CREATE TRIGGER update_home_video_updated_at 
    BEFORE UPDATE ON home_video
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- Insert default/fallback data
-- ============================================
-- Insert existing hero images as fallback
INSERT INTO home_hero_images (image_url, display_order, is_active) VALUES
('https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Home/hero/16x9/00.jpg', 1, true),
('https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Home/hero/16x9/01.jpg', 2, true),
('https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Home/hero/16x9/1.jpg', 3, true),
('https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Home/hero/16x9/10%281%29.jpg', 4, true),
('https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Home/hero/16x9/10.jpg', 5, true),
('https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Home/hero/16x9/10a.jpg', 6, true),
('https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Home/hero/16x9/11.jpg', 7, true),
('https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Home/hero/16x9/11a.jpg', 8, true),
('https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Home/hero/16x9/12.jpg', 9, true),
('https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Home/hero/16x9/13.jpg', 10, true),
('https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Home/hero/16x9/14.jpg', 11, true),
('https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Home/hero/16x9/15.jpg', 12, true),
('https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Home/hero/16x9/16.jpg', 13, true),
('https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Home/hero/16x9/17.jpg', 14, true),
('https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Home/hero/16x9/18.jpg', 15, true),
('https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Home/hero/16x9/2.jpg', 16, true),
('https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Home/hero/16x9/3.jpg', 17, true),
('https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Home/hero/16x9/4.jpg', 18, true),
('https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Home/hero/16x9/5.jpg', 19, true),
('https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Home/hero/16x9/6.jpg', 20, true),
('https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Home/hero/16x9/7.jpg', 21, true),
('https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Home/hero/16x9/8.jpg', 22, true),
('https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Home/hero/16x9/9.jpg', 23, true)
ON CONFLICT (display_order) DO NOTHING;

-- Insert existing video as fallback
INSERT INTO home_video (video_url, thumbnail_image_url, is_active) VALUES
('https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Home/Augustine.mp4',
'https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Home/hero/16x9/00.jpg',
true)
ON CONFLICT DO NOTHING;

-- ============================================
-- Common Queries (for reference)
-- ============================================

-- Get all active hero images in display order
-- SELECT * FROM home_hero_images WHERE is_active = true ORDER BY display_order ASC;

-- Get active video
-- SELECT * FROM home_video WHERE is_active = true ORDER BY created_at DESC LIMIT 1;

-- Update display order
-- UPDATE home_hero_images SET display_order = ? WHERE id = ?;

-- Deactivate old video and activate new one
-- UPDATE home_video SET is_active = false WHERE is_active = true;
-- UPDATE home_video SET is_active = true WHERE id = ?;
