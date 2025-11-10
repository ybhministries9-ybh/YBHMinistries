# Admin Video Upload Constraint

## Single Video Limitation

The Home Page Management section now enforces a **single video constraint** for the "Our Ministry in Action" section.

## Changes Implemented

### 1. Add Video Button Visibility
- **Hidden when video exists:** The "Add Video" button is now hidden when a video is already present
- **Visible when empty:** The button appears only when there are no videos

### 2. User Interface Updates

#### When No Video Exists
```
┌──────────────────────────────────────────────┐
│  Ministry Videos                             │
│  Only one video is supported. Add your       │
│  ministry video.                             │
│                                              │
│  ┌──────────────────────────────────────┐   │
│  │         🎥                            │   │
│  │    No Video Added                     │   │
│  │                                       │   │
│  │    Add your ministry video to         │   │
│  │    showcase on the homepage.          │   │
│  │                                       │   │
│  │    [+ Add Ministry Video]             │   │
│  └──────────────────────────────────────┘   │
└──────────────────────────────────────────────┘
```

#### When Video Exists
```
┌──────────────────────────────────────────────┐
│  Ministry Videos                             │
│  Only one video is supported. Edit or        │
│  delete the existing video to change it.     │
│                                              │
│  ┌──────────────────────────────────────┐   │
│  │ 🎥 Our Ministry in Action   [Edit]   │   │
│  │    Ministry highlights and testimonies│   │
│  └──────────────────────────────────────┘   │
└──────────────────────────────────────────────┘
```

### 3. Informative Messages

**Header Description:**
- When video exists: "Only one video is supported. Edit or delete the existing video to change it."
- When no video: "Only one video is supported. Add your ministry video."

**Empty State:**
- Shows video icon placeholder
- Clear call-to-action
- Explanatory text

### 4. Delete Confirmation
Updated delete confirmation message:
```
"Are you sure you want to delete this video? You can add a new video after deletion."
```

This reminds users they can add a replacement video after deletion.

## User Workflows

### Add First Video
1. Navigate to Admin Dashboard → Home Page Management
2. See empty state with "No Video Added"
3. Click **"Add Ministry Video"** button
4. Fill in video details (title, upload file, poster, description)
5. Click **"Done"**
6. Video appears in the list
7. **"Add Video"** button is now hidden

### Replace Existing Video
1. See existing video in the list
2. Notice **"Add Video"** button is hidden
3. Click **"Edit"** on the existing video
4. Update video details or upload new files
5. Click **"Done"** to save changes

**OR**

1. Click **"Delete"** on the existing video
2. Confirm deletion
3. Empty state appears again
4. **"Add Ministry Video"** button is now visible
5. Click to add a new video

### Edit Video Details
1. Click **"Edit"** on the video card
2. Modify title, description, or upload new files
3. Click **"Done"** to save
4. Changes are reflected immediately

## Technical Implementation

### Code Changes in `HomeManager.tsx`

#### Button Visibility Logic
```typescript
{videos.length === 0 && (
  <Button
    onClick={handleAddVideo}
    className="bg-[#2E2E2E] hover:bg-[#3E3E3E] text-white border border-[#FDB813]"
  >
    <Plus size={16} className="mr-2" />
    Add Video
  </Button>
)}
```

#### Empty State Rendering
```typescript
{videos.length === 0 ? (
  <div className="bg-[#2E2E2E] p-8 rounded-lg border border-gray-700">
    <div className="flex flex-col items-center justify-center text-center">
      <VideoIcon size={48} className="text-gray-600 mb-3" />
      <h4 className="text-white mb-2">No Video Added</h4>
      <p className="text-gray-400 text-sm mb-4">
        Add your ministry video to showcase on the homepage.
      </p>
      <Button
        onClick={handleAddVideo}
        className="bg-[#FDB813] hover:bg-[#e5a610] text-black"
      >
        <Plus size={16} className="mr-2" />
        Add Ministry Video
      </Button>
    </div>
  </div>
) : (
  // Render video cards
)}
```

#### Dynamic Header Message
```typescript
<p className="text-sm text-gray-400 mt-1">
  Only one video is supported. {videos.length > 0 
    ? 'Edit or delete the existing video to change it.' 
    : 'Add your ministry video.'
  }
</p>
```

## Benefits

### 1. Clearer User Intent
- Users immediately understand only one video is allowed
- No confusion about adding multiple videos
- Clear instructions on how to change the video

### 2. Better UX
- Empty state provides clear call-to-action
- Button visibility matches system state
- Informative messages guide user actions

### 3. Prevents Errors
- Cannot accidentally add multiple videos
- Clear workflow for replacement
- Confirmation on deletion

### 4. Consistent with Requirements
- Enforces business rule (single video)
- Matches design specifications
- Aligns with Home page implementation

## Comparison: Before vs After

### Before
```
✗ "Add Video" button always visible
✗ Could add multiple videos (confusing)
✗ No guidance on video limit
✗ No empty state feedback
```

### After
```
✓ "Add Video" button only shows when needed
✓ Cannot add multiple videos (enforced)
✓ Clear messaging about single video limit
✓ Helpful empty state with call-to-action
```

## Future Enhancements

Potential improvements:
- [ ] Replace video in single action (upload new = auto-delete old)
- [ ] Preview video in admin panel
- [ ] Video metadata (duration, file size, format)
- [ ] Video compression recommendations
- [ ] Thumbnail selection from video frames
- [ ] Multiple videos with selection (mark one as featured)

## Testing Checklist

- [x] Add first video - button appears in empty state
- [x] Add video - button disappears after adding
- [x] Edit video - changes save correctly
- [x] Delete video - button reappears after deletion
- [x] Delete confirmation - mentions ability to add new video
- [x] Messages update - based on video presence
- [x] Empty state - displays correctly
- [x] Responsive design - works on mobile/desktop

## Related Documentation

- **Admin File Upload:** `/ADMIN_FILE_UPLOAD.md`
- **Admin Setup Guide:** `/ADMIN_SETUP_GUIDE.md`
- **Admin UI Guide:** `/ADMIN_UI_GUIDE.md`
- **Implementation Complete:** `/IMPLEMENTATION_COMPLETE.md`

## Notes

- This constraint only applies to the admin interface
- The Home page still supports displaying the single video
- Video data is currently stored in component state
- Consider persisting to database for production use

---

**Last Updated:** November 5, 2025  
**Status:** Complete ✅  
**Constraint:** Single video only
