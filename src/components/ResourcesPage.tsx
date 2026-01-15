"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { ShoppingCart, Plus, MessageCircle, ArrowUpRight, Minus, X, Calendar, Phone } from "lucide-react";
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useTranslation } from 'react-i18next';
import logger from '../lib/logger';

// Utility function to extract YouTube thumbnail from video URL
function getYouTubeThumbnail(url: string, quality: 'maxres' | 'sd' | 'hq' = 'sd'): string {
  if (!url) return '';
  
  let videoId = '';
  
  // Extract video ID from different YouTube URL formats
  if (url.includes('youtube.com/watch?v=')) {
    videoId = url.split('v=')[1]?.split('&')[0];
  } else if (url.includes('youtu.be/')) {
    videoId = url.split('youtu.be/')[1]?.split('?')[0];
  } else if (url.includes('youtube.com/shorts/')) {
    videoId = url.split('shorts/')[1]?.split('?')[0];
  } else if (url.includes('youtube.com/live/')) {
    videoId = url.split('live/')[1]?.split('?')[0];
  } else if (url.includes('youtube.com/embed/')) {
    videoId = url.split('embed/')[1]?.split('?')[0];
  }
  
  if (!videoId) return '';
  
  // Use sddefault for faster loading (640x480), fallback to hqdefault (480x360)
  const qualityMap = {
    maxres: 'maxresdefault',
    sd: 'sddefault',
    hq: 'hqdefault'
  };
  
  return `https://img.youtube.com/vi/${videoId}/${qualityMap[quality]}.jpg`;
}

export function ResourcesPage() {
  const { t } = useTranslation('resources');
  
  // Initialize active tab to a stable server-friendly default ('books').
  // Resolve the real initial tab (from `location.hash`) on the client inside
  // a `useEffect` to avoid server/client markup mismatches during hydration.
  const [activeTab, setActiveTab] = useState('books');
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [cartAnimation, setCartAnimation] = useState(false);
  const [visibleRows, setVisibleRows] = useState({
    worship: 2,
    sermons: 2
  });
  const [selectedImage, setSelectedImage] = useState(0);
  const cartRef = useRef<HTMLDivElement | null>(null);

 
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash === 'worship' || hash === 'sermons') {
        setActiveTab(hash);
      }
    };

    // Run once on mount to set initial tab from the location hash (client-only)
    try {
      handleHashChange();
    } catch (e) {
      // ignore if window is not available
    }

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
    sermons: []
  });
  const [loading, setLoading] = useState({
    books: true,
    worship: true,
    sermons: true
  });

  // Helper to pick first available date-like field (defined before use)
  const pickDate = (...vals: any[]) => {
    for (const v of vals) {
      if (v === 0) return v;
      if (v) return v;
    }
    return null;
  };

  // Fetch all resources in parallel for faster initial load
  useEffect(() => {
    const fetchAllResources = async () => {
      // Fetch all resource types in parallel
      const [booksRes, worshipRes, sermonsRes] = await Promise.all([
        fetch('/api/resources?type=books').catch(() => null),
        fetch('/api/resources?type=worship').catch(() => null),
        fetch('/api/resources?type=sermons').catch(() => null)
      ]);

      // Process books
      if (booksRes?.ok) {
        try {
          const data = await booksRes.json();
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
          logger.error('Error parsing books', error);
        }
      }
      setLoading(prev => ({ ...prev, books: false }));

      // Process worship videos
      if (worshipRes?.ok) {
        try {
          const data = await worshipRes.json();
          const transformedWorship = (data.data || []).map((video: any) => ({
            id: video.id,
            title: video.title || '',
            artist: video.artist,
            duration: pickDate(video.duration, video.length, video.duration_seconds, video.duration_str),
            date: pickDate(video.date_posted, video.release_date, video.published_at, video.created_at, video.date, video.uploaded_at),
            youtubeUrl: video.youtube_url,
            description: video.description,
            display_order: typeof video.display_order !== 'undefined' && video.display_order !== null ? Number(video.display_order) : null
          }));

          transformedWorship.sort((a: any, b: any) => {
            const aHas = typeof a.display_order === 'number' && !isNaN(a.display_order);
            const bHas = typeof b.display_order === 'number' && !isNaN(b.display_order);
            if (aHas && bHas) return a.display_order - b.display_order;
            if (aHas) return -1;
            if (bHas) return 1;
            const aTime = a.date ? new Date(a.date).getTime() : 0;
            const bTime = b.date ? new Date(b.date).getTime() : 0;
            return bTime - aTime;
          });

          setResources(prev => ({ ...prev, worship: transformedWorship }));
        } catch (error) {
          logger.error('Error parsing worship', error);
        }
      }
      setLoading(prev => ({ ...prev, worship: false }));

      // Process sermons
      if (sermonsRes?.ok) {
        try {
          const data = await sermonsRes.json();
          const transformedSermons = (data.data || []).map((sermon: any) => ({
            id: sermon.id,
            title: sermon.title || sermon.youtube_title || sermon.youtubeTitle || '',
            duration: pickDate(sermon.duration, sermon.length, sermon.duration_seconds, sermon.duration_str),
            date: pickDate(sermon.date_posted, sermon.sermon_date, sermon.date, sermon.published_at, sermon.created_at),
            thumbnailUrl: sermon.thumbnail_url,
            youtubeUrl: sermon.youtube_url,
            description: sermon.description,
            display_order: typeof sermon.display_order !== 'undefined' && sermon.display_order !== null ? Number(sermon.display_order) : null
          }));

          transformedSermons.sort((a: any, b: any) => {
            const aHas = typeof a.display_order === 'number' && !isNaN(a.display_order);
            const bHas = typeof b.display_order === 'number' && !isNaN(b.display_order);
            if (aHas && bHas) return a.display_order - b.display_order;
            if (aHas) return -1;
            if (bHas) return 1;
            const aTime = a.date ? new Date(a.date).getTime() : 0;
            const bTime = b.date ? new Date(b.date).getTime() : 0;
            return bTime - aTime;
          });

          setResources(prev => ({ ...prev, sermons: transformedSermons }));
        } catch (error) {
          logger.error('Error parsing sermons', error);
        }
      }
      setLoading(prev => ({ ...prev, sermons: false }));
    };

    fetchAllResources();
  }, []);

  // Bible Studies section removed — no client fetch required

  // Only use resources from the database/API
  const displayResources = {
    books: resources.books,
    worship: resources.worship,
    sermons: resources.sermons
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
    // For sermons, prefer explicit display_order when present; fallback to date
    if (section === 'sermons') {
      const copy = [...items];
      copy.sort((a, b) => {
        const aHas = typeof a.display_order === 'number' && !isNaN(a.display_order);
        const bHas = typeof b.display_order === 'number' && !isNaN(b.display_order);
        if (aHas && bHas) return a.display_order - b.display_order;
        if (aHas) return -1;
        if (bHas) return 1;
        const aTime = a.date ? new Date(a.date).getTime() : 0;
        const bTime = b.date ? new Date(b.date).getTime() : 0;
        return bTime - aTime;
      });
      return copy.slice(0, visibleRows[section] * rowSize);
    }

    return items.slice(0, visibleRows[section] * rowSize);
  };

  // Helper to display language with Telugu script
  const formatLanguage = (lang: string) => {
    return lang.replace(/Telugu/gi, "తెలుగు");
  };

  // Function to get all images for a book (cover + additional)
  const getAllBookImages = (book) => {
    return book ? [book.coverImage, ...(book.additionalImages || [])] : [];
  };

  // Memoize selected book images to avoid re-computing on every render
  const selectedBookImages = useMemo(() => getAllBookImages(selectedBook), [selectedBook]);

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

      // If numeric timestamp: detect seconds vs milliseconds
      if (/^\d+$/.test(s)) {
        const n = Number(s);
        // If looks like seconds (10 digits) convert to ms
        if (s.length <= 10) return new Date(n * 1000);
        return new Date(n);
      }

      // Fallback to Date constructor (handles ISO strings)
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

  // Return only the year part of a date-like input
  const formatYear = (dateInput) => {
    const dt = parseLocalDate(dateInput);
    if (!dt) return '';
    return String(dt.getFullYear());
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Main Content */}
      <div className="container mx-auto px-4 pt-24 md:pt-32 lg:pt-38 pb-16">
        {/* Tabs */}
        <div className="mb-12">
          <div className="flex flex-wrap justify-center gap-3">
            {['books', 'worship', 'sermons'].map((tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  type="button"
                  aria-current={isActive ? 'true' : undefined}
                  className={`px-8 py-2.5 rounded-full font-semibold transition-colors focus:outline-none ${isActive ? 'bg-[#FDB813] text-black shadow-md ring-2 ring-offset-2 ring-[#FDB813]' : 'bg-[#2E2E2E] text-white hover:bg-[#FDB813] hover:text-black focus:ring-2 focus:ring-offset-2 focus:ring-[#FDB813]'}`}
                  style={{ cursor: 'pointer' }}
                  onClick={() => { setActiveTab(tab); setSelectedBook(null); }}
                >
                  {t(`tabs.${tab}`)}
                </button>
              );
            })}
          </div>
        </div>
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
              displayResources.books.map((book, index) => (
              <div key={book.id} className="bg-[#2E2E2E] rounded-lg overflow-hidden shadow-lg hover:scale-102 hover:shadow-2xl transition-all duration-300 ease-in-out flex flex-col">
                <div className="h-64 overflow-hidden relative">
                  <ImageWithFallback
                    src={book.coverImage}
                    alt={book.title}
                    className="w-full h-full object-cover"
                    loading={index < 3 ? 'eager' : 'lazy'}
                    priority={index < 3}
                  />
                  {/* Language badge overlay */}
                  <div className="absolute top-0 right-0 bg-[#FDB813] px-3 py-1 rounded-bl-lg font-bold shadow-md text-xs" style={{ color: '#000000' }}>
                    {formatLanguage(book.language)}
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold mb-2">{book.title}</h3>
                  <p className="text-white mb-4">{book.author}</p>
                  
                  {/* Price and Details button: price left, Details button right (Add to Cart removed) */}
                  <div className="mt-auto flex items-center justify-between">
                    <div className="text-[#FDB813] font-bold text-xl">₹{book.price}</div>
                    <button
                      className="py-2 px-4 bg-[#FDB813] rounded-full hover:bg-[#e5a711] transition-all duration-200 flex items-center justify-center whitespace-nowrap font-bold"
                      onClick={() => setSelectedBook(book)}
                      style={{ cursor: 'pointer', color: '#000000' }}
                    >
                      {t('buttons.details')}
                    </button>
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
              className="ml-4 mt-4 px-4 py-2 bg-[#FDB813] rounded-full hover:bg-opacity-80 transition-colors font-bold"
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
                  <p className="text-gray-300">{t('books.publishedLabel')}: {formatYear(selectedBook.publishDate)}</p>
                </div>
                {/* Order books (design update) - separator above, non-card layout */}
                <div className="mt-8 border-t border-gray-700 pt-6">
                  <h3 className="text-white text-xl font-semibold mb-4">{t('books.contactHeading')}<br/>
                  <span className="text-2xl font-bold">{t('books.contactName')}</span></h3>

                  <div className="flex flex-col items-start gap-4">
                    <a
                      href="https://wa.me/918309655233"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full md:w-1/3 flex items-center justify-between p-4 bg-gray-800 bg-opacity-30 rounded-lg border border-gray-700 hover:border-[#FDB813] transition-colors shadow-sm"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full flex items-center justify-center bg-[#12323a]">
                          <MessageCircle className="w-6 h-6" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-gray-400">WhatsApp</div>
                          <div className="text-sm text-white font-medium">+91 83096 55233</div>
                        </div>
                      </div>
                      <ArrowUpRight className="w-5 h-5 text-slate-500 group-hover:text-white transition-colors" />
                    </a>

                    <a
                      href="tel:+918309655233"
                      className="w-full md:w-1/3 flex items-center justify-between p-4 bg-gray-800 bg-opacity-30 rounded-lg border border-gray-700 hover:border-[#FDB813] transition-colors shadow-sm"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full flex items-center justify-center bg-[#0b1530]">
                          <Phone size={18} className="text-[#60A5FA]" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-gray-400">Voice Call</div>
                          <div className="text-sm text-white font-medium">+91 83096 55233</div>
                        </div>
                      </div>
                      <ArrowUpRight className="w-5 h-5 text-slate-500 group-hover:text-white transition-colors" />
                    </a>
                  </div>
                </div>
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
                  {getVisibleItems(displayResources.worship, "worship").map((item, index) => (
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
                      loading={index < 4 ? 'eager' : 'lazy'}
                      priority={index < 4}
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
                      className="bg-[#FDB813] shadow-lg text-black rounded-full hover:bg-[#e5a711] font-semibold transition-colors duration-300 cursor-pointer py-3 px-6"
                      onClick={() => loadMore("worship")}
                      style={{ cursor: 'pointer' }}
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
                  {getVisibleItems(displayResources.sermons, "sermons").map((sermon, index) => (
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
                      loading={index < 4 ? 'eager' : 'lazy'}
                      priority={index < 4}
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
                      <div className="flex items-center text-xs text-white gap-2">
                        <Calendar size={14} color="#FFFFFF" className="mr-1.5 flex-shrink-0" />
                        <span>{formatDate(sermon.date)}</span>
                      </div>
                    </div>
                  </div>
                </a>
              ))}
                </div>
                
                {displayResources.sermons.length > getVisibleItems(displayResources.sermons, "sermons").length && (
                  <div className="mt-8 text-center">
                    <button 
                      className="bg-[#FDB813] shadow-lg text-black rounded-full hover:bg-[#e5a711] font-semibold transition-colors duration-300 cursor-pointer py-3 px-6"
                      onClick={() => loadMore("sermons")}
                      style={{ cursor: 'pointer' }}
                    >
                      {t('buttons.loadMore')}
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* Bible Studies section removed */}
      </div>
    </div>
  );
}

// Bounce animation CSS is injected on the client inside the component via useEffect