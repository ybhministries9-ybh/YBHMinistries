"use client";

import { useState, useRef, useEffect } from "react";
import { ShoppingCart, Play, Download, FileText, ExternalLink, Plus, Minus, X, Youtube, Calendar, Clock } from "lucide-react";
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useTranslation } from 'react-i18next';
import { extractYouTubeId, fetchYouTubeMeta, parseISO8601Duration } from '../lib/youtube';

// Utility function to extract YouTube thumbnail from video URL
function getYouTubeThumbnail(url: string): string {
  if (!url) return '';
  
  let videoId = '';
  
  // Extract video ID from different YouTube URL formats
  if (url.includes('youtube.com/watch?v=')) {
    videoId = url.split('v=')[1]?.split('&')[0];
  } else if (url.includes('youtu.be/')) {
    videoId = url.split('youtu.be/')[1]?.split('?')[0];
  } else if (url.includes('youtube.com/shorts/')) {
    videoId = url.split('shorts/')[1]?.split('?')[0];
  }
  
  // Return high quality thumbnail URL
  return videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : '';
}

export function ResourcesPage() {
  const { t } = useTranslation('resources');
  
  // Check for hash parameter to set initial tab
  const getInitialTab = () => {
    if (typeof window === 'undefined') return 'books';
    const hash = window.location.hash.replace('#', '');
    if (hash === 'worship' || hash === 'sermons' || hash === 'bibleStudies') {
      return hash;
    }
    return 'books';
  };

  const [activeTab, setActiveTab] = useState(getInitialTab());
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [cartAnimation, setCartAnimation] = useState(false);
  const [visibleRows, setVisibleRows] = useState({
    worship: 2,
    sermons: 2,
    bibleStudies: 2
  });
  const [selectedImage, setSelectedImage] = useState(0);
  const cartRef = useRef<HTMLDivElement | null>(null);

  // Handle hash changes for tab navigation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash === 'worship' || hash === 'sermons' || hash === 'bibleStudies') {
        setActiveTab(hash);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Close cart when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cartRef.current && !cartRef.current.contains(event.target) && showCart) {
        // Check if the click is on the cart icon (which has its own handler)
        const cartIconElement = document.getElementById("cart-icon-button");
        if (cartIconElement && cartIconElement.contains(event.target)) {
          return;
        }
        setShowCart(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showCart]);

  // Reset selected image when a new book is selected
  useEffect(() => {
    setSelectedImage(0);
  }, [selectedBook]);

  // Cart animation effect
  useEffect(() => {
    if (cartAnimation) {
      const timer = setTimeout(() => {
        setCartAnimation(false);
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [cartAnimation]);

  // Inject bounce animation CSS on client only
  useEffect(() => {
    if (typeof document === 'undefined') return;
    const style = document.createElement('style');
    style.textContent = `
      @keyframes bounce {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-10px); }
      }
      .animate-bounce { animation: bounce 0.6s ease; }
    `;
    document.head.appendChild(style);
    return () => {
      if (document.head.contains(style)) document.head.removeChild(style);
    };
  }, []);

  // Fetch resources from database
  const [resources, setResources] = useState({
    books: [],
    worship: [],
    sermons: [],
    bibleStudies: []
  });
  const [loading, setLoading] = useState({
    books: true,
    worship: true,
    sermons: true,
    bibleStudies: true
  });

  // Fetch books
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch('/api/resources?type=books');
        if (!response.ok) throw new Error('Failed to fetch books');
        const data = await response.json();
        
        // Transform API response to match component interface
        const transformedBooks = (data.data || []).map((book: any) => ({
          id: book.id,
          title: book.title,
          author: book.author,
          price: book.price,
          pages: book.pages,
          language: book.language,
          coverImage: book.cover_image,
          additionalImages: book.additional_images || [],
          description: book.description,
          fullDescription: book.full_description || book.description || '',
          publishDate: book.publish_date
        }));
        
        setResources(prev => ({ ...prev, books: transformedBooks }));
      } catch (error) {
        console.error('Error fetching books:', error);
      } finally {
        setLoading(prev => ({ ...prev, books: false }));
      }
    };
    fetchBooks();
  }, []);

  // Fetch worship videos
  useEffect(() => {
    const fetchWorship = async () => {
      try {
        const response = await fetch('/api/resources?type=worship');
        if (!response.ok) throw new Error('Failed to fetch worship videos');
        const data = await response.json();
        
        const transformedWorship = (data.data || []).map((video: any) => ({
          id: video.id,
          // Prefer DB-stored title and date_posted when available
          title: video.title || '',
          artist: video.artist,
          duration: pickDate(video.duration, video.length, video.duration_seconds, video.duration_str),
          date: pickDate(video.date_posted, video.release_date, video.published_at, video.created_at, video.date, video.uploaded_at),
          youtubeUrl: video.youtube_url,
          description: video.description,
          // include display_order from DB (may be null)
          display_order: typeof video.display_order !== 'undefined' && video.display_order !== null ? Number(video.display_order) : null
        }));

        // Sort by display_order ascending (lowest order -> left). Items without display_order go after ordered items,
        // and are sorted by date (newest first) as a sensible fallback.
        transformedWorship.sort((a: any, b: any) => {
          const aHas = typeof a.display_order === 'number' && !isNaN(a.display_order);
          const bHas = typeof b.display_order === 'number' && !isNaN(b.display_order);
          if (aHas && bHas) return a.display_order - b.display_order;
          if (aHas) return -1; // a comes before b
          if (bHas) return 1;  // b comes before a
          // fallback: sort by date descending (newest first)
          const aTime = a.date ? new Date(a.date).getTime() : 0;
          const bTime = b.date ? new Date(b.date).getTime() : 0;
          return bTime - aTime;
        });

        // Use the DB-provided values only; do not call YouTube API from the public site.
        // If DB fields are missing, the UI will show blank values.
        setResources(prev => ({ ...prev, worship: transformedWorship }));
      } catch (error) {
        console.error('Error fetching worship videos:', error);
      } finally {
        setLoading(prev => ({ ...prev, worship: false }));
      }
    };
    fetchWorship();
  }, []);

  // Fetch sermons
  useEffect(() => {
    const fetchSermons = async () => {
      try {
        const response = await fetch('/api/resources?type=sermons');
        if (!response.ok) throw new Error('Failed to fetch sermons');
        const data = await response.json();
        
        const transformedSermons = (data.data || []).map((sermon: any) => ({
          id: sermon.id,
          title: sermon.title,
          duration: pickDate(sermon.duration, sermon.length, sermon.duration_seconds, sermon.duration_str),
          date: pickDate(sermon.sermon_date, sermon.date, sermon.published_at, sermon.created_at),
          thumbnailUrl: sermon.thumbnail_url,
          youtubeUrl: sermon.youtube_url,
          description: sermon.description
        }));

        const augmentedSermons = await Promise.all(transformedSermons.map(async (sermon) => {
          try {
            const vid = extractYouTubeId(sermon.youtubeUrl);
            if (!vid) return sermon;
            const meta = await fetchYouTubeMeta(vid);
            if (!meta) return sermon;

            // Prefer YouTube metadata for both date, duration and title when available
            let newDate = sermon.date;
            let newDuration = sermon.duration;

            if (meta.publishedAt) {
              const parsed = parseLocalDate(meta.publishedAt);
              if (parsed) newDate = parsed.toISOString().split('T')[0];
              else newDate = String(meta.publishedAt).split('T')[0];
            }

            if (meta.duration) {
              newDuration = parseISO8601Duration(meta.duration);
            }

            const newTitle = meta.title || sermon.title || '';

            return { ...sermon, date: newDate, duration: newDuration, title: newTitle };
          } catch (err) {
            return sermon;
          }
        }));

        setResources(prev => ({ ...prev, sermons: augmentedSermons }));
      } catch (error) {
        console.error('Error fetching sermons:', error);
      } finally {
        setLoading(prev => ({ ...prev, sermons: false }));
      }
    };
    fetchSermons();
  }, []);

  // Fetch Bible studies
  useEffect(() => {
    const fetchBibleStudies = async () => {
      try {
        const response = await fetch('/api/resources?type=bibleStudies');
        if (!response.ok) throw new Error('Failed to fetch Bible studies');
        const data = await response.json();
        
        const transformedStudies = (data.data || []).map((study: any) => ({
          id: study.id,
          title: study.title,
          author: study.author,
          pages: study.pages,
          date: pickDate(study.study_date, study.publish_date, study.published_at, study.created_at, study.date),
          fileType: study.file_type,
          fileUrl: study.file_url,
          thumbnailUrl: study.thumbnail_url,
          description: study.description
        }));
        
        setResources(prev => ({ ...prev, bibleStudies: transformedStudies }));
      } catch (error) {
        console.error('Error fetching Bible studies:', error);
      } finally {
        setLoading(prev => ({ ...prev, bibleStudies: false }));
      }
    };
    fetchBibleStudies();
  }, []);

  // Only use resources from the database/API
  const displayResources = {
    books: resources.books,
    worship: resources.worship,
    sermons: resources.sermons,
    bibleStudies: resources.bibleStudies
  };

  const addToCart = (book) => {
    const existingItem = cartItems.find(item => item.id === book.id);
    if (existingItem) {
      setCartItems(cartItems.map(item => 
        item.id === book.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCartItems([...cartItems, { ...book, quantity: 1 }]);
    }
    // Animate the cart icon
    setCartAnimation(true);
  };

  const removeFromCart = (bookId) => {
    setCartItems(cartItems.filter(item => item.id !== bookId));
  };

  const updateQuantity = (bookId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(bookId);
      return;
    }
    setCartItems(cartItems.map(item => 
      item.id === bookId ? { ...item, quantity: newQuantity } : item
    ));
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  };

  const loadMore = (section) => {
    setVisibleRows(prev => ({
      ...prev,
      [section]: prev[section] + 1
    }));
  };

  const getVisibleItems = (items, section) => {
    const rowSize = 4;
    // Sort items by date in descending order (latest first) for sermons sections only
    if (section === 'sermons') {
      const sortedItems = [...items].sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });
      return sortedItems.slice(0, visibleRows[section] * rowSize);
    }
    return items.slice(0, visibleRows[section] * rowSize);
  };

  // Helper to display language with Telugu script
  const formatLanguage = (lang: string) => {
    return lang.replace(/Telugu/gi, "తెలుగు");
  };

  // Function to get all images for a book (cover + additional)
  const getAllBookImages = (book) => {
    return [book.coverImage, ...(book.additionalImages || [])];
  };

  // Format date to be more readable (returns empty string for invalid/missing values)
  const formatDate = (dateInput) => {
    if (!dateInput && dateInput !== 0) return '';
    const dt = parseLocalDate(dateInput);
    if (!dt) return '';
    try {
      return dt.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: '2-digit' });
    } catch (err) {
      return '';
    }
  };

  // Format duration to add minutes
  const formatDuration = (duration) => {
    if (!duration && duration !== 0) return '';
    try {
      const s = String(duration).trim();
      if (!s) return '';
      // If the string already contains 'min' (case-insensitive), normalize to a single trailing ' min'
      if (/min/i.test(s)) {
        const withoutMin = s.replace(/\s*min\s*$/i, '').trim();
        return `${withoutMin} min`;
      }

      if (s.indexOf(':') >= 0) {
        const parts = s.split(':');
        const minutes = parts[0];
        const seconds = parts[1] || '00';
        return `${minutes}:${seconds} min`;
      }

      // If duration given as total seconds or minutes
      if (/^\d+$/.test(s)) {
        const num = Number(s);
        // treat numbers > 59 as seconds
        if (num > 59) {
          const mins = Math.floor(num / 60);
          const secs = num % 60;
          return `${mins}:${String(secs).padStart(2, '0')} min`;
        }
        return `${num}:00 min`;
      }

      return s + ' min';
    } catch (err) {
      return '';
    }
  };

  // Pick first available date-like field from a list of possible properties
  const pickDate = (...vals) => {
    for (const v of vals) {
      if (v === 0) return v;
      if (v) return v;
    }
    return null;
  };

  // Parse local date safely (accepts YYYY-MM-DD, ISO, timestamps)
  const parseLocalDate = (dateInput) => {
    if (!dateInput && dateInput !== 0) return null;
    try {
      // If already a Date
      if (dateInput instanceof Date) return dateInput;
      const s = String(dateInput).trim();

      // If YYYY-MM-DD or YYYY-MM-DDTHH:MM:SS
      const isoMatch = s.match(/^(\d{4})-(\d{2})-(\d{2})/);
      if (isoMatch) {
        const y = Number(isoMatch[1]);
        const m = Number(isoMatch[2]);
        const d = Number(isoMatch[3]);
        return new Date(y, m - 1, d);
      }

      // If numeric timestamp
      if (/^\d+$/.test(s)) return new Date(Number(s));

      // Fallback to Date constructor
      const dt = new Date(s);
      if (!isNaN(dt.getTime())) return dt;
    } catch (err) {
      // ignore
    }
    return null;
  };

  const formatCardMonth = (dateInput) => {
    const dt = parseLocalDate(dateInput);
    if (!dt) return '';
    return dt.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
  };

  const formatCardDay = (dateInput) => {
    const dt = parseLocalDate(dateInput);
    if (!dt) return '';
    return String(dt.getDate());
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Main Content */}
      <div className="container mx-auto px-4 pt-24 md:pt-32 lg:pt-38 pb-16">
        {/* Tabs */}
        <div className="mb-12">
          <div className="flex flex-wrap justify-center gap-3">
            {["books", "worship", "sermons", "bibleStudies"].map((tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  className={`px-8 py-2.5 rounded-full font-semibold transition-colors focus:outline-none ${
                    isActive
                      ? "bg-[#FDB813] text-black shadow-md ring-2 ring-offset-2 ring-[#FDB813]"
                : "bg-[#2E2E2E] text-white hover:bg-[#FDB813] hover:text-black focus:ring-2 focus:ring-offset-2 focus:ring-[#FDB813]"
                  }`}
                  style={{ cursor: 'pointer' }}
                  onClick={() => setActiveTab(tab)}
                >
                  {t(`tabs.${tab}`)}
                </button>
              );
            })}
          </div>
        </div>

        {/* Cart Icon - Positioned below tabs on mobile, top-right on desktop */}
        {activeTab === "books" && !showCart && (
          <div className="fixed top-44 right-8 z-[60] md:top-36 lg:top-40">
            <button 
              id="cart-icon-button"
              className={`relative p-3 bg-[#2E2E2E] rounded-full cursor-pointer transition-transform shadow-lg hover:bg-[#3E3E3E] ${cartAnimation ? 'animate-bounce' : ''}`}
              onClick={() => setShowCart(!showCart)}
              style={{ cursor: 'pointer' }}
            >
              <ShoppingCart size={24} color="white" />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#FDB813] rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold" style={{ color: '#000000' }}>
                  {cartItems.reduce((total, item) => total + item.quantity, 0)}
                </span>
              )}
            </button>
          </div>
        )}

        {/* Books Tab Content */}
        {activeTab === "books" && !selectedBook && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading.books ? (
              <div className="col-span-full text-center py-12">
                <p className="text-white text-lg">Loading books...</p>
              </div>
            ) : displayResources.books.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <p className="text-white text-lg">No books available yet.</p>
              </div>
            ) : (
              displayResources.books.map((book) => (
              <div key={book.id} className="bg-[#2E2E2E] rounded-lg overflow-hidden shadow-lg hover:scale-102 hover:shadow-2xl transition-all duration-300 ease-in-out flex flex-col">
                <div className="h-64 overflow-hidden relative">
                  <ImageWithFallback
                    src={book.coverImage}
                    alt={book.title}
                    className="w-full h-full object-cover"
                  />
                  {/* Language badge overlay */}
                  <div className="absolute top-0 right-0 bg-[#FDB813] px-3 py-1 rounded-bl-lg font-bold shadow-md text-xs" style={{ color: '#000000' }}>
                    {formatLanguage(book.language)}
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold mb-2">{book.title}</h3>
                  <p className="text-white mb-4">{book.author}</p>
                  
                  {/* Price and Buttons - fixed at bottom */}
                  <div className="mt-auto">
                    <div className="text-[#FDB813] font-bold text-xl mb-3">₹{book.price}</div>
                    <div className="flex gap-3 justify-center">
                      <button
                        className="flex-1 py-2 px-4 bg-[#FDB813] rounded hover:bg-[#e5a711] hover:scale-102 transition-all duration-200 flex items-center justify-center whitespace-nowrap font-bold"
                        onClick={() => setSelectedBook(book)}
                        style={{ cursor: 'pointer', color: '#000000' }}
                      >
                        {t('buttons.details')}
                      </button>
                      <button
                        className="flex-1 py-2 px-4 bg-[#FDB813] rounded hover:bg-[#e5a711] hover:scale-102 transition-all duration-200 flex items-center justify-center whitespace-nowrap font-bold"
                        onClick={() => addToCart(book)}
                        style={{ cursor: 'pointer', color: '#000000' }}
                      >
                        {t('buttons.addToCart')}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )))}
          </div>
        )}

        {/* Book Details with Image Gallery */}
        {activeTab === "books" && selectedBook && (
          <div className="bg-[#2E2E2E] rounded-lg overflow-hidden shadow-lg">
            <button
              className="ml-4 mt-4 px-4 py-2 bg-[#FDB813] rounded hover:bg-opacity-80 transition-colors font-bold"
              onClick={() => setSelectedBook(null)}
              style={{ cursor: 'pointer', color: '#000000' }}
            >
              {t('buttons.backToBooks')}
            </button>
            <div className="p-8 flex flex-col md:flex-row gap-8">
              <div className="md:w-1/3">
                {/* Main Image Display */}
                <div className="relative bg-gray-800 rounded-lg mb-4 flex items-center justify-center" style={{ minHeight: '600px' }}>
                  <ImageWithFallback
                    src={getAllBookImages(selectedBook)[selectedImage]}
                    alt={selectedBook.title}
                    className="max-w-full h-auto object-contain"
                    style={{ maxHeight: '100%' }}
                  />
                  {/* Language badge overlay */}
                  <div className="absolute top-0 right-0 bg-[#FDB813] px-3 py-1 rounded-bl-lg font-bold shadow-md text-xs" style={{ color: '#000000' }}>
                    {formatLanguage(selectedBook.language)}
                  </div>
                  
                  {/* Navigation Buttons */}
                  {getAllBookImages(selectedBook).length > 1 && (
                    <>
                      <button
                        onClick={() => setSelectedImage(selectedImage === 0 ? getAllBookImages(selectedBook).length - 1 : selectedImage - 1)}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:bg-gray-100 transition-colors cursor-pointer z-10"
                        aria-label="Previous image"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-800">
                          <polyline points="15 18 9 12 15 6"></polyline>
                        </svg>
                      </button>
                      <button
                        onClick={() => setSelectedImage(selectedImage === getAllBookImages(selectedBook).length - 1 ? 0 : selectedImage + 1)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:bg-gray-100 transition-colors cursor-pointer z-10"
                        aria-label="Next image"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-800">
                          <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                      </button>
                    </>
                  )}
                </div>
                
                {/* Thumbnail Gallery */}
                <div className="grid grid-cols-4 gap-2">
                  {getAllBookImages(selectedBook).map((image, index) => (
                    <div 
                      key={index} 
                      className={`h-20 overflow-hidden rounded cursor-pointer border-2 transition-colors ${
                        selectedImage === index ? 'border-[#FDB813]' : 'border-transparent hover:border-gray-500'
                      }`}
                      onClick={() => setSelectedImage(index)}
                    >
                      <ImageWithFallback
                        src={image}
                        alt={`${selectedBook.title} - Image ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="md:w-2/3">
                <h2 className="text-3xl font-bold mb-2">{selectedBook.title}</h2>
                <p className="text-xl text-gray-300 mb-4">{t('books.by')} {selectedBook.author}</p>
                <div className="mb-6">
                  <span className="text-2xl text-[#FDB813] font-bold">₹{selectedBook.price}</span>
                </div>
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-2">{t('books.descriptionLabel')}</h3>
                  <p className="text-gray-300">{selectedBook.fullDescription}</p>
                </div>
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-2">{t('books.detailsLabel')}</h3>
                  <p className="text-gray-300">{t('books.languageLabel')}: {formatLanguage(selectedBook.language)}</p>
                  <p className="text-gray-300">{t('books.pagesLabel')}: {selectedBook.pages}</p>
                  <p className="text-gray-300">{t('books.publishedLabel')}: {formatDate(selectedBook.publishDate)}</p>
                </div>
                <button
                  className="px-6 py-3 bg-[#FDB813] rounded-lg hover:bg-opacity-80 transition-colors font-bold"
                  onClick={() => addToCart(selectedBook)}
                  style={{ cursor: 'pointer', color: '#000000' }}
                >
                  {t('buttons.addToCart')}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Shopping Cart Slide-in Panel */}
        <div className={`fixed inset-0 bg-white/10 transition-opacity backdrop-blur-sm ${showCart ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} style={{ zIndex: 50 }}>
          <div 
            ref={cartRef}
            className={`fixed top-0 right-0 h-full bg-[#2E2E2E] w-full max-w-md shadow-xl transition-transform transform ${showCart ? 'translate-x-0' : 'translate-x-full'}`}
            style={{ 
              transitionDuration: '300ms',
              overflowY: 'auto'
            }}
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">{t('cart.title')}</h2>
                <button 
                  onClick={() => setShowCart(false)}
                  className="text-gray-400 hover:text-white p-1 rounded-full hover:bg-gray-700"
                  style={{ cursor: 'pointer' }}
                >
                  <X size={24} />
                </button>
              </div>
              
              {cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <ShoppingCart size={64} className="text-gray-600 mb-4" />
                  <p className="text-center text-lg mb-6">{t('cart.empty')}</p>
                  <button 
                    className="px-6 py-2 bg-[#FDB813] rounded font-medium hover:bg-opacity-90 transition-colors whitespace-nowrap"
                    onClick={() => setShowCart(false)}
                    style={{ cursor: 'pointer', color: '#000000' }}
                  >
                    {t('cart.continueShopping')}
                  </button>
                </div>
              ) : (
                <>
                  <div className="space-y-4 mb-8">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex items-center justify-between border-b border-gray-700 pb-4">
                        <div className="flex items-center">
                          <div className="w-16 h-20 overflow-hidden rounded mr-4">
                            <ImageWithFallback
                              src={item.coverImage}
                              alt={item.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <h3 className="font-medium">{item.title}</h3>
                            <p className="text-gray-400">₹{item.price}</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <div className="flex items-center mr-3">
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-1 bg-gray-700 rounded hover:bg-gray-600"
                              style={{ cursor: 'pointer' }}
                            >
                              <Minus size={16} />
                            </button>
                            <span className="mx-2 w-6 text-center">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-1 bg-gray-700 rounded hover:bg-gray-600"
                              style={{ cursor: 'pointer' }}
                            >
                              <Plus size={16} />
                            </button>
                          </div>
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="text-gray-400 hover:text-white p-1 rounded-full hover:bg-gray-700"
                            style={{ cursor: 'pointer' }}
                          >
                            <X size={18} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="border-t border-gray-700 pt-4 mb-6">
                    <div className="flex justify-between text-xl font-bold mb-6">
                      <span>{t('cart.total')}:</span>
                      <span>₹{calculateTotal()}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-3 items-center">
                    <button 
                      className="px-8 py-3 bg-[#FDB813] rounded font-bold hover:bg-opacity-90 transition-colors whitespace-nowrap"
                      style={{ cursor: 'pointer', color: '#000000' }}
                    >
                      {t('buttons.checkout')}
                    </button>
                    <button 
                      className="px-8 py-3 border border-[#FDB813] text-[#FDB813] rounded font-bold hover:bg-[#FDB813] transition-colors whitespace-nowrap"
                      onClick={() => setShowCart(false)}
                      style={{ cursor: 'pointer' }}
                      onMouseEnter={(e) => e.currentTarget.style.color = '#000000'}
                      onMouseLeave={(e) => e.currentTarget.style.color = '#FDB813'}
                    >
                      {t('cart.continueShopping')}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Worship Tab Content */}
        {activeTab === "worship" && (
          <div>
            {loading.worship ? (
              <div className="text-center py-12">
                <p className="text-white text-lg">Loading worship videos...</p>
              </div>
            ) : displayResources.worship.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-white text-lg">No worship videos available yet.</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {getVisibleItems(displayResources.worship, "worship").map((item) => (
                <a 
                  key={item.id}
                  href={item.youtubeUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group block rounded-xl overflow-hidden bg-black shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] no-underline flex flex-col border-2 border-transparent hover:border-[#FDB813]"
                >
                  {/* Worship Thumbnail */}
                  <div className="aspect-video w-full overflow-hidden bg-gray-900 relative">
                    <ImageWithFallback
                      src={getYouTubeThumbnail(item.youtubeUrl)}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Worship Info */}
                  <div className="flex flex-col flex-grow bg-[#2E2E2E] rounded-b-xl">
                    <div className="p-4 pb-2 flex-grow">
                      <h3 className="text-white text-lg font-bold line-clamp-2 leading-snug mb-2">
                        {item.title}
                      </h3>
                      {/* artist removed: now using YouTube metadata */}
                    </div>
                    <div className="px-4 pb-4 pt-2 mt-auto">
                      <div className="flex items-center justify-between text-xs text-white gap-2">
                        <div className="flex items-center">
                          <Calendar size={14} className="mr-1.5 flex-shrink-0" />
                          <span>{formatDate(item.date)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              ))}
                </div>
                
                {displayResources.worship.length > getVisibleItems(displayResources.worship, "worship").length && (
                  <div className="mt-8 text-center">
                    <button 
                      className="px-6 py-3 bg-[#FDB813] rounded hover:bg-[#e5a711] hover:scale-102 transition-all duration-200 font-bold"
                      onClick={() => loadMore("worship")}
                      style={{ cursor: 'pointer', color: '#000000' }}
                    >
                      {t('buttons.loadMore')}
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* Sermons Tab Content */}
        {activeTab === "sermons" && (
          <div>
            {loading.sermons ? (
              <div className="text-center py-12">
                <p className="text-white text-lg">Loading sermons...</p>
              </div>
            ) : displayResources.sermons.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-white text-lg">No sermons available yet.</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {getVisibleItems(displayResources.sermons, "sermons").map((sermon) => (
                <a 
                  key={sermon.id}
                  href={sermon.youtubeUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group block rounded-xl overflow-hidden bg-black shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] no-underline flex flex-col border-2 border-transparent hover:border-[#FDB813]"
                >
                  {/* Sermon Thumbnail */}
                  <div className="aspect-video w-full overflow-hidden bg-gray-900 relative">
                    <ImageWithFallback
                      src={getYouTubeThumbnail(sermon.youtubeUrl) || sermon.thumbnailUrl}
                      alt={sermon.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Sermon Info */}
                  <div className="flex flex-col flex-grow bg-[#2E2E2E] rounded-b-xl">
                    <div className="p-4 pb-2 flex-grow">
                      <h3 className="text-lg font-bold text-white line-clamp-2 leading-snug">
                        {sermon.title}
                      </h3>
                    </div>
                    <div className="px-4 pb-4 pt-2 mt-auto">
                      <div className="flex items-center justify-between text-xs text-white gap-2">
                        <div className="flex items-center">
                          <Clock size={14} className="mr-1.5 flex-shrink-0" />
                          <span>{formatDuration(sermon.duration)}</span>
                        </div>
                        <div className="flex items-center text-xs text-white">
                          <Calendar size={14} color="#FFFFFF" className="mr-1.5 flex-shrink-0" />
                          <span>{formatDate(sermon.date)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              ))}
                </div>
                
                {displayResources.sermons.length > getVisibleItems(displayResources.sermons, "sermons").length && (
                  <div className="mt-8 text-center">
                    <button 
                      className="px-6 py-3 bg-[#FDB813] rounded hover:bg-[#e5a711] hover:scale-102 transition-all duration-200 font-bold"
                      onClick={() => loadMore("sermons")}
                      style={{ cursor: 'pointer', color: '#000000' }}
                    >
                      {t('buttons.loadMore')}
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* Bible Studies Tab Content */}
        {activeTab === "bibleStudies" && (
          <div>
            {loading.bibleStudies ? (
              <div className="text-center py-12">
                <p className="text-white text-lg">Loading Bible studies...</p>
              </div>
            ) : displayResources.bibleStudies.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-white text-lg">No Bible studies available yet.</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {getVisibleItems(displayResources.bibleStudies, "bibleStudies").map((study) => (
                <div key={study.id} className="bg-[#2E2E2E] rounded-lg overflow-hidden shadow-lg hover:scale-102 hover:shadow-2xl transition-all duration-300 ease-in-out flex flex-col h-full border-2 border-transparent hover:border-[#FDB813]">
                  <div className="h-48 overflow-hidden relative">
                    <ImageWithFallback
                      src={study.thumbnailUrl}
                      alt={study.title}
                      className="w-full h-full object-cover"
                    />
                    {/* PDF badge overlay */}
                    <div className="absolute top-0 right-0 bg-[#FDB813] px-3 py-1 rounded-bl-lg font-bold shadow-md flex items-center" style={{ color: '#000000' }}>
                      <FileText size={14} className="mr-1" /> PDF
                    </div>
                  </div>
                  <div className="p-4 flex flex-col flex-grow">
                    <h3 className="text-lg font-bold mb-1 text-white">{study.title}</h3>
                    <p className="text-white text-sm mb-2">{study.author}</p>
                    <p className="text-sm text-white mb-4 flex-grow">{study.description}</p>
                    
                    {/* Metadata row (pages and date) shown side by side */}
                    <div className="flex justify-between items-center text-xs text-white mb-4">
                      <div className="flex items-center">
                        <FileText size={14} className="mr-1.5 flex-shrink-0" />
                        <span>{study.pages} pages</span>
                      </div>
                        <div className="flex items-center">
                        <Calendar size={14} color="#FFFFFF" className="mr-1.5 flex-shrink-0" />
                        <span>{formatDate(study.date)}</span>
                      </div>
                    </div>
                    
                    <div className="flex space-x-5 justify-center">
                      <a 
                        href={study.fileUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center justify-center flex-1 px-3 py-2 bg-[#FDB813] rounded hover:bg-[#e5a711] hover:scale-102 transition-all duration-200 text-sm font-bold"
                        style={{ cursor: 'pointer', color: '#000000' }}
                      >
                        <ExternalLink size={14} className="mr-1" /> Open
                      </a>
                      <a 
                        href={study.fileUrl} 
                        download
                        className="flex items-center justify-center flex-1 px-3 py-2 border border-[#FDB813] text-[#FDB813] rounded hover:bg-[#FDB813] transition-all duration-200 text-sm font-bold"
                        style={{ cursor: 'pointer' }}
                        onMouseEnter={(e) => e.currentTarget.style.color = '#000000'}
                        onMouseLeave={(e) => e.currentTarget.style.color = '#FDB813'}
                      >
                        <Download size={14} className="mr-1" /> Download
                      </a>
                    </div>
                  </div>
                </div>
              ))}
                </div>
                
                {displayResources.bibleStudies.length > getVisibleItems(displayResources.bibleStudies, "bibleStudies").length && (
                  <div className="mt-8 text-center">
                    <button 
                      className="px-6 py-3 bg-[#FDB813] rounded hover:bg-[#e5a711] hover:scale-102 transition-all duration-200 font-bold"
                      onClick={() => loadMore("bibleStudies")}
                      style={{ cursor: 'pointer', color: '#000000' }}
                    >
                      {t('buttons.loadMore')}
                    </button>
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

// Bounce animation CSS is injected on the client inside the component via useEffect