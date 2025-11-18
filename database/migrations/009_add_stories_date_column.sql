-- Migration: add date column to stories
ALTER TABLE stories
  ADD COLUMN IF NOT EXISTS date DATE;
