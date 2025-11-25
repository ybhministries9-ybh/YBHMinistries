-- Migration: add display_order column to sermons

ALTER TABLE IF EXISTS sermons
  ADD COLUMN IF NOT EXISTS display_order INTEGER;

CREATE INDEX IF NOT EXISTS idx_sermons_display_order ON sermons(display_order);
