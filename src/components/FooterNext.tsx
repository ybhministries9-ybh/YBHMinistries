'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { Mail, Phone, MapPin, Youtube, Facebook, Instagram } from 'lucide-react';
import { HMSStudentForm } from './HMSStudentForm';

export function FooterNext() {
  const { t, i18n } = useTranslation('common');
  const [showStudentForm, setShowStudentForm] = useState(false);
  const router = useRouter();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const handleAdminClick = () => {
    router.push('/admin');
  };

  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">{t('footer.about.title')}</h3>
            <p className="text-gray-300 mb-4">
              {t('footer.about.description')}
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://www.youtube.com/@YBHMinistries" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-red-500 transition-colors"
              >
                <Youtube size={24} />
              </a>
              <a 
                href="https://www.facebook.com/profile.php?id=100089579084304" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-blue-500 transition-colors"
              >
                <Facebook size={24} />
              </a>
              <a 
                href="https://www.instagram.com/ybhministries/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-pink-500 transition-colors"
              >
                <Instagram size={24} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">{t('footer.quickLinks.title')}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
                  {t('footer.quickLinks.about')}
                </Link>
              </li>
              <li>
                <Link href="/ministries" className="text-gray-300 hover:text-white transition-colors">
                  {t('footer.quickLinks.ministries')}
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-gray-300 hover:text-white transition-colors">
                  {t('footer.quickLinks.gallery')}
                </Link>
              </li>
              <li>
                <Link href="/news" className="text-gray-300 hover:text-white transition-colors">
                  {t('footer.quickLinks.news')}
                </Link>
              </li>
              <li>
                <Link href="/resources" className="text-gray-300 hover:text-white transition-colors">
                  {t('footer.quickLinks.resources')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-xl font-bold mb-4">{t('footer.contact.title')}</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="flex-shrink-0 mt-1" size={20} />
                <p className="text-gray-300">
                  {t('footer.contact.address')}
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="flex-shrink-0" size={20} />
                <p className="text-gray-300">
                  {t('footer.contact.phone')}
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="flex-shrink-0" size={20} />
                <a 
                  href={`mailto:${t('footer.contact.email')}`}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {t('footer.contact.email')}
                </a>
              </div>
            </div>
          </div>

          {/* HMS Student Form & Language Selector */}
          <div>
            <h3 className="text-xl font-bold mb-4">{t('footer.student.title')}</h3>
            <p className="text-gray-300 mb-4">
              {t('footer.student.description')}
            </p>
            <button
              onClick={() => setShowStudentForm(true)}
              className="bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-2 rounded-lg font-semibold transition-colors w-full mb-4"
            >
              {t('footer.student.button')}
            </button>

            <div className="mt-4">
              <h4 className="text-lg font-semibold mb-2">{t('footer.language.title')}</h4>
              <div className="flex space-x-2">
                <button
                  onClick={() => changeLanguage('en')}
                  className={`px-3 py-1 rounded ${
                    i18n.language === 'en'
                      ? 'bg-yellow-500 text-black'
                      : 'bg-gray-700 text-white hover:bg-gray-600'
                  } transition-colors`}
                >
                  English
                </button>
                <button
                  onClick={() => changeLanguage('te')}
                  className={`px-3 py-1 rounded ${
                    i18n.language === 'te'
                      ? 'bg-yellow-500 text-black'
                      : 'bg-gray-700 text-white hover:bg-gray-600'
                  } transition-colors`}
                >
                  తెలుగు
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-center md:text-left">
              {t('footer.copyright')}
            </p>

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

      {/* HMS Student Form Modal */}
      {showStudentForm && (
        <HMSStudentForm onClose={() => setShowStudentForm(false)} />
      )}
    </footer>
  );
}
