'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { MapPin, Phone, Mail, Facebook, Instagram, Youtube, Twitter, Languages } from 'lucide-react';

const ybhLogo = 'https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/logo/YBH.jpg';
const guinnessWorldRecords = 'https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Home/awards/guiness.png';
const asianBookOfRecords = 'https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Home/awards/Asian%20book%20of%20records.png';
const ingeniousWorldRecords = 'https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Home/awards/ingenious.png';
const internationalStarBookOfRecords = 'https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Home/awards/Star%20book%20of%20records%20-%20final.png';

export function FooterNext() {
  const { t, i18n } = useTranslation('common');
  const router = useRouter();

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  const handleAdminClick = () => {
    router.push('/admin');
  };

  return (
    <footer className="bg-black text-gray-300">
      {/* Dark Gray Line Separator - Full Width */}
      <div className="w-full h-0.5" style={{ backgroundColor: '#333333' }}></div>
      
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 pt-8 pb-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Site Title Column */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <img 
                src={ybhLogo} 
                alt="YBH Logo" 
                className="h-12 w-12 object-contain"
              />
              <h3 className="text-white">{t('footer.siteTitle')}</h3>
            </div>
            <p className="text-sm text-gray-400 mb-4">
              {t('footer.about.description')}
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
                <a href={`mailto:${t('footer.contact.email')}`} className="hover:text-white transition-colors">
                  {t('footer.contact.email')}
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className="text-white mb-4">{t('footer.quickLinks.title')}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  {t('footer.quickLinks.about')}
                </Link>
              </li>
              <li>
                <Link href="/ministries" className="hover:text-white transition-colors">
                  {t('footer.quickLinks.ministries')}
                </Link>
              </li>
              <li>
                <Link href="/news" className="hover:text-white transition-colors">
                  {t('footer.quickLinks.news')}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/donate" className="hover:text-white transition-colors">
                  Donate
                </Link>
              </li>
            </ul>
          </div>

          {/* Ministries Column */}
          <div>
            <h3 className="text-white mb-4">Ministries</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/ministries" className="hover:text-white transition-colors">
                  Children's Ministry
                </Link>
              </li>
              <li>
                <Link href="/ministries" className="hover:text-white transition-colors">
                  Youth Ministry
                </Link>
              </li>
              <li>
                <Link href="/ministries" className="hover:text-white transition-colors">
                  Women's Fellowship
                </Link>
              </li>
              <li>
                <Link href="/ministries" className="hover:text-white transition-colors">
                  Men's Group
                </Link>
              </li>
              <li>
                <Link href="/ministries" className="hover:text-white transition-colors">
                  Senior Ministry
                </Link>
              </li>
              <li>
                <Link href="/ministries" className="hover:text-white transition-colors">
                  Music Ministry
                </Link>
              </li>
            </ul>
          </div>

          {/* Stay Connected Column */}
          <div>
            <h3 className="text-white mb-4">Connect With Us</h3>
            <p className="text-sm text-gray-400 mb-4">
              Stay updated with our latest news and events
            </p>
            <div className="flex gap-2 mb-6">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gray-500"
              />
              <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors">
                <Mail size={18} />
              </button>
            </div>

            {/* Follow Us */}
            <h4 className="text-white mb-3">Follow Us</h4>
            <div className="flex gap-3">
              <a
                href="https://www.facebook.com/profile.php?id=100089579084304"
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
                href="https://www.youtube.com/@YBHMinistries"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center transition-colors"
                aria-label="YouTube"
              >
                <Youtube size={18} />
              </a>
              <a
                href="https://twitter.com/ybhministries"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-gray-800 hover:bg-purple-600 rounded-lg flex items-center justify-center transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Awards Logos */}
        <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6 pb-6">
          <img 
            src={guinnessWorldRecords}
            alt="Guinness World Records 2024"
            className="h-12 md:h-14 object-contain opacity-70 hover:opacity-100 transition-opacity"
          />
          <img 
            src={asianBookOfRecords}
            alt="Asian Book of Records 2024"
            className="h-12 md:h-14 object-contain opacity-70 hover:opacity-100 transition-opacity"
          />
          <img 
            src={ingeniousWorldRecords}
            alt="Ingenious Charm World Records 2024"
            className="h-12 md:h-14 object-contain opacity-70 hover:opacity-100 transition-opacity"
          />
          <img 
            src={internationalStarBookOfRecords}
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
              <button
                onClick={handleAdminClick}
                className="hover:text-white transition-colors"
              >
                Admin
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
