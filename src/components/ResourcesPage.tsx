import { useState, useRef, useEffect } from "react";
import { ShoppingCart, Play, Download, FileText, ExternalLink, Plus, Minus, X, Youtube, Calendar, Clock } from "lucide-react";
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useTranslation } from 'react-i18next';

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
    const hash = window.location.hash.replace('#', '');
    if (hash === 'worship' || hash === 'sermons' || hash === 'bibleStudies') {
      return hash;
    }
    return "books";
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

  // Mock data for resources
  const resources = {
    books: [
      {
        id: 1,
        title: "Hallel Music School - Music Formula",
        author: "Ps. Augustine Dandingi",
        price: 550,
        pages: 48,
        language: "English",
        coverImage: "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Books/English/English.jpg?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        additionalImages: [
          "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Books/English/1n.JPG?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Books/English/2n.JPG?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        ],
        description: "This comprehensive worship collection includes traditional and contemporary songs with complete musical chords and lyrics in English. Perfect for worship leaders, musicians, and congregations.",
        fullDescription: "This comprehensive worship collection includes traditional and contemporary songs with complete musical chords and lyrics in English. Perfect for worship leaders, musicians, and congregations.",
        publishDate: "2025"
      },
      {
        id: 2,
        title: "Hallel Music School - Music Formula",
        author: "Ps. Augustine Dandingi",
        price: 1105,
        pages: 48,
        language: "English & Telugu",
        coverImage: "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Books/English/English.jpg?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        additionalImages: [
          "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Books/Telugu/Telugu.jpg?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Books/English/1n.JPG?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Books/English/2n.JPG?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Books/Telugu/1.JPG?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Books/Telugu/2.JPG?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        ],
        description: "This comprehensive worship collection includes traditional and contemporary songs with complete musical chords and lyrics in English. Perfect for worship leaders, musicians, and congregations.",
        fullDescription: "This comprehensive worship collection includes traditional and contemporary songs with complete musical chords and lyrics in English. Perfect for worship leaders, musicians, and congregations.",
        publishDate: "2025"
      },
      {
        id: 3,
        title: "హల్లేల్ ఆరాధన పాటలు - సంపుటము 1",
        author: "Ps. Augustine Dandingi",
        price: 550,
        pages: 48,
        language: "Telugu",
        coverImage: "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Books/Telugu/Telugu.jpg?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        additionalImages: [
          "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Books/Telugu/1.JPG?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Books/Telugu/2.JPG?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        ],
        description: "This comprehensive worship collection includes traditional and contemporary songs with complete musical chords and lyrics in English. Perfect for worship leaders, musicians, and congregations.",
        fullDescription: "This comprehensive worship collection includes traditional and contemporary songs with complete musical chords and lyrics in English. Perfect for worship leaders, musicians, and congregations.",
        publishDate: "2025"
      }
    ],
    worship: [
      {
        id: 1,
        title: "Shuddha Hrudayam(శుద్ధా హృదయం)",
        artist: "Ps. Augustine Dandingi",
        duration: "7:20",
        date: "2020-08-08",
        youtubeUrl: "https://youtu.be/ViZtowhZGY4?si=lfOYE0XUBYBTGElK",
        description: "నేను రాసిన అనేక_పాటల్లో ఇది ఒక అద్భుతమైన పాట."
      },
      {
        id: 2,
        title: "BAHU BALAVANTHUDA ADONAI",
        artist: "Paul Wilbur",
        duration: "6:41",
        date: "2021-01-09",
        youtubeUrl: "https://www.youtube.com/watch?v=Tm7_U6PZz48&list=PLAMsL02VKnnLIbilT-D51AN4gyAeQ4d0s",
        description: "ఈ పాట Jerusalem Arise (2000) ఆల్బం లోనిది. Paul Wilbur అనే అంతర్జాతీయ ఆరాధన నాయకులు రాసి స్వరపరిచారు."
      },
      {
        id: 8,
        title: "KADOSH | HEBREW CHRISTIAN SONG",
        artist: "Ps. Augustine Dandingi",
        duration: "5:06",
        date: "2020-08-18",
        youtubeUrl: "https://youtu.be/rjYVo78EQ5M?si=OOWAjVTfNrRk5Efe",
        description: "Song Written By Paul Wilbur from Jerusalem arise Album"
      },
      {
        id: 7,
        title: "నీకు వెలుగు వచ్చియున్నది",
        artist: "Ps. Augustine Dandingi",
        duration: "5:31",
        date: "2021-02-02",
        youtubeUrl: "https://youtu.be/eimSvVIB4mo?si=BdoG-bBB0Q9VK4vC",
        description: "ఈ పాట తరువాత నా జీవితాన్ని దేవుడు మరొక ఎత్తుకు తీసుకుని వెళ్ళాడు. ఈ పాటలో ఉన్న మాటలు నెరవేర్పు అప్పుడు ప్రారంభమై ఇప్పటికీ నా జీవితంలో కొనసాగుతూ ఉన్నాయి."
      },
      {
        id: 3,
        title: "యెహోవాను ఆశ్రయించినా",
        artist: "Ps. AUGUSTINE DANDINGI",
        duration: "5:11",
        date: "2020-10-31",
        youtubeUrl: "https://youtu.be/jPDVVwjCGFU?si=5YaKdqdVypTIFDrs",
        description: "యెహోవానూ ఆశ్రయించినా\nలేమి నీకు లేనే లేదు"
      },
      {
        id: 9,
        title: "దేవా యెహోవా నా ప్రియుడగు తండ్రి",
        artist: "Ps. Augustine Dandingi",
        duration: "5:41",
        date: "2020-10-01",
        youtubeUrl: "https://youtu.be/qYVmx0TaxT8?si=KSfU_mBPr66dtld2",
        description: "ఈ పాట ఒక శుద్ధమైన ఆరాధన పాట (PURE WORSHIP SONG)."
      },
      {
        id: 5,
        title: "Okasari Chudalani[ఒకసారి చూడాలని]",
        artist: "Ps. AUGUSTINE DANDINGI",
        duration: "7:48",
        date: "2020-09-02",
        youtubeUrl: "https://youtu.be/sVU3OulG58I?si=L9eyiR5WJsBUYtrL",
        description: "ఒకసారి చూడాలనీ, ఒకసారి చూడాలనీ"
      },
      {
        id: 4,
        title: "Dhavalavarnuda Ratnavarnuda",
        artist: "Ps. AUGUSTINE DANDINGI",
        duration: "6:44",
        date: "2023-08-30",
        youtubeUrl: "https://youtu.be/2VmoU3WIvHM?si=SHVWS-2WhUzt0YEJ",
        description: "ప్రకటన గ్రంధమును ముందుపెట్టుకుని అందులో వాక్యముతో యేసయ్యను వర్ణిస్తూ రచించిన ఒక PURE WORSHIP SONG."
      },
      {
        id: 6,
        title: "Yesu Naamam | యేసు నామం",
        artist: "Nancy Ophir Augustina",
        duration: "7:32",
        date: "2022-01-24",
        youtubeUrl: "https://www.youtube.com/watch?v=9JuLp8WlbIk",
        description: "Written By: Ps. Augustine Dandingi\nSung By: Master Nancy Ophir Augustina Dandingi"
      },     
      {
        id: 10,
        title: "Shofar blowing Augustine Dandingi",
        artist: "Ps. Augustine Dandingi",
        duration: "2:09",
        date: "2017-05-25",
        youtubeUrl: "https://youtu.be/iWk-dUQT_nU?si=ReJt9OvWs8uX24aU",
        description: "Shofar blowing Augustine Dandingi"
      }
    ],
    sermons: [
      {
        id: 1,
        title: "కుటుంబ ఆరాధనలోని శక్తి",
        speaker: "Ps. Augustine Dandingi",
        duration: "1:00",
        date: "2025-10-18",
        thumbnailUrl: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        youtubeUrl: "https://youtube.com/shorts/ArUfnNDkflQ?si=dFoultTsZeC3-GMl",
        description: "కుటుంబ ఆరాధనలోని శక్తి"
      },
      {
        id: 2,
        title: "మీ పిల్లల్లో ఉన్న టాలెంట్ ఇలా గుర్తించండి. Part 1",
        speaker: "Ps. Augustine Dandingi",
        duration: "1:00",
        date: "2025-10-15",
        thumbnailUrl: "https://images.unsplash.com/photo-1507692049790-de58290a4334?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        youtubeUrl: "https://www.youtube.com/shorts/xH63IzaXyd0",
        description: "మీ పిల్లల్లో ఉన్న టాలెంట్ ఇలా గుర్తించండి. Part 1"
      },
      {
        id: 3,
        title: "Worship is War Ship",
        speaker: "Ps. Augustine Dandingi",
        duration: "1:00",
        date: "2025-09-09",
        thumbnailUrl: "https://images.unsplash.com/photo-1504439468489-c8920d796a29?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        youtubeUrl: "https://www.youtube.com/shorts/RNdULE8qJw8",
        description: "Worship is War Ship"
      },
      {
        id: 4,
        title: "దెబ్బలు తిన్న నీవు గొప్ప స్థితిలో ఉంటావు",
        speaker: "Ps. Augustine Dandingi",
        duration: "1:00",
        date: "2025-09-01",
        thumbnailUrl: "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        youtubeUrl: "https://www.youtube.com/shorts/lLBPWYkhxgI",
        description: "దెబ్బలు తిన్న నీవు గొప్ప స్థితిలో ఉంటావు"
      },
      {
        id: 5,
        title: "Origin of worship",
        speaker: "Ps. Augustine Dandingi",
        duration: "1:00",
        date: "2025-08-30",
        thumbnailUrl: "https://images.unsplash.com/photo-1516450360452-9312f5463805?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        youtubeUrl: "https://www.youtube.com/shorts/LpaFU3VfILU",
        description: "Origin of worship"
      }
    ],
    bibleStudies: [
      {
        id: 1,
        title: "The Book of Romans",
        author: "Dr. James White",
        pages: 45,
        date: "2023-01-20",
        fileType: "PDF",
        fileUrl: "#",
        thumbnailUrl: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "An in-depth study of Paul's letter to the Romans."
      },
      {
        id: 2,
        title: "The Sermon on the Mount",
        author: "Dr. Sarah Johnson",
        pages: 32,
        date: "2023-02-15",
        fileType: "PDF",
        fileUrl: "#",
        thumbnailUrl: "https://images.unsplash.com/photo-1476041800959-2f6bb412c8ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Exploring Jesus' teachings in Matthew 5-7."
      },
      {
        id: 3,
        title: "The Psalms of David",
        author: "Dr. Michael Brown",
        pages: 38,
        date: "2023-03-10",
        fileType: "PDF",
        fileUrl: "#",
        thumbnailUrl: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Finding comfort and wisdom in the Psalms."
      },
      {
        id: 4,
        title: "The Gospel of John",
        author: "Dr. Emily Wilson",
        pages: 42,
        date: "2023-04-05",
        fileType: "PDF",
        fileUrl: "#",
        thumbnailUrl: "https://images.unsplash.com/photo-1501612780327-45045538702b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Understanding the unique perspective of John's Gospel."
      },
      {
        id: 5,
        title: "The Book of Revelation",
        author: "Dr. David Lee",
        pages: 56,
        date: "2023-05-20",
        fileType: "PDF",
        fileUrl: "#",
        thumbnailUrl: "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Decoding the symbolism and message of Revelation."
      },
      {
        id: 6,
        title: "The Parables of Jesus",
        author: "Dr. Rachel Green",
        pages: 35,
        date: "2023-06-15",
        fileType: "PDF",
        fileUrl: "#",
        thumbnailUrl: "https://images.unsplash.com/photo-1504439468489-c8920d796a29?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Understanding the stories Jesus used to teach."
      },
      {
        id: 7,
        title: "The Book of Proverbs",
        author: "Dr. Thomas Clark",
        pages: 40,
        date: "2023-07-10",
        fileType: "PDF",
        fileUrl: "#",
        thumbnailUrl: "https://images.unsplash.com/photo-1507692049790-de58290a4334?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Wisdom for daily living from the book of Proverbs."
      },
      {
        id: 8,
        title: "The Epistle to the Hebrews",
        author: "Dr. Jennifer Adams",
        pages: 48,
        date: "2023-08-05",
        fileType: "PDF",
        fileUrl: "#",
        thumbnailUrl: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Exploring the superiority of Christ in Hebrews."
      },
      {
        id: 9,
        title: "The Book of Acts",
        author: "Dr. Robert Wilson",
        pages: 52,
        date: "2023-09-20",
        fileType: "PDF",
        fileUrl: "#",
        thumbnailUrl: "https://images.unsplash.com/photo-1501612780327-45045538702b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "The early church and the spread of Christianity."
      },
      {
        id: 10,
        title: "The Book of Daniel",
        author: "Dr. Lisa Martinez",
        pages: 44,
        date: "2023-10-15",
        fileType: "PDF",
        fileUrl: "#",
        thumbnailUrl: "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Prophecy and faithfulness in the book of Daniel."
      },
      {
        id: 11,
        title: "The Beatitudes",
        author: "Dr. Kevin Johnson",
        pages: 30,
        date: "2023-11-10",
        fileType: "PDF",
        fileUrl: "#",
        thumbnailUrl: "https://images.unsplash.com/photo-1504439468489-c8920d796a29?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Jesus' teachings on true happiness and blessing."
      },
      {
        id: 12,
        title: "The Fruit of the Spirit",
        author: "Dr. Michelle Taylor",
        pages: 36,
        date: "2023-12-05",
        fileType: "PDF",
        fileUrl: "#",
        thumbnailUrl: "https://images.unsplash.com/photo-1507692049790-de58290a4334?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Developing godly character through the Holy Spirit."
      }
    ]
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

  // Format date to be more readable
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: '2-digit' });
  };

  // Format duration to add minutes
  const formatDuration = (duration) => {
    const parts = duration.split(':');
    const minutes = parseInt(parts[0]);
    const seconds = parts[1];
    return `${minutes}:${seconds} min`;
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Main Content */}
      <div className="container mx-auto px-4 pt-24 md:pt-32 lg:pt-38 pb-16">
        {/* Tabs */}
        <div className="mb-12">
          <div className="flex flex-wrap justify-center gap-4">
            {["books", "worship", "sermons", "bibleStudies"].map((tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  className={`px-6 py-3 rounded-md font-medium transition-all duration-300 ${
                    isActive
                      ? "bg-[#FDB813] shadow-md ring-2 ring-offset-2 ring-[#FDB813]"
                      : "bg-[#2E2E2E] text-white hover:bg-[#FDB813] focus:ring-2 focus:ring-offset-2 focus:ring-[#FDB813]"
                  }`}
                  style={isActive ? { color: '#000000', cursor: 'pointer' } : { cursor: 'pointer' }}
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
            {resources.books.map((book) => (
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
                    <div className="flex gap-3">
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
            ))}
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {getVisibleItems(resources.worship, "worship").map((item) => (
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
                      <p className="text-white text-xs">{item.artist}</p>
                    </div>
                    <div className="px-4 pb-4 pt-2 mt-auto">
                      <div className="flex items-center justify-between text-xs text-white gap-2">
                        <div className="flex items-center">
                          <Clock size={14} className="mr-1.5 flex-shrink-0" />
                          <span>{formatDuration(item.duration)}</span>
                        </div>
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
            
            {resources.worship.length > getVisibleItems(resources.worship, "worship").length && (
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
          </div>
        )}

        {/* Sermons Tab Content */}
        {activeTab === "sermons" && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {getVisibleItems(resources.sermons, "sermons").map((sermon) => (
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
                        <div className="flex items-center">
                          <Calendar size={14} className="mr-1.5 flex-shrink-0" />
                          <span>{formatDate(sermon.date)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
            
            {resources.sermons.length > getVisibleItems(resources.sermons, "sermons").length && (
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
          </div>
        )}

        {/* Bible Studies Tab Content */}
        {activeTab === "bibleStudies" && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {getVisibleItems(resources.bibleStudies, "bibleStudies").map((study) => (
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
                        <Calendar size={14} className="mr-1.5 flex-shrink-0" />
                        <span>{formatDate(study.date)}</span>
                      </div>
                    </div>
                    
                    <div className="flex space-x-5">
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
            
            {resources.bibleStudies.length > getVisibleItems(resources.bibleStudies, "bibleStudies").length && (
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
          </div>
        )}
      </div>
    </div>
  );
}

// Add CSS for bounce animation
const style = document.createElement('style');
style.textContent = `
  @keyframes bounce {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
  }
  .animate-bounce {
    animation: bounce 0.6s ease;
  }
`;
document.head.appendChild(style);