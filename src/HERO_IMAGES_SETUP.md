# Hero Images Dynamic Management - Setup Guide

This guide will help you set up the dynamic hero image management system using Vercel Postgres (Neon) and Vercel Blob Storage.

## 🎯 Overview

The system allows you to:
- ✅ Upload hero images (desktop 16:9 + mobile 9:16) to Vercel Blob
- ✅ Manage images via admin panel at `/admin`
- ✅ Reorder images with drag-and-drop
- ✅ Toggle visibility (active/inactive) without deleting
- ✅ Dynamically display on homepage slideshow

---

## 📋 Prerequisites

1. **Vercel Account** - Deploy your site on Vercel
2. **Vercel Postgres (Neon)** - Database for storing image URLs
3. **Vercel Blob Storage** - For hosting images

---

## 🚀 Setup Instructions

### Step 1: Create Vercel Postgres Database

1. Go to your Vercel project dashboard
2. Navigate to **Storage** tab
3. Click **Create Database** → Select **Postgres**
4. Choose **Neon** as provider (recommended)
5. Click **Create**

Your connection string will be automatically added to environment variables.

### Step 2: Run Database Migration

Connect to your database and run this SQL:

```sql
-- Hero Images Table
CREATE TABLE hero_images (
  id SERIAL PRIMARY KEY,
  desktop_url TEXT NOT NULL,
  mobile_url TEXT NOT NULL,
  alt_text TEXT DEFAULT 'Ministry Hero Image',
  display_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Index for fast ordered queries (frontend)
CREATE INDEX idx_hero_images_active_order ON hero_images(display_order, id) 
  WHERE is_active = true;

-- Index for admin queries (all images)
CREATE INDEX idx_hero_images_order ON hero_images(display_order, id);

-- Function to auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to auto-update updated_at
CREATE TRIGGER update_hero_images_updated_at 
  BEFORE UPDATE ON hero_images 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();
```

**To run this SQL:**

**Option A: Using Vercel Dashboard**
1. Go to Storage → Your Postgres Database → Query tab
2. Paste the SQL above
3. Click Execute

**Option B: Using psql CLI**
```bash
# Get connection string from Vercel dashboard
psql "your-connection-string-here"

# Then paste the SQL
```

### Step 3: Set Up Vercel Blob Storage

1. Go to Vercel dashboard → Storage tab
2. Click **Create Database** → Select **Blob**
3. Click **Create**

Vercel will automatically add `BLOB_READ_WRITE_TOKEN` to your environment variables.

### Step 4: Upload Your Hero Images

You have 23 hero images ready. Let's organize them:

#### Using Vercel CLI (Recommended)

```bash
# Install Vercel CLI if not already installed
npm i -g vercel

# Upload desktop images (16:9 ratio)
vercel blob upload Home/hero/16x9/00.jpg
vercel blob upload Home/hero/16x9/01.jpg
# ... upload all 23 desktop images

# Upload mobile images (9:16 ratio)
vercel blob upload Home/hero/9x16/00.jpg
vercel blob upload Home/hero/9x16/01.jpg
# ... upload all 23 mobile images
```

Each upload will return a URL like:
```
https://xxxx.public.blob.vercel-storage.com/Home/hero/16x9/00.jpg
```

**Save these URLs** - you'll need them in the admin panel.

#### Using Vercel Dashboard (Manual Upload)

1. Go to Storage → Blob → Upload
2. Upload each image
3. Copy the generated URL

---

## 🎨 Adding Images via Admin Panel

1. **Login to Admin Panel**
   - Navigate to `/admin`
   - Login with your credentials

2. **Navigate to Hero Images**
   - Click "Hero Images" in the sidebar

3. **Add New Image**
   - Click **"Add Image"** button
   - Paste **Desktop URL** (16:9 image)
   - Paste **Mobile URL** (9:16 image)
   - Set **Alt Text** (for accessibility)
   - Click **"Add Hero Image"**

4. **Reorder Images**
   - Simply **drag and drop** images to reorder
   - Order is automatically saved
   - Frontend slideshow will reflect the new order

5. **Toggle Visibility**
   - Click **"Hide"** to make image inactive (won't show on homepage)
   - Click **"Show"** to make it active again
   - Useful for seasonal/temporary images

6. **Delete Images**
   - Click **"Delete"** button
   - Confirm deletion
   - Image will be removed from database (file remains in Blob storage)

---

## 📁 File Structure

```
/api/
  ├── hero-images.ts              # Main API endpoint (GET all, POST new)
  ├── hero-images/
      ├── [id].ts                 # Single image operations (GET, PUT, PATCH, DELETE)
      └── reorder.ts              # Reorder images endpoint

/components/
  ├── admin/
      └── HeroImageManager.tsx    # Admin interface for managing images
  └── NewHome.tsx                 # Frontend hero slideshow

/utils/
  ├── api-config.ts               # API configuration & helpers
  └── useHeroImages.ts            # React hook to fetch images
```

---

## 🔌 API Endpoints

### Frontend (Public)
```
GET /api/hero-images?activeOnly=true
```
Returns only active images for homepage display.

### Admin (Protected)
```
GET    /api/hero-images              # Get all images
POST   /api/hero-images              # Create new image
GET    /api/hero-images/[id]         # Get single image
PUT    /api/hero-images/[id]         # Update image
PATCH  /api/hero-images/[id]         # Toggle visibility
DELETE /api/hero-images/[id]         # Delete image
POST   /api/hero-images/reorder      # Reorder images
```

---

## 🧪 Testing

### Test Database Connection

Create a simple test page:

```typescript
// pages/test-db.tsx
import { sql } from '@vercel/postgres';

export default function TestDB({ count }: { count: number }) {
  return <div>Hero Images Count: {count}</div>;
}

export async function getServerSideProps() {
  const result = await sql`SELECT COUNT(*) as count FROM hero_images`;
  return { props: { count: result.rows[0].count } };
}
```

Visit `/test-db` to verify database connection.

### Test Image Upload

1. Upload one image to Blob storage
2. Add it via admin panel
3. Check if it appears on homepage

---

## 🎬 Quick Start Workflow

For your 23 existing images:

1. **Upload all images to Vercel Blob**
   ```bash
   # Desktop images (16:9)
   vercel blob upload 00.jpg --token YOUR_TOKEN
   # ... repeat for all 23
   
   # Mobile images (9:16)
   vercel blob upload 00-mobile.jpg --token YOUR_TOKEN
   # ... repeat for all 23
   ```

2. **Bulk Insert to Database** (optional - faster than admin panel)
   
   Create a script or use SQL:
   ```sql
   INSERT INTO hero_images (desktop_url, mobile_url, alt_text, display_order) VALUES
   ('https://...blob.../16x9/00.jpg', 'https://...blob.../9x16/00.jpg', 'Ministry Event', 0),
   ('https://...blob.../16x9/01.jpg', 'https://...blob.../9x16/01.jpg', 'Ministry Event', 1),
   -- ... add all 23 images
   ;
   ```

3. **Or use Admin Panel** (slower but has UI)
   - Add each image one by one through the interface

---

## 🐛 Troubleshooting

### Images not showing on homepage

**Check:**
1. Are images marked as `is_active = true`?
   ```sql
   SELECT * FROM hero_images WHERE is_active = true;
   ```

2. Is the API returning data?
   - Visit `/api/hero-images?activeOnly=true` directly
   - Should return JSON with images array

3. Check browser console for errors

### Admin panel not saving

**Check:**
1. Database connection string in environment variables
2. API routes are deployed (redeploy if needed)
3. CORS headers are set correctly (already configured in API files)

### Drag-and-drop not working

**Check:**
1. `@dnd-kit` packages are installed:
   ```bash
   npm install @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities
   ```

---

## 📦 Dependencies

Make sure these are in your `package.json`:

```json
{
  "dependencies": {
    "@vercel/postgres": "latest",
    "@vercel/blob": "latest",
    "@dnd-kit/core": "^6.0.0",
    "@dnd-kit/sortable": "^8.0.0",
    "@dnd-kit/utilities": "^3.2.0"
  }
}
```

Install with:
```bash
npm install @vercel/postgres @vercel/blob @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities
```

---

## 🎉 You're Done!

Your hero images system is now:
- ✅ Dynamically managed via admin panel
- ✅ Stored in Postgres database
- ✅ Images hosted on Vercel Blob
- ✅ Drag-and-drop reordering
- ✅ Show/hide without deleting
- ✅ Fast and scalable

Happy managing! 🚀
