# Admin UI Guide - Home Page Management

## Interface Overview

The Home Page Management section in the Admin Dashboard provides comprehensive tools for managing hero images and videos.

## Layout Structure

```
┌─────────────────────────────────────────────────────────────┐
│  Home Page Management                    [Save Changes]     │
│  Manage hero images, videos, and featured content           │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Ministry Videos                          [+ Add Video]     │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ 🎥 Our Ministry in Action            [Edit]          │  │
│  │    Ministry highlights and testimonies                │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  🖼️ Hero Slideshow Images                24 images         │
│  Manage images for the homepage hero slideshow.  12 active  │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Add New Hero Image                    [+ Add Image] │  │
│  │                                                        │  │
│  │  ⚠️  Upload files directly using the upload buttons   │  │
│  │      below, or paste existing URLs.                   │  │
│  │                                                        │  │
│  │  Desktop Image (16:9)    Mobile Image (9:16)         │  │
│  │  ┌──────────────────┐    ┌──────────────────┐        │  │
│  │  │ [⬆️ Upload]       │    │ [⬆️ Upload]       │        │  │
│  │  │                  │    │                  │        │  │
│  │  │ Or paste URL     │    │ Or paste URL     │        │  │
│  │  │ [____________]   │    │ [____________]   │        │  │
│  │  │                  │    │                  │        │  │
│  │  │ [Preview Image]  │    │ [Preview Image]  │        │  │
│  │  └──────────────────┘    └──────────────────┘        │  │
│  │                                                        │  │
│  │  Alt Text                                             │  │
│  │  [Ministry Hero Image_____________________]           │  │
│  │                                                        │  │
│  │  [Add Hero Image]                                     │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
│  💡 Drag images to reorder them.                            │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ ⋮⋮ [Desktop 16:9]  [Mobile 9:16]    [Active] [⚠️ X]  │  │
│  │    https://...                                        │  │
│  │    [Hide] [Delete]                                    │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ ⋮⋮ [Desktop 16:9]  [Mobile 9:16]  [Inactive] [👁️ ✓]  │  │
│  │    https://...                                        │  │
│  │    [Show] [Delete]                                    │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

## UI Components

### 1. Ministry Videos Section

#### Video Card (View Mode)
```
┌────────────────────────────────────────────────────┐
│ 🎥 Our Ministry in Action              [Edit]     │
│    Ministry highlights and testimonies             │
└────────────────────────────────────────────────────┘
```

#### Video Card (Edit Mode)
```
┌────────────────────────────────────────────────────┐
│ Video Title                                        │
│ [Our Ministry in Action___________________]        │
│                                                    │
│ Video File                                         │
│ [⬆️ Upload Video (MP4)]                            │
│ [https://...blob.vercel-storage.com/video.mp4]     │
│                                                    │
│ Poster Image                                       │
│ [⬆️ Upload Poster Image]                           │
│ [https://...blob.vercel-storage.com/poster.jpg]    │
│ [Preview Image]                                    │
│                                                    │
│ Description                                        │
│ [Ministry highlights and testimonies_____]         │
│                                                    │
│ [Done] [🗑️]                                        │
└────────────────────────────────────────────────────┘
```

### 2. Hero Images Section

#### Add New Hero Image Form (Collapsed)
```
┌────────────────────────────────────────────────────┐
│ Add New Hero Image              [+ Add Image]     │
└────────────────────────────────────────────────────┘
```

#### Add New Hero Image Form (Expanded)
```
┌────────────────────────────────────────────────────┐
│ Add New Hero Image                    [Cancel]    │
│                                                    │
│ ⚠️  Upload files directly using the upload         │
│    buttons below, or paste existing URLs.         │
│    Desktop: 16:9 (1920x1080 recommended)          │
│    Mobile: 9:16 (1080x1920 recommended)           │
│                                                    │
│ Desktop (16:9)          Mobile (9:16)             │
│ ┌────────────────┐      ┌──────────────┐          │
│ │ [⬆️ Upload]     │      │ [⬆️ Upload]   │          │
│ │                │      │              │          │
│ │ [Paste URL]    │      │ [Paste URL]  │          │
│ │ [__________] X │      │ [________] X │          │
│ │                │      │              │          │
│ │ ┌────────────┐ │      │ ┌──────┐    │          │
│ │ │  Preview   │ │      │ │ Prev │    │          │
│ │ │   Image    │ │      │ │ Image│    │          │
│ │ └────────────┘ │      │ └──────┘    │          │
│ └────────────────┘      └──────────────┘          │
│                                                    │
│ Alt Text (for accessibility)                      │
│ [Ministry Hero Image_____________________]         │
│                                                    │
│ [Add Hero Image]                                  │
└────────────────────────────────────────────────────┘
```

#### Hero Image Card
```
┌────────────────────────────────────────────────────┐
│ ⋮⋮                                                 │
│ ┌──────────────┐  ┌────┐                          │
│ │  Desktop     │  │Mob │         [Active]         │
│ │   16:9       │  │9:16│                          │
│ │   Preview    │  │Prev│                          │
│ └──────────────┘  └────┘                          │
│ https://...blob.vercel-storage.com/desktop.jpg     │
│                                                    │
│ [👁️ Hide] [🗑️ Delete]                              │
└────────────────────────────────────────────────────┘
```

Inactive state:
```
┌────────────────────────────────────────────────────┐
│ ⋮⋮                          (Faded/Semi-transparent)│
│ ┌──────────────┐  ┌────┐                          │
│ │  Desktop     │  │Mob │       [Inactive]         │
│ │   16:9       │  │9:16│                          │
│ │   Preview    │  │Prev│                          │
│ └──────────────┘  └────┘                          │
│ https://...blob.vercel-storage.com/desktop.jpg     │
│                                                    │
│ [👁️ Show] [🗑️ Delete]                              │
└────────────────────────────────────────────────────┘
```

## Color Scheme

- **Background:** `#2E2E2E` (Dark gray)
- **Card Background:** `#2E2E2E` with `border-gray-700`
- **Input Background:** `#000000` (Black)
- **Primary Button:** `#FDB813` (Golden yellow)
- **Secondary Button:** `#2E2E2E` with yellow border
- **Text:** White/Gray tones
- **Active Badge:** `#FDB813` background, black text
- **Inactive Badge:** `#6B7280` background, gray text

## Icons

- 🎥 `VideoIcon` - Ministry Videos section
- 🖼️ `ImageIcon` - Hero Images section
- ⬆️ `Upload` - Upload buttons
- 👁️ `Eye` - Show action
- 🚫 `EyeOff` - Hide action
- 🗑️ `Trash2` - Delete action
- ✏️ `Edit2` - Edit action
- ➕ `Plus` - Add action
- ⋮⋮ `GripVertical` - Drag handle
- ⚠️ `AlertCircle` - Alert/warning
- ❌ `X` - Clear/Close

## Interactive States

### Upload Button States

**Normal:**
```
┌──────────────────────┐
│ ⬆️ Upload Desktop     │
└──────────────────────┘
```

**Uploading:**
```
┌──────────────────────┐
│ ⏳ Uploading...       │ (Disabled)
└──────────────────────┘
```

**Success:**
Toast notification appears: ✅ "Desktop image uploaded successfully"

### URL Input States

**Empty:**
```
[Or paste URL here_____________________]
```

**Filled:**
```
[https://...blob.vercel.com/image.jpg_] X
```

**With Clear Button:**
User can click X to clear the URL

### Hero Image Card - Drag State

**Normal:**
```
┌────────────────────────┐
│ ⋮⋮ [Preview]           │
└────────────────────────┘
```

**Dragging:**
```
┌────────────────────────┐
│ ⋮⋮ [Preview]           │ (50% opacity, cursor: grabbing)
└────────────────────────┘
```

**Drop Target:**
Other cards shift to make space

## Workflows

### Workflow 1: Upload New Hero Image

1. Click **[+ Add Image]**
   - Form expands
   - Shows upload buttons

2. Click **[⬆️ Upload Desktop Image]**
   - File picker opens
   - Select image file
   - Button shows "Uploading..."
   - Toast: "Desktop image uploaded successfully"
   - URL field populates
   - Preview appears

3. Click **[⬆️ Upload Mobile Image]**
   - Repeat process
   - Mobile preview appears

4. Enter **Alt Text**
   - Type description
   - E.g., "Ministry worship service"

5. Click **[Add Hero Image]**
   - Form submits
   - Toast: "Hero image added successfully"
   - Form collapses
   - New image appears in list (at bottom)
   - Image is automatically active

### Workflow 2: Reorder Images

1. **Hover** over image card
   - Drag handle (⋮⋮) becomes visible

2. **Click and hold** drag handle
   - Cursor changes to grabbing hand
   - Card becomes semi-transparent

3. **Drag** up or down
   - Other cards shift to make space
   - Drop zone indicators appear

4. **Release** mouse
   - Card drops into new position
   - Toast: "Image order updated"
   - Order saved to database

### Workflow 3: Hide/Show Image

**To Hide:**
1. Click **[Hide]** button
2. Card becomes semi-transparent
3. Badge changes to "Inactive"
4. Button changes to "Show"
5. Toast: "Image disabled"

**To Show:**
1. Click **[Show]** button
2. Card becomes fully visible
3. Badge changes to "Active"
4. Button changes to "Hide"
5. Toast: "Image enabled"

### Workflow 4: Upload Video

1. Click **[+ Add Video]** or **[Edit]**
   - Edit mode activates

2. Enter **Video Title**
   - Type in text field

3. Click **[⬆️ Upload Video (MP4)]**
   - File picker opens
   - Select video file
   - Shows "Uploading Video..."
   - Toast: "Video uploaded successfully"
   - URL field populates

4. Click **[⬆️ Upload Poster Image]**
   - File picker opens
   - Select image file
   - Shows "Uploading Poster..."
   - Toast: "Poster image uploaded successfully"
   - URL populates
   - Preview appears

5. Enter **Description**
   - Type in textarea

6. Click **[Done]**
   - Edit mode closes
   - Video card shows updated info

## Responsive Behavior

### Desktop (> 768px)
- Two-column layout for desktop/mobile images
- Full-width preview images
- Side-by-side action buttons

### Mobile (< 768px)
- Single column layout
- Stacked desktop/mobile upload sections
- Full-width buttons
- Smaller preview images
- Touch-optimized drag handles

## Accessibility Features

- **ARIA Labels:** All buttons have descriptive labels
- **Alt Text:** Required for all images
- **Keyboard Navigation:** Tab through controls
- **Focus Indicators:** Visible focus states
- **Screen Reader Support:** Semantic HTML
- **Color Contrast:** WCAG AA compliant

## Error States

### Upload Failed
```
Toast: ❌ "Failed to upload desktop image"
Button returns to normal state
URL field remains empty
```

### Invalid File Type
```
Toast: ❌ "Please select an image file"
File picker closes
No upload occurs
```

### File Too Large
```
Toast: ❌ "Image size should be less than 10MB"
File picker closes
No upload occurs
```

### Missing Required Fields
```
Toast: ❌ "Both desktop and mobile URLs are required"
Add button disabled
Form remains open
```

## Tips & Best Practices

### For Administrators

1. **Image Sizes:**
   - Desktop: 1920x1080 (16:9)
   - Mobile: 1080x1920 (9:16)
   - Keep under 10MB

2. **Video Files:**
   - Use MP4 format
   - Keep under 100MB
   - Test playback before uploading

3. **Alt Text:**
   - Be descriptive
   - Mention key content
   - Help screen readers

4. **Organization:**
   - Keep only necessary images active
   - Delete unused images
   - Order logically (best first)

5. **Performance:**
   - Optimize images before upload
   - Use appropriate quality
   - Monitor storage usage

## Troubleshooting Quick Reference

| Issue | Solution |
|-------|----------|
| Upload button doesn't work | Check browser console for errors |
| "Server configuration error" | Verify BLOB_READ_WRITE_TOKEN is set |
| Image doesn't show on site | Check if image is marked "Active" |
| Can't reorder images | Need at least 2 images in list |
| Preview doesn't appear | Check URL is valid and accessible |
| Video won't play | Verify MP4 format and file size |

---

**UI Guide Version:** 1.0  
**Last Updated:** November 5, 2025  
**Status:** Complete ✅
