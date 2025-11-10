# Hero Images - Quick Reference Card

## 🎯 Common Tasks

### Add a New Hero Image

1. **Upload to Vercel Blob:**
   ```bash
   vercel blob upload desktop.jpg --pathname Home/hero/16x9/my-image.jpg
   vercel blob upload mobile.jpg --pathname Home/hero/9x16/my-image.jpg
   ```
   Save the URLs returned.

2. **Add via Admin Panel:**
   - Go to `/admin` → Hero Images
   - Click "Add Image"
   - Paste desktop URL
   - Paste mobile URL
   - Set alt text
   - Click "Add Hero Image"

---

### Reorder Images

1. Go to `/admin` → Hero Images
2. Drag image by the grip handle (⋮⋮)
3. Drop in new position
4. Order saves automatically
5. Frontend updates immediately

---

### Hide/Show an Image

1. Go to `/admin` → Hero Images
2. Find the image
3. Click "Hide" (or "Show")
4. Image becomes inactive (grayed out)
5. Hidden images don't appear on homepage

---

### Delete an Image

1. Go to `/admin` → Hero Images
2. Click "Delete" button
3. Confirm deletion
4. Image removed from database
5. File remains in Blob (safe)

---

## 📊 Database Quick Commands

### View All Images
```sql
SELECT id, alt_text, display_order, is_active 
FROM hero_images 
ORDER BY display_order;
```

### View Only Active Images
```sql
SELECT * FROM hero_images 
WHERE is_active = true 
ORDER BY display_order;
```

### Count Images
```sql
SELECT 
  COUNT(*) as total,
  SUM(CASE WHEN is_active THEN 1 ELSE 0 END) as active
FROM hero_images;
```

### Toggle Visibility
```sql
UPDATE hero_images 
SET is_active = NOT is_active 
WHERE id = 5;
```

### Reorder Images
```sql
UPDATE hero_images SET display_order = 0 WHERE id = 10;
UPDATE hero_images SET display_order = 1 WHERE id = 5;
UPDATE hero_images SET display_order = 2 WHERE id = 8;
```

### Delete Image
```sql
DELETE FROM hero_images WHERE id = 7;
```

### Bulk Insert
```sql
INSERT INTO hero_images (desktop_url, mobile_url, alt_text, display_order) VALUES
('https://...blob.../desktop1.jpg', 'https://...blob.../mobile1.jpg', 'Event 1', 0),
('https://...blob.../desktop2.jpg', 'https://...blob.../mobile2.jpg', 'Event 2', 1),
('https://...blob.../desktop3.jpg', 'https://...blob.../mobile3.jpg', 'Event 3', 2);
```

---

## 🔌 API Quick Reference

### Frontend (Get Active Images)
```javascript
GET /api/hero-images?activeOnly=true

Response:
{
  "images": [
    {
      "id": 1,
      "desktopUrl": "https://...",
      "mobileUrl": "https://...",
      "altText": "Ministry Event",
      "displayOrder": 0,
      "isActive": true
    }
  ]
}
```

### Admin - Create Image
```javascript
POST /api/hero-images
Body: {
  "desktopUrl": "https://...",
  "mobileUrl": "https://...",
  "altText": "Ministry Event"
}
```

### Admin - Update Image
```javascript
PUT /api/hero-images/5
Body: {
  "desktopUrl": "https://...",  // optional
  "mobileUrl": "https://...",   // optional
  "altText": "New text"         // optional
}
```

### Admin - Toggle Visibility
```javascript
PATCH /api/hero-images/5
Body: {
  "isActive": false
}
```

### Admin - Delete Image
```javascript
DELETE /api/hero-images/5
```

### Admin - Reorder
```javascript
POST /api/hero-images/reorder
Body: {
  "imageIds": [3, 1, 5, 2, 4]  // New order
}
```

---

## 🐛 Troubleshooting Quick Fixes

### Images not showing on homepage
```bash
# Check API response
curl https://your-site.vercel.app/api/hero-images?activeOnly=true

# If empty, check database
SELECT * FROM hero_images WHERE is_active = true;

# If database empty, add images via admin panel
```

### Admin panel not saving
```bash
# Redeploy
vercel --prod

# Check environment variables
vercel env ls

# Verify POSTGRES_URL is set
```

### Drag-and-drop not working
```bash
# Reinstall dependencies
npm install @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities

# Clear cache and rebuild
rm -rf node_modules package-lock.json
npm install
```

---

## 📁 File Locations

| What | Where |
|------|-------|
| Database Schema | `/DATABASE_SCHEMA.sql` |
| Setup Guide | `/HERO_IMAGES_SETUP.md` |
| Implementation Details | `/IMPLEMENTATION_SUMMARY.md` |
| Setup Checklist | `/SETUP_CHECKLIST.md` |
| API Endpoints | `/api/hero-images.ts` |
| API Endpoints (single) | `/api/hero-images/[id].ts` |
| API Reorder | `/api/hero-images/reorder.ts` |
| Admin Interface | `/components/admin/HeroImageManager.tsx` |
| Frontend Display | `/components/NewHome.tsx` |
| React Hook | `/utils/useHeroImages.ts` |
| API Config | `/utils/api-config.ts` |

---

## 💡 Tips

- **Image Sizes:** Desktop (1920x1080 or 2560x1440), Mobile (1080x1920)
- **Format:** JPEG for photos, PNG for graphics
- **Compression:** Use TinyPNG before upload
- **Alt Text:** Be descriptive for accessibility
- **Active Count:** Keep 5-10 active for good performance
- **Backup:** Export database monthly

---

## 🆘 Need Help?

1. Check `HERO_IMAGES_SETUP.md` for detailed setup
2. Check `SETUP_CHECKLIST.md` for step-by-step guide
3. Check browser console for errors
4. Check database query results
5. Try redeploying

---

## 📞 Support Commands

```bash
# View deployment logs
vercel logs

# Check environment variables
vercel env ls

# Link project
vercel link

# Deploy to production
vercel --prod

# Check build status
vercel inspect [deployment-url]
```
