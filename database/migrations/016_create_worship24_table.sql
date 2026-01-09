-- Ensure we operate against the public schema by default
SET search_path = public, pg_catalog;

CREATE TABLE IF NOT EXISTS worship24 (
  id SERIAL PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  email VARCHAR(254),
  phone VARCHAR(30) NOT NULL,
  location VARCHAR(200),
  message TEXT NOT NULL,
  booking_date DATE NOT NULL,
  timeslot VARCHAR(100) NOT NULL,
  facebook_link VARCHAR(300),
  user_agent VARCHAR(500),
  status VARCHAR(50) DEFAULT 'new',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  created_by VARCHAR(100) DEFAULT 'public',
  updated_by VARCHAR(100) DEFAULT 'public'
);

ALTER TABLE IF EXISTS worship24 OWNER TO public;

CREATE INDEX IF NOT EXISTS idx_worship24_booking_date ON worship24 (booking_date);
CREATE INDEX IF NOT EXISTS idx_worship24_created_at ON worship24 (created_at);
