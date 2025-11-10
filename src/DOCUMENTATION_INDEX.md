# 📚 YBH Ministries Documentation Index

Welcome to the YBH Ministries website documentation! This index will help you find the information you need.

---

## 🚀 Getting Started

If you're new to the project, start here:

1. **[README.md](./README.md)** - Project overview and basic information
2. **[SETUP_CHECKLIST.md](./SETUP_CHECKLIST.md)** - Step-by-step setup checklist
3. **[ENVIRONMENT_SETUP.md](./ENVIRONMENT_SETUP.md)** - Environment variables configuration

---

## 🎨 Hero Images Management

Complete documentation for the dynamic hero images system:

### Quick Start
- **[QUICK_REFERENCE.md](./QUICK_REFERENCE.md)** - Quick commands and common tasks

### Detailed Guides
- **[HERO_IMAGES_SETUP.md](./HERO_IMAGES_SETUP.md)** - Complete setup guide
- **[IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md)** - Technical implementation details
- **[DATABASE_SCHEMA.sql](./DATABASE_SCHEMA.sql)** - Database schema and SQL commands

### For Developers
- **[/api/hero-images.ts](./api/hero-images.ts)** - Main API endpoint
- **[/api/hero-images/[id].ts](./api/hero-images/[id].ts)** - Single image operations
- **[/api/hero-images/reorder.ts](./api/hero-images/reorder.ts)** - Reorder endpoint
- **[/utils/api-config.ts](./utils/api-config.ts)** - API configuration
- **[/utils/useHeroImages.ts](./utils/useHeroImages.ts)** - React hook for fetching images
- **[/components/admin/HeroImageManager.tsx](./components/admin/HeroImageManager.tsx)** - Admin interface
- **[/components/NewHome.tsx](./components/NewHome.tsx)** - Frontend display

---

## 📖 Documentation by Topic

### Setup & Configuration
| Document | Description |
|----------|-------------|
| [SETUP_CHECKLIST.md](./SETUP_CHECKLIST.md) | Complete setup checklist |
| [ENVIRONMENT_SETUP.md](./ENVIRONMENT_SETUP.md) | Environment variables guide |
| [DATABASE_SCHEMA.sql](./DATABASE_SCHEMA.sql) | Database schema |

### Usage & How-To
| Document | Description |
|----------|-------------|
| [QUICK_REFERENCE.md](./QUICK_REFERENCE.md) | Quick reference for common tasks |
| [HERO_IMAGES_SETUP.md](./HERO_IMAGES_SETUP.md) | Hero images setup guide |

### Technical Details
| Document | Description |
|----------|-------------|
| [IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md) | Implementation details and architecture |
| [README.md](./README.md) | Project overview and features |

---

## 🎯 Documentation by Role

### For Administrators (Non-Technical)
Start with these documents to manage content:

1. **Quick Start:** [QUICK_REFERENCE.md](./QUICK_REFERENCE.md)
   - How to add images
   - How to reorder images
   - How to hide/show images
   - How to delete images

2. **Setup Guide:** [HERO_IMAGES_SETUP.md](./HERO_IMAGES_SETUP.md)
   - Initial setup steps
   - Uploading images
   - Using the admin panel

### For Developers (Technical)
Start with these documents for development:

1. **Setup:** [SETUP_CHECKLIST.md](./SETUP_CHECKLIST.md)
   - Install dependencies
   - Configure environment
   - Set up database

2. **Environment:** [ENVIRONMENT_SETUP.md](./ENVIRONMENT_SETUP.md)
   - Environment variables
   - Local development
   - Testing

3. **Implementation:** [IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md)
   - Architecture overview
   - Data flow
   - API endpoints
   - Code structure

4. **Database:** [DATABASE_SCHEMA.sql](./DATABASE_SCHEMA.sql)
   - Schema definition
   - Indexes
   - SQL queries

---

## 🔍 Find What You Need

### I want to...

#### Add a new hero image
→ [QUICK_REFERENCE.md](./QUICK_REFERENCE.md#add-a-new-hero-image)

#### Reorder hero images
→ [QUICK_REFERENCE.md](./QUICK_REFERENCE.md#reorder-images)

#### Set up the database
→ [SETUP_CHECKLIST.md](./SETUP_CHECKLIST.md#-2-set-up-vercel-postgres)

#### Configure environment variables
→ [ENVIRONMENT_SETUP.md](./ENVIRONMENT_SETUP.md)

#### Understand the architecture
→ [IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md#-data-flow)

#### Troubleshoot issues
→ [QUICK_REFERENCE.md](./QUICK_REFERENCE.md#-troubleshooting-quick-fixes)

#### Set up from scratch
→ [SETUP_CHECKLIST.md](./SETUP_CHECKLIST.md)

#### Learn about the API
→ [IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md#2-api-endpoints-vercel-serverless-functions)

#### Run SQL queries
→ [DATABASE_SCHEMA.sql](./DATABASE_SCHEMA.sql)

---

## 📊 Feature Documentation

### Hero Images System

| Feature | Documentation |
|---------|---------------|
| **Overview** | [HERO_IMAGES_SETUP.md](./HERO_IMAGES_SETUP.md#-overview) |
| **Database Schema** | [DATABASE_SCHEMA.sql](./DATABASE_SCHEMA.sql) |
| **API Endpoints** | [IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md#2-api-endpoints-vercel-serverless-functions) |
| **Admin Interface** | [HERO_IMAGES_SETUP.md](./HERO_IMAGES_SETUP.md#-adding-images-via-admin-panel) |
| **Frontend Display** | [IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md#5-frontend-display) |
| **Troubleshooting** | [QUICK_REFERENCE.md](./QUICK_REFERENCE.md#-troubleshooting-quick-fixes) |

---

## 🛠️ Technical Reference

### Code Files

#### API Routes
- `/api/hero-images.ts` - List and create hero images
- `/api/hero-images/[id].ts` - Get, update, delete single image
- `/api/hero-images/reorder.ts` - Reorder images

#### Components
- `/components/admin/HeroImageManager.tsx` - Admin management interface
- `/components/NewHome.tsx` - Homepage with hero slideshow

#### Utilities
- `/utils/api-config.ts` - API configuration and helpers
- `/utils/useHeroImages.ts` - React hook for fetching images

#### Configuration
- `/package.json` - Dependencies
- `.env.local` - Local environment variables (not in Git)

---

## 📝 Cheat Sheets

### Quick Commands

```bash
# Setup
npm install
vercel env pull .env.local

# Development
npm run dev
vercel dev

# Deployment
vercel --prod

# Database
psql $POSTGRES_URL

# Blob Upload
vercel blob upload image.jpg
```

### Common SQL Queries

```sql
-- View all images
SELECT * FROM hero_images ORDER BY display_order;

-- Count images
SELECT COUNT(*) FROM hero_images;

-- Add image
INSERT INTO hero_images (desktop_url, mobile_url) 
VALUES ('https://...', 'https://...');

-- Toggle visibility
UPDATE hero_images SET is_active = NOT is_active WHERE id = 1;

-- Delete image
DELETE FROM hero_images WHERE id = 1;
```

### Common API Calls

```javascript
// Get active images (frontend)
GET /api/hero-images?activeOnly=true

// Get all images (admin)
GET /api/hero-images

// Add image
POST /api/hero-images
Body: { desktopUrl, mobileUrl, altText }

// Toggle visibility
PATCH /api/hero-images/5
Body: { isActive: false }

// Delete image
DELETE /api/hero-images/5

// Reorder images
POST /api/hero-images/reorder
Body: { imageIds: [3, 1, 2] }
```

---

## 🆘 Getting Help

### Step-by-Step Guides
1. **Setup from scratch:** [SETUP_CHECKLIST.md](./SETUP_CHECKLIST.md)
2. **Environment issues:** [ENVIRONMENT_SETUP.md](./ENVIRONMENT_SETUP.md#-troubleshooting)
3. **Hero images not working:** [QUICK_REFERENCE.md](./QUICK_REFERENCE.md#-troubleshooting-quick-fixes)

### Reference Guides
- **Quick commands:** [QUICK_REFERENCE.md](./QUICK_REFERENCE.md)
- **Database queries:** [DATABASE_SCHEMA.sql](./DATABASE_SCHEMA.sql#useful-queries-for-management)
- **API reference:** [IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md#2-api-endpoints-vercel-serverless-functions)

---

## 📦 Dependencies

Required packages for hero images system:

```json
{
  "@vercel/postgres": "^0.10.0",
  "@vercel/blob": "^0.24.0",
  "@dnd-kit/core": "^6.1.0",
  "@dnd-kit/sortable": "^8.0.0",
  "@dnd-kit/utilities": "^3.2.2"
}
```

Install with:
```bash
npm install @vercel/postgres @vercel/blob @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities
```

---

## 📅 Maintenance

### Regular Tasks
- **Backup database:** Monthly
- **Optimize images:** Before upload
- **Update alt text:** As needed
- **Review active images:** Weekly

### Backup Commands
```bash
# Backup database to CSV
\copy (SELECT * FROM hero_images) TO 'backup.csv' CSV HEADER

# Restore from CSV
\copy hero_images FROM 'backup.csv' CSV HEADER
```

---

## 🎉 Quick Start Summary

1. **Setup:** Follow [SETUP_CHECKLIST.md](./SETUP_CHECKLIST.md)
2. **Configure:** Set environment variables ([ENVIRONMENT_SETUP.md](./ENVIRONMENT_SETUP.md))
3. **Deploy:** Run `vercel --prod`
4. **Use:** Add images via admin panel
5. **Reference:** Use [QUICK_REFERENCE.md](./QUICK_REFERENCE.md) for daily tasks

---

**Last Updated:** October 25, 2025

For questions or issues, refer to the troubleshooting sections in each guide.
