-- Gallery Items Management Table
-- Database: Vercel Postgres

-- ============================================
-- Table: gallery_items
-- Purpose: Store gallery images and videos for all categories
-- ============================================
CREATE TABLE IF NOT EXISTS gallery_items (
    id SERIAL PRIMARY KEY,
    category VARCHAR(100) NOT NULL, -- Category key: guinness-events, asian-records, etc.
    media_type VARCHAR(20) NOT NULL CHECK (media_type IN ('image', 'video')), -- Type of media
    url TEXT NOT NULL, -- URL for image or YouTube video
    title TEXT, -- Title for videos, optional for images
    bucket VARCHAR(255), -- Storage bucket name (e.g. ybh-store or ybh-pstore)
    date VARCHAR(50), -- Date in format DD-MMM-YYYY for videos
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(255),
    updated_by VARCHAR(255)
);

-- Index for category and media type filtering
CREATE INDEX idx_gallery_items_category_type 
ON gallery_items(category, media_type);

-- ============================================
-- Trigger: Update timestamp on record update
-- ============================================
CREATE OR REPLACE FUNCTION update_gallery_items_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply trigger to gallery_items
CREATE TRIGGER update_gallery_items_timestamp 
    BEFORE UPDATE ON gallery_items
    FOR EACH ROW
    EXECUTE FUNCTION update_gallery_items_updated_at();

-- ============================================
-- Insert default/fallback data (images)
-- ============================================
INSERT INTO gallery_items (category, media_type, url) VALUES
-- Guinness Events
('guinness-events', 'image', 'https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Gallery/Guinness/1.jpg'),
('guinness-events', 'image', 'https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Gallery/Guinness/9.jpg'),
('guinness-events', 'image', 'https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Gallery/Guinness/2.jpg'),
('guinness-events', 'image', 'https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Gallery/Guinness/14.jpg'),
('guinness-events', 'image', 'https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Gallery/Guinness/13.jpg'),
('guinness-events', 'image', 'https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Gallery/Guinness/12.jpg'),
('guinness-events', 'image', 'https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Gallery/Guinness/11a.jpg'),
('guinness-events', 'image', 'https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Gallery/Guinness/11.jpg'),
('guinness-events', 'image', 'https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Gallery/Guinness/10.jpg'),
('guinness-events', 'image', 'https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Gallery/Guinness/15.jpg'),

-- Asian Records
('asian-records', 'image', 'https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Gallery/Asian%20Book/1.jpg?w=1200'),
('asian-records', 'image', 'https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Gallery/Asian%20Book/2.jpg?w=1200'),
('asian-records', 'image', 'https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Gallery/Asian%20Book/3.jpg?w=1200'),
('asian-records', 'image', 'https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Gallery/Asian%20Book/4.jpg?w=1200'),
('asian-records', 'image', 'https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Gallery/Asian%20Book/5.jpg?w=1200'),

-- Ingenious Record
('ingenious-record', 'image', 'https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Gallery/Ingenious%20Charm/1.JPG?w=1200'),
('ingenious-record', 'image', 'https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Gallery/Ingenious%20Charm/2.JPG?w=1200'),
('ingenious-record', 'image', 'https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Gallery/Ingenious%20Charm/3.JPG?w=1200'),
('ingenious-record', 'image', 'https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Gallery/Ingenious%20Charm/4.JPG?w=1200'),
('ingenious-record', 'image', 'https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Gallery/Ingenious%20Charm/5.JPG?w=1200'),

-- Hallel Conferences
('hallel-conferences', 'image', 'https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Gallery/Conferences/1.jpg?w=1200'),
('hallel-conferences', 'image', 'https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Gallery/Conferences/2.jpg?w=1200'),
('hallel-conferences', 'image', 'https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Gallery/Conferences/3.jpg?w=1200'),
('hallel-conferences', 'image', 'https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Gallery/Conferences/4.jpg?w=1200'),
('hallel-conferences', 'image', 'https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Gallery/Conferences/5.jpg?w=1200'),

-- LCM Events
('lcm-events', 'image', 'https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Gallery/LCM/1.jpg?w=1200'),
('lcm-events', 'image', 'https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Gallery/LCM/2.jpg?w=1200'),
('lcm-events', 'image', 'https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Gallery/LCM/3.jpg?w=1200'),
('lcm-events', 'image', 'https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Gallery/LCM/4.jpg?w=1200'),
('lcm-events', 'image', 'https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Gallery/LCM/5.jpg?w=1200'),

-- Kids Training
('kids-training', 'image', 'https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Gallery/KidsSummerTraining/1.JPG'),
('kids-training', 'image', 'https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Gallery/KidsSummerTraining/2.JPG'),
('kids-training', 'image', 'https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Gallery/KidsSummerTraining/3.JPG'),
('kids-training', 'image', 'https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Gallery/KidsSummerTraining/4.JPG'),
('kids-training', 'image', 'https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Gallery/KidsSummerTraining/5.JPG');

-- ============================================
-- Insert default/fallback data (videos)
-- ============================================
INSERT INTO gallery_items (category, media_type, url, title, date) VALUES
-- Guinness Events Videos
('guinness-events', 'video', 'https://www.youtube.com/watch?v=onjJxyACJ0s', 'Guinness World Records REAL BENEFITS ?', '18-Jul-2025'),
('guinness-events', 'video', 'https://www.youtube.com/live/kj3JWuoFLrg', 'GUINNESS WORLD RECORD CERTIFICATES DISTRUBUTION CEREMONY - BANGALORE', '02-May-2025'),
('guinness-events', 'video', 'https://www.youtube.com/live/xCqagJW1Mcc', 'GUINNESS WORLD RECORD CERTIFICATES DISTRUBUTION CEREMONY VIJAYAWADA - PART 1', '24-Apr-2025'),

-- Asian Records Videos
('asian-records', 'video', 'https://www.youtube.com/watch?v=q-oB60TT9_Y', 'HMS Asia Book Records', '10-Apr-2024'),

-- Ingenious Record Videos
('ingenious-record', 'video', 'https://www.youtube.com/live/qL0FXMxWmAk', 'INGENIOUS CHARM WORLD RECORD', '30-May-2024'),

-- LCM Events Videos
('lcm-events', 'video', 'https://www.youtube.com/watch?v=iqU-XS4UJ0k', 'LCM Music Training Program', '25-Jul-2023'),
('lcm-events', 'video', 'https://www.youtube.com/watch?v=dBvlnyvgOnw', 'Student Recital Performance', '30-Jul-2023'),

-- International Star Records Videos
('international-star-records', 'video', 'https://www.youtube.com/watch?v=zAdKtc3uIWs', 'International Star Book 2023', '02-Oct-2023'),

-- Anniversary Videos
('anniversary', 'video', 'https://www.youtube.com/watch?v=jfKfPfyJRdk', 'HMS Anniversary Celebration 2023', '15-Sep-2023'),
('anniversary', 'video', 'https://www.youtube.com/watch?v=n61ULEU7CO0', 'Alumni Performances and Testimonies', '16-Sep-2023');

-- ============================================
-- Common Queries (for reference)
-- ============================================

-- Get all items for a category
-- SELECT * FROM gallery_items WHERE category = 'guinness-events' ORDER BY created_at DESC;

-- Get all images for a category
-- SELECT * FROM gallery_items WHERE category = 'guinness-events' AND media_type = 'image' ORDER BY created_at DESC;

-- Get all videos for a category
-- SELECT * FROM gallery_items WHERE category = 'guinness-events' AND media_type = 'video' ORDER BY created_at DESC;

-- Get all items (for admin)
-- SELECT * FROM gallery_items ORDER BY category, media_type, created_at DESC;

-- Bulk insert images
-- INSERT INTO gallery_items (category, media_type, url, created_by) VALUES (...);

-- Bulk delete
-- DELETE FROM gallery_items WHERE id = ANY($1::int[]);
