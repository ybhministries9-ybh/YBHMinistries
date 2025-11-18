-- Migration: add category column to stories
-- Adds a nullable `category` TEXT column to store the story category/display name

ALTER TABLE stories
  ADD COLUMN IF NOT EXISTS category TEXT;

-- Optionally, you can backfill a default for existing rows if desired.
-- Uncomment and adjust the UPDATE below if you want to set a default category for existing rows:
-- UPDATE stories SET category = 'Guinness World Records' WHERE category IS NULL;

-- Note: Run this migration with your migration runner or psql against the target DB.
