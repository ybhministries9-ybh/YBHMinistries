-- Add partial unique index to prevent double-booking of the same timeslot on the same date
-- Only consider active statuses (Submitted, Accepted)

SET search_path = public, pg_catalog;

CREATE UNIQUE INDEX IF NOT EXISTS ux_worship24_booking_timeslot_active
  ON worship24 (booking_date, timeslot)
  WHERE status IN ('Submitted', 'Accepted');
