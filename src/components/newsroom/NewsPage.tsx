"use client";

import { useState, useRef, useEffect, useMemo, useCallback, memo } from "react";
import { Calendar, FileText, ChevronRight, Plus, Users, Music, Globe, BookOpen, X, Clock, MapPin, Calendar as CalendarIcon, User, Clock as ClockIcon, ArrowRight, ArrowLeft, MessageSquare, Star, Medal, Mic, UserCheck, BarChart3 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { EVENTS } from "../../utils/eventsData";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer, LabelList } from 'recharts';

// Enhanced enrollment data with Indian/Non-Indian breakdown by month
const ENROLLMENT_DATA = {
  2023: {
    keyboard: [
      { month: "January", indian: 32, nonIndian: 8, total: 40 },
      { month: "February", indian: 34, nonIndian: 9, total: 43 },
      { month: "March", indian: 36, nonIndian: 9, total: 45 },
      { month: "April", indian: 38, nonIndian: 10, total: 48 },
      { month: "May", indian: 40, nonIndian: 12, total: 52 },
      { month: "June", indian: 40, nonIndian: 12, total: 52 },
      { month: "July", indian: 38, nonIndian: 12, total: 50 },
      { month: "August", indian: 36, nonIndian: 10, total: 46 },
      { month: "September", indian: 38, nonIndian: 10, total: 48 },
      { month: "October", indian: 39, nonIndian: 11, total: 50 },
      { month: "November", indian: 41, nonIndian: 12, total: 53 },
      { month: "December", indian: 43, nonIndian: 12, total: 55 }
    ],
    guitar: [
      { month: "January", indian: 28, nonIndian: 6, total: 34 },
      { month: "February", indian: 30, nonIndian: 7, total: 37 },
      { month: "March", indian: 31, nonIndian: 7, total: 38 },
      { month: "April", indian: 32, nonIndian: 8, total: 40 },
      { month: "May", indian: 34, nonIndian: 8, total: 42 },
      { month: "June", indian: 34, nonIndian: 8, total: 42 },
      { month: "July", indian: 36, nonIndian: 10, total: 46 },
      { month: "August", indian: 38, nonIndian: 11, total: 49 },
      { month: "September", indian: 39, nonIndian: 11, total: 50 },
      { month: "October", indian: 40, nonIndian: 12, total: 52 },
      { month: "November", indian: 41, nonIndian: 12, total: 53 },
      { month: "December", indian: 43, nonIndian: 13, total: 56 }
    ],
    lcm: [
      { month: "January", indian: 20, nonIndian: 5, total: 25 },
      { month: "February", indian: 22, nonIndian: 6, total: 28 },
      { month: "March", indian: 24, nonIndian: 6, total: 30 },
      { month: "April", indian: 26, nonIndian: 7, total: 33 },
      { month: "May", indian: 28, nonIndian: 7, total: 35 },
      { month: "June", indian: 30, nonIndian: 8, total: 38 },
      { month: "July", indian: 32, nonIndian: 8, total: 40 },
      { month: "August", indian: 34, nonIndian: 9, total: 43 },
      { month: "September", indian: 36, nonIndian: 9, total: 45 },
      { month: "October", indian: 38, nonIndian: 10, total: 48 },
      { month: "November", indian: 40, nonIndian: 10, total: 50 },
      { month: "December", indian: 42, nonIndian: 11, total: 53 }
    ]
  },
  2022: {
    keyboard: [
      { month: "January", indian: 25, nonIndian: 5, total: 30 },
      { month: "February", indian: 27, nonIndian: 6, total: 33 },
      { month: "March", indian: 29, nonIndian: 6, total: 35 },
      { month: "April", indian: 30, nonIndian: 7, total: 37 },
      { month: "May", indian: 32, nonIndian: 8, total: 40 },
      { month: "June", indian: 34, nonIndian: 8, total: 42 },
      { month: "July", indian: 36, nonIndian: 9, total: 45 },
      { month: "August", indian: 34, nonIndian: 8, total: 42 },
      { month: "September", indian: 32, nonIndian: 8, total: 40 },
      { month: "October", indian: 34, nonIndian: 9, total: 43 },
      { month: "November", indian: 36, nonIndian: 9, total: 45 },
      { month: "December", indian: 38, nonIndian: 10, total: 48 }
    ],
    guitar: [
      { month: "January", indian: 20, nonIndian: 5, total: 25 },
      { month: "February", indian: 22, nonIndian: 6, total: 28 },
      { month: "March", indian: 24, nonIndian: 6, total: 30 },
      { month: "April", indian: 26, nonIndian: 7, total: 33 },
      { month: "May", indian: 28, nonIndian: 7, total: 35 },
      { month: "June", indian: 30, nonIndian: 8, total: 38 },
      { month: "July", indian: 32, nonIndian: 8, total: 40 },
      { month: "August", indian: 30, nonIndian: 7, total: 37 },
      { month: "September", indian: 28, nonIndian: 7, total: 35 },
      { month: "October", indian: 30, nonIndian: 8, total: 38 },
      { month: "November", indian: 32, nonIndian: 8, total: 40 },
      { month: "December", indian: 34, nonIndian: 8, total: 42 }
    ],
    lcm: [
      { month: "January", indian: 15, nonIndian: 3, total: 18 },
      { month: "February", indian: 17, nonIndian: 4, total: 21 },
      { month: "March", indian: 19, nonIndian: 4, total: 23 },
      { month: "April", indian: 21, nonIndian: 5, total: 26 },
      { month: "May", indian: 23, nonIndian: 6, total: 29 },
      { month: "June", indian: 25, nonIndian: 6, total: 31 },
      { month: "July", indian: 27, nonIndian: 7, total: 34 },
      { month: "August", indian: 29, nonIndian: 7, total: 36 },
      { month: "September", indian: 28, nonIndian: 7, total: 35 },
      { month: "October", indian: 26, nonIndian: 6, total: 32 },
      { month: "November", indian: 28, nonIndian: 7, total: 35 },
      { month: "December", indian: 30, nonIndian: 8, total: 38 }
    ]
  }
};


// Memoized Event Card Component with Integrated Date
const EventCard = memo(({ event, onViewDetails, t }: { event: any; onViewDetails: (event: any) => void; t: any }) => {
  // Parse event date to get month and day
  const eventDate = new Date(event.date);
  const month = eventDate.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
  const day = eventDate.getDate();

  return (
    <div 
      onClick={() => onViewDetails(event)}
      className="bg-[#2E2E2E] rounded-lg flex overflow-hidden hover:bg-[#3a3a3a] transition-all cursor-pointer shadow-md group"
    >
      {/* Date Column */}
      <div className="bg-[#1a1a1a] flex flex-col items-center justify-center px-4 py-6 min-w-[80px]">
        <div className="text-[10px] text-gray-400 tracking-wider mb-1">
          {month}
        </div>
        <div className="text-4xl font-bold text-white">
          {day}
        </div>
      </div>

      {/* Yellow Separator */}
      <div className="w-1 bg-[#FDB813]"></div>

      {/* Event Content */}
      <div className="flex-1 p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex-1">
          <h4 className="font-semibold text-lg mb-3 text-white">{event.title}</h4>
          
          <div className="flex flex-wrap items-center gap-4 mb-3 text-sm text-gray-400">
            <div className="flex items-center">
              <Clock size={14} className="mr-1.5 flex-shrink-0" />
              <span>{event.time} {t('news:events.timezone')}</span>
            </div>
            <div className="flex items-center">
              <MapPin size={14} className="mr-1.5 flex-shrink-0" />
              <span>{event.location}</span>
            </div>
          </div>
          
          <p className="text-gray-400 text-sm line-clamp-2">
            {event.description}
          </p>
        </div>

        {/* View Details Button */}
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onViewDetails(event);
          }}
          className="bg-[#FDB813] text-black px-6 py-2.5 rounded-md font-semibold flex items-center justify-center gap-2 hover:bg-[#e5a711] transition-colors whitespace-nowrap flex-shrink-0 w-full md:w-auto"
        >
          {t('news:events.viewDetails')}
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
});

EventCard.displayName = "EventCard";



// Main Component
export function NewsPage() {
  const { t } = useTranslation(['news', 'common']);
  const [activeTab, setActiveTab] = useState("events");
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [viewMode, setViewMode] = useState('list');
  const [selectedReportYear, setSelectedReportYear] = useState(2023);
  const [selectedClassType, setSelectedClassType] = useState('keyboard');
  
  const EVENTS_PER_PAGE = 10;
  const timelineRef = useRef(null);
  
  // Handle URL query parameter to open upcoming events tab
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const section = urlParams.get('section');
    const eventId = urlParams.get('eventId');
    
    if (section === 'upcoming-events') {
      setActiveTab('events');
      setViewMode('list');
      
      // If eventId is provided, show that event's details
      if (eventId) {
        const event = EVENTS.find(e => e.id === parseInt(eventId));
        if (event) {
          setTimeout(() => {
            handleViewDetails(event);
          }, 100);
        }
      } else {
        // Scroll to upcoming events section after a short delay
        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 100);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  


  // Memoize calculation functions
  const calculateYearlyTotals = useCallback((year: number, classType: string) => {
    const data = ENROLLMENT_DATA[year][classType];
    return data.reduce((acc, month) => ({
      indian: acc.indian + month.indian,
      nonIndian: acc.nonIndian + month.nonIndian,
      total: acc.total + month.total
    }), { indian: 0, nonIndian: 0, total: 0 });
  }, []);

  const getMaxEnrollment = useCallback((year: number, classType: string) => {
    const data = ENROLLMENT_DATA[year][classType];
    return Math.max(...data.map(month => month.total));
  }, []);

  const getPeakAndMinMonth = useCallback((year: number, classType: string) => {
    const data = ENROLLMENT_DATA[year][classType];
    const peakMonth = data.reduce((max, month) => 
      month.total > max.total ? month : max, data[0]);
    const minMonth = data.reduce((min, month) => 
      month.total < min.total ? month : min, data[0]);
    return { peakMonth, minMonth };
  }, []);

  // Pagination handlers
  const goToNextPage = useCallback(() => {
    setCurrentPage(prev => prev + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const goToPreviousPage = useCallback(() => {
    setCurrentPage(prev => Math.max(0, prev - 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleViewDetails = useCallback((event: any) => {
    setSelectedEvent(event);
    setViewMode('detail');
    window.scrollTo(0, 0);
  }, []);

  const goBackToList = useCallback(() => {
    setViewMode('list');
    setSelectedEvent(null);
  }, []);

  const handleContactClick = useCallback(() => {
    alert("Navigating to contact page");
  }, []);

  // Memoize all events sorted by date
  const allEvents = useMemo(() => 
    EVENTS
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()),
    []
  );

  // Calculate paginated events
  const paginatedEvents = useMemo(() => {
    const startIndex = currentPage * EVENTS_PER_PAGE;
    const endIndex = startIndex + EVENTS_PER_PAGE;
    return allEvents.slice(startIndex, endIndex);
  }, [allEvents, currentPage]);

  // Calculate total pages
  const totalPages = Math.ceil(allEvents.length / EVENTS_PER_PAGE);
  const hasNextPage = currentPage < totalPages - 1;
  const hasPreviousPage = currentPage > 0;



  // Memoize date formatting functions
  const formatDate = useCallback((dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
  }, []);

  const formatDay = useCallback((dateString: string) => {
    const date = new Date(dateString);
    return date.getDate();
  }, []);





  // Memoize Event Details View
  const renderEventDetails = useMemo(() => {
    if (!selectedEvent) return null;
    
    return (
      <div className="w-full">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Side - Sticky Image and Registration Card */}
            <div className="lg:w-80 flex-shrink-0">
              <div className="lg:sticky lg:top-36 space-y-6">
                {selectedEvent.imageUrl && (
                  <img 
                    src={selectedEvent.imageUrl} 
                    alt={selectedEvent.title}
                    className="w-full h-auto rounded-xl"
                  />
                )}
                
                {/* Registration Card */}
                {selectedEvent.registration?.enabled && (
                  <div className="p-5 bg-[#1a1a1a] rounded-xl">
                    <h3 className="font-semibold text-lg mb-2 text-[#FDB813]">{t('news:events.registration')}</h3>
                    <p className="text-gray-300 text-sm mb-6">
                      {selectedEvent.registration.description || t('news:events.registerEarly')}
                    </p>
                    
                    {selectedEvent.registration.nationalFee && (
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-gray-400">National:</span>
                        <span className="text-lg font-bold">₹{selectedEvent.registration.nationalFee.toLocaleString()}</span>
                      </div>
                    )}
                    
                    {selectedEvent.registration.internationalFee && (
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-gray-400">International:</span>
                        <span className="text-lg font-bold">₹{selectedEvent.registration.internationalFee.toLocaleString()}</span>
                      </div>
                    )}
                    
                    {selectedEvent.registration.registrationFee && (
                      <p className="text-xs text-gray-400 mb-4 pb-4 border-b border-gray-700">
                        (Registration Fee ₹{selectedEvent.registration.registrationFee.toLocaleString()} included)
                      </p>
                    )}
                    
                    <button className="w-full bg-[#FDB813] text-black py-3 rounded-md font-medium hover:bg-opacity-90 transition-colors text-center cursor-pointer">
                      {t('news:events.enrollNow')}
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Right Side - Main Content */}
            <div className="flex-1">
            {/* Main Content */}
            <div>
              {/* Hero Header Section */}
              <header className="relative py-5">
                <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a1a] to-transparent opacity-50 rounded-xl"></div>
                
                <div className="relative z-10 px-6">
                  <h1 className="text-3xl md:text-4xl font-bold mb-6">{selectedEvent.title}</h1>
                  
                  <div className="flex flex-wrap gap-x-8 gap-y-3 text-gray-200">
                    <div className="flex items-center">
                      <CalendarIcon size={18} className="text-[#FDB813] mr-2" />
                      <span className="text-lg">{new Date(selectedEvent.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    </div>
                    
                    <div className="flex items-center">
                      <ClockIcon size={18} className="text-[#FDB813] mr-2" />
                      <span className="text-lg">{selectedEvent.time} {t('news:events.timezone')}</span>
                    </div>
                    
                    <div className="flex items-center">
                      <MapPin size={18} className="text-[#FDB813] mr-2" />
                      <span className="text-lg">{selectedEvent.location}</span>
                    </div>
                  </div>
                </div>
              </header>

              <div className="px-6">
                <div className="mt-3 mb-6">
                  <div className="border-t border-[#2E2E2E] mb-6 w-full" />
                  <h3 className="text-xl font-semibold mb-4 inline-flex items-center">
                    <span className="w-1 h-6 bg-[#FDB813] rounded mr-3"></span>
                    {t('news:events.eventDescription')}
                  </h3>
                  <p className="text-gray-200 leading-relaxed mb-6">{selectedEvent.extendedDescription}</p>
                  
                  <div className="inline-flex items-center px-4 py-2 bg-[#1a1a1a] rounded-md">
                    <Users size={18} className="text-[#FDB813] mr-2" />
                    <span className="text-gray-300">
                      {t('news:events.maxCapacity')} {selectedEvent.capacity}
                      {typeof selectedEvent.capacity === 'number' && ` ${t('news:events.attendees')}`}
                    </span>
                  </div>
                </div>

                {selectedEvent.speakers && selectedEvent.speakers.length > 0 && (
                  <div className="mb-10">
                    <h3 className="text-xl font-semibold mb-4 inline-flex items-center">
                      <span className="w-1 h-6 bg-[#FDB813] rounded mr-3"></span>
                      {t('news:events.speakers')}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {selectedEvent.speakers.map((speaker, idx) => (
                        <div key={idx} className="flex items-center bg-[#1a1a1a] p-3 rounded-md">
                          <User size={20} className="text-[#FDB813] mr-3" />
                          <span>{speaker}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {selectedEvent.whatToBring && selectedEvent.whatToBring.length > 0 && (
                  <div className="mb-10 pb-10 border-b border-gray-800">
                    <h3 className="text-xl font-semibold mb-4 inline-flex items-center">
                      <span className="w-1 h-6 bg-[#FDB813] rounded mr-3"></span>
                      {t('news:events.whatToBring')}
                    </h3>
                    <ul className="list-none space-y-2 text-gray-300">
                      {selectedEvent.whatToBring.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <div className="w-6 h-6 rounded-full bg-[#1a1a1a] flex items-center justify-center mr-3 mt-0.5">
                            <div className="w-2 h-2 bg-[#FDB813] rounded-full"></div>
                          </div>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                <div className="flex justify-start items-center mt-6">
                  <button 
                    onClick={handleContactClick} 
                    className="text-white flex items-center gap-2 hover:text-[#FDB813] transition-colors cursor-pointer"
                  >
                    <MessageSquare size={20} />
                    <span>{t('news:events.needHelp')}</span>
                  </button>
                </div>
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    );
  }, [selectedEvent, handleContactClick]);

  return (
    <div className="min-h-full w-full bg-black text-white font-sans pt-16 md:pt-34">
      {/* Tabs */}
      <div className="w-full bg-black p-4">
        <div className="max-w-6xl mx-auto flex flex-wrap justify-center gap-2 md:gap-3">
          <button 
            className={`px-4 md:px-6 py-2 rounded-full flex items-center gap-2 text-xs md:text-sm font-semibold transition-colors focus:outline-none cursor-pointer ${activeTab === 'events' ? 'bg-[#FDB813] text-black shadow-md ring-2 ring-offset-2 ring-[#FDB813]' : 'bg-[#2E2E2E] text-white hover:bg-[#FDB813] hover:text-black focus:ring-2 focus:ring-offset-2 focus:ring-[#FDB813]'}`}
            onClick={() => {
              setActiveTab('events');
              setViewMode('list');
              setSelectedEvent(null);
            }}
            aria-selected={activeTab === 'events'}
            role="tab"
          >
            <Calendar size={16} className="md:w-5 md:h-5" />
            <span>{t('news:tabs.upcomingEvents')}</span>
          </button>
          <button 
            className={`px-4 md:px-6 py-2 rounded-full flex items-center gap-2 text-xs md:text-sm font-semibold transition-colors focus:outline-none cursor-pointer ${activeTab === 'reports' ? 'bg-[#FDB813] text-black shadow-md ring-2 ring-offset-2 ring-[#FDB813]' : 'bg-[#2E2E2E] text-white hover:bg-[#FDB813] hover:text-black focus:ring-2 focus:ring-offset-2 focus:ring-[#FDB813]'}`}
            onClick={() => {
              setActiveTab('reports');
              setViewMode('list');
              setSelectedEvent(null);
            }}
            aria-selected={activeTab === 'reports'}
            role="tab"
          >
            <FileText size={16} className="md:w-5 md:h-5" />
            <span>{t('news:tabs.yearlyReports')}</span>
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="max-w-6xl mx-auto px-3 md:px-6 py-4 md:py-6">
        {/* Upcoming Events Tab */}
        {activeTab === 'events' && (
          <>
            {viewMode === 'list' ? (
              <div className="space-y-4">
                <div className="text-center mb-8">
                  <h2 className="text-3xl md:text-4xl text-white mb-4">{t('news:events.title')}</h2>
                  <div className="w-24 h-1 mx-auto rounded-full bg-[#FDB813]"></div>
                </div>

                {/* Events List */}
                {paginatedEvents.length > 0 ? (
                  <>
                    <div 
                      ref={timelineRef}
                      className="space-y-3 mt-1.5"
                    >
                      {paginatedEvents.map((event) => (
                        <div key={event.id} id={`event-${event.id}`}>
                          <EventCard event={event} onViewDetails={handleViewDetails} t={t} />
                        </div>
                      ))}
                    </div>

                    {/* Pagination Controls */}
                    {totalPages > 1 && (
                      <div className="flex justify-center items-center gap-4 mt-6">
                        <button 
                          onClick={goToPreviousPage}
                          disabled={!hasPreviousPage}
                          className={`p-3 rounded-full transition-colors ${
                            hasPreviousPage 
                              ? 'bg-[#2E2E2E] hover:bg-[#FDB813] hover:text-black cursor-pointer' 
                              : 'bg-[#1a1a1a] text-gray-600 cursor-not-allowed'
                          }`}
                        >
                          <ArrowLeft size={24} />
                        </button>
                        
                        <span className="text-gray-400">
                          Page {currentPage + 1} of {totalPages}
                        </span>
                        
                        <button 
                          onClick={goToNextPage}
                          disabled={!hasNextPage}
                          className={`p-3 rounded-full transition-colors ${
                            hasNextPage 
                              ? 'bg-[#2E2E2E] hover:bg-[#FDB813] hover:text-black cursor-pointer' 
                              : 'bg-[#1a1a1a] text-gray-600 cursor-not-allowed'
                          }`}
                        >
                          <ArrowRight size={24} />
                        </button>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-center py-12 bg-[#2E2E2E] rounded-lg">
                    <Calendar size={48} className="mx-auto text-gray-600 mb-4" />
                    <p className="text-gray-400 text-lg">No events available</p>
                  </div>
                )}
              </div>
            ) : (
              <>
                {renderEventDetails}
              </>
            )}
          </>
        )}

        {/* Yearly Reports Tab */}
        {activeTab === 'reports' && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl text-white mb-4">{t('news:reports.title')}</h2>
              <div className="w-24 h-1 mx-auto rounded-full bg-[#FDB813]"></div>
            </div>
            
            {/* Year & Class Type Selector */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium mb-2">{t('news:reports.selectYear')}</label>
                <select 
                  value={selectedReportYear}
                  onChange={(e) => setSelectedReportYear(Number(e.target.value))}
                  className="w-full bg-[#2E2E2E] border border-gray-700 rounded-md px-4 py-2 text-white cursor-pointer"
                >
                  <option value={2023}>2023</option>
                  <option value={2022}>2022</option>
                </select>
              </div>
              
              <div className="flex-1">
                <label className="block text-sm font-medium mb-2">{t('news:reports.selectClassType')}</label>
                <select 
                  value={selectedClassType}
                  onChange={(e) => setSelectedClassType(e.target.value)}
                  className="w-full bg-[#2E2E2E] border border-gray-700 rounded-md px-4 py-2 text-white cursor-pointer"
                >
                  <option value="keyboard">{t('news:reports.classTypes.keyboard')}</option>
                  <option value="guitar">{t('news:reports.classTypes.guitar')}</option>
                  <option value="lcm">{t('news:reports.classTypes.lcm')}</option>
                </select>
              </div>
            </div>

            {/* Monthly Enrollment Chart */}
            <div className="bg-[#2E2E2E] p-4 md:p-6 rounded-md">
              <h3 className="text-xl font-semibold mb-4">{t('news:reports.monthlyDistribution')}</h3>
              
              {/* Chart Container */}
              <div className="w-full overflow-x-auto">
                <ResponsiveContainer width="100%" height={400} minWidth={300}>
                  <BarChart
                    data={ENROLLMENT_DATA[selectedReportYear][selectedClassType]}
                    margin={{ top: 20, right: 10, left: 0, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                    <XAxis 
                      dataKey="month" 
                      stroke="#9CA3AF"
                      tick={{ fill: '#9CA3AF', fontSize: 12 }}
                      tickFormatter={(value) => {
                        // Show abbreviated month names on mobile
                        const isMobile = window.innerWidth < 768;
                        return isMobile ? value.substring(0, 3) : value;
                      }}
                    />
                    <YAxis 
                      stroke="#9CA3AF"
                      tick={{ fill: '#9CA3AF', fontSize: 12 }}
                      label={{ 
                        value: t('news:reports.studentsCount'), 
                        angle: -90, 
                        position: 'insideLeft',
                        style: { fill: '#9CA3AF', fontSize: 14 }
                      }}
                    />
                    <Legend 
                      wrapperStyle={{ paddingTop: '20px' }}
                      formatter={(value: string) => {
                        return value === 'indian' 
                          ? t('news:reports.legend.nationalStudents')
                          : t('news:reports.legend.internationalStudents');
                      }}
                      iconType="square"
                    />
                    <Bar 
                      dataKey="indian" 
                      stackId="a" 
                      fill="#FDB813" 
                      radius={[0, 0, 4, 4]}
                      name="indian"
                      activeBar={false}
                    >
                      <LabelList 
                        dataKey="indian" 
                        position="center"
                        style={{ 
                          fill: '#000000', 
                          fontSize: '13px', 
                          fontWeight: '600'
                        }}
                        formatter={(value: number) => value > 0 ? value : ''}
                      />
                    </Bar>
                    <Bar 
                      dataKey="nonIndian" 
                      stackId="a" 
                      fill="#FF6B6B" 
                      radius={[4, 4, 0, 0]}
                      name="nonIndian"
                      activeBar={false}
                    >
                      <LabelList 
                        dataKey="nonIndian" 
                        position="center"
                        style={{ 
                          fill: '#FFFFFF', 
                          fontSize: '13px', 
                          fontWeight: '600'
                        }}
                        formatter={(value: number) => value > 0 ? value : ''}
                      />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            {/* Annual Overview */}
            <div className="bg-black p-6 rounded-md mb-6">
              <h4 className="font-medium text-lg mb-4 flex items-center">
                <BarChart3 size={20} className="text-[#FDB813] mr-2" />
                {t('news:reports.annualOverview')}
              </h4>
              
              {(() => {
                const totals = calculateYearlyTotals(selectedReportYear, selectedClassType);
                const { peakMonth, minMonth } = getPeakAndMinMonth(selectedReportYear, selectedClassType);
                
                return (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Total stats */}
                    <div className="space-y-4">
                      <div>
                        <h5 className="text-lg font-medium mb-2">{t('news:reports.totalStats')}</h5>
                        <div className="bg-[#1a1a1a] p-4 rounded-md">
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-gray-300">{t('news:reports.totalStudents')}</span>
                            <span className="text-xl font-semibold">{totals.total}</span>
                          </div>
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-gray-300">{t('news:reports.nationalStudents')}</span>
                            <span className="text-xl font-semibold text-[#FDB813]">{totals.indian}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-300">{t('news:reports.internationalStudents')}</span>
                            <span className="text-xl font-semibold text-[#FF6B6B]">{totals.nonIndian}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Peak stats */}
                    <div className="space-y-4">
                      <div>
                        <h5 className="text-lg font-medium mb-2">{t('news:reports.peakPerformance')}</h5>
                        <div className="bg-[#1a1a1a] p-4 rounded-md mb-3">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-gray-300">{t('news:reports.highestMonth')}</span>
                            <span className="text-lg font-semibold text-green-400">{peakMonth.month}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-300">{t('news:reports.enrollment')}</span>
                            <span className="text-lg font-semibold">{peakMonth.total} {t('news:reports.students')}</span>
                          </div>
                        </div>
                        
                        <div className="bg-[#1a1a1a] p-4 rounded-md">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-gray-300">{t('news:reports.lowestMonth')}</span>
                            <span className="text-lg font-semibold text-orange-400">{minMonth.month}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-300">{t('news:reports.enrollment')}</span>
                            <span className="text-lg font-semibold">{minMonth.total} {t('news:reports.students')}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        )}


      </div>
    </div>
  );
}
