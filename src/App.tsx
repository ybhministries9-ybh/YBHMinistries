import { useState, useEffect } from 'react';
import { Toaster } from 'sonner@2.0.3';
import './i18n/config'; // Initialize i18n
import { Header } from './components/Header';
import { Home } from './components/Home';
import { AboutPage } from './components/AboutPage';
import { Gallery } from './components/Gallery';
import { Footer } from './components/Footer';
import { ImageWithFallback } from './components/figma/ImageWithFallback';
import { primaryBackground } from './utils/theme';

// Ministry Pages
import { HallelMusicSchoolMinistry } from './components/ministries/HallelMusicSchoolMinistry';
import { HallelBibleSchoolMinistry } from './components/ministries/HallelBibleSchoolMinistry';
import { HallelConferences } from './components/ministries/HallelConferences';
import { HallelWorshipDay } from './components/ministries/HallelWorshipDay';
import { HallelBibleCollege } from './components/ministries/HallelBibleCollege';
import { HMSSummerTraining } from './components/ministries/HMSSummerTraining';
import { HallelChurch } from './components/ministries/HallelChurch';
import { OtherMinistries } from './components/ministries/OtherMinistries';
import { HMSPage } from './components/ministries/HMSPage';
import { MinistriesPage } from './components/ministries/MinistriesPage';

// News Room Pages
import { NewsPage } from './components/newsroom/NewsPage';

// Resources Page
import { ResourcesPage } from './components/ResourcesPage';

// Products - HIDDEN (replaced by Music Books)
// import { ProductsPageStandalone } from './components/products/ProductsPageStandalone';
// import { ProductDetailPageStandalone } from './components/products/ProductDetailPageStandalone';

// Admin
import { AdminLogin } from './components/admin/AdminLogin';
import { AdminDashboard } from './components/admin/AdminDashboard';

// Legal Pages
import { PrivacyPolicy } from './components/PrivacyPolicy';
import { TermsOfService } from './components/TermsOfService';
import { Accessibility } from './components/Accessibility';
import { DonatePage } from './components/DonatePage';
import { StoriesPage } from './components/StoriesPage';
import { ContactsPage } from './components/ContactsPage';
import { DirectorsPage } from './components/DirectorsPage';
import { AwardsPage } from './components/AwardsPage';

export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState<string>('');

  useEffect(() => {
    // Handle browser back/forward buttons and custom navigation
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
      window.scrollTo(0, 0); // Scroll to top on navigation
    };
    
    const handleNavigate = (event: CustomEvent) => {
      const path = event.detail.path;
      window.history.pushState({}, '', path);
      // Extract pathname without query string or hash for routing
      const pathname = path.split('?')[0].split('#')[0];
      setCurrentPath(pathname);
      window.scrollTo(0, 0); // Scroll to top on navigation
    };
    
    window.addEventListener('popstate', handlePopState);
    window.addEventListener('navigate' as any, handleNavigate as any);
    
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('navigate' as any, handleNavigate as any);
    };
  }, []);

  useEffect(() => {
    const isAdminRoute = currentPath === '/admin';
    if (isAdminRoute) {
      const savedToken = localStorage.getItem('admin_token');
      if (savedToken) {
        setToken(savedToken);
        setIsAuthenticated(true);
      }
    }
  }, [currentPath]);

  const handleLogin = (accessToken: string) => {
    setToken(accessToken);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    setToken('');
    setIsAuthenticated(false);
    window.history.pushState({}, '', '/admin');
    setCurrentPath('/admin');
  };

  // Admin routes
  if (currentPath === '/admin') {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Login page temporarily disabled - showing dashboard directly */}
        <AdminDashboard token={token} onLogout={handleLogout} />
        {/* 
        {isAuthenticated ? (
          <AdminDashboard token={token} onLogout={handleLogout} />
        ) : (
          <AdminLogin onLogin={handleLogin} />
        )}
        */}
        <Toaster position="bottom-center" />
      </div>
    );
  }

  // Legal pages (no header/footer)
  if (currentPath === '/privacy-policy') {
    return <PrivacyPolicy />;
  }

  if (currentPath === '/terms-of-service') {
    return <TermsOfService />;
  }

  if (currentPath === '/accessibility') {
    return <Accessibility />;
  }

  // Products pages - HIDDEN (replaced by Music Books)
  /*
  if (currentPath === '/products') {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <ProductsPageStandalone />
        <Footer />
        <Toaster position="bottom-center" />
      </div>
    );
  }

  if (currentPath.startsWith('/products/')) {
    const productId = currentPath.split('/')[2];
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <ProductDetailPageStandalone productId={productId} />
        <Footer />
        <Toaster position="bottom-center" />
      </div>
    );
  }
  */

  // Ministry routes
  if (currentPath === '/ministries') {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <MinistriesPage />
        <Footer />
        <Toaster position="bottom-center" />
      </div>
    );
  }

  if (currentPath === '/ministries/otherministries') {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <OtherMinistries />
        <Footer />
        <Toaster position="bottom-center" />
      </div>
    );
  }

  if (currentPath === '/ministries/hallelmusicschool') {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <HallelMusicSchoolMinistry />
        <Footer />
        <Toaster position="bottom-center" />
      </div>
    );
  }

  if (currentPath === '/ministries/hallelbibleschool') {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <HallelBibleSchoolMinistry />
        <Footer />
        <Toaster position="bottom-center" />
      </div>
    );
  }

  if (currentPath === '/ministries/hallelconferences') {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <HallelConferences />
        <Footer />
        <Toaster position="bottom-center" />
      </div>
    );
  }

  if (currentPath === '/ministries/hallelworshipday') {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <HallelWorshipDay />
        <Footer />
        <Toaster position="bottom-center" />
      </div>
    );
  }

  if (currentPath === '/ministries/hallelbiblecollege') {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <HallelBibleCollege />
        <Footer />
        <Toaster position="bottom-center" />
      </div>
    );
  }

  if (currentPath === '/ministries/hmssummertraining') {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <HMSSummerTraining />
        <Footer />
        <Toaster position="bottom-center" />
      </div>
    );
  }

  if (currentPath === '/ministries/hms') {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <HMSPage />
        <Footer />
        <Toaster position="bottom-center" />
      </div>
    );
  }

  if (currentPath === '/ministries/hallelchurch') {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <HallelChurch />
        <Footer />
        <Toaster position="bottom-center" />
      </div>
    );
  }

  // News route - simplified to single page
  if (currentPath === '/news') {
    return (
      <div className="min-h-screen" style={{ backgroundColor: primaryBackground }}>
        <Header />
        <NewsPage />
        <Footer />
        <Toaster position="bottom-center" />
      </div>
    );
  }

  // Awards page
  if (currentPath === '/awards') {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <AwardsPage />
        <Footer />
        <Toaster position="bottom-center" />
      </div>
    );
  }

  // About page
  if (currentPath === '/about') {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <AboutPage />
        <Footer />
        <Toaster position="bottom-center" />
      </div>
    );
  }

  // Gallery page
  if (currentPath === '/gallery') {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <Gallery />
        <Footer />
        <Toaster position="bottom-center" />
      </div>
    );
  }

  // Music Books page (E-commerce - replaces Products)
  // Resources page
  if (currentPath === '/resources') {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <ResourcesPage />
        <Footer />
        <Toaster position="bottom-center" />
      </div>
    );
  }

  // Donate page
  if (currentPath === '/donate') {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <DonatePage />
        <Footer />
        <Toaster position="bottom-center" />
      </div>
    );
  }

  // Stories page (using StoriesNew)
  if (currentPath === '/stories' || currentPath === '/storiesnew') {
    return (
      <div className="min-h-screen" style={{ backgroundColor: primaryBackground }}>
        <Header />
        <StoriesPage />
        <Footer />
        <Toaster position="bottom-center" />
      </div>
    );
  }

  // Contact page - HMS Student Form
  if (currentPath === '/contact') {
    return (
      <div className="min-h-screen" style={{ backgroundColor: primaryBackground }}>
        <Header />
        <ContactsPage />
        <Footer />
        <Toaster position="bottom-center" />
      </div>
    );
  }

  // Directors page
  if (currentPath === '/directors') {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <DirectorsPage />
        <Footer />
        <Toaster position="bottom-center" />
      </div>
    );
  }

  // Home page (default route)
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#2E2E2E' }}>
      <Header />
      <Home />
      <Footer />
      <Toaster position="bottom-center" />
    </div>
  );
}
