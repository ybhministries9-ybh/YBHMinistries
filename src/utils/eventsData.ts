// Shared events data for use across the application
export interface Event {
  id: number;
  title: string;
  date: string;
  type: 'conference' | 'class' | 'record';
  description: string;
  location: string;
  time: string;
  speakers: string[];
  capacity: number | string;
  extendedDescription: string;
  whatToBring: string[];
  imageUrl?: string; // Custom image URL for each event
  registration?: {
    enabled: boolean;
    description?: string;
    nationalFee?: number;
    internationalFee?: number;
    registrationFee?: number;
  };
}

// Fallback data when API is not available
const R2_BASE = process.env.NEXT_PUBLIC_R2_PUBLIC_URL || '';

const FALLBACK_EVENTS: Event[] = [
  { 
    id: 1, 
    title: "Guinness World Records Attempt-2", 
    date: "2025-12-1", 
    type: "record",
    description: "Join us for the 2nd attempt of the Guinness World Record",
    location: "Online",
    time: "9:00 AM - 5:00 PM",
    speakers: ["Ps. Augustine Dandingi", "Master Charlie Aaron Benedict Dandingi", "Master Nancy Augustina Dandingi"],
    capacity: "Unlimited",
    extendedDescription: "This is our second attempt at the Guinness World Record, aiming to break the first Guinness World Records that we previously achieved.",
    whatToBring: ["Key Board","Key Board Stand","Smart Phone with Internet","HMS - Song Book"],
    imageUrl: `${R2_BASE}/News/GWR2/GWR-2%20-%20Poster.jpg`,
    registration: {
      enabled: true,
      description: "Register early to secure your spot for this event.",
      nationalFee: 5500,
      internationalFee: 7000,
      registrationFee: 600
    }
  },
];

// In-memory cache for events
let eventsCache: Event[] | null = null;
let cacheTimestamp: number = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

/**
 * Fetch events from the database API
 * @returns Promise<Event[]> Array of events from database
 */
import { logger } from '@/lib/logger';

async function fetchEventsFromAPI(): Promise<Event[]> {
  try {
    const response = await fetch('/api/events');
    const result = await response.json();
    
    if (result.success && Array.isArray(result.data)) {
      return result.data;
    }
    
    logger.warn('Failed to fetch events from API, using fallback data');
    return FALLBACK_EVENTS;
  } catch (error) {
    logger.error('Error fetching events', error);
    return FALLBACK_EVENTS;
  }
}

/**
 * Get all events with caching
 * @returns Promise<Event[]> Array of all events
 */
export async function getEvents(): Promise<Event[]> {
  const now = Date.now();
  
  // Return cached data if still valid
  if (eventsCache && (now - cacheTimestamp) < CACHE_DURATION) {
    return eventsCache;
  }
  
  // Fetch fresh data
  eventsCache = await fetchEventsFromAPI();
  cacheTimestamp = now;
  
  return eventsCache;
}

/**
 * Fetch a single event by id from the API (public).
 * Falls back to cached events or fallback data if API doesn't return the event.
 */
export async function getEventById(id: number): Promise<Event | null> {
  try {
    const resp = await fetch(`/api/events/${id}`);
    if (resp.ok) {
      const json = await resp.json();
      if (json && json.success && json.data) return json.data as Event;
    }
  } catch (e) {
    // ignore
  }

  // Fallback: look up in cached events or fallback list
  try {
    const all = await getEvents();
    const found = all.find(ev => ev.id === id);
    return found || null;
  } catch (e) {
    return null;
  }
}

/**
 * Get upcoming events sorted by date (soonest first)
 * @param limit - Maximum number of events to return
 * @returns Promise<Event[]> Array of upcoming events
 */
export async function getUpcomingEvents(limit: number = 5): Promise<Event[]> {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const allEvents = await getEvents();
  
  // Helper function to parse date string as local time
  const parseLocalDate = (dateString: string): Date => {
    const [year, month, day] = dateString.split('-').map(Number);
    return new Date(year, month - 1, day);
  };
  
  return allEvents
    .filter(event => parseLocalDate(event.date) >= today)
    .sort((a, b) => parseLocalDate(a.date).getTime() - parseLocalDate(b.date).getTime())
    .slice(0, limit);
}

/**
 * Clear the events cache (useful after admin updates)
 */
export function clearEventsCache(): void {
  eventsCache = null;
  cacheTimestamp = 0;
}

/**
 * Format event date for display
 * @param dateString - ISO date string (YYYY-MM-DD)
 * @param locale - Locale for formatting (default: 'en')
 * @returns Formatted date string
 */
export function formatEventDate(dateString: string, locale: string = 'en'): string {
  // Parse date as local time to avoid timezone shifts
  // Split the date string and create date in local timezone
  const [year, month, day] = dateString.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  
  const options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric'
  };
  
  return date.toLocaleDateString(locale === 'te' ? 'te-IN' : 'en-US', options);
}
