-- Add must_reset_password flag to users table

ALTER TABLE users
  ADD COLUMN must_reset_password boolean DEFAULT false;
