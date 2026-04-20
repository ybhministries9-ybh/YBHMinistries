# R2 CORS for Direct Browser Uploads (Dev)

Direct-to-R2 uploads from the browser require the R2 bucket to allow cross-origin `PUT` requests.

If you see errors like:
- `blocked by CORS policy` or
- `Network error during upload`

configure your R2 bucket CORS to allow your dev origin (for example `http://localhost:3000`).

Example CORS rule:

```json
[
  {
    "AllowedOrigins": ["http://localhost:3000"],
    "AllowedMethods": ["GET", "HEAD", "PUT"],
    "AllowedHeaders": ["*"],
    "ExposeHeaders": ["ETag"],
    "MaxAgeSeconds": 3000
  }
]
```

For production, replace the origin with your real domain (for example `https://ybhministries.org`) and tighten headers/methods as needed.

