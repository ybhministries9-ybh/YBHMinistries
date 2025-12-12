-- Add phone column to stories table to store submitter phone number
ALTER TABLE stories
ADD COLUMN IF NOT EXISTS phone VARCHAR(15) DEFAULT NULL;
