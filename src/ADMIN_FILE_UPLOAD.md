# Admin File Upload Implementation

## Overview
This document describes the implementation of file upload functionality in the Admin Dashboard for managing hero images and video content on the Home page.

## Features

### 1. Hero Image Management
- **Upload Desktop Images** (16:9 ratio, recommended: 1920x1080)
- **Upload Mobile Images** (9:16 ratio, recommended: 1080x1920)
- **Manual URL Input** - Paste existing URLs as an alternative
- **Preview Images** - Real-time preview of uploaded/pasted images
- **Drag & Drop Reordering** - Change the slideshow order
- **Toggle Visibility** - Show/hide images without deleting
- **Delete Images** - Remove unwanted images

### 2. Video Management
- **Upload Video Files** (MP4 format, max 100MB)
- **Upload Poster Images** - Thumbnail for video player
- **Manual URL Input** - Alternative to file upload
- **Edit Video Details** - Title, description
- **Delete Videos** - Remove unwanted videos

## Architecture

### Components

#### `/components/admin/HomeManager.tsx`
Main admin component that manages:
- Hero image CRUD operations
- Video content management
- File uploads to Vercel Blob
- Drag & drop reordering

Key features:
- Real-time preview of uploads
- Progress indicators during uploads
- Error handling with user-friendly messages
- Clear/reset functionality for URLs

### API Endpoints

#### `/api/upload.ts`
Handles file uploads to Vercel Blob Storage.

**Endpoint:** `POST /api/upload?folder={folderName}`

**Request:**
- Method: `POST`
- Content-Type: `multipart/form-data`
- Body: FormData with `file` field

**Response:**
```json
{
  "success": true,
  "url": "https://...blob.vercel-storage.com/.../filename.jpg",
  "pathname": "folder/timestamp-filename.jpg",
  "contentType": "image/jpeg",
  "size": 1234567
}
```

**Features:**
- Supports images and videos
- Max file size: 100MB
- Automatic unique filename generation (timestamp prefix)
- File sanitization (removes special characters)
- Public access URLs
- CORS enabled

**Folder Structure:**
- `hero-images/desktop/` - Desktop hero images
- `hero-images/mobile/` - Mobile hero images
- `videos/` - Video files
- `video-posters/` - Video poster images

#### `/api/hero-images.ts`
Manages hero images in the database.

**Endpoints:**
- `GET /api/hero-images` - List all images
- `GET /api/hero-images?activeOnly=true` - List only active images
- `POST /api/hero-images` - Create new hero image entry

#### `/api/hero-images/[id].ts`
Individual hero image operations.

**Endpoints:**
- `PATCH /api/hero-images/[id]` - Update image (toggle visibility, etc.)
- `DELETE /api/hero-images/[id]` - Delete image

#### `/api/hero-images/reorder.ts`
Reorder hero images for slideshow sequence.

**Endpoint:** `POST /api/hero-images/reorder`

**Request Body:**
```json
{
  "imageIds": [3, 1, 2, 5, 4]
}
```

## Environment Variables

### Required
```bash
BLOB_READ_WRITE_TOKEN=your_vercel_blob_token_here
```

### How to Set Up Vercel Blob

1. **Enable Vercel Blob Storage:**
   - Go to Vercel Dashboard → Project → Storage
   - Create a new Blob Store
   - Copy the `BLOB_READ_WRITE_TOKEN`

2. **Add Environment Variable:**
   ```bash
   # In Vercel Dashboard
   BLOB_READ_WRITE_TOKEN=vercel_blob_rw_xxxxxxxxxxxxx
   ```

3. **For Local Development:**
   Create `.env.local`:
   ```bash
   BLOB_READ_WRITE_TOKEN=vercel_blob_rw_xxxxxxxxxxxxx
   ```

## File Size Limits

- **Images:** 10MB maximum
- **Videos:** 100MB maximum

These limits are enforced both client-side (for better UX) and server-side (for security).

## Supported Formats

### Images
- JPEG (.jpg, .jpeg)
- PNG (.png)
- WebP (.webp)
- GIF (.gif)

### Videos
- MP4 (.mp4)
- WebM (.webm)
- OGG (.ogg)

## User Flow

### Upload Hero Image

1. Navigate to Admin Dashboard → Home Page Management
2. Click "Add Image" in Hero Slideshow section
3. Click "Upload Desktop Image" button
4. Select image file (or paste URL)
5. Click "Upload Mobile Image" button
6. Select image file (or paste URL)
7. Enter alt text for accessibility
8. Click "Add Hero Image"
9. Image appears in the list and is immediately active

### Upload Video

1. Navigate to Admin Dashboard → Home Page Management
2. Go to "Ministry Videos" section
3. Click "Add Video" or "Edit" on existing video
4. Click "Upload Video (MP4)" button
5. Select video file (or paste URL)
6. Click "Upload Poster Image" button
7. Select poster image (or paste URL)
8. Enter title and description
9. Click "Done"

## Error Handling

The system includes comprehensive error handling:

- **File type validation** - Only accepts appropriate file types
- **File size validation** - Prevents oversized uploads
- **Network error handling** - Graceful failure messages
- **Token validation** - Checks for missing environment variables
- **User feedback** - Toast notifications for all operations

## Security Considerations

1. **Environment Variables:** 
   - Never commit `BLOB_READ_WRITE_TOKEN` to Git
   - Use Vercel's encrypted environment variables

2. **File Validation:**
   - File type checked both client and server-side
   - File size limits enforced
   - Filename sanitization to prevent path traversal

3. **Access Control:**
   - Admin authentication required (handled by parent components)
   - CORS configured appropriately

4. **Public URLs:**
   - All uploaded files are publicly accessible
   - Do not upload sensitive/private content

## Troubleshooting

### Upload Fails with 500 Error
**Solution:** Check that `BLOB_READ_WRITE_TOKEN` is set correctly in environment variables.

### Large Files Timeout
**Solution:** Increase timeout in Vercel function config or reduce file size.

### Images Don't Appear on Homepage
**Solution:** 
1. Check that images are marked as "Active"
2. Verify URLs are accessible
3. Check browser console for CORS errors

### Drag & Drop Not Working
**Solution:** Make sure there are at least 2 images in the list.

## Future Enhancements

Potential improvements:
- [ ] Image optimization (resize, compress) before upload
- [ ] Bulk upload support
- [ ] Image cropping/editing tools
- [ ] Video transcoding for different formats
- [ ] CDN integration for faster delivery
- [ ] Upload progress indicators with percentage
- [ ] Thumbnail generation for videos
- [ ] Batch operations (delete multiple, activate multiple)

## Dependencies

```json
{
  "@vercel/blob": "latest",
  "formidable": "latest",
  "@dnd-kit/core": "latest",
  "@dnd-kit/sortable": "latest",
  "@dnd-kit/utilities": "latest"
}
```

## Database Schema

The `hero_images` table stores metadata about uploaded images:

```sql
CREATE TABLE hero_images (
  id SERIAL PRIMARY KEY,
  desktop_url TEXT NOT NULL,
  mobile_url TEXT NOT NULL,
  alt_text TEXT NOT NULL DEFAULT 'Ministry Hero Image',
  display_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);
```

Note: Video data is currently stored in component state. For production, consider adding a `videos` table similar to `hero_images`.

## Testing Checklist

- [ ] Upload desktop hero image (valid file)
- [ ] Upload mobile hero image (valid file)
- [ ] Try uploading oversized file (should fail gracefully)
- [ ] Try uploading wrong file type (should fail gracefully)
- [ ] Paste manual URL and verify preview
- [ ] Add hero image with both uploads and URL
- [ ] Toggle image visibility
- [ ] Reorder images via drag & drop
- [ ] Delete image
- [ ] Upload video file
- [ ] Upload video poster
- [ ] Edit video details
- [ ] Delete video
- [ ] Verify changes appear on homepage
- [ ] Test on mobile device
- [ ] Test with slow network connection

## Support

For issues or questions:
1. Check environment variables are set correctly
2. Verify Vercel Blob storage is enabled
3. Check browser console for errors
4. Review Vercel function logs
5. Consult this documentation

---

Last Updated: November 5, 2025
