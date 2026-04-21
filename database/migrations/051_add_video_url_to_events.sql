-- Add optional video URL/path to events
ALTER TABLE events
  ADD COLUMN IF NOT EXISTS video_url TEXT;

