import { Menu, X } from 'lucide-react';

const ybhLogo = 'https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/logo/YBH.jpg';
const guinnessWorldRecords = 'https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Home/awards/guiness.png';
const asianBookOfRecords = 'https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Home/awards/Asian%20book%20of%20records.png';
const ingeniousWorldRecords = 'https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Home/awards/ingenious.png';
const internationalStarBookOfRecords = 'https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Home/awards/Star%20book%20of%20records%20-%20final.png';

interface TopBannerProps {
  isMenuOpen?: boolean;
  onMenuToggle?: () => void;
}

export function TopBanner({ isMenuOpen = false, onMenuToggle }: TopBannerProps) {
  const handleLogoClick = () => {
    window.history.pushState({}, '', '/');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return (
    <div className="bg-black py-3 px-4">
      <div className="container mx-auto">
        {/* Mobile Layout - Logo Left, Text Center-Left, Hamburger Right */}
        <div className="flex items-center justify-between gap-2 lg:hidden">
          <button 
            onClick={handleLogoClick}
            className="outline-none transition-opacity hover:opacity-80 cursor-pointer flex-shrink-0"
            aria-label="Go to home page"
          >
            <img 
              src={ybhLogo} 
              alt="Yeshua Beth Hallel Ministries" 
              className="h-12 w-auto object-contain"
            />
          </button>
          <h1 className="text-white text-sm sm:text-base flex-1 tracking-wide leading-tight text-center">
            <b>YESHUA BETH HALLEL MINISTRIES</b>
          </h1>
          {/* Hamburger Menu Button */}
          <button
            onClick={onMenuToggle}
            className="text-white hover:text-yellow-400 cursor-pointer p-2 flex-shrink-0"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Desktop Layout - Logo Left, Text Center, Record Logos Right */}
        <div className="hidden lg:flex items-center justify-between relative">
          {/* YBH Logo - Left Aligned */}
          <div className="flex items-center">
            <button 
              onClick={handleLogoClick}
              className="outline-none transition-opacity hover:opacity-80 cursor-pointer"
              aria-label="Go to home page"
            >
              <img 
                src={ybhLogo} 
                alt="Yeshua Beth Hallel Ministries" 
                className="h-16 w-auto object-contain"
              />
            </button>
          </div>
          
          {/* Ministry Name - Absolutely Centered */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <h1 className="text-white text-3xl tracking-wide whitespace-nowrap">
              <b>YESHUA BETH HALLEL MINISTRIES</b>
            </h1>
          </div>
          
          {/* Record Logos - Right Aligned */}
          <div className="flex items-center gap-3">
            <img 
              src={guinnessWorldRecords} 
              alt="Guinness World Records" 
              className="h-12 w-auto object-contain"
            />
            <img 
              src={asianBookOfRecords} 
              alt="Asian Book of Records" 
              className="h-12 w-auto object-contain"
            />
            <img 
              src={ingeniousWorldRecords} 
              alt="Ingenious Charm World Records" 
              className="h-12 w-auto object-contain"
            />
            <img 
              src={internationalStarBookOfRecords} 
              alt="International Star Book of Records" 
              className="h-12 w-auto object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
