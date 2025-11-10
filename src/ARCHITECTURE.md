# Hero Images System - Architecture

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                      │
│                          USER INTERFACE                              │
│                                                                      │
├──────────────────────────────┬───────────────────────────────────────┤
│                              │                                       │
│        ADMIN PANEL           │         PUBLIC WEBSITE                │
│     /admin (Protected)       │         / (Public)                    │
│                              │                                       │
│  ┌────────────────────────┐ │  ┌─────────────────────────────────┐ │
│  │ HeroImageManager.tsx   │ │  │     NewHome.tsx                 │ │
│  │                        │ │  │                                 │ │
│  │ • Add Images           │ │  │  • Hero Slideshow               │ │
│  │ • Drag to Reorder      │ │  │  • Auto-play                    │ │
│  │ • Toggle Visibility    │ │  │  • Responsive Images            │ │
│  │ • Delete Images        │ │  │  • Mobile/Desktop Switch        │ │
│  └────────────────────────┘ │  └─────────────────────────────────┘ │
│             │                │               │                       │
└─────────────┼────────────────┴───────────────┼───────────────────────┘
              │                                │
              │ POST/PUT/PATCH/DELETE          │ GET
              │                                │
              ▼                                ▼
┌─────────────────────────────────────────────────────────────────────┐
│                                                                      │
│                        API LAYER (Serverless)                        │
│                                                                      │
│  ┌───────────────────┐  ┌──────────────────┐  ┌─────────────────┐ │
│  │ /api/hero-images  │  │ /api/hero-images │  │ /api/hero-images│ │
│  │                   │  │     /[id].ts     │  │  /reorder.ts    │ │
│  │ • GET all         │  │                  │  │                 │ │
│  │ • GET active only │  │ • GET single     │  │ • POST reorder  │ │
│  │ • POST create     │  │ • PUT update     │  │                 │ │
│  │                   │  │ • PATCH toggle   │  │                 │ │
│  │                   │  │ • DELETE remove  │  │                 │ │
│  └───────────────────┘  └──────────────────┘  └─────────────────┘ │
│             │                     │                    │            │
│             └─────────────────────┴────────────────────┘            │
│                                   │                                 │
└───────────────────────────────────┼─────────────────────────────────┘
                                    │
                                    │ SQL Queries
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────┐
│                                                                      │
│                  VERCEL POSTGRES (NEON) DATABASE                     │
│                                                                      │
│  ┌────────────────────────────────────────────────────────────────┐ │
│  │                    Table: hero_images                          │ │
│  ├────┬───────────────┬───────────────┬──────────┬──────────────┤ │
│  │ id │ desktop_url   │ mobile_url    │ alt_text │ display_order│ │
│  ├────┼───────────────┼───────────────┼──────────┼──────────────┤ │
│  │ 1  │ https://...   │ https://...   │ Event 1  │ 0            │ │
│  │ 2  │ https://...   │ https://...   │ Event 2  │ 1            │ │
│  │ 3  │ https://...   │ https://...   │ Event 3  │ 2            │ │
│  └────┴───────────────┴───────────────┴──────────┴──────────────┘ │
│                                                                      │
│  • Stores metadata (URLs, order, active status)                     │
│  • Does NOT store image files                                       │
│  • Indexed for fast queries                                         │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
                                    │
                                    │ References URLs
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────┐
│                                                                      │
│                     VERCEL BLOB STORAGE                              │
│                                                                      │
│  ┌────────────────────────────────────────────────────────────────┐ │
│  │  /Home/hero/16x9/                                              │ │
│  │    ├── 00.jpg  (1920x1080)                                     │ │
│  │    ├── 01.jpg  (1920x1080)                                     │ │
│  │    └── 02.jpg  (1920x1080)                                     │ │
│  │                                                                │ │
│  │  /Home/hero/9x16/                                              │ │
│  │    ├── 00.jpg  (1080x1920)                                     │ │
│  │    ├── 01.jpg  (1080x1920)                                     │ │
│  │    └── 02.jpg  (1080x1920)                                     │ │
│  └────────────────────────────────────────────────────────────────┘ │
│                                                                      │
│  • Stores actual image files                                        │
│  • CDN-backed (fast delivery)                                       │
│  • Public access                                                    │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

---

## 🔄 Data Flow

### Adding a New Image

```
1. Admin uploads images to Vercel Blob
   ↓
2. Gets back URLs:
   - Desktop: https://...blob.../16x9/image.jpg
   - Mobile:  https://...blob.../9x16/image.jpg
   ↓
3. Admin pastes URLs in admin panel
   ↓
4. Admin clicks "Add Hero Image"
   ↓
5. POST /api/hero-images
   ↓
6. API inserts to database:
   INSERT INTO hero_images (desktop_url, mobile_url, ...)
   ↓
7. Database returns new record
   ↓
8. Admin panel updates UI
   ↓
9. Frontend fetches updated images
   ↓
10. Slideshow displays new image
```

### Reordering Images

```
1. Admin drags image in admin panel
   ↓
2. React updates local state (optimistic UI)
   ↓
3. POST /api/hero-images/reorder
   Body: { imageIds: [3, 1, 2, 4] }
   ↓
4. API updates display_order for each image:
   UPDATE hero_images SET display_order = 0 WHERE id = 3
   UPDATE hero_images SET display_order = 1 WHERE id = 1
   UPDATE hero_images SET display_order = 2 WHERE id = 2
   UPDATE hero_images SET display_order = 3 WHERE id = 4
   ↓
5. Database confirms
   ↓
6. Admin sees toast notification
   ↓
7. Frontend automatically reflects new order
```

### Frontend Display

```
1. User visits homepage (/)
   ↓
2. NewHome.tsx component mounts
   ↓
3. useHeroImages() hook called
   ↓
4. GET /api/hero-images?activeOnly=true
   ↓
5. API queries database:
   SELECT * FROM hero_images 
   WHERE is_active = true 
   ORDER BY display_order
   ↓
6. Returns JSON with images array
   ↓
7. Component receives images
   ↓
8. Slideshow renders with correct order
   ↓
9. User sees desktop or mobile images based on screen size
```

---

## 🗂️ Component Hierarchy

```
App.tsx
└── Routes
    ├── / (Home)
    │   └── NewHome.tsx
    │       ├── useHeroImages() → Fetches from API
    │       └── Slideshow Component
    │           ├── Desktop Images (16:9)
    │           └── Mobile Images (9:16)
    │
    └── /admin (Admin Panel)
        └── AdminDashboard.tsx
            └── HeroImageManager.tsx
                ├── Add Image Form
                ├── Image List (DnD)
                │   ├── SortableImageCard
                │   │   ├── Desktop Preview
                │   │   ├── Mobile Preview
                │   │   ├── Toggle Button
                │   │   └── Delete Button
                │   └── DndContext (drag-and-drop)
                └── API Integration
                    ├── apiCall() helper
                    └── API endpoints
```

---

## 📦 File Organization

```
project-root/
├── /api/                              # Serverless API Functions
│   ├── hero-images.ts                 # Main endpoint
│   └── hero-images/
│       ├── [id].ts                    # Single image operations
│       └── reorder.ts                 # Reorder endpoint
│
├── /components/                       # React Components
│   ├── admin/
│   │   └── HeroImageManager.tsx       # Admin interface
│   └── NewHome.tsx                    # Frontend slideshow
│
├── /utils/                            # Utilities
│   ├── api-config.ts                  # API configuration
│   └── useHeroImages.ts               # React hook
│
├── /docs/                             # Documentation
│   ├── DATABASE_SCHEMA.sql
│   ├── HERO_IMAGES_SETUP.md
│   ├── IMPLEMENTATION_SUMMARY.md
│   ├── QUICK_REFERENCE.md
│   ├── SETUP_CHECKLIST.md
│   ├── ENVIRONMENT_SETUP.md
│   └── ARCHITECTURE.md (this file)
│
└── package.json                       # Dependencies
```

---

## 🔌 API Architecture

### RESTful Design

| Endpoint | Method | Purpose | Auth |
|----------|--------|---------|------|
| `/api/hero-images` | GET | List images | No |
| `/api/hero-images?activeOnly=true` | GET | List active only | No |
| `/api/hero-images` | POST | Create image | Yes* |
| `/api/hero-images/[id]` | GET | Get single | No |
| `/api/hero-images/[id]` | PUT | Update image | Yes* |
| `/api/hero-images/[id]` | PATCH | Toggle visibility | Yes* |
| `/api/hero-images/[id]` | DELETE | Delete image | Yes* |
| `/api/hero-images/reorder` | POST | Reorder images | Yes* |

*Note: Auth is planned but not yet implemented

### Request/Response Flow

```
Client Request
    ↓
API Route Handler (Vercel Serverless Function)
    ↓
Validate Input
    ↓
Connect to Database (@vercel/postgres)
    ↓
Execute SQL Query
    ↓
Transform Data (snake_case → camelCase)
    ↓
Return JSON Response
    ↓
Client Receives Data
```

---

## 🎨 State Management

### Admin Panel State Flow

```
Local State (React)
    ↓
User Action (drag, click, etc.)
    ↓
Optimistic UI Update (immediate feedback)
    ↓
API Call
    ↓
Success? 
  ├─ Yes → Keep optimistic update
  └─ No  → Revert to previous state + show error
```

### Frontend State Flow

```
Component Mount
    ↓
useEffect triggered
    ↓
useHeroImages() hook
    ↓
GET /api/hero-images?activeOnly=true
    ↓
Set loading = true
    ↓
Receive Data
    ↓
Set images state
    ↓
Set loading = false
    ↓
Render Slideshow
```

---

## 🔐 Security Architecture

```
┌─────────────────────────────────────────┐
│         Public Access (No Auth)         │
├─────────────────────────────────────────┤
│ • GET /api/hero-images?activeOnly=true  │
│ • Homepage slideshow                    │
│ • View public content                   │
└─────────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────┐
│      Protected Access (Auth Required)*  │
├─────────────────────────────────────────┤
│ • POST /api/hero-images                 │
│ • PUT /api/hero-images/[id]             │
│ • PATCH /api/hero-images/[id]           │
│ • DELETE /api/hero-images/[id]          │
│ • POST /api/hero-images/reorder         │
│ • Admin panel access                    │
└─────────────────────────────────────────┘

*Note: Auth layer to be implemented
Currently relies on admin panel login
```

---

## ⚡ Performance Optimizations

### Database
- ✅ Indexes on `display_order` and `is_active`
- ✅ Partial index for active images only
- ✅ Connection pooling via Vercel Postgres

### Frontend
- ✅ Lazy loading (images after first slide)
- ✅ React hooks for efficient re-renders
- ✅ Optimistic UI updates
- ✅ Image preloading for slideshow

### API
- ✅ Serverless functions (auto-scaling)
- ✅ SQL query optimization
- ✅ Minimal data transfer (only needed fields)

### Blob Storage
- ✅ CDN-backed delivery
- ✅ Optimized image formats
- ✅ Proper aspect ratios (no client-side resize)

---

## 🔄 Deployment Flow

```
Local Development
    ↓
git push to GitHub
    ↓
Vercel Auto-Deploy (Preview)
    ↓
Run Tests (if configured)
    ↓
Deploy to Preview URL
    ↓
Manual Approval
    ↓
Promote to Production
    ↓
vercel --prod
    ↓
Live on Production Domain
```

### Environment Setup per Stage

| Stage | Database | Blob | Domain |
|-------|----------|------|--------|
| **Development** | Local/Neon | Vercel Blob | localhost:3000 |
| **Preview** | Neon (staging) | Vercel Blob | preview-xxx.vercel.app |
| **Production** | Neon (prod) | Vercel Blob | ybhministries.org |

---

## 📊 Database Schema Visualization

```
hero_images Table
┌──────────────┬──────────────┬─────────────┬──────────┐
│ Column       │ Type         │ Nullable    │ Default  │
├──────────────┼──────────────┼─────────────┼──────────┤
│ id           │ SERIAL       │ NO          │ (auto)   │
│ desktop_url  │ TEXT         │ NO          │ -        │
│ mobile_url   │ TEXT         │ NO          │ -        │
│ alt_text     │ TEXT         │ YES         │ 'Min...' │
│ display_order│ INTEGER      │ NO          │ 0        │
│ is_active    │ BOOLEAN      │ NO          │ true     │
│ created_at   │ TIMESTAMP    │ NO          │ NOW()    │
│ updated_at   │ TIMESTAMP    │ NO          │ NOW()    │
└──────────────┴──────────────┴─────────────┴──────────┘

Indexes:
├─ PRIMARY KEY (id)
├─ idx_hero_images_active_order (display_order, id) WHERE is_active = true
└─ idx_hero_images_order (display_order, id)

Triggers:
└─ update_hero_images_updated_at → update_updated_at_column()
```

---

## 🧩 Technology Stack

```
┌─────────────────────────────────────────────┐
│              Frontend Layer                 │
├─────────────────────────────────────────────┤
│ • React 18                                  │
│ • TypeScript                                │
│ • Tailwind CSS                              │
│ • @dnd-kit (drag-and-drop)                  │
│ • Custom Hooks                              │
└─────────────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────────┐
│                API Layer                    │
├─────────────────────────────────────────────┤
│ • Vercel Serverless Functions               │
│ • RESTful API                               │
│ • TypeScript                                │
│ • CORS enabled                              │
└─────────────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────────┐
│              Database Layer                 │
├─────────────────────────────────────────────┤
│ • Vercel Postgres (Neon)                    │
│ • PostgreSQL 15                             │
│ • Connection Pooling                        │
│ • Automatic Backups                         │
└─────────────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────────┐
│              Storage Layer                  │
├─────────────────────────────────────────────┤
│ • Vercel Blob Storage                       │
│ • CDN Distribution                          │
│ • Public Access                             │
└─────────────────────────────────────────────┘
```

---

This architecture provides a scalable, performant, and maintainable solution for managing hero images dynamically!
