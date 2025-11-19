-- Migration: create hms_students table to store HMS enrolment form submissions
CREATE TABLE IF NOT EXISTS hms_students (
  id SERIAL PRIMARY KEY,
  full_name VARCHAR(200) NOT NULL,
  date_of_birth DATE NOT NULL,
  gender VARCHAR(50) NOT NULL,
  address VARCHAR(500),
  city_state_zip VARCHAR(200),
  phone_number VARCHAR(50),
  email VARCHAR(254),
  parent_guardian_name VARCHAR(200),
  parent_guardian_contact VARCHAR(50),

  program_applying_for JSONB,
  instrument_specialization JSONB,
  instrument_other VARCHAR(100),
  preferred_class_type JSONB,
  preferred_schedule JSONB,
  course_type JSONB,

  years_of_experience INTEGER,
  previous_training VARCHAR(500),
  music_exam_certifications VARCHAR(500),
  performance_experience JSONB,
  performance_other VARCHAR(200),

  goals TEXT,

  volunteer_interested BOOLEAN DEFAULT false,
  volunteer_areas JSONB,

  emergency_name VARCHAR(200) NOT NULL,
  emergency_relationship VARCHAR(100) NOT NULL,
  emergency_contact VARCHAR(50) NOT NULL,

  status VARCHAR(50) DEFAULT 'Submitted',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  created_by VARCHAR(100),
  updated_by VARCHAR(100)
);

-- Indexes to help lookups
CREATE INDEX IF NOT EXISTS idx_hms_students_email ON hms_students (email);
CREATE INDEX IF NOT EXISTS idx_hms_students_status ON hms_students (status);
