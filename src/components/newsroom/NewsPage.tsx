"use client";

import { useState, useRef, useEffect, useMemo, useCallback, memo } from "react";
import { Calendar, FileText, ChevronRight, Plus, Users, Music, Globe, BookOpen, X, Clock, MapPin, Calendar as CalendarIcon, User, Clock as ClockIcon, ArrowRight, ArrowLeft, MessageSquare, Star, Medal, Mic, UserCheck, BarChart3 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { getEvents, type Event } from "../../utils/eventsData";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer, LabelList } from 'recharts';

// Helper function to parse date string correctly (avoiding timezone issues)
const parseLocalDate = (dateString: string): Date => {
  const [year, month, day] = dateString.split('-').map(Number);
  return new Date(year, month - 1, day);
};

// Memoized Event Card Component with Integrated Date
// Translation helper for event data
const translateEvent = (event: any, t: any, currentLanguage: string) => {
  if (currentLanguage === 'en') return event;
  
  // For Telugu, keep original English data but can be extended
  // Note: Event content from DB is in English, type and location can be translated
  return {
    ...event,
    // Keep title, description, extendedDescription as-is (from DB)
    // Translate type if needed
    typeLabel: event.type === 'conference' 
      ? t('news:events.types.conference')
      : event.type === 'class'
      ? t('news:events.types.class')
      : event.type === 'record'
      ? t('news:events.types.record')
      : event.type,
    // Translate common locations
    locationLabel: event.location.toLowerCase() === 'online'
      ? t('news:events.locations.online')
      : event.location.toLowerCase() === 'hyderabad'
      ? t('news:events.locations.hyderabad')
      : event.location
  };
};

const EventCard = memo(({ event, onViewDetails, t }: { event: any; onViewDetails: (event: any) => void; t: any }) => {
  // Parse event date to get month and day
  const eventDate = parseLocalDate(event.date);
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
              <span>{event.locationLabel || event.location}</span>
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
  const { t, i18n } = useTranslation(['news', 'common']);
  const [activeTab, setActiveTab] = useState("events");
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [viewMode, setViewMode] = useState('list');
  const [selectedReportYear, setSelectedReportYear] = useState(2023);
  const [selectedClassType, setSelectedClassType] = useState('keyboard');
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoadingEvents, setIsLoadingEvents] = useState(true);
  const [enrollmentData, setEnrollmentData] = useState<any>({});
  const [isLoadingReports, setIsLoadingReports] = useState(true);
  
  const EVENTS_PER_PAGE = 10;
  const timelineRef = useRef(null);

  // Fetch events from the database
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setIsLoadingEvents(true);
        const fetchedEvents = await getEvents();
        setEvents(fetchedEvents);
      } catch (error) {
        console.error('Error fetching events:', error);
        setEvents([]);
      } finally {
        setIsLoadingEvents(false);
      }
    };
    fetchEvents();
  }, []);

  // Fetch reports from the database with memoized month normalization
  useEffect(() => {
    const allMonths = ['January', 'February', 'March', 'April', 'May', 'June', 
                       'July', 'August', 'September', 'October', 'November', 'December'];
    
    const fetchReports = async () => {
      try {
        setIsLoadingReports(true);
        const response = await fetch('/api/reports', { 
          next: { revalidate: 60 } // Cache on client side for 60 seconds
        });
        const result = await response.json();
        
        if (result.success && result.data && Object.keys(result.data).length > 0) {
          // Ensure all months are present in the data
          const normalizedData: Record<string, Record<string, any[]>> = {};
          
          Object.keys(result.data).forEach(year => {
            normalizedData[year] = {};
            Object.keys(result.data[year]).forEach(classType => {
              const existingData = result.data[year][classType];
              const monthMap = new Map(existingData.map((item: any) => [item.month, item]));
              
              // Ensure all 12 months exist with default values
              normalizedData[year][classType] = allMonths.map(month => 
                monthMap.get(month) || { month, indian: 0, nonIndian: 0, total: 0 }
              );
            });
          });
          
          setEnrollmentData(normalizedData);
          
          // Set initial year to the most recent year available
          const years = Object.keys(normalizedData).map(Number).sort((a, b) => b - a);
          if (years.length > 0) {
            setSelectedReportYear(years[0]);
            const classTypes = Object.keys(normalizedData[years[0]]);
            if (classTypes.length > 0) {
              setSelectedClassType(classTypes[0]);
            }
          }
        } else {
          setEnrollmentData({});
        }
      } catch (error) {
        console.error('Error fetching reports:', error);
        setEnrollmentData({});
      } finally {
        setIsLoadingReports(false);
      }
    };
    fetchReports();
  }, []);

  // Update class type when year changes to ensure it exists for that year
  useEffect(() => {
    if (enrollmentData[selectedReportYear]) {
      const availableClassTypes = Object.keys(enrollmentData[selectedReportYear]);
      if (availableClassTypes.length > 0 && !availableClassTypes.includes(selectedClassType)) {
        setSelectedClassType(availableClassTypes[0]);
      }
    }
  }, [selectedReportYear, enrollmentData, selectedClassType]);
  
  // Handle URL query parameter to open upcoming events tab
  useEffect(() => {
    if (isLoadingEvents || events.length === 0) return;
    
    const urlParams = new URLSearchParams(window.location.search);
    const section = urlParams.get('section');
    const eventId = urlParams.get('eventId');
    
    if (section === 'upcoming-events') {
      setActiveTab('events');
      setViewMode('list');
      
      // If eventId is provided, show that event's details
      if (eventId) {
        const event = events.find(e => e.id === parseInt(eventId));
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
  }, [events, isLoadingEvents]);
  


  // Memoize calculation functions
  const calculateYearlyTotals = useCallback((year: number, classType: string) => {
    if (!enrollmentData[year] || !enrollmentData[year][classType]) return { indian: 0, nonIndian: 0, total: 0 };
    const data = enrollmentData[year][classType];
    return data.reduce((acc, month) => ({
      indian: acc.indian + month.indian,
      nonIndian: acc.nonIndian + month.nonIndian,
      total: acc.total + month.total
    }), { indian: 0, nonIndian: 0, total: 0 });
  }, [enrollmentData]);

  const getMaxEnrollment = useCallback((year: number, classType: string) => {
    if (!enrollmentData[year] || !enrollmentData[year][classType]) return 0;
    const data = enrollmentData[year][classType];
    return Math.max(...data.map(month => month.total));
  }, [enrollmentData]);

  const getPeakAndMinMonth = useCallback((year: number, classType: string) => {
    if (!enrollmentData[year] || !enrollmentData[year][classType]) return { peakMonth: null, minMonth: null };
    const data = enrollmentData[year][classType];
    const peakMonth = data.reduce((max, month) => 
      month.total > max.total ? month : max, data[0]);
    const minMonth = data.reduce((min, month) => 
      month.total < min.total ? month : min, data[0]);
    return { peakMonth, minMonth };
  }, [enrollmentData]);

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

  // Memoize all events sorted by date with translation applied
  const allEvents = useMemo(() => 
    events
      .sort((a, b) => parseLocalDate(a.date).getTime() - parseLocalDate(b.date).getTime())
      .map(event => translateEvent(event, t, i18n.language)),
    [events, t, i18n.language]
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
    const date = parseLocalDate(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
  }, []);

  const formatDay = useCallback((dateString: string) => {
    const date = parseLocalDate(dateString);
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
                      <span className="text-lg">{parseLocalDate(selectedEvent.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    </div>
                    
                    <div className="flex items-center">
                      <ClockIcon size={18} className="text-[#FDB813] mr-2" />
                      <span className="text-lg">{selectedEvent.time} {t('news:events.timezone')}</span>
                    </div>
                    
                    <div className="flex items-center">
                      <MapPin size={18} className="text-[#FDB813] mr-2" />
                      <span className="text-lg">{selectedEvent.locationLabel || selectedEvent.location}</span>
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

                {/* Loading State */}
                {isLoadingEvents ? (
                  <div className="text-center py-12">
                    <p className="text-gray-400">{t('common:loading')}</p>
                  </div>
                ) : null}

                {/* Events List */}
                {!isLoadingEvents && paginatedEvents.length > 0 ? (
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
          <div className="space-y-6 overflow-hidden">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl text-white mb-4">{t('news:reports.title')}</h2>
              <div className="w-24 h-1 mx-auto rounded-full bg-[#FDB813]"></div>
            </div>

            {isLoadingReports ? (
              <div className="text-center py-12">
                <p className="text-gray-400">Loading reports...</p>
              </div>
            ) : Object.keys(enrollmentData).length === 0 ? (
              <div className="text-center py-12 bg-[#2E2E2E] rounded-lg">
                <p className="text-gray-400">No reports available</p>
              </div>
            ) : (
              <>
            
            {/* Year & Class Type Selector */}
            <div className="flex flex-col sm:flex-row gap-4 px-4 sm:px-0 max-w-full">
              <div className="flex-1 min-w-0 max-w-full">
                <label className="block text-sm font-medium mb-2 truncate">{t('news:reports.selectYear')}</label>
                <div className="relative max-w-full">
                  <select 
                    value={selectedReportYear}
                    onChange={(e) => setSelectedReportYear(Number(e.target.value))}
                    className="w-full bg-[#2E2E2E] border border-gray-700 rounded-md px-3 py-2.5 text-white cursor-pointer text-sm appearance-none pr-8"
                    style={{ maxWidth: '100%' }}
                  >
                    {Object.keys(enrollmentData).sort((a, b) => Number(b) - Number(a)).map(year => (
                      <option key={year} value={Number(year)}>{year}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="flex-1 min-w-0 max-w-full">
                <label className="block text-sm font-medium mb-2 truncate">{t('news:reports.selectClassType')}</label>
                <div className="relative max-w-full">
                  <select 
                    value={selectedClassType}
                    onChange={(e) => setSelectedClassType(e.target.value)}
                    className="w-full bg-[#2E2E2E] border border-gray-700 rounded-md px-3 py-2.5 text-white cursor-pointer text-sm appearance-none pr-8"
                    style={{ maxWidth: '100%' }}
                  >
                  {enrollmentData[selectedReportYear] && Object.keys(enrollmentData[selectedReportYear]).map(classType => (
                    <option key={classType} value={classType}>
                      {classType === 'keyboard' ? t('news:reports.classTypes.keyboard') :
                       classType === 'guitar' ? t('news:reports.classTypes.guitar') :
                       classType === 'lcm' ? t('news:reports.classTypes.lcm') : classType}
                    </option>
                  ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Monthly Enrollment Chart */}
            <div className="bg-[#2E2E2E] p-4 md:p-6 rounded-md px-4 sm:px-0">
              <h3 className="text-xl font-semibold mb-4">{t('news:reports.monthlyDistribution')}</h3>
              
              {/* Chart Container */}
              {enrollmentData[selectedReportYear]?.[selectedClassType] && enrollmentData[selectedReportYear][selectedClassType].length > 0 ? (
              <div className="w-full overflow-x-auto">
                <ResponsiveContainer width="100%" height={400} minWidth={1000}>
                  <BarChart
                    data={enrollmentData[selectedReportYear][selectedClassType]}
                    margin={{ top: 20, right: 40, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                    <XAxis 
                      dataKey="month" 
                      stroke="#9CA3AF"
                      tick={{ fill: '#9CA3AF', fontSize: 12 }}
                      tickFormatter={(value) => value.substring(0, 3)}
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
                      fill="#FDB813" 
                      radius={[4, 4, 4, 4]}
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
                      fill="#FF6B6B" 
                      radius={[4, 4, 4, 4]}
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
              ) : (
                <div className="text-center py-12 text-gray-400">
                  No data available for this selection
                </div>
              )}
            </div>
            
            {/* Annual Overview */}
            {enrollmentData[selectedReportYear]?.[selectedClassType] && enrollmentData[selectedReportYear][selectedClassType].length > 0 && (
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
                        {peakMonth && minMonth ? (
                          <>
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
                          </>
                        ) : (
                          <div className="bg-[#1a1a1a] p-4 rounded-md text-gray-400 text-center">
                            No data available
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
            )}
            </>
            )}
          </div>
        )}


      </div>
    </div>
  );
}
