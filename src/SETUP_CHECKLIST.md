# 🚀 Hero Images Setup Checklist

Use this checklist to ensure you've completed all setup steps.

## ✅ Prerequisites

- [ ] Vercel account created
- [ ] Project deployed to Vercel
- [ ] Access to Vercel dashboard

---

## 📦 1. Install Dependencies

```bash
npm install @vercel/postgres @vercel/blob @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities
```

**Verify:**
- [ ] All packages installed without errors
- [ ] `package.json` shows all 5 dependencies

---

## 🗄️ 2. Set Up Vercel Postgres

**In Vercel Dashboard:**
- [ ] Navigate to your project
- [ ] Go to **Storage** tab
- [ ] Click **Create Database**
- [ ] Select **Postgres** (Neon)
- [ ] Click **Create**
- [ ] Verify `POSTGRES_URL` appears in environment variables

**Run Database Schema:**
- [ ] Open Postgres dashboard → **Query** tab
- [ ] Copy SQL from `/DATABASE_SCHEMA.sql`
- [ ] Paste and execute
- [ ] Verify success message
- [ ] Run verification query:
  ```sql
  SELECT COUNT(*) FROM hero_images;
  ```
  Should return `0` (empty table)

---

## 📁 3. Set Up Vercel Blob Storage

**In Vercel Dashboard:**
- [ ] Go to **Storage** tab
- [ ] Click **Create Database**
- [ ] Select **Blob**
- [ ] Click **Create**
- [ ] Verify `BLOB_READ_WRITE_TOKEN` appears in environment variables

**Test Upload:**
- [ ] Install Vercel CLI: `npm i -g vercel`
- [ ] Login: `vercel login`
- [ ] Test upload: `vercel blob upload test.jpg`
- [ ] Verify you get a URL back

---

## 🖼️ 4. Upload Your Hero Images

You have 23 hero images (desktop 16:9 + mobile 9:16).

**Option A: Use Vercel CLI (Recommended)**

```bash
# Desktop images
vercel blob upload /path/to/00.jpg --pathname Home/hero/16x9/00.jpg
vercel blob upload /path/to/01.jpg --pathname Home/hero/16x9/01.jpg
# ... repeat for all 23 desktop images

# Mobile images
vercel blob upload /path/to/00-mobile.jpg --pathname Home/hero/9x16/00.jpg
vercel blob upload /path/to/01-mobile.jpg --pathname Home/hero/9x16/01.jpg
# ... repeat for all 23 mobile images
```

**Option B: Use Vercel Dashboard**
- [ ] Go to Blob storage dashboard
- [ ] Upload each file manually
- [ ] Copy each URL

**Verification:**
- [ ] All 23 desktop images uploaded (16:9 ratio)
- [ ] All 23 mobile images uploaded (9:16 ratio)
- [ ] URLs copied and saved

---

## 🎨 5. Populate Database with Images

**Option A: Use Admin Panel (Recommended for small batches)**
- [ ] Navigate to `/admin`
- [ ] Login
- [ ] Click "Hero Images" in sidebar
- [ ] Click "Add Image"
- [ ] Paste desktop URL
- [ ] Paste mobile URL
- [ ] Set alt text
- [ ] Click "Add Hero Image"
- [ ] Repeat for all 23 images

**Option B: Bulk Insert via SQL (Faster)**
- [ ] Open database Query tab
- [ ] Use bulk insert template from `/DATABASE_SCHEMA.sql`
- [ ] Replace `YOUR-BLOB-URL` with your actual URLs
- [ ] Execute query
- [ ] Verify: `SELECT COUNT(*) FROM hero_images;` returns `23`

---

## 🧪 6. Test Admin Panel

- [ ] Navigate to `/admin`
- [ ] Click "Hero Images"
- [ ] Verify all images appear
- [ ] Test **Add Image**: Add a new image
- [ ] Test **Drag to Reorder**: Move images around
- [ ] Test **Toggle Visibility**: Click Hide/Show
- [ ] Test **Delete**: Delete a test image
- [ ] Verify toast notifications appear

---

## 🌐 7. Test Frontend Display

- [ ] Navigate to homepage `/`
- [ ] Verify slideshow appears
- [ ] Verify images auto-play (5 sec intervals)
- [ ] Test manual navigation (dots)
- [ ] Test Pause/Play button
- [ ] Verify slide counter shows correct count
- [ ] Test on mobile device (should show mobile images)
- [ ] Test on desktop (should show desktop images)

---

## 🔍 8. Verify Data Flow

**Test API Endpoints:**

1. **Get Active Images (Frontend)**
   - [ ] Visit: `/api/hero-images?activeOnly=true`
   - [ ] Should return JSON with active images only
   - [ ] Verify display_order is correct

2. **Get All Images (Admin)**
   - [ ] Visit: `/api/hero-images`
   - [ ] Should return all images (active + inactive)

3. **Test Reorder**
   - [ ] Drag image in admin panel
   - [ ] Verify order changes on frontend

4. **Test Toggle**
   - [ ] Hide an image in admin
   - [ ] Refresh homepage
   - [ ] Verify image doesn't show

---

## 🐛 9. Troubleshooting

**If images don't appear on homepage:**
- [ ] Check browser console for errors
- [ ] Verify API returns data: `/api/hero-images?activeOnly=true`
- [ ] Check if images are marked as active in database
- [ ] Verify `POSTGRES_URL` environment variable is set
- [ ] Redeploy if needed: `vercel --prod`

**If admin panel doesn't save:**
- [ ] Check browser console for errors
- [ ] Verify API endpoints are deployed
- [ ] Check environment variables are set
- [ ] Try redeploying

**If drag-and-drop doesn't work:**
- [ ] Verify @dnd-kit packages are installed
- [ ] Check browser console for React errors
- [ ] Try refreshing the page

---

## ✨ 10. Final Verification

- [ ] Homepage displays slideshow with all active images
- [ ] Images appear in correct order
- [ ] Desktop shows 16:9 images
- [ ] Mobile shows 9:16 images
- [ ] Admin panel allows full CRUD operations
- [ ] Drag-and-drop reordering works
- [ ] Show/Hide toggle works
- [ ] No console errors
- [ ] Performance is good (no lag)

---

## 📚 Next Steps After Setup

1. **Customize Alt Text**
   - [ ] Edit each image's alt text for better accessibility
   - [ ] Use descriptive text (e.g., "Pastor leading worship service")

2. **Optimize Images**
   - [ ] Ensure images are properly sized (not too large)
   - [ ] Desktop: ~1920x1080px or 2560x1440px
   - [ ] Mobile: ~1080x1920px
   - [ ] Compress images before upload (use TinyPNG, etc.)

3. **Set Up Backup**
   - [ ] Export database regularly
   - [ ] Keep copy of Blob URLs
   - [ ] Document your setup

4. **Train Your Team**
   - [ ] Show admin how to add images
   - [ ] Demonstrate reordering
   - [ ] Explain active/inactive toggle

---

## 🎉 Completion

Once all checkboxes are checked, your dynamic hero images system is fully operational!

**Support:** Refer to `HERO_IMAGES_SETUP.md` for detailed instructions.
