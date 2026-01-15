import { MapPin, Phone, Mail, Facebook, Instagram, Youtube, Twitter, Languages } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import SmartImage from './SmartImage';

// Build public image URLs from an environment-provided R2 public URL.
// R2_BASE may be empty in local development.
const R2_BASE = process.env.NEXT_PUBLIC_R2_PUBLIC_URL || '';

// Local paths (place files under `public/logo/` and `public/Home/awards/`)
const LOCAL_YBH_LOGO = '/logo/ybh.png';
const LOCAL_GUINNESS = '/logo/awards/guiness.png';
const LOCAL_ASIA_BOOK = '/logo/awards/AsiaBookOfRecords.png';
const LOCAL_INGENIOUS = '/logo/awards/ingenious.png';
const LOCAL_INTERNATIONAL_STAR = '/logo/awards/Star%20book%20of%20records.png';
const LOCAL_INTERNATIONAL_STAR_FINAL = '/logo/awards/Star%20book%20of%20records.png';

const ybhR2 = `${R2_BASE}/logo/YBH.jpg`;
const ybhR2Png = `${R2_BASE}/logo/ybh.png`;
const guinnessR2 = `${R2_BASE}/logo/awards/guiness.png`;
const asiaBookR2 = `${R2_BASE}/logo/awards/AsiaBookOfRecords.png`;
const ingeniousR2 = `${R2_BASE}/logo/awards/ingenious.png`;
const internationalStarR2 = `${R2_BASE}/logo/awards/Star%20book%20of%20records.png`;

interface FooterProps {
  siteTitle?: string;
}

export function Footer({ siteTitle = 'Yeshua Beth Hallel Ministries' }: FooterProps) {
  const { t, i18n } = useTranslation('common');


  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  return (
    <footer className="bg-black text-gray-300">
      {/* Dark Gray Line Separator - Full Width */}
      <div className="w-full h-0.5" style={{ backgroundColor: '#333333' }}></div>
      
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 pt-8 pb-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Site Title Column */}
          <div itemScope itemType="https://schema.org/Organization">
            <div className="flex flex-col items-center mb-3">
              <SmartImage
                srcs={[LOCAL_YBH_LOGO, '/logo/YBH.png', '/logo/YBH.jpg', ybhR2Png, ybhR2]}
                alt="YBH Logo"
                className="h-12 w-12 object-contain block"
                itemProp="logo"
              />
              <h3 className="text-white text-center mt-2 block w-full" itemProp="name">{t('footer.siteTitle')}</h3>
            </div>
            <p className="text-sm text-gray-400 mb-4">
              {t('footer.description')}
            </p>
            
            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <MapPin size={16} className="mt-1 flex-shrink-0 text-gray-400" />
                <span>{t('footer.contact.address')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={16} className="flex-shrink-0 text-gray-400" />
                <span>{t('footer.contact.phone')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={16} className="flex-shrink-0 text-gray-400" />
                <a href="mailto:hallelmusicschoolybh@gmail.com" className="hover:text-white transition-colors">
                  {t('footer.contact.email')}
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className="text-white mb-4">{t('footer.quickLinks')}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => scrollToSection('about')} className="hover:text-white transition-colors">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('ministries')} className="hover:text-white transition-colors">
                  Ministries
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('events')} className="hover:text-white transition-colors">
                  Events
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('contact')} className="hover:text-white transition-colors">
                  Contact
                </button>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Donate
                </a>
              </li>
            </ul>
          </div>

          {/* Ministries Column */}
          <div>
            <h3 className="text-white mb-4">Ministries</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Children's Ministry
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Youth Ministry
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Women's Fellowship
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Men's Group
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Senior Ministry
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Music Ministry
                </a>
              </li>
            </ul>
          </div>

          {/* Stay Connected Column */}
          <div>
            <h3 className="text-white mb-4">{t('footer.connect')}</h3>
            <p className="text-sm text-gray-400 mb-4">
              {t('footer.newsletterText')}
            </p>
            <div className="flex gap-2 mb-6">
              <input
                type="email"
                placeholder={t('footer.emailPlaceholder')}
                className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gray-500"
              />
              <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors">
                <Mail size={18} />
              </button>
            </div>

            {/* Follow Us */}
            <h4 className="text-white mb-3">{t('footer.followUs')}</h4>
            <div className="flex gap-3">
              <a
                href="https://www.facebook.com/profile.php?id=100063698651483"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a
                href="https://instagram.com/ybhministries"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://www.youtube.com/@augustinedandingi6878"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center transition-colors"
                aria-label="YouTube"
              >
                <Youtube size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Awards Logos */}
        <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6 pb-6">
          <SmartImage
            srcs={[LOCAL_GUINNESS, guinnessR2]}
            alt="Guinness World Records 2024"
            className="h-12 md:h-14 object-contain opacity-70 hover:opacity-100 transition-opacity"
          />
          <SmartImage
            srcs={[LOCAL_ASIA_BOOK, asiaBookR2]}
            alt="Asia Book of Records 2024"
            className="h-12 md:h-14 object-contain opacity-70 hover:opacity-100 transition-opacity"
          />
          <SmartImage
            srcs={[LOCAL_INGENIOUS, ingeniousR2]}
            alt="Ingenious Charm World Records 2024"
            className="h-12 md:h-14 object-contain opacity-70 hover:opacity-100 transition-opacity"
          />
          <SmartImage
            srcs={[
              LOCAL_INTERNATIONAL_STAR_FINAL,
              LOCAL_INTERNATIONAL_STAR,
              '/logo/awards/star-book-of-records.png',
              internationalStarR2,
              `${R2_BASE}/Home/awards/Star%20book%20of%20records.png`,
            ]}
            alt="International Star Book of Records 2023"
            className="h-12 md:h-14 object-contain opacity-70 hover:opacity-100 transition-opacity"
          />
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
            <div className="text-gray-400">
              © {new Date().getFullYear()} {siteTitle}. All rights reserved.
            </div>
            
            {/* Center - Language Switcher */}
            <div className="flex items-center gap-2">
              <Languages size={16} className="text-gray-400" />
              <div className="flex items-center gap-1 bg-gray-800 rounded-lg p-1">
                <button
                  onClick={() => handleLanguageChange('en')}
                  className={`px-3 py-1 rounded transition-all ${
                    i18n.language === 'en'
                      ? 'bg-[#FDB813] text-black'
                      : 'text-gray-400 hover:text-white'
                  }`}
                  aria-label="Switch to English"
                >
                  EN
                </button>
                <button
                  onClick={() => handleLanguageChange('te')}
                  className={`px-3 py-1 rounded transition-all ${
                    i18n.language === 'te'
                      ? 'bg-[#FDB813] text-black'
                      : 'text-gray-400 hover:text-white'
                  }`}
                  aria-label="Switch to Telugu"
                >
                  TE
                </button>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 text-gray-400">
              <a 
                href="/privacy-policy" 
                onClick={(e) => {
                  e.preventDefault();
                  window.history.pushState({}, '', '/privacy-policy');
                  window.dispatchEvent(new PopStateEvent('popstate'));
                }}
                className="hover:text-white transition-colors"
              >
                Privacy Policy
              </a>
              <a 
                href="/terms-of-service"
                onClick={(e) => {
                  e.preventDefault();
                  window.history.pushState({}, '', '/terms-of-service');
                  window.dispatchEvent(new PopStateEvent('popstate'));
                }}
                className="hover:text-white transition-colors"
              >
                Terms of Service
              </a>
              <a
                href="/accessibility"
                data-no-loader="true"
                onClick={(e) => {
                  e.preventDefault();
                  // Use full navigation so RouteLoaderClient doesn't show overlay
                  window.location.href = '/accessibility';
                }}
                className="hover:text-white transition-colors"
              >
                Accessibility
              </a>
              {/* Admin link removed per request */}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
