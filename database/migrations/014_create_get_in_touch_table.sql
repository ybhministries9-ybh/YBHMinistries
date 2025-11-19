-- Ensure we operate against the public schema by default
SET search_path = public, pg_catalog;

CREATE TABLE IF NOT EXISTS get_in_touch (
  id SERIAL PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  email VARCHAR(254),
  phone VARCHAR(30) NOT NULL,
  message TEXT NOT NULL,
  location VARCHAR(200),
  user_agent VARCHAR(500),
  status VARCHAR(50) DEFAULT 'new',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  created_by VARCHAR(100) DEFAULT 'public',
  updated_by VARCHAR(100) DEFAULT 'public'
);

ALTER TABLE IF EXISTS get_in_touch OWNER TO public;

CREATE INDEX IF NOT EXISTS idx_get_in_touch_email ON get_in_touch (email);
CREATE INDEX IF NOT EXISTS idx_get_in_touch_created_at ON get_in_touch (created_at);
