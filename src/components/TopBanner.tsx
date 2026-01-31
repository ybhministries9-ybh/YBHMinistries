import { Menu, X } from 'lucide-react';
import SmartImage from './SmartImage';

// Allow local assets (in `public/`) for a small set of logos, else fall back to R2 public URL.
const USE_LOCAL_ASSETS = process.env.NEXT_PUBLIC_USE_LOCAL_ASSETS === 'true';
const R2_BASE = process.env.NEXT_PUBLIC_R2_PUBLIC_URL || '';

const LOCAL_YBH_LOGO = '/logo/ybh.png';
const LOCAL_GUINNESS = '/logo/awards/guiness.png';
const LOCAL_ASIA_BOOK = '/logo/awards/AsiaBookOfRecords.png';
const LOCAL_INGENIOUS = '/logo/awards/ingenious.png';
const LOCAL_INTERNATIONAL_STAR = '/logo/awards/Star%20book%20of%20records.png';
const LOCAL_INTERNATIONAL_STAR_FINAL = '/logo/awards/Star%20book%20of%20records.png';

const ybhR2 = `${R2_BASE}/logo/ybh.png`;
const ybhR2Png = `${R2_BASE}/logo/ybh.png`;
const ybhR2Jpg = `${R2_BASE}/logo/ybh.png`;
const guinnessR2 = `${R2_BASE}/logo/awards/guiness.png`;
const asiaBookR2 = `${R2_BASE}/logo/awards/AsiaBookOfRecords.png`;
const ingeniousR2 = `${R2_BASE}/logo/awards/ingenious.png`;
const internationalStarR2 = `${R2_BASE}/logo/awards/Star%20book%20of%20records.png`;

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
            <SmartImage
              srcs={[LOCAL_YBH_LOGO, '/logo/YBH.png', '/logo/YBH.jpg', ybhR2Png, ybhR2Jpg]}
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
              <SmartImage
                srcs={[LOCAL_YBH_LOGO, '/logo/YBH.png', '/logo/YBH.jpg', ybhR2Png, ybhR2Jpg]}
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
            <SmartImage
              srcs={[LOCAL_GUINNESS, guinnessR2]}
              alt="Guinness World Records"
              className="h-12 w-auto object-contain"
            />
            <SmartImage
              srcs={[LOCAL_ASIA_BOOK, asiaBookR2]}
              alt="Asia Book of Records"
              className="h-12 w-auto object-contain"
            />
            <SmartImage
              srcs={[LOCAL_INGENIOUS, ingeniousR2]}
              alt="Ingenious Charm World Record"
              className="h-12 w-auto object-contain"
            />
            <SmartImage
              srcs={[
                LOCAL_INTERNATIONAL_STAR_FINAL,
                LOCAL_INTERNATIONAL_STAR,
                '/logo/awards/star-book-of-records.png',
                internationalStarR2,
                `${R2_BASE}/Home/awards/Star%20book%20of%20records.png`,
              ]}
              alt="International Star Book of Records"
              className="h-12 w-auto object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
