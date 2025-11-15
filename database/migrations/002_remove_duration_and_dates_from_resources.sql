-- Migration: remove duration and upload date columns from worship and sermons
BEGIN;

-- Drop indexes that reference date columns
DROP INDEX IF EXISTS idx_worship_release_date;
DROP INDEX IF EXISTS idx_sermons_sermon_date;

-- Drop columns from worship
ALTER TABLE IF EXISTS worship DROP COLUMN IF EXISTS duration;
ALTER TABLE IF EXISTS worship DROP COLUMN IF EXISTS release_date;
-- Drop title column from worship
ALTER TABLE IF EXISTS worship DROP COLUMN IF EXISTS title;
-- Drop artist column from worship
ALTER TABLE IF EXISTS worship DROP COLUMN IF EXISTS artist;

-- Drop columns from sermons
ALTER TABLE IF EXISTS sermons DROP COLUMN IF EXISTS duration;
ALTER TABLE IF EXISTS sermons DROP COLUMN IF EXISTS sermon_date;
-- Drop title column from sermons
ALTER TABLE IF EXISTS sermons DROP COLUMN IF EXISTS title;
-- Drop speaker column from sermons
ALTER TABLE IF EXISTS sermons DROP COLUMN IF EXISTS speaker;

COMMIT;
