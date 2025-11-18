-- Migration: create stories table
-- Run this migration after other schema migrations

CREATE TABLE IF NOT EXISTS stories (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  summary TEXT,
  body TEXT,
  media_type VARCHAR(16) NOT NULL DEFAULT 'text',
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

CREATE INDEX IF NOT EXISTS idx_stories_active_created ON stories(is_active, created_at DESC);
