-- Stories table for admin-managed site stories
CREATE TABLE IF NOT EXISTS stories (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  date DATE,
  summary TEXT,
  body TEXT,
  media_type VARCHAR(16) NOT NULL DEFAULT 'text', -- 'text' or 'video'
  video_url TEXT,
  thumbnail_url TEXT,
  status VARCHAR(64) NOT NULL DEFAULT 'Submitted',
  is_visible BOOLEAN NOT NULL DEFAULT true,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  created_by VARCHAR(255),
  updated_by VARCHAR(255)
);

CREATE INDEX idx_stories_active_created ON stories(is_active, created_at DESC);

-- Trigger to keep updated_at in sync — reuse existing function if present
CREATE TRIGGER update_stories_updated_at
  BEFORE UPDATE ON stories
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
