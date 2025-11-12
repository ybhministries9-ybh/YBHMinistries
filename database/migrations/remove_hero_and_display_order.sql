-- Migration: Remove hero_image_url and display_order columns from ministries table
-- Run this on existing databases that already have these columns

-- Remove the columns
ALTER TABLE ministries 
DROP COLUMN IF EXISTS hero_image_url,
DROP COLUMN IF EXISTS display_order;

-- Remove 'Hallel CCI' ministry (created by mistake)
DELETE FROM ministries WHERE slug = 'hallel-cci';

-- Update created_by for existing records that don't have it set
UPDATE ministries 
SET created_by = 'system' 
WHERE created_by IS NULL;
