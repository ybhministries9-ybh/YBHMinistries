# Event Scroll Display Options for Hero Image

## ✅ CURRENTLY IMPLEMENTED: OPTION 1 - Bottom Semi-Transparent Banner

### Custom Implementation Details:
- **Event Layout:** Each event displays in 4 lines:
  - Line 1: Event Name (white, bold)
  - Line 2: Date (gold #FDB813)
  - Line 3: Location (gray)
  - Line 4: "Click for more details" (italic, gray, turns gold on hover)
- **Position:** Anchored to the absolute bottom of the hero image
- **Animation:** Right-to-left continuous scroll (40s loop)
- **Interaction:** Entire banner is clickable, navigates to News Page → Upcoming Events tab
- **Styling:** Semi-transparent black background (70% opacity) with gold top border

## Overview
Display the latest 5 upcoming events from the News Page on the Home Page hero image carousel. When clicked, users will be redirected to the Upcoming Events section of the News Page.

---

## Option 1: Bottom Semi-Transparent Banner
**Visual Style:** Clean and modern with minimal obstruction

### Design Details:
- **Position:** Fixed at bottom of hero section (above navigation dots)
- **Height:** 60-80px
- **Background:** Semi-transparent black with 70% opacity (`bg-black/70`)
- **Border:** Top border with gold accent (#FDB813)
- **Content Display:**
  ```
  📅 [Event Title] • [Date] • [Location]
  ```
- **Animation:** Continuous right-to-left scroll (ticker style)
- **Hover Effect:** Pauses animation, increases opacity to 90%, shows cursor pointer
- **Visibility:** ~15% of hero image height

### Pros:
- Minimal image obstruction
- Clear separation from main content
- Familiar news ticker pattern
- Works well on mobile

### Cons:
- Limited vertical space for text
- May need marquee animation for long text

---

## Option 2: Vertical Right Sidebar Ticker
**Visual Style:** Modern sidebar notification panel

### Design Details:
- **Position:** Fixed on right side of hero section
- **Width:** 280-320px on desktop, 200px on tablet, full-width bottom on mobile
- **Background:** Semi-transparent dark gradient (`bg-gradient-to-l from-black/80 to-transparent`)
- **Content Display:**
  ```
  📆 Event Title
  📍 Location
  🕒 Date & Time
  [Small gold separator line]
  ```
- **Animation:** Vertical scroll (bottom to top), cycling through events
- **Hover Effect:** Stops scrolling, expands slightly, shows "View All Events" button
- **Visibility:** ~20% of hero image width on desktop

### Pros:
- More space for event details
- Doesn't cover central focus of images
- Can show more information per event
- Elegant fade-in/fade-out transitions

### Cons:
- Takes up more screen real estate
- May not work well on narrow screens
- Could obscure right-side image content

---

## Option 3: Top Notification Bar
**Visual Style:** Subtle alert banner style

### Design Details:
- **Position:** Top of hero section (below header, above image carousel)
- **Height:** 45-50px
- **Background:** Solid dark background (`bg-[#2E2E2E]`) with gold left border (4px)
- **Content Display:**
  ```
  🎉 UPCOMING: [Event Title] - [Date] | 👉 View All Events
  ```
- **Animation:** Horizontal scroll right-to-left, seamless loop
- **Styling:** 
  - Event titles in white
  - Dates in gold (#FDB813)
  - Separator dots in gold
- **Hover Effect:** Slight scale effect, gold glow
- **Visibility:** ~5-6% of hero image height

### Pros:
- Extremely minimal image obstruction
- Clear call-to-action
- Doesn't interfere with navigation dots
- Professional announcement banner look

### Cons:
- Very limited space for details
- May blend with header on some screens
- Shows only one event at a time clearly

---

## Option 4: Floating Card Carousel
**Visual Style:** Modern card-based interface

### Design Details:
- **Position:** Bottom-left corner of hero section, 20px margins
- **Size:** 320px x 140px cards
- **Background:** Frosted glass effect (`backdrop-blur-md bg-white/10`)
- **Border:** 1px gold border with rounded corners (12px radius)
- **Content Display:**
  ```
  [Gold calendar icon]
  Event Title (Bold)
  📍 Location • 🕒 Time
  [Date in gold badge]
  ```
- **Animation:** Horizontal card carousel, auto-advance every 4 seconds
- **Navigation:** Small dots below card, prev/next arrows on hover
- **Hover Effect:** Card scales up (1.05), shows full event description
- **Visibility:** ~25% of bottom-left corner

### Pros:
- Most visually appealing
- Rich information display
- Card metaphor is familiar
- Great hover interactions
- Can show event thumbnails/icons

### Cons:
- Highest image obstruction
- More complex implementation
- May be too prominent on smaller screens
- Requires careful positioning to avoid key image elements

---

## Recommended Option

### **Option 1: Bottom Semi-Transparent Banner** 
**Reasoning:**
1. ✅ Minimal obstruction of hero images (most important requirement)
2. ✅ Provides sufficient space for key event information
3. ✅ Works perfectly across all device sizes
4. ✅ Familiar pattern (news ticker) - users understand it immediately
5. ✅ Continuous animation creates engaging movement
6. ✅ Easy to implement with CSS animations
7. ✅ Doesn't compete with navigation dots
8. ✅ Professional and polished appearance

---

## Technical Implementation Notes

### Common Features (All Options):
- Click anywhere on the scroll element → Navigate to `/news?section=upcoming-events`
- Fetch latest 5 events from `EVENTS` array, sorted by date
- Format dates using i18n locale (supports English & Telugu)
- Pause animation on hover for better readability
- Smooth CSS transitions for all interactions
- Responsive design with mobile-first approach
- Accessibility: 
  - Proper ARIA labels
  - Keyboard navigation support
  - Screen reader announcements
  - Reduced motion support for accessibility preferences

### Animation:
- Use CSS `@keyframes` for smooth 60fps performance
- Duration: ~30-40 seconds for complete scroll cycle
- Easing: Linear for continuous scroll
- Infinite loop with seamless restart

### Data Structure:
```typescript
interface UpcomingEvent {
  id: number;
  title: string;
  date: string;
  location: string;
  time: string;
  type: 'conference' | 'class';
}
```

### Mobile Considerations:
- Stack information vertically on screens < 640px
- Reduce font sizes appropriately
- Maintain touch-friendly tap targets (min 44px)
- Consider reducing number of displayed events to 3 on mobile

---

## Next Steps

1. Choose preferred option
2. Create reusable `EventScrollBanner` component
3. Integrate with existing `Home.tsx` hero section
4. Connect to `EVENTS` data from `NewsPage.tsx` (or shared data source)
5. Implement click handler to navigate to News Page → Upcoming Events
6. Add translations to i18n files
7. Test responsiveness across devices
8. Verify accessibility compliance

---

## Visual Preview Concept (ASCII)

### Option 1 - Bottom Banner:
```
┌───────────────────────────────────────┐
│                                       │
│          [HERO IMAGE]                 │
│                                       │
│              • • •                    │ ← Navigation dots
├───────────────────────────────────────┤
│ 📅 Worship Conf... → 📅 Songwrit...  │ ← Scrolling banner
└───────────────────────────────────────┘
```

### Option 2 - Right Sidebar:
```
┌─────────────────────────────┬────────┐
│                             │📆 Event│
│      [HERO IMAGE]           │📍 Loc. │
│                             │🕒 Date │
│         • • •               │────────│
└─────────────────────────────┴────────┘
```

### Option 3 - Top Bar:
```
┌───────────────────────────────────────┐
│ 🎉 UPCOMING: Event → Event → Event   │ ← Top banner
├───────────────────────────────────────┤
│                                       │
│          [HERO IMAGE]                 │
│              • • •                    │
└───────────────────────────────────────┘
```

### Option 4 - Floating Card:
```
┌───────────────────────────────────────┐
│                                       │
│          [HERO IMAGE]                 │
│                          • • •        │
│┌────────┐                             │
││📅 Event│                             │ ← Floating card
││Details │                             │
│└────────┘                             │
└───────────────────────────────────────┘
```
