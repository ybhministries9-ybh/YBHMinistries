-- Add email column to stories table to store submitter email address
ALTER TABLE stories
ADD COLUMN IF NOT EXISTS email VARCHAR(254) DEFAULT NULL;
