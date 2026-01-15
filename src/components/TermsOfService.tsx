"use client";
import { ArrowLeft } from 'lucide-react';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export function TermsOfService() {
  const { t } = useTranslation('legal');
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleBack = () => {
    try {
      window.location.href = '/';
    } catch (e) {
      window.history.pushState({}, '', '/');
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#2E2E2E' }}>
      {/* Header */}
      <div className="bg-black text-white py-12">
        <div className="container mx-auto px-4">
          {/* Logo and Name */}
          <div className="flex items-center gap-3 mb-6">
            <img
              src="/logo/ybh.png"
              alt="YBH Ministries Logo"
              className="w-12 h-12 rounded-lg object-contain"
              onError={(e) => { (e.target as HTMLImageElement).src = '/logo/YBH.png'; }}
            />
            <h2 className="text-2xl">Yeshua Beth Hallel Ministries</h2>
          </div>
          
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-white/90 hover:text-white hover:gap-3 mb-4 transition-all cursor-pointer"
            aria-label="Go back to home"
          >
            <ArrowLeft size={20} />
            {t('common:back', { defaultValue: 'Back' })}
          </button>
          <h1 className="text-4xl mb-2">{t('termsOfService.title')}</h1>
          <p className="text-purple-100">{t('termsOfService.lastUpdated')}: January 15, 2026</p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="bg-gray-800/50 rounded-lg shadow-md p-8 border border-gray-700">
          <div className="prose max-w-none">
            <h2 className="text-2xl text-white mb-4">{t('termsOfService.acceptance.title')}</h2>
            <p className="text-gray-300 mb-6">
              {t('termsOfService.acceptance.description')}
            </p>

            <h2 className="text-2xl text-white mb-4 mt-8">{t('termsOfService.useOfWebsite.title')}</h2>
            <p className="text-gray-300 mb-6">
              {t('termsOfService.useOfWebsite.description')}
            </p>

            <h2 className="text-2xl text-white mb-4 mt-8">{t('termsOfService.intellectualProperty.title')}</h2>
            <p className="text-gray-300 mb-6">
              {t('termsOfService.intellectualProperty.description')}
            </p>

            <h2 className="text-2xl text-white mb-4 mt-8">{t('termsOfService.disclaimer.title')}</h2>
            <p className="text-gray-300 mb-6">
              {t('termsOfService.disclaimer.description')}
            </p>

            <h2 className="text-2xl text-white mb-4 mt-8">{t('termsOfService.limitation.title')}</h2>
            <p className="text-gray-300 mb-6">
              {t('termsOfService.limitation.description')}
            </p>

            <h2 className="text-2xl text-white mb-4 mt-8">{t('termsOfService.changes.title')}</h2>
            <p className="text-gray-300 mb-6">
              {t('termsOfService.changes.description')}
            </p>

            <div className="bg-gray-700/30 p-4 rounded-lg mt-8 border border-gray-600">
              <p className="text-gray-200 mb-2"><strong>Yeshua Beth Hallel Ministries</strong></p>
              <p className="text-gray-300 mb-1">Email: hallelmusicschoolybh@gmail.com</p>
              <p className="text-gray-300 mb-1">Phone: +91 9494802288, +91 8558835888</p>
              <p className="text-gray-300">Address: Vijayawada, Andhra Pradesh, India</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
