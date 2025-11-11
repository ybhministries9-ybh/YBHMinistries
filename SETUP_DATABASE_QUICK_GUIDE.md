# Quick Setup Guide - Home Page Database

## Prerequisites
- Vercel project deployed
- Vercel Postgres database created
- Vercel Blob storage enabled
- Environment variables configured:
  - `POSTGRES_URL`
  - `BLOB_READ_WRITE_TOKEN`

## Step 1: Connect to Vercel Postgres

### Option A: Using Vercel CLI
```bash
# Install Vercel CLI if not already installed
npm i -g vercel

# Login to Vercel
vercel login

# Link your project
vercel link

# Pull environment variables
vercel env pull .env.local

# Connect to Postgres
vercel postgres connect
```

### Option B: Using Direct Connection String
```bash
# Get your Postgres URL from Vercel Dashboard
# Go to: Storage → Your Postgres DB → .env.local tab
# Copy the POSTGRES_URL value

# Connect using psql
psql "your-postgres-url-here"
```

## Step 2: Run Database Schema

Once connected to your Postgres database:

```sql
-- Copy and paste the entire contents of:
-- database/schema/home_content.sql

-- OR if you have the file locally:
\i database/schema/home_content.sql
```

The schema will:
1. Create `home_hero_images` table
2. Create `home_video` table
3. Create triggers for `updated_at` columns
4. Insert 23 fallback hero images
5. Insert 1 fallback video

## Step 3: Verify Tables

```sql
-- List all tables
\dt

-- Check hero images table
SELECT id, title, display_order, is_active FROM home_hero_images ORDER BY display_order;

-- Check video table
SELECT id, title, is_active FROM home_video;

-- Exit psql
\q
```

## Step 4: Test API Endpoints

### Test Public APIs (No Auth Required)
```bash
# Test hero images endpoint
curl https://your-domain.vercel.app/api/home/hero-images

# Test video endpoint
curl https://your-domain.vercel.app/api/home/video
```

### Test Admin APIs (Auth Required - implement later)
```bash
# Test hero images list
curl https://your-domain.vercel.app/api/admin/home/hero-images

# Test video endpoint
curl https://your-domain.vercel.app/api/admin/home/video
```

## Step 5: Test Admin UI

1. Navigate to your site: `https://your-domain.vercel.app/admin`
2. Login with admin credentials
3. Navigate to "Home" section
4. Try uploading a test image
5. Try uploading a test video
6. Try reordering images (drag and drop)
7. Try deleting an image

## Troubleshooting

### Error: "relation 'home_hero_images' does not exist"
**Solution:** Run the database schema (Step 2)

### Error: "Database connection failed"
**Solution:** Check environment variables are set correctly:
```bash
# Verify .env.local has these variables
cat .env.local | grep POSTGRES_URL
cat .env.local | grep BLOB_READ_WRITE_TOKEN
```

### Error: "Failed to upload to Vercel Blob"
**Solution:** 
1. Verify `BLOB_READ_WRITE_TOKEN` is set
2. Check Vercel Blob storage is enabled in your project
3. Check file size limits (default: 4.5MB for free tier)

### Images/Video Not Showing on Home Page
**Solution:**
1. Check browser console for errors
2. Verify API endpoints return data: `/api/home/hero-images`
3. Check if fallback images are displayed (indicates DB connection issue)
4. Verify database has active records: `is_active = true`

### Admin Upload Not Working
**Solution:**
1. Check browser console for errors
2. Verify admin API endpoints: `/api/admin/home/hero-images`
3. Check file format is supported (images: jpg, png, gif, webp; video: mp4)
4. Check file size limits

## Database Maintenance

### View All Images
```sql
SELECT id, title, image_url, display_order, is_active, created_at 
FROM home_hero_images 
ORDER BY display_order;
```

### Activate/Deactivate Image
```sql
-- Deactivate an image
UPDATE home_hero_images SET is_active = false WHERE id = 1;

-- Activate an image
UPDATE home_hero_images SET is_active = true WHERE id = 1;
```

### Delete All Images (Careful!)
```sql
DELETE FROM home_hero_images;
```

### Reset to Fallback Images
```sql
-- Delete all and re-run the INSERT statements from schema file
DELETE FROM home_hero_images;
-- Then run the INSERT statements from database/schema/home_content.sql
```

### Check Active Video
```sql
SELECT * FROM home_video WHERE is_active = true;
```

### Deactivate All Videos
```sql
UPDATE home_video SET is_active = false;
```

## Performance Optimization

### Add Indexes (Already in Schema)
The schema includes indexes on:
- `home_hero_images.display_order`
- `home_hero_images.is_active`
- `home_video.is_active`

### Query Performance Check
```sql
-- Check query execution plan
EXPLAIN ANALYZE 
SELECT * FROM home_hero_images 
WHERE is_active = true 
ORDER BY display_order;
```

## Security Considerations

### TODO: Add Authentication
Currently admin APIs don't require authentication. To add:

1. Implement JWT authentication
2. Add middleware to verify tokens
3. Update admin API routes to check auth
4. Add `created_by` and `updated_by` tracking

### Example Auth Middleware (Future)
```typescript
// middleware.ts
import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // Check if route starts with /api/admin
  if (request.nextUrl.pathname.startsWith('/api/admin')) {
    const token = request.headers.get('Authorization');
    
    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    // Verify JWT token here
  }
  
  return NextResponse.next();
}
```

## Backup and Recovery

### Backup Database
```bash
# Using Vercel CLI
vercel postgres backup create

# Using pg_dump
pg_dump "your-postgres-url" > backup.sql
```

### Restore Database
```bash
# Using psql
psql "your-postgres-url" < backup.sql
```

## Next Steps

1. ✅ Database schema created
2. ✅ API routes implemented
3. ✅ Admin UI created
4. ✅ Frontend integration complete
5. ⏳ Run database schema on Vercel Postgres
6. ⏳ Test all API endpoints
7. ⏳ Test admin UI upload functionality
8. ⏳ Test drag-and-drop reordering
9. ⏳ Add authentication to admin APIs
10. ⏳ Add Blob cleanup when deleting records

## Support

If you encounter issues:
1. Check Vercel logs: `vercel logs`
2. Check browser console for frontend errors
3. Review this documentation
4. Check database connection: `SELECT 1;` in psql
5. Verify environment variables are set correctly
