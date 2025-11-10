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

export const EVENTS: Event[] = [
  { 
    id: 1, 
    title: "Guinness World Record Attempt-2", 
    date: "2025-12-1", 
    type: "record",
    description: "Join us for the 2nd attempt of the Guinness World Record",
    location: "Online",
    time: "9:00 AM - 5:00 PM",
    speakers: ["Ps. Augustine Dandingi", "Master Charlie Aaron Benedict Dandingi", "Master Nancy Augustina Dandingi"],
    capacity: "Unlimited",
    extendedDescription: "This is our second attempt at the Guinness World Record, aiming to break the first Guinness World Record that we previously achieved.",
    whatToBring: ["Key Board","Key Board Stand","Smart Phone with Internet","HMS - Song Book"],
    imageUrl: "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/News/GWR2/GWR-2%20-%20Poster.jpg", // Add your custom image URL here
    registration: {
      enabled: true,
      description: "Register early to secure your spot for this event.",
      nationalFee: 5500,
      internationalFee: 7000,
      registrationFee: 600
    }
  },
];

/**
 * Get upcoming events sorted by date (soonest first)
 * @param limit - Maximum number of events to return
 * @returns Array of upcoming events
 */
export function getUpcomingEvents(limit: number = 5): Event[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  return EVENTS
    .filter(event => new Date(event.date) >= today)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, limit);
}

/**
 * Format event date for display
 * @param dateString - ISO date string
 * @param locale - Locale for formatting (default: 'en')
 * @returns Formatted date string
 */
export function formatEventDate(dateString: string, locale: string = 'en'): string {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  };
  
  return date.toLocaleDateString(locale === 'te' ? 'te-IN' : 'en-US', options);
}
