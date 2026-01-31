# Events Translation Implementation Guide

## Current Implementation (Phase 1 - Completed ✅)

### What's Working Now
The events system now supports **partial translation** for Telugu language:

1. **Translated Elements:**
   - Event types (conference, class, record attempt)
   - Common locations (Online, Hyderabad)
   - All UI labels and buttons
   - Date and time formats

2. **Non-Translated Elements:**
   - Event titles (from database)
   - Event descriptions (from database)
   - Speaker names (from database)
   - What to bring items (from database)

### Technical Implementation

#### Translation Files Updated
- `src/i18n/locales/en/news.ts` - Added event type and location translations
- `src/i18n/locales/te/news.ts` - Added Telugu translations for types and locations
- `src/components/newsroom/NewsPage.tsx` - Added `translateEvent()` helper function

#### Translation Helper Function
```typescript
const translateEvent = (event: any, t: any, currentLanguage: string) => {
  if (currentLanguage === 'en') return event;
  
  return {
    ...event,
    typeLabel: t(`news:events.types.${event.type}`),
    locationLabel: event.location.toLowerCase() === 'online'
      ? t('news:events.locations.online')
      : event.location.toLowerCase() === 'hyderabad'
      ? t('news:events.locations.hyderabad')
      : event.location
  };
};
```

---

## Future Enhancement (Phase 2 - Optional)

### Full Database Translation Support

To support **complete Telugu content** (titles, descriptions, speakers), you need to modify the database schema:

#### Step 1: Update Database Schema

**Option A: JSONB Column (Recommended)**
```sql
-- Add translation column to events table
ALTER TABLE events 
ADD COLUMN translations JSONB DEFAULT '{}'::jsonb;

-- Update existing event with Telugu translations
UPDATE events 
SET translations = '{
  "te": {
    "title": "గిన్నిస్ వరల్డ్ రికార్డ్ ప్రయత్నం-2",
    "description": "గిన్నిస్ వరల్డ్ రికార్డ్ యొక్క 2వ ప్రయత్నంలో మాతో చేరండి",
    "extendedDescription": "ఇది గిన్నిస్ వరల్డ్ రికార్డ్‌లో మా రెండవ ప్రయత్నం...",
    "speakers": ["పాస్టర్ అగస్టిన్ దండింగి", "మాస్టర్ చార్లీ ఆరోన్ బెనెడిక్ట్"],
    "whatToBring": ["కీ బోర్డ్", "కీ బోర్డ్ స్టాండ్", "స్మార్ట్ ఫోన్"]
  }
}'::jsonb
WHERE id = 1;

-- Create index for performance
CREATE INDEX idx_events_translations ON events USING GIN (translations);
```

**Option B: Separate Columns**
```sql
-- Add Telugu-specific columns
ALTER TABLE events 
ADD COLUMN title_te VARCHAR(255),
ADD COLUMN description_te TEXT,
ADD COLUMN extended_description_te TEXT,
ADD COLUMN speakers_te TEXT[],
ADD COLUMN what_to_bring_te TEXT[];
```

#### Step 2: Update API Routes

**File: `app/api/events/route.ts`**
```typescript
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const language = searchParams.get('lang') || 'en';
  
  try {
    const result = await sql`
      SELECT 
        id,
        title,
        date,
        time,
        location,
        type,
        description,
        extended_description as "extendedDescription",
        capacity,
        image_url as "imageUrl",
        speakers,
        what_to_bring as "whatToBring",
        translations,
        registration_enabled as "registrationEnabled",
        registration_description as "registrationDescription",
        national_fee as "nationalFee",
        international_fee as "internationalFee",
        registration_fee as "registrationFee",
        published
      FROM events
      WHERE date >= CURRENT_DATE 
        AND published = true
      ORDER BY date ASC
    `;

    const events = result.rows.map(row => {
      const baseEvent = {
        id: row.id.toString(),
        title: row.title,
        description: row.description,
        extendedDescription: row.extendedDescription,
        speakers: row.speakers || [],
        whatToBring: row.whatToBring || [],
        // ... other fields
      };

      // Apply translations if language is Telugu
      if (language === 'te' && row.translations?.te) {
        const teTranslations = row.translations.te;
        return {
          ...baseEvent,
          title: teTranslations.title || baseEvent.title,
          description: teTranslations.description || baseEvent.description,
          extendedDescription: teTranslations.extendedDescription || baseEvent.extendedDescription,
          speakers: teTranslations.speakers || baseEvent.speakers,
          whatToBring: teTranslations.whatToBring || baseEvent.whatToBring,
        };
      }

      return baseEvent;
    });

    return NextResponse.json({ 
      success: true, 
      data: events,
      count: events.length 
    });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch events' },
      { status: 500 }
    );
  }
}
```

#### Step 3: Update Frontend Data Fetching

**File: `src/components/newsroom/NewsPage.tsx`**
```typescript
useEffect(() => {
  const fetchEvents = async () => {
    try {
      setIsLoadingEvents(true);
      // Pass current language to API
      const response = await fetch(`/api/events?lang=${i18n.language}`);
      const data = await response.json();
      
      if (data.success) {
        setEvents(data.data);
      }
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setIsLoadingEvents(false);
    }
  };

  fetchEvents();
}, [i18n.language]); // Re-fetch when language changes
```

#### Step 4: Update Admin Interface

**File: `src/components/admin/NewsManager.tsx`**

Add Telugu input fields for each text field:

```typescript
// Add state for Telugu translations
const [teluguTranslations, setTeluguTranslations] = useState({
  title: '',
  description: '',
  extendedDescription: '',
  speakers: [],
  whatToBring: []
});

// In the form JSX, add Telugu fields
<div className="space-y-4">
  <h3 className="font-semibold text-lg">English Content</h3>
  
  <div>
    <label className="block text-sm font-medium mb-2">Title (English)</label>
    <input
      type="text"
      value={editingEvent.title}
      onChange={(e) => setEditingEvent({...editingEvent, title: e.target.value})}
      className="w-full bg-[#1a1a1a] border border-gray-700 rounded-md px-4 py-2"
    />
  </div>

  <h3 className="font-semibold text-lg mt-6">Telugu Translation (తెలుగు అనువాదం)</h3>
  
  <div>
    <label className="block text-sm font-medium mb-2">Title (Telugu)</label>
    <input
      type="text"
      value={teluguTranslations.title}
      onChange={(e) => setTeluguTranslations({...teluguTranslations, title: e.target.value})}
      className="w-full bg-[#1a1a1a] border border-gray-700 rounded-md px-4 py-2"
      placeholder="శీర్షిక"
    />
  </div>
  
  {/* Add similar fields for description, extendedDescription, etc. */}
</div>
```

#### Step 5: Update Save Handler in Admin

```typescript
const handleSave = async () => {
  try {
    const eventData = {
      ...editingEvent,
      translations: {
        te: {
          title: teluguTranslations.title || editingEvent.title,
          description: teluguTranslations.description || editingEvent.description,
          extendedDescription: teluguTranslations.extendedDescription || editingEvent.extendedDescription,
          speakers: teluguTranslations.speakers.length > 0 ? teluguTranslations.speakers : editingEvent.speakers,
          whatToBring: teluguTranslations.whatToBring.length > 0 ? teluguTranslations.whatToBring : editingEvent.whatToBring,
        }
      }
    };

    const response = await fetch('/api/admin/events', {
      method: isNewEvent ? 'POST' : 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(eventData),
    });

    // ... handle response
  } catch (error) {
    console.error('Error saving event:', error);
  }
};
```

---

## Testing Phase 2 Implementation

### 1. Test Database Update
```sql
-- Verify translations column exists
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'events' 
  AND column_name = 'translations';

-- Verify data is stored correctly
SELECT id, title, translations->'te'->>'title' as title_te 
FROM events 
WHERE id = 1;
```

### 2. Test API Endpoint
```bash
# Test English
curl http://localhost:3000/api/events?lang=en

# Test Telugu
curl http://localhost:3000/api/events?lang=te
```

### 3. Test Frontend
1. Open website in browser
2. Switch language to Telugu
3. Navigate to News page
4. Verify event titles/descriptions show in Telugu
5. Switch back to English and verify English content

---

## Migration Strategy

### For Existing Events in Production

```sql
-- Step 1: Add translations column (safe, non-breaking)
ALTER TABLE events ADD COLUMN IF NOT EXISTS translations JSONB DEFAULT '{}'::jsonb;

-- Step 2: Manually update high-priority events
UPDATE events 
SET translations = '{
  "te": {
    "title": "<Telugu title>",
    "description": "<Telugu description>",
    "extendedDescription": "<Telugu extended description>",
    "speakers": ["<Telugu speaker 1>", "<Telugu speaker 2>"],
    "whatToBring": ["<Telugu item 1>", "<Telugu item 2>"]
  }
}'::jsonb
WHERE id IN (1, 2, 3); -- Update specific event IDs

-- Step 3: Monitor and add translations for new events via admin interface
```

---

## Benefits of Phase 2 Implementation

✅ **Full Telugu Support** - Complete event content in Telugu  
✅ **Better SEO** - Telugu content indexed by search engines  
✅ **Improved UX** - Telugu speakers get native language experience  
✅ **Scalable** - Easy to add more languages (Hindi, Tamil, etc.)  
✅ **Flexible** - Can mix English and Telugu content as needed  
✅ **Backward Compatible** - Falls back to English if Telugu not available  

---

## Current Workaround (Until Phase 2)

For urgent Telugu events, you can:

1. **Create separate events** with Telugu titles in the database
2. **Use English transliteration** in titles (e.g., "Guinness World Records Prayatnam-2")
3. **Add Telugu in descriptions** as mixed content
4. **Use images with Telugu text** for posters

---

## Estimated Effort for Phase 2

- **Database Changes**: 30 minutes
- **API Updates**: 1-2 hours
- **Admin Interface**: 3-4 hours
- **Frontend Updates**: 1 hour
- **Testing**: 2 hours
- **Total**: 1 working day

---

## Questions?

Contact the development team or refer to:
- Translation docs: `src/i18n/README.md`
- Database schema: `database/schema/events.sql`
- API documentation: `app/api/events/README.md`
