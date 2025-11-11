# Single Video with Mandatory Thumbnail Implementation

## Date: 2025-01-10

## Overview
Updated the home video management system to ensure only one video exists at any point in time, and made the thumbnail image mandatory for all videos.

## Changes Made

### 1. Database Schema Updates

**File: `database/schema/home_content.sql`**
- Updated `home_video` table comment to indicate "only one video at a time"
- Changed `thumbnail_url` column from `TEXT` to `TEXT NOT NULL`
- Added comment clarifying thumbnail is required

**Migration Script: `database/migrations/make_thumbnail_required.sql`**
- Updates any existing videos with NULL thumbnail to default value
- Alters column constraint to make `thumbnail_url` NOT NULL
- Includes verification query

### 2. API Changes

**File: `app/api/admin/home/video/route.ts`**

#### POST Endpoint (File Upload)
- Added validation to require `thumbnailFile`
- Returns 400 error if thumbnail is missing: "Thumbnail image is required"
- Fetches existing video before upload
- Uploads video and thumbnail (thumbnail failure triggers cleanup)
- **Deletes old video and thumbnail blobs** from Vercel Blob storage
- **Deletes old video record** from database
- Inserts new video as single active record
- Returns success message indicating whether video was replaced or uploaded

#### POST Endpoint (URL Submission)
- Added validation to require `thumbnail_url`
- Returns 400 error if thumbnail URL is missing
- Fetches existing video before processing
- **Deletes old video and thumbnail blobs** if they exist
- **Deletes old video record** from database
- Inserts new video as single active record

**Key Implementation Details:**
```typescript
// Get existing video
const existingVideo = await getActiveHomeVideo();

// Upload new files...

// Delete old blobs
if (existingVideo) {
  if (existingVideo.blob_url && existingVideo.blob_url.includes('blob.vercel-storage.com')) {
    await del(existingVideo.blob_url);
  }
  if (existingVideo.thumbnail_url && existingVideo.thumbnail_url.includes('blob.vercel-storage.com')) {
    await del(existingVideo.thumbnail_url);
  }
  // Delete from database
  await deleteHomeVideo(existingVideo.id);
}

// Insert new video
const homeVideo = await upsertHomeVideo(videoBlob.url, thumbnailUrl, createdBy);
```

### 3. Database Utility Updates

**File: `src/lib/db.ts`**

#### HomeVideo Interface
- Changed `thumbnail_url: string | null` to `thumbnail_url: string`
- Added comment: "Required field"

#### upsertHomeVideo Function
- Changed signature from `thumbnailUrl?: string` to `thumbnailUrl: string`
- Removed null coalescing in INSERT statement
- Updated function comment to indicate it "replaces existing video"

### 4. Frontend Updates

**File: `src/components/admin/HomeContentManager.tsx`**

#### Interface Update
- Changed `HomeVideo` interface: `thumbnail_url: string` (removed `| null`)

#### Validation Logic
```typescript
// Thumbnail is mandatory
if (videoUploadType === 'file' && !thumbnailFile) {
  toast.error('Thumbnail image is required. Please select a thumbnail image.');
  return;
}
if (videoUploadType === 'url' && !videoThumbnailUrl.trim()) {
  toast.error('Thumbnail URL is required. Please enter a thumbnail URL.');
  return;
}
```

#### UI Updates
- File upload label: Changed from "Thumbnail Image (Optional)" to "Thumbnail Image *" (red asterisk)
- URL upload label: Changed from "Thumbnail URL (Optional)" to "Thumbnail URL *" (red asterisk)
- Non-null assertion when appending to FormData: `formData.append('thumbnail', thumbnailFile!)`
- Updated success toast to show API message (e.g., "Video replaced successfully")
- Removed optional chaining from video poster: `poster={homeVideo.thumbnail_url}`

### 5. Type Safety

**Updated TypeScript Types:**
- `HomeVideo.thumbnail_url`: `string` (was `string | null`)
- `upsertHomeVideo()` parameter: `thumbnailUrl: string` (was `thumbnailUrl?: string`)

## Video Replacement Flow

1. **User Uploads New Video:**
   - Frontend validates video file + thumbnail are both present
   - API receives upload request

2. **API Fetches Existing Video:**
   ```typescript
   const existingVideo = await getActiveHomeVideo();
   ```

3. **API Uploads New Files:**
   - Uploads video to Vercel Blob
   - Uploads thumbnail to Vercel Blob
   - If thumbnail upload fails, cleans up video and returns error

4. **API Deletes Old Files:**
   ```typescript
   if (existingVideo) {
     // Delete old video blob
     if (existingVideo.blob_url.includes('blob.vercel-storage.com')) {
       await del(existingVideo.blob_url);
     }
     // Delete old thumbnail blob
     if (existingVideo.thumbnail_url.includes('blob.vercel-storage.com')) {
       await del(existingVideo.thumbnail_url);
     }
     // Delete old database record
     await deleteHomeVideo(existingVideo.id);
   }
   ```

5. **API Inserts New Record:**
   ```typescript
   const homeVideo = await upsertHomeVideo(videoBlob.url, thumbnailUrl, createdBy);
   ```

6. **Result:**
   - Only one video exists in database
   - Only one set of video/thumbnail files in blob storage
   - Old files completely removed
   - User sees "Video replaced successfully" message

## Benefits

1. **Single Video Guarantee:** Only one video exists at any point in time
2. **Automatic Cleanup:** Old videos and thumbnails are automatically deleted
3. **Mandatory Thumbnail:** All videos must have a poster image for better UX
4. **Storage Efficiency:** No orphaned files in blob storage
5. **Type Safety:** TypeScript enforces thumbnail requirement at compile time
6. **Clear UX:** Red asterisk indicates required field, error messages are explicit

## Error Handling

### Client-Side Validation
- ❌ "Thumbnail image is required. Please select a thumbnail image." (file upload)
- ❌ "Thumbnail URL is required. Please enter a thumbnail URL." (URL upload)

### Server-Side Validation
- ❌ "Thumbnail image is required" (missing file)
- ❌ "Thumbnail URL is required" (missing URL)
- ❌ "Failed to upload thumbnail image" (upload failure)
- ❌ "Failed to upload video file..." (video upload failure)

### Success Messages
- ✅ "Video replaced successfully" (when replacing existing video)
- ✅ "Video uploaded successfully" (when no existing video)

## Database Migration Steps

**Production Deployment:**

1. **Run migration script:**
   ```sql
   -- Update any NULL thumbnails to default
   UPDATE home_video 
   SET thumbnail_url = 'https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Home/hero/16x9/00.jpg'
   WHERE thumbnail_url IS NULL;
   
   -- Make column NOT NULL
   ALTER TABLE home_video 
   ALTER COLUMN thumbnail_url SET NOT NULL;
   ```

2. **Verify migration:**
   ```sql
   -- Should return 0 rows
   SELECT * FROM home_video WHERE thumbnail_url IS NULL;
   ```

3. **Deploy code to Vercel**

## Testing Checklist

- [ ] Upload video with thumbnail (new video) ✓ Should succeed
- [ ] Upload video without thumbnail ✓ Should show error
- [ ] Upload video when one exists ✓ Should replace, delete old files
- [ ] Verify old video blob deleted from storage
- [ ] Verify old thumbnail blob deleted from storage
- [ ] Verify only one video record in database
- [ ] Check error messages are clear
- [ ] Test both file upload and URL submission paths
- [ ] Verify thumbnail is displayed on frontend
- [ ] Test in both English and Telugu languages

## Files Modified

1. `database/schema/home_content.sql` - Schema update
2. `database/migrations/make_thumbnail_required.sql` - New migration
3. `app/api/admin/home/video/route.ts` - API logic
4. `src/lib/db.ts` - Database utilities
5. `src/components/admin/HomeContentManager.tsx` - Frontend UI

## Related Documentation

- `HOME_PAGE_DB_IMPLEMENTATION.md` - Overall architecture
- `BLOB_CLEANUP_IMPLEMENTATION.md` - Blob deletion patterns
- `SINGLE_VIDEO_SUMMARY.md` - Previous video simplification

## Notes

- ⚠️ **BREAKING CHANGE:** Thumbnail is now required (was optional)
- 🔒 **Data Integrity:** Only one video can exist at a time
- 🧹 **Automatic Cleanup:** Old files are automatically deleted on replacement
- ✅ **No Errors:** All TypeScript compilation passed
