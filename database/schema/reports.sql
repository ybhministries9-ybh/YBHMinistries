-- Yearly Enrollment Reports Table
-- Stores enrollment data for different class types across different years

CREATE TABLE IF NOT EXISTS reports (
  id SERIAL PRIMARY KEY,
  year INTEGER NOT NULL,
  class_type VARCHAR(50) NOT NULL,
  monthly_data JSONB NOT NULL,
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Add indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_reports_year ON reports(year);
CREATE INDEX IF NOT EXISTS idx_reports_class_type ON reports(class_type);
CREATE INDEX IF NOT EXISTS idx_reports_published ON reports(published);
CREATE INDEX IF NOT EXISTS idx_reports_year_class ON reports(year, class_type);

-- Create trigger to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_reports_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER reports_updated_at_trigger
BEFORE UPDATE ON reports
FOR EACH ROW
EXECUTE FUNCTION update_reports_updated_at();

-- Insert sample data for 2023 Keyboard class
INSERT INTO reports (year, class_type, monthly_data, published) VALUES
(
  2023,
  'keyboard',
  '[
    {"month": "January", "indian": 32, "nonIndian": 8, "total": 40},
    {"month": "February", "indian": 34, "nonIndian": 9, "total": 43},
    {"month": "March", "indian": 36, "nonIndian": 9, "total": 45},
    {"month": "April", "indian": 38, "nonIndian": 10, "total": 48},
    {"month": "May", "indian": 40, "nonIndian": 12, "total": 52},
    {"month": "June", "indian": 40, "nonIndian": 12, "total": 52},
    {"month": "July", "indian": 38, "nonIndian": 12, "total": 50},
    {"month": "August", "indian": 36, "nonIndian": 10, "total": 46},
    {"month": "September", "indian": 38, "nonIndian": 10, "total": 48},
    {"month": "October", "indian": 39, "nonIndian": 11, "total": 50},
    {"month": "November", "indian": 41, "nonIndian": 12, "total": 53},
    {"month": "December", "indian": 43, "nonIndian": 12, "total": 55}
  ]'::jsonb,
  true
),
(
  2023,
  'guitar',
  '[
    {"month": "January", "indian": 28, "nonIndian": 6, "total": 34},
    {"month": "February", "indian": 30, "nonIndian": 7, "total": 37},
    {"month": "March", "indian": 31, "nonIndian": 7, "total": 38},
    {"month": "April", "indian": 32, "nonIndian": 8, "total": 40},
    {"month": "May", "indian": 34, "nonIndian": 8, "total": 42},
    {"month": "June", "indian": 34, "nonIndian": 8, "total": 42},
    {"month": "July", "indian": 36, "nonIndian": 10, "total": 46},
    {"month": "August", "indian": 38, "nonIndian": 11, "total": 49},
    {"month": "September", "indian": 39, "nonIndian": 11, "total": 50},
    {"month": "October", "indian": 40, "nonIndian": 12, "total": 52},
    {"month": "November", "indian": 41, "nonIndian": 12, "total": 53},
    {"month": "December", "indian": 43, "nonIndian": 13, "total": 56}
  ]'::jsonb,
  true
),
(
  2023,
  'lcm',
  '[
    {"month": "January", "indian": 20, "nonIndian": 5, "total": 25},
    {"month": "February", "indian": 22, "nonIndian": 6, "total": 28},
    {"month": "March", "indian": 24, "nonIndian": 6, "total": 30},
    {"month": "April", "indian": 26, "nonIndian": 7, "total": 33},
    {"month": "May", "indian": 28, "nonIndian": 7, "total": 35},
    {"month": "June", "indian": 30, "nonIndian": 8, "total": 38},
    {"month": "July", "indian": 32, "nonIndian": 8, "total": 40},
    {"month": "August", "indian": 34, "nonIndian": 9, "total": 43},
    {"month": "September", "indian": 36, "nonIndian": 9, "total": 45},
    {"month": "October", "indian": 38, "nonIndian": 10, "total": 48},
    {"month": "November", "indian": 40, "nonIndian": 10, "total": 50},
    {"month": "December", "indian": 42, "nonIndian": 11, "total": 53}
  ]'::jsonb,
  true
),
(
  2022,
  'keyboard',
  '[
    {"month": "January", "indian": 25, "nonIndian": 5, "total": 30},
    {"month": "February", "indian": 27, "nonIndian": 6, "total": 33},
    {"month": "March", "indian": 29, "nonIndian": 6, "total": 35},
    {"month": "April", "indian": 30, "nonIndian": 7, "total": 37},
    {"month": "May", "indian": 32, "nonIndian": 8, "total": 40},
    {"month": "June", "indian": 34, "nonIndian": 8, "total": 42},
    {"month": "July", "indian": 36, "nonIndian": 9, "total": 45},
    {"month": "August", "indian": 34, "nonIndian": 8, "total": 42},
    {"month": "September", "indian": 32, "nonIndian": 8, "total": 40},
    {"month": "October", "indian": 34, "nonIndian": 9, "total": 43},
    {"month": "November", "indian": 36, "nonIndian": 9, "total": 45},
    {"month": "December", "indian": 38, "nonIndian": 10, "total": 48}
  ]'::jsonb,
  true
),
(
  2022,
  'guitar',
  '[
    {"month": "January", "indian": 20, "nonIndian": 5, "total": 25},
    {"month": "February", "indian": 22, "nonIndian": 6, "total": 28},
    {"month": "March", "indian": 24, "nonIndian": 6, "total": 30},
    {"month": "April", "indian": 26, "nonIndian": 7, "total": 33},
    {"month": "May", "indian": 28, "nonIndian": 7, "total": 35},
    {"month": "June", "indian": 30, "nonIndian": 8, "total": 38},
    {"month": "July", "indian": 32, "nonIndian": 8, "total": 40},
    {"month": "August", "indian": 30, "nonIndian": 7, "total": 37},
    {"month": "September", "indian": 28, "nonIndian": 7, "total": 35},
    {"month": "October", "indian": 30, "nonIndian": 8, "total": 38},
    {"month": "November", "indian": 32, "nonIndian": 8, "total": 40},
    {"month": "December", "indian": 34, "nonIndian": 8, "total": 42}
  ]'::jsonb,
  true
),
(
  2022,
  'lcm',
  '[
    {"month": "January", "indian": 15, "nonIndian": 3, "total": 18},
    {"month": "February", "indian": 17, "nonIndian": 4, "total": 21},
    {"month": "March", "indian": 19, "nonIndian": 4, "total": 23},
    {"month": "April", "indian": 21, "nonIndian": 5, "total": 26},
    {"month": "May", "indian": 23, "nonIndian": 6, "total": 29},
    {"month": "June", "indian": 25, "nonIndian": 6, "total": 31},
    {"month": "July", "indian": 27, "nonIndian": 7, "total": 34},
    {"month": "August", "indian": 29, "nonIndian": 7, "total": 36},
    {"month": "September", "indian": 28, "nonIndian": 7, "total": 35},
    {"month": "October", "indian": 26, "nonIndian": 6, "total": 32},
    {"month": "November", "indian": 28, "nonIndian": 7, "total": 35},
    {"month": "December", "indian": 30, "nonIndian": 8, "total": 38}
  ]'::jsonb,
  true
);

-- Grant necessary permissions (adjust role name as needed)
-- GRANT SELECT, INSERT, UPDATE, DELETE ON reports TO your_app_user;
-- GRANT USAGE, SELECT ON SEQUENCE reports_id_seq TO your_app_user;
