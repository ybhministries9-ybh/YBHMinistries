'use client';

import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { MapPin, Phone, Mail, Facebook, Instagram, Youtube, Languages } from 'lucide-react';
import SmartImage from './SmartImage';

const R2_BASE = process.env.NEXT_PUBLIC_R2_PUBLIC_URL || '';
const ybhLogo = `${R2_BASE}/logo/ybh.png`;
const guinnessWorldRecords = `${R2_BASE}/logo/awards/guiness.png`;
const asiaBookOfRecords = `${R2_BASE}/logo/awards/AsiaBookOfRecords.png`;
const ingeniousWorldRecords = `${R2_BASE}/logo/awards/ingenious.png`;
const internationalStarBookOfRecords = `${R2_BASE}/logo/awards/Star%20book%20of%20records.png`;
const internationalStarBookOfRecordsFinal = `${R2_BASE}/logo/awards/Star%20book%20of%20records.png`;

export function FooterNext() {
  const { t, i18n } = useTranslation('common');

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  return (
    <footer className="bg-black text-gray-300" role="contentinfo">
      {/* Dark Gray Line Separator - Full Width */}
      <div className="w-full h-0.5" style={{ backgroundColor: '#333333' }}></div>
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 pt-8 pb-0">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-8 mb-8">
          {/* Site Title Column */}
          <div itemScope itemType="https://schema.org/Organization">
            <div className="flex items-center gap-3">
              <img 
                src={ybhLogo} 
                alt="YBH Logo" 
                className="h-12 w-12 object-contain"
                itemProp="logo"
              />
            </div>
            <h3 className="text-white font-bold" itemProp="name">{t('footer.siteTitle')}</h3>
            <p className="text-sm text-gray-400 mb-4" itemProp="description">
              {t('footer.about.description')}
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <MapPin size={16} className="mt-1 flex-shrink-0 text-gray-400" />
                <span itemProp="address">{t('footer.contact.address')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={16} className="flex-shrink-0 text-gray-400" />
                <span itemProp="telephone">{t('footer.contact.phone')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={16} className="flex-shrink-0 text-gray-400" />
                <a href={`mailto:${t('footer.contact.email')}`} className="hover:text-white transition-colors" itemProp="email">
                  {t('footer.contact.email')}
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links Column */}
          <nav aria-label="Quick Links" className="flex flex-col justify-center h-full">
            <h3 className="text-white mb-4 text-left">Quick Links</h3>
            <div className="grid grid-cols-2 gap-x-8">
              <ul className="space-y-2 text-sm">
                <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
                <li><Link href="/about#about-hero" className="hover:text-white transition-colors">About</Link></li>
                <li><Link href="/ministries" className="hover:text-white transition-colors">Ministries</Link></li>
                <li><Link href="/gallery" className="hover:text-white transition-colors">Gallery</Link></li>
                <li><Link href="/news" className="hover:text-white transition-colors">News</Link></li>
              </ul>
              <ul className="space-y-2 text-sm">
                <li><Link href="/awards" className="hover:text-white transition-colors">Awards</Link></li>
                <li><Link href="/resources" className="hover:text-white transition-colors">Resources</Link></li>
                <li><Link href="/directors" className="hover:text-white transition-colors">Directors</Link></li>
                <li><Link href="/stories" className="hover:text-white transition-colors">Stories</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                <li><Link href="/donate" className="hover:text-white transition-colors">Donate</Link></li>
              </ul>
            </div>
          </nav>

          {/* Ministries Column */}
          <nav aria-label="Ministries" className="flex flex-col justify-center h-full">
            <h3 className="text-white mb-4">Ministries</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/ministries?tab=hallel-music-school" className="hover:text-white transition-colors">Hallel Music School</Link></li>
              <li>
                <span className="text-gray-500 transition-colors cursor-not-allowed" aria-disabled="true" title="Currently unavailable">
                  Hallel Bible College
                </span>
              </li>
              <li>
                <span className="text-gray-500 transition-colors cursor-not-allowed" aria-disabled="true" title="Currently unavailable">
                  Hallel Bible School
                </span>
              </li>
              <li><Link href="/ministries?tab=hallel-conferences" className="hover:text-white transition-colors">Hallel Conferences</Link></li>
              <li><Link href="/ministries?tab=hallel-worship-day" className="hover:text-white transition-colors">Hallel Worship Day</Link></li>
              <li><Link href="/ministries?tab=hallel-music-school-summer-training" className="hover:text-white transition-colors">HMS Summer Training</Link></li>
              <li><Link href="/ministries?tab=hallel-church" className="hover:text-white transition-colors">Hallel Church</Link></li>
            </ul>
          </nav>

          {/* Follow Us Column - far right */}
          <div className="flex flex-col items-end justify-center h-full">
            <h4 className="text-white mb-3">Follow Us</h4>
            <div className="flex gap-3 mb-6 justify-end">
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
                href="https://www.instagram.com/ybhministries/"
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
            srcs={[`/logo/awards/guiness.png`, guinnessWorldRecords]}
            alt="Guinness World Records 2024"
            className="h-12 md:h-14 object-contain opacity-70 hover:opacity-100 transition-opacity"
          />
          <SmartImage
            srcs={[`/logo/awards/AsiaBookOfRecords.png`, asiaBookOfRecords]}
            alt="Asia Book of Records 2024"
            className="h-12 md:h-14 object-contain opacity-70 hover:opacity-100 transition-opacity"
          />
          <SmartImage
            srcs={[`/logo/awards/ingenious.png`, ingeniousWorldRecords]}
            alt="Ingenious Charm World Records 2024"
            className="h-12 md:h-14 object-contain opacity-70 hover:opacity-100 transition-opacity"
          />
          <SmartImage
            srcs={[
              `/logo/awards/Star%20book%20of%20records.png`,
              `/logo/awards/Star%20book%20of%20records.png`,
              `/logo/awards/star-book-of-records.png`,
              `/logo/awards/Star-book-of-records.png`,
              internationalStarBookOfRecordsFinal,
              internationalStarBookOfRecords,
              `${R2_BASE}/logo/awards/Star%20book%20of%20records.png`,
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
              © {new Date().getFullYear()} {t('footer.siteTitle')}. {t('footer.copyright')}
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
              <Link href="/privacy-policy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms-of-service" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="/accessibility" className="hover:text-white transition-colors">
                Accessibility
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
