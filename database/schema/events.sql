-- Events Management Table
-- Database: Vercel Postgres

-- ============================================
-- Table: events
-- Purpose: Store upcoming events data for the website
-- ============================================
CREATE TABLE IF NOT EXISTS events (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    date DATE NOT NULL,
    time VARCHAR(50) NOT NULL, -- e.g., "10:00 AM - 5:00 PM"
    location VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL CHECK (type IN ('conference', 'class', 'record')),
    description TEXT NOT NULL, -- Short description for event card
    extended_description TEXT NOT NULL, -- Detailed description
    capacity VARCHAR(50) NOT NULL, -- Can be number or "Unlimited"
    image_url TEXT, -- Event poster/banner image
    speakers TEXT[], -- Array of speaker names
    what_to_bring TEXT[], -- Array of items to bring
    registration_enabled BOOLEAN DEFAULT false,
    "24hrsworship_enabled" BOOLEAN DEFAULT false,
    registration_description TEXT,
    national_fee INTEGER, -- In rupees
    international_fee INTEGER, -- In rupees
    registration_fee INTEGER, -- In rupees
    published BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(255),
    updated_by VARCHAR(255)
);

-- Index for date filtering and sorting
CREATE INDEX idx_events_date ON events(date);
CREATE INDEX idx_events_published ON events(published);
CREATE INDEX idx_events_type ON events(type);

-- ============================================
-- Trigger: Update timestamp on record update
-- ============================================
CREATE OR REPLACE FUNCTION update_events_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply trigger to events table
CREATE TRIGGER update_events_timestamp 
    BEFORE UPDATE ON events
    FOR EACH ROW
    EXECUTE FUNCTION update_events_updated_at();

-- ============================================
-- Insert default event (example)
-- ============================================
INSERT INTO events (
    title,
    date,
    time,
    location,
    type,
    description,
    extended_description,
    capacity,
    image_url,
    speakers,
    what_to_bring,
    registration_enabled,
    "24hrsworship_enabled",
    registration_description,
    national_fee,
    international_fee,
    registration_fee,
    published
) VALUES (
    'Guinness World Record Attempt-2',
    '2025-12-01',
    '9:00 AM - 5:00 PM',
    'Online',
    'record',
    'Join us for the 2nd attempt of the Guinness World Record',
    'This is our second attempt at the Guinness World Record, aiming to break the first Guinness World Record that we previously achieved.',
    'Unlimited',
    'https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/News/GWR2/GWR-2%20-%20Poster.jpg',
    ARRAY['Ps. Augustine Dandingi', 'Master Charlie Aaron Benedict Dandingi', 'Master Nancy Augustina Dandingi'],
    ARRAY['Key Board', 'Key Board Stand', 'Smart Phone with Internet', 'HMS - Song Book'],
    true,
    false,
    'Register early to secure your spot for this event.',
    5500,
    7000,
    600,
    true
);

-- ============================================
-- Common Queries (for reference)
-- ============================================

-- Get all upcoming published events (ordered by date)
-- SELECT * FROM events WHERE date >= CURRENT_DATE AND published = true ORDER BY date ASC;

-- Get event by ID
-- SELECT * FROM events WHERE id = $1;

-- Get all events for admin (including unpublished)
-- SELECT * FROM events ORDER BY date DESC;

-- Insert new event
-- INSERT INTO events (title, date, time, location, type, description, extended_description, capacity, speakers, what_to_bring, ...) VALUES (...);

-- Update event
-- UPDATE events SET title = $1, date = $2, ... WHERE id = $n;

-- Delete event
-- DELETE FROM events WHERE id = $1;

-- Publish/Unpublish event
-- UPDATE events SET published = $1 WHERE id = $2;
