-- 060_add_performance_indexes.sql
-- Performance & security hardening indexes.
-- Safe to run repeatedly (IF NOT EXISTS everywhere).
-- Apply with: psql "$POSTGRES_URL" -f database/migrations/060_add_performance_indexes.sql

-- Sessions: verifySession looks up by token (already indexed); password reset
-- and logout-all delete by user_id.
CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON sessions(user_id);

-- Users: login queries use lower(email); the plain unique index on email
-- cannot serve that. A functional index makes login lookups O(log n).
CREATE INDEX IF NOT EXISTS idx_users_lower_email ON users (lower(email));
-- Invite acceptance looks up by invite_token_hash.
CREATE INDEX IF NOT EXISTS idx_users_invite_token_hash ON users (invite_token_hash) WHERE invite_token_hash IS NOT NULL;

-- worship24: admin list filters by status/booking_date and orders by created_at DESC.
CREATE INDEX IF NOT EXISTS idx_worship24_created_at ON worship24 (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_worship24_status ON worship24 (status);
CREATE INDEX IF NOT EXISTS idx_worship24_booking_date ON worship24 (booking_date);

-- hms_students: admin list orders by created_at DESC.
CREATE INDEX IF NOT EXISTS idx_hms_students_created_at ON hms_students (created_at DESC);

-- get_in_touch: admin list orders by created_at DESC (may already exist).
CREATE INDEX IF NOT EXISTS idx_get_in_touch_created_at ON get_in_touch (created_at DESC);

-- stories: public page filters by status and orders by created_at.
CREATE INDEX IF NOT EXISTS idx_stories_status_created ON stories (status, created_at DESC);

-- gallery: public gallery ordered lists.
CREATE INDEX IF NOT EXISTS idx_gallery_items_created_at ON gallery_items (created_at DESC);

-- image processing queue: joins/deletes by hero_image_id.
CREATE INDEX IF NOT EXISTS idx_image_processing_queue_hero_image_id ON image_processing_queue (hero_image_id);
