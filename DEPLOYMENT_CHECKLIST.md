# Deployment Checklist - Column Rename & Optimization Update

## Pre-Deployment

### 1. Code Review ✅
- [x] All column names updated in code (video_url, image_url, thumbnail_image_url)
- [x] All TypeScript interfaces updated
- [x] All API routes updated
- [x] All frontend components updated
- [x] Database schema file updated
- [x] No compilation errors
- [x] Code optimizations applied
- [x] Unused imports removed

### 2. Testing in Development
- [ ] Test video upload with thumbnail
- [ ] Test video upload without thumbnail
- [ ] Test video deletion (verify thumbnail preserved)
- [ ] Test thumbnail deletion (verify video preserved)
- [ ] Test video replacement
- [ ] Test thumbnail replacement
- [ ] Test hero images upload (multiple)
- [ ] Test single hero image deletion
- [ ] Test bulk hero image deletion
- [ ] Test hero images reordering
- [ ] Verify blob cleanup after all operations

### 3. Database Preparation
- [ ] Backup production database
- [ ] Review migration script: `database/migrations/001_rename_columns_for_consistency.sql`
- [ ] Test migration on development/staging database first
- [ ] Verify migration rollback procedure works

## Deployment Steps

### Step 1: Database Migration
Execute in Vercel Postgres production dashboard:

```sql
-- 1. Rename columns (run all three)
ALTER TABLE home_video RENAME COLUMN blob_url TO video_url;
ALTER TABLE home_video RENAME COLUMN thumbnail_url TO thumbnail_image_url;
ALTER TABLE home_hero_images RENAME COLUMN blob_url TO image_url;
```

**Verify with:**
```sql
-- Check home_video columns
SELECT column_name FROM information_schema.columns 
WHERE table_name = 'home_video' 
  AND column_name IN ('video_url', 'thumbnail_image_url');

-- Check home_hero_images columns  
SELECT column_name FROM information_schema.columns 
WHERE table_name = 'home_hero_images' 
  AND column_name = 'image_url';
```

Expected: Should see all three new column names

- [ ] Migration executed successfully
- [ ] Verification queries confirm new column names

### Step 2: Code Deployment
Deploy updated code to Vercel:

```bash
git add .
git commit -m "feat: rename columns for consistency & optimize blob deletion"
git push origin main
```

- [ ] Code deployed to Vercel
- [ ] Build completed successfully
- [ ] No deployment errors

### Step 3: Post-Deployment Verification
Test in production:

**Video Management:**
- [ ] Can view existing video and thumbnail
- [ ] Can upload new video (replaces existing, preserves thumbnail)
- [ ] Can upload new thumbnail (updates thumbnail only)
- [ ] Can delete video (thumbnail remains)
- [ ] Can delete thumbnail (video remains)

**Hero Images:**
- [ ] Can view all hero images
- [ ] Can upload new images
- [ ] Can reorder images (drag & drop)
- [ ] Can delete single image
- [ ] Can bulk delete multiple images

**Public Pages:**
- [ ] Home page displays video correctly
- [ ] Home page displays hero images correctly
- [ ] Thumbnail displays if video_url is null

- [ ] All tests passed

### Step 4: Performance Verification
- [ ] Check Vercel logs for errors
- [ ] Verify blob storage cleanup working (check Vercel Blob dashboard)
- [ ] Verify parallel blob deletion improved bulk delete speed
- [ ] No unexpected database queries in logs

## Rollback Procedure

If issues occur after deployment:

### Option 1: Rollback Code Only
```bash
git revert HEAD
git push origin main
```
⚠️ Only if database migration hasn't run yet

### Option 2: Rollback Both Code and Database
```sql
-- Revert column renames
ALTER TABLE home_video RENAME COLUMN video_url TO blob_url;
ALTER TABLE home_video RENAME COLUMN thumbnail_image_url TO thumbnail_url;
ALTER TABLE home_hero_images RENAME COLUMN image_url TO blob_url;
```
Then rollback code as in Option 1

- [ ] Rollback procedure tested and documented

## Monitoring

### First 24 Hours
- [ ] Monitor error logs in Vercel dashboard
- [ ] Check database query performance
- [ ] Watch for blob storage issues
- [ ] Verify admin uploads working smoothly
- [ ] Check public page load times

### First Week
- [ ] Review blob storage usage (verify cleanup working)
- [ ] Check for any user-reported issues
- [ ] Verify all admin features functioning correctly

## Documentation Updates
- [ ] Update README if needed
- [ ] Update admin documentation with any changes
- [ ] Archive this checklist with deployment date

## Sign-off

- **Developer**: _________________ Date: _________
- **Tester**: _________________ Date: _________
- **Deployer**: _________________ Date: _________

## Notes
- Database migration is non-destructive (only renames columns, data intact)
- Code changes are backward compatible once migration completes
- Blob storage operations improved with parallel deletion
- All functionality preserved, only internal naming improved
