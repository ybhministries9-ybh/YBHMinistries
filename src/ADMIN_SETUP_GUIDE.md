# Admin File Upload Setup Guide

## Quick Start

Follow these steps to enable file uploads in your admin dashboard.

## 1. Install Dependencies

```bash
npm install
```

This will install:
- `@vercel/blob` - Vercel Blob Storage SDK
- `formidable` - File upload parsing
- `@dnd-kit/*` - Drag and drop functionality

## 2. Set Up Vercel Blob Storage

### Option A: Using Vercel Dashboard (Recommended)

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Navigate to **Storage** tab
4. Click **Create Database** → **Blob**
5. Name it (e.g., "ybh-media-storage")
6. Click **Create**
7. Copy the `BLOB_READ_WRITE_TOKEN` shown

### Option B: Using Vercel CLI

```bash
vercel blob create ybh-media-storage
```

## 3. Configure Environment Variables

### For Production (Vercel)

1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add new variable:
   - **Name:** `BLOB_READ_WRITE_TOKEN`
   - **Value:** `vercel_blob_rw_xxxxxxxxxxxxx` (from step 2)
   - **Environment:** Production, Preview, Development (check all)
3. Click **Save**

### For Local Development

Create `.env.local` in your project root:

```bash
# .env.local
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_xxxxxxxxxxxxx
```

**Important:** Never commit `.env.local` to Git!

## 4. Deploy API Endpoints

Ensure these API files are deployed:

- `/api/upload.ts` - File upload handler ✓
- `/api/hero-images.ts` - Hero images CRUD ✓
- `/api/hero-images/[id].ts` - Individual image operations ✓
- `/api/hero-images/reorder.ts` - Reorder images ✓

## 5. Database Setup

Run the database migration to create the `hero_images` table:

```sql
CREATE TABLE IF NOT EXISTS hero_images (
  id SERIAL PRIMARY KEY,
  desktop_url TEXT NOT NULL,
  mobile_url TEXT NOT NULL,
  alt_text TEXT NOT NULL DEFAULT 'Ministry Hero Image',
  display_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Create index for better performance
CREATE INDEX idx_hero_images_display_order ON hero_images(display_order, id);
CREATE INDEX idx_hero_images_active ON hero_images(is_active);
```

You can run this in:
- Vercel Dashboard → Storage → Postgres → SQL Editor
- Using `psql` command line
- Using a database management tool

## 6. Test the Setup

### Test File Upload

1. Navigate to `/admin` in your browser
2. Go to "Home Page Management" tab
3. Click "Add Image" in Hero Slideshow section
4. Try uploading a test image

### Expected Behavior

✅ Upload button appears  
✅ File selection dialog opens  
✅ Upload progress shows "Uploading..."  
✅ Success message appears  
✅ Image URL is populated  
✅ Preview appears below  

### Common Issues

#### "Server configuration error"
**Problem:** `BLOB_READ_WRITE_TOKEN` not set  
**Solution:** Check environment variables in Vercel Dashboard

#### "Failed to upload file"
**Problem:** Blob storage not enabled  
**Solution:** Create Blob storage in Vercel Dashboard → Storage

#### Upload button not working
**Problem:** JavaScript error  
**Solution:** Check browser console for errors

## 7. Configure File Limits (Optional)

Edit `/api/upload.ts` to change limits:

```typescript
const form = new IncomingForm({
  maxFileSize: 100 * 1024 * 1024, // Change to your desired limit
  keepExtensions: true,
});
```

Edit `/components/admin/HomeManager.tsx` for client-side validation:

```typescript
// Image size limit
if (file.size > 10 * 1024 * 1024) {
  toast.error('Image size should be less than 10MB');
  return;
}

// Video size limit
if (file.size > 100 * 1024 * 1024) {
  toast.error('Video size should be less than 100MB');
  return;
}
```

## 8. Security Checklist

- [ ] `BLOB_READ_WRITE_TOKEN` is set as environment variable
- [ ] `.env.local` is in `.gitignore`
- [ ] Token is NOT committed to Git
- [ ] Admin routes are protected (authentication required)
- [ ] File type validation is enabled
- [ ] File size limits are configured
- [ ] CORS is properly configured

## 9. Monitoring & Maintenance

### Check Blob Storage Usage

1. Go to Vercel Dashboard → Storage → Blob
2. View storage usage and file count
3. Monitor costs (if applicable)

### Clean Up Old Files

To delete files from Blob storage:

```typescript
import { del } from '@vercel/blob';

// Delete a file
await del(url, { token: process.env.BLOB_READ_WRITE_TOKEN });
```

Consider implementing:
- Automatic cleanup of deleted hero images
- Retention policy for old videos
- Archive feature for unused media

## 10. Usage Guide for Admins

### Upload Hero Images

1. Go to Admin Dashboard
2. Navigate to "Home Page Management"
3. Click "Add Image" in Hero Slideshow section
4. Upload desktop image (16:9 ratio recommended)
5. Upload mobile image (9:16 ratio recommended)
6. Enter alt text for accessibility
7. Click "Add Hero Image"

### Upload Videos

1. Go to Admin Dashboard
2. Navigate to "Home Page Management"
3. Go to "Ministry Videos" section
4. Click "Add Video" or edit existing
5. Upload video file (MP4 recommended)
6. Upload poster image
7. Enter title and description
8. Click "Done"

### Manage Images

- **Reorder:** Drag images up/down
- **Hide:** Click "Hide" to disable without deleting
- **Show:** Click "Show" to re-enable
- **Delete:** Click "Delete" to remove permanently

## Troubleshooting

### Upload Gets Stuck

**Symptoms:** Upload never completes  
**Solutions:**
- Check file size (under 10MB for images, 100MB for videos)
- Check internet connection
- Try a different browser
- Check Vercel function logs

### Images Don't Appear on Homepage

**Symptoms:** Uploaded images don't show on site  
**Solutions:**
- Verify image is marked as "Active"
- Clear browser cache
- Check that URL is publicly accessible
- Verify image is in correct aspect ratio

### Can't Delete Images

**Symptoms:** Delete button doesn't work  
**Solutions:**
- Check browser console for errors
- Verify database connection
- Check API endpoint is deployed
- Ensure proper authentication

### Out of Storage

**Symptoms:** Uploads fail with storage error  
**Solutions:**
- Check Vercel Blob storage limits
- Delete unused files
- Upgrade Vercel plan if needed
- Implement file cleanup strategy

## Support Resources

- [Vercel Blob Documentation](https://vercel.com/docs/storage/vercel-blob)
- [Formidable Documentation](https://github.com/node-formidable/formidable)
- [DND Kit Documentation](https://docs.dndkit.com/)
- Internal: `/ADMIN_FILE_UPLOAD.md`

## Next Steps

After setup is complete:

1. ✅ Test all upload functionality
2. ✅ Upload initial hero images
3. ✅ Upload ministry video
4. ✅ Configure video poster
5. ✅ Train admin users
6. ✅ Set up monitoring alerts
7. ✅ Document backup procedures

---

**Setup Complete!** 🎉

Your admin dashboard is now ready to manage hero images and videos with direct file uploads to Vercel Blob storage.

Last Updated: November 5, 2025
