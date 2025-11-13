import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { navigate } from '../utils/navigate';
import { getUpcomingEvents, formatEventDate, Event } from '../utils/eventsData';

export function EventScrollBanner() {
  const { t, i18n } = useTranslation('home');
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);

  useEffect(() => {
    const loadEvents = async () => {
      const events = await getUpcomingEvents(5);
      setUpcomingEvents(events);
    };
    loadEvents();
  }, []);

  // If no upcoming events, don't render the banner
  if (upcomingEvents.length === 0) {
    return null;
  }

  const handleBannerClick = () => {
    navigate('/news?section=upcoming-events');
  };

  // Calculate animation duration based on number of events
  // Base duration per event to maintain consistent speed
  const baseSpeedPerEvent = 10; // seconds per event (slower speed)
  const animationDuration = upcomingEvents.length * baseSpeedPerEvent;

  return (
    <div 
      className="absolute bottom-0 left-0 right-0 z-30 cursor-pointer group"
      onClick={handleBannerClick}
      role="button"
      tabIndex={0}
      aria-label={t('eventBanner.ariaLabel')}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleBannerClick();
        }
      }}
    >
      {/* Semi-transparent banner with golden top border */}
      <div className="bg-black/70 backdrop-blur-sm border-t-2 border-[#FDB813] overflow-hidden">
        {/* Scrolling container */}
        <div className="py-4">
          <div className="scroll-container">
            <div className="scroll-content" style={{ animationDuration: `${animationDuration}s` }}>
              {/* First set of events */}
              {upcomingEvents.map((event, index) => (
                <div 
                  key={`event-1-${index}`} 
                  className="event-item"
                >
                  {/* Event Name */}
                  <div className="text-white font-semibold text-base">
                    {event.title}
                  </div>
                  
                  {/* Date */}
                  <div className="text-[#FDB813] text-sm">
                    {formatEventDate(event.date, i18n.language)}
                  </div>
                  
                  {/* Location */}
                  <div className="text-gray-300 text-sm">
                    {event.location}
                  </div>
                  
                  {/* Click for more details */}
                  <div className="text-gray-400 text-xs italic group-hover:text-[#FDB813] transition-colors">
                    {t('eventBanner.clickForDetails')}
                  </div>
                </div>
              ))}
              
              {/* Second set of events (duplicate for seamless loop) */}
              {upcomingEvents.map((event, index) => (
                <div 
                  key={`event-2-${index}`} 
                  className="event-item"
                >
                  {/* Event Name */}
                  <div className="text-white font-semibold text-base">
                    {event.title}
                  </div>
                  
                  {/* Date */}
                  <div className="text-[#FDB813] text-sm">
                    {formatEventDate(event.date, i18n.language)}
                  </div>
                  
                  {/* Location */}
                  <div className="text-gray-300 text-sm">
                    {event.location}
                  </div>
                  
                  {/* Click for more details */}
                  <div className="text-gray-400 text-xs italic group-hover:text-[#FDB813] transition-colors">
                    {t('eventBanner.clickForDetails')}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CSS for scroll animation */}
      <style jsx>{`
        .scroll-container {
          display: flex;
          width: 100%;
          overflow: hidden;
        }

        .scroll-content {
          display: flex;
          gap: 3rem;
          white-space: nowrap;
          animation: scroll-left linear infinite;
          will-change: transform;
        }

        .event-item {
          display: inline-flex;
          flex-direction: column;
          gap: 0.25rem;
          padding: 0 1rem;
          flex-shrink: 0;
        }

        @keyframes scroll-left {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        /* Pause animation on hover */
        .group:hover .scroll-content {
          animation-play-state: paused;
        }

        /* Pause animation on reduced motion preference */
        @media (prefers-reduced-motion: reduce) {
          .scroll-content {
            animation: none;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
}
