# Ministries Cache Fix

## Problem
When hiding a ministry through the admin panel, the database was updated correctly but the main website continued showing the hidden ministry for up to 5 minutes.

## Root Cause
The public ministries API (`/api/ministries/route.ts`) has caching enabled:
- `revalidate = 300` (5 minutes)
- `Cache-Control: public, s-maxage=300, stale-while-revalidate=600`

When the admin API updates the `is_active` field in the database, the cache was not being invalidated, causing stale data to be served.

## Solution
Added cache invalidation in the admin API (`/app/api/admin/ministries/route.ts`):

```typescript
import { revalidatePath } from 'next/cache';

// After successful database update in PUT handler:
revalidatePath('/api/ministries');    // Invalidate API cache
revalidatePath('/ministries');         // Invalidate page cache
```

## How It Works
1. Admin toggles ministry visibility → calls PUT `/api/admin/ministries`
2. Database is updated with new `is_active` value
3. `revalidatePath()` immediately invalidates Next.js cache
4. Next request to `/api/ministries` fetches fresh data from database
5. Website immediately reflects the change

## Testing
1. Go to admin panel: `/admin`
2. Toggle a ministry's visibility (hide/show)
3. Go to main website ministries page: `/ministries`
4. Verify the tab appears/disappears immediately

## Files Modified
- `app/api/admin/ministries/route.ts` - Added `revalidatePath` import and cache invalidation

## Related Files
- `app/api/ministries/route.ts` - Public API with caching (unchanged)
- `src/components/ministries/MinistriesPage.tsx` - Frontend component (unchanged)
- `src/components/admin/MinistriesManager.tsx` - Admin UI (unchanged)
