-- Resources Management Schema
-- This schema handles Books, Worship, Sermons, and Bible Studies

-- Books Table
CREATE TABLE IF NOT EXISTS books (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    pages INTEGER,
    language VARCHAR(100) NOT NULL,
    cover_image TEXT NOT NULL,
    additional_images JSONB DEFAULT '[]'::jsonb,
    description TEXT NOT NULL,
    publish_date DATE,
    published BOOLEAN DEFAULT false,
    created_by VARCHAR(255),
    updated_by VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Worship Songs Table
CREATE TABLE IF NOT EXISTS worship (
    id SERIAL PRIMARY KEY,
    -- Persist YouTube metadata (title and date_posted) so site can read from DB
    youtube_url TEXT NOT NULL,
    title VARCHAR(255),
    date_posted TIMESTAMP,
    display_order INTEGER,
    published BOOLEAN DEFAULT false,
    created_by VARCHAR(255),
    updated_by VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Sermons Table
CREATE TABLE IF NOT EXISTS sermons (
    id SERIAL PRIMARY KEY,
    -- speaker, title, duration and sermon_date removed; use YouTube metadata at display time
    youtube_url TEXT NOT NULL,
    published BOOLEAN DEFAULT false,
    created_by VARCHAR(255),
    updated_by VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Bible Studies Table
CREATE TABLE IF NOT EXISTS bible_studies (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    pages INTEGER,
    study_date DATE,
    file_type VARCHAR(50) DEFAULT 'PDF',
    file_url TEXT NOT NULL,
    thumbnail_url TEXT,
    description TEXT,
    published BOOLEAN DEFAULT false,
    created_by VARCHAR(255),
    updated_by VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_books_published ON books(published);
CREATE INDEX IF NOT EXISTS idx_books_created_at ON books(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_worship_published ON worship(published);
-- release_date index removed (column no longer exists)

CREATE INDEX IF NOT EXISTS idx_sermons_published ON sermons(published);
-- sermon_date index removed (column no longer exists)

CREATE INDEX IF NOT EXISTS idx_bible_studies_published ON bible_studies(published);
CREATE INDEX IF NOT EXISTS idx_bible_studies_study_date ON bible_studies(study_date DESC);
