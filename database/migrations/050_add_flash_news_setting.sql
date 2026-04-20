-- Flash News setting (home page overlay)
-- key: 'flash_news'
-- bool_value: enabled/disabled
-- message: R2 video URL

INSERT INTO site_settings (key, bool_value, message, updated_by, updated_at, created_by, created_at)
VALUES (
  'flash_news',
  true,
  'r2://ybh-pstore/home/video/HMS Summaer Rapid Course.mp4',
  NULL,
  now(),
  NULL,
  now()
)
ON CONFLICT (key) DO UPDATE
SET message = EXCLUDED.message,
    updated_at = now();
