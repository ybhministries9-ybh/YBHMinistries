-- Schema reference for users table

CREATE TABLE users (
  id serial PRIMARY KEY,
  name varchar(200) NOT NULL,
  email varchar(200) NOT NULL UNIQUE,
  role varchar(100) NOT NULL DEFAULT 'Viewer',
  status varchar(20) NOT NULL DEFAULT 'Active',
  password_hash text NULL,
  last_login timestamptz NULL,
  created_by varchar(100),
  updated_by varchar(100),
  created_at timestamptz DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamptz DEFAULT CURRENT_TIMESTAMP
);
