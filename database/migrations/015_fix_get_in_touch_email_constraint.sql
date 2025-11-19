-- Replace broken email check constraint on get_in_touch
-- The previous constraint used a "\s" escape which is treated as the literal 's' in Postgres
-- and therefore rejected addresses containing the letter 's'. This migration removes the
-- old constraint (if present) and adds a POSIX-safe regex using the [:space:] class.

SET search_path = public, pg_catalog;

ALTER TABLE IF EXISTS get_in_touch DROP CONSTRAINT IF EXISTS chk_get_in_touch_email_format;

ALTER TABLE IF EXISTS get_in_touch
  ADD CONSTRAINT chk_get_in_touch_email_format CHECK (
    (email IS NULL) OR ((email)::text ~ '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$')
  );

-- Add an index on email if desired (no-op if exists)
CREATE INDEX IF NOT EXISTS idx_get_in_touch_email ON get_in_touch (email);
