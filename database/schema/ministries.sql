-- Ministries Table
CREATE TABLE IF NOT EXISTS ministries (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  is_active BOOLEAN DEFAULT true,
  created_by VARCHAR(255),
  updated_by VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index on slug for faster lookups
CREATE INDEX IF NOT EXISTS idx_ministries_slug ON ministries(slug);

-- Create index on is_active for filtering active ministries
CREATE INDEX IF NOT EXISTS idx_ministries_active ON ministries(is_active);

-- Insert default ministries data
INSERT INTO ministries (name, slug, is_active, created_by) VALUES
  ('Hallel Music School', 'hallel-music-school', true, 'system'),
  ('Hallel Bible School', 'hallel-bible-school', true, 'system'),
  ('Hallel Conferences', 'hallel-conferences', true, 'system'),
  ('Hallel Worship Day', 'hallel-worship-day', true, 'system'),
  ('Hallel Bible College', 'hallel-bible-college', true, 'system'),
  ('HMS Summer Training', 'hallel-music-school-summer-training', true, 'system'),
  ('Hallel Church', 'hallel-church', true, 'system')
ON CONFLICT (slug) DO NOTHING;

-- Create trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_ministries_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER ministries_updated_at_trigger
BEFORE UPDATE ON ministries
FOR EACH ROW
EXECUTE FUNCTION update_ministries_updated_at();
