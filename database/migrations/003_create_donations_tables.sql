-- Create donations tables for UPI and Bank accounts

-- donation_info removed: content will be hardcoded; not managed via admin.

CREATE TABLE donations_upi (
  id serial PRIMARY KEY,
  label varchar(200),
  upi_id varchar(200) NOT NULL,
  qr_image_url text NULL,
  visible boolean DEFAULT true,
  sort_order integer DEFAULT 0,
  created_by varchar(100) DEFAULT 'admin',
  updated_by varchar(100) DEFAULT 'admin',
  created_at timestamptz DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamptz DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE donations_bank (
  id serial PRIMARY KEY,
  account_name varchar(200) NOT NULL,
  account_number varchar(100) NOT NULL,
  bank_name varchar(200) NOT NULL,
  branch_name varchar(200) NULL,
  ifsc_code varchar(50) NULL,
  swift_code varchar(100) NULL,
  upi_id varchar(200) NULL,
  visible boolean DEFAULT true,
  sort_order integer DEFAULT 0,
  created_by varchar(100) DEFAULT 'admin',
  updated_by varchar(100) DEFAULT 'admin',
  created_at timestamptz DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamptz DEFAULT CURRENT_TIMESTAMP
);
