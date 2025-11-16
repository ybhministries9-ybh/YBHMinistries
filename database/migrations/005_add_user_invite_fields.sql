-- Add invite token and expiry columns to users table

ALTER TABLE users
  ADD COLUMN invite_token_hash text NULL,
  ADD COLUMN invite_expires_at timestamptz NULL,
  ADD COLUMN is_verified boolean DEFAULT false;
