# Hero Images Update Summary

## Changes Implemented

### 1. Removed Title and Description Fields

**Database Schema (`database/schema/home_content.sql`)**:
- Removed `title` and `description` columns from `home_hero_images` table
- Updated INSERT statements to exclude these fields

**Database Utilities (`src/lib/db.ts`)**:
- Updated `HeroImage` interface to remove title and description properties
- Modified `createHeroImage()` to remove title and description parameters
- Updated `updateHeroImage()` to remove title and description from updates object
- Added new `deleteHeroImages()` function for bulk delete operations

**API Routes (`app/api/admin/home/hero-images/route.ts`)**:
- Removed title and description handling from POST endpoint (both file upload and URL submission)
- Updated DELETE endpoint to support bulk delete with `ids` query parameter
- Now supports both single delete (`?id=1`) and bulk delete (`?ids=1,2,3`)

**UI Component (`src/components/admin/HomeContentManager.tsx`)**:
- Removed `imageTitle` and `imageDescription` state variables
- Removed title and description input fields from upload form
- Updated image card display to show "Image #X" instead of title
- Removed title/description from image card display

### 2. Added Bulk Delete Functionality

**Database (`src/lib/db.ts`)**:
```typescript
export async function deleteHeroImages(ids: number[]): Promise<void>
```
- Accepts array of image IDs
- Uses SQL IN clause for efficient bulk deletion

**API (`app/api/admin/home/hero-images/route.ts`)**:
- DELETE endpoint now accepts `ids` query parameter (comma-separated)
- Example: `DELETE /api/admin/home/hero-images?ids=1,2,3`
- Returns count of deleted images in success message

**UI (`src/components/admin/HomeContentManager.tsx`)**:
- Added checkbox to each image card for selection
- Added `selectedImageIds` state to track selected images
- Added "Select All" / "Deselect All" button
- Added "Delete Selected (X)" button that appears when images are selected
- Selection state is cleared after successful delete operation
- Selected images have gold border highlight

**Features**:
- Click checkbox to toggle individual image selection
- Click "Select All" to select/deselect all images at once
- "Delete Selected" button shows count of selected images
- Confirmation dialog before bulk delete
- Toast notifications for success/error messages

## Migration Instructions

If you have an existing database with the old schema, run this migration:

```sql
-- Remove title and description columns
ALTER TABLE home_hero_images DROP COLUMN IF EXISTS title;
ALTER TABLE home_hero_images DROP COLUMN IF EXISTS description;
```

Migration file located at: `database/migrations/remove_hero_image_title_description.sql`

## UI Updates

**Before**:
- Image cards showed title and description
- Upload form had title and description input fields
- Could only delete images one at a time

**After**:
- Image cards show "Image #X" with display order
- Upload form is cleaner with no title/description fields
- Checkbox on each image for bulk selection
- "Select All" and "Delete Selected" buttons
- Gold border on selected images
- Can delete multiple images in one operation

## Testing Checklist

- [x] Upload single image file
- [x] Upload multiple image files
- [x] Add images via URL
- [x] Select individual images via checkbox
- [x] Select all images
- [x] Deselect all images
- [x] Delete single image
- [x] Delete multiple images
- [x] Verify selection clears after delete
- [x] Verify error handling

## API Changes Summary

### POST /api/admin/home/hero-images
**Before**:
```typescript
{ files, title?, description? }  // File upload
{ urls, title?, description? }   // URL submission
```

**After**:
```typescript
{ files }        // File upload
{ urls }         // URL submission
```

### DELETE /api/admin/home/hero-images
**Before**:
```
?id=1  // Single delete only
```

**After**:
```
?id=1         // Single delete
?ids=1,2,3    // Bulk delete
```

## Files Modified

1. `database/schema/home_content.sql` - Removed columns from schema
2. `src/lib/db.ts` - Updated interfaces and added bulk delete
3. `app/api/admin/home/hero-images/route.ts` - Updated API endpoints
4. `src/components/admin/HomeContentManager.tsx` - Updated UI

## Files Created

1. `database/migrations/remove_hero_image_title_description.sql` - Migration script
