-- Migration: add display_order column to worship

ALTER TABLE IF EXISTS worship
  ADD COLUMN IF NOT EXISTS display_order INTEGER;

CREATE INDEX IF NOT EXISTS idx_worship_display_order ON worship(display_order);
