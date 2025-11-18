-- Migration: add role column and rename summary -> location
-- This migration will:
-- 1. Add a new `role` TEXT column (nullable)
-- 2. Rename existing `summary` column to `location` so existing data is preserved

ALTER TABLE stories
  ADD COLUMN IF NOT EXISTS role TEXT;

-- If summary exists and location does not, rename it; otherwise, create location and migrate
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name='stories' AND column_name='summary'
  ) AND NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name='stories' AND column_name='location'
  ) THEN
    ALTER TABLE stories RENAME COLUMN summary TO location;
  ELSIF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name='stories' AND column_name='location'
  ) THEN
    -- If somehow summary doesn't exist but location also doesn't, create location
    ALTER TABLE stories ADD COLUMN location TEXT;
  END IF;
END$$;
