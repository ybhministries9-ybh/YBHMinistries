-- Migration: add mobile-specific columns to home_hero_images
-- Run this against your Postgres database (e.g. psql) to add mobile_image_url and variant columns

BEGIN;

-- Add mobile image columns (nullable)
ALTER TABLE home_hero_images
  ADD COLUMN IF NOT EXISTS mobile_image_url TEXT,
  ADD COLUMN IF NOT EXISTS mobile_thumbnail_url TEXT,
  ADD COLUMN IF NOT EXISTS mobile_medium_url TEXT;

COMMIT;
