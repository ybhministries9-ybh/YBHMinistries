-- Postgres DDL for Custom Notification System

-- Enums
CREATE TYPE notification_channel AS ENUM ('EMAIL','SMS','IN_APP','PUSH');
CREATE TYPE notification_trigger_type AS ENUM ('EVENT','STATUS_CHANGE','SCHEDULE','CRON');
CREATE TYPE notification_frequency AS ENUM ('IMMEDIATE','DIGEST_DAILY','DIGEST_WEEKLY','PAUSED');
CREATE TYPE notification_status AS ENUM ('PENDING','SENT','FAILED','CANCELLED');

-- Basic user/org tables (referential; if your system already has these, skip)
CREATE TABLE IF NOT EXISTS organizations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL
);

CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  username text,
  email text,
  org_id uuid REFERENCES organizations(id)
);

-- Templates
CREATE TABLE notification_templates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  scope text NOT NULL DEFAULT 'GLOBAL', -- GLOBAL | ORG | USER
  channel notification_channel NOT NULL,
  subject_template text,
  body_template text NOT NULL,
  variables_schema jsonb DEFAULT '{}'::jsonb,
  is_default boolean DEFAULT false,
  version integer DEFAULT 1,
  metadata jsonb DEFAULT '{}'::jsonb,
  created_by uuid REFERENCES users(id),
  org_id uuid REFERENCES organizations(id),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE notification_template_versions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  template_id uuid REFERENCES notification_templates(id) ON DELETE CASCADE,
  version integer NOT NULL,
  subject_template text,
  body_template text,
  variables_schema jsonb DEFAULT '{}'::jsonb,
  created_by uuid REFERENCES users(id),
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX ON notification_template_versions (template_id);

-- Triggers
CREATE TABLE notification_triggers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  type notification_trigger_type NOT NULL,
  event_key text,
  conditions jsonb DEFAULT '{}'::jsonb,
  template_id uuid REFERENCES notification_templates(id),
  channels notification_channel[],
  active boolean DEFAULT true,
  schedule_cron text,
  created_by uuid REFERENCES users(id),
  org_id uuid REFERENCES organizations(id),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX idx_triggers_event_key ON notification_triggers (event_key);

-- Preferences
CREATE TABLE notification_preferences (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) NOT NULL,
  channels notification_channel[] NOT NULL,
  channel_configs jsonb DEFAULT '{}'::jsonb,
  frequency notification_frequency NOT NULL DEFAULT 'IMMEDIATE',
  enabled boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX idx_prefs_user ON notification_preferences (user_id);

-- Notifications (history + live record)
CREATE TABLE notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id),
  recipient jsonb NOT NULL,
  template_id uuid REFERENCES notification_templates(id),
  template_version_id uuid REFERENCES notification_template_versions(id),
  trigger_id uuid REFERENCES notification_triggers(id),
  channel notification_channel NOT NULL,
  payload jsonb NOT NULL,
  status notification_status NOT NULL DEFAULT 'PENDING',
  error text,
  attempts int DEFAULT 0,
  sent_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX idx_notifications_user_status ON notifications (user_id, status);

-- Queue table for processing
CREATE TABLE notification_queue (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  notification_id uuid REFERENCES notifications(id) ON DELETE CASCADE,
  priority int DEFAULT 100,
  scheduled_at timestamptz,
  locked_by text,
  locked_at timestamptz,
  status text DEFAULT 'queued',
  attempts int DEFAULT 0,
  last_error text,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX idx_queue_scheduled ON notification_queue (scheduled_at);

-- Digests
CREATE TABLE notification_digests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) NOT NULL,
  frequency notification_frequency NOT NULL,
  period_start timestamptz NOT NULL,
  period_end timestamptz NOT NULL,
  items jsonb NOT NULL,
  sent_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX idx_digests_user_period ON notification_digests (user_id, period_start, period_end);

-- Audit log for notifications
CREATE TABLE notification_audit (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  notification_id uuid REFERENCES notifications(id) ON DELETE CASCADE,
  event text NOT NULL,
  detail jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX idx_audit_notification ON notification_audit (notification_id);

-- Useful GIN indexes for JSONB querying
CREATE INDEX idx_templates_variables_schema ON notification_templates USING gin (variables_schema jsonb_path_ops);
CREATE INDEX idx_triggers_conditions ON notification_triggers USING gin (conditions jsonb_path_ops);

-- Notes:
-- 1) If your app already maintains `users` and `organizations`, remove the create statements above and adapt FK references.
-- 2) Use application-level constraints to enforce template scope rules, permissions and rate-limits.
-- 3) Add retention policies (e.g., partitioning or TTL) for `notifications` and `notification_audit` when needed.
