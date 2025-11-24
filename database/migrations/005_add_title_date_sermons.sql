-- Migration: add title and date_posted columns to sermons
-- Adds columns to persist YouTube metadata (title and published date)

ALTER TABLE IF EXISTS sermons
  ADD COLUMN IF NOT EXISTS title VARCHAR(255);

ALTER TABLE IF EXISTS sermons
  ADD COLUMN IF NOT EXISTS date_posted TIMESTAMP;

-- Optional index on date_posted for ordering
CREATE INDEX IF NOT EXISTS idx_sermons_date_posted ON sermons(date_posted DESC NULLS LAST);
