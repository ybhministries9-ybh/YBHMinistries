import { ArrowLeft, Church } from 'lucide-react';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export function Accessibility() {
  const { t } = useTranslation('legal');
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleBack = () => {
    window.history.pushState({}, '', '/');
    window.dispatchEvent(new PopStateEvent('popstate'));
    
    // Wait for navigation, then scroll to footer
    setTimeout(() => {
      const footer = document.getElementById('contact');
      if (footer) {
        footer.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#2E2E2E' }}>
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-12">
        <div className="container mx-auto px-4">
          {/* Logo and Name */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center">
              <Church className="text-white" size={28} />
            </div>
            <h2 className="text-2xl">Yeshua Beth Hallel Ministries</h2>
          </div>
          
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-white/90 hover:text-white hover:gap-3 mb-4 transition-all"
          >
            <ArrowLeft size={20} />
            {t('common:back', { defaultValue: 'Back' })}
          </button>
          <h1 className="text-4xl mb-2">{t('accessibility.title')}</h1>
          <p className="text-purple-100">{t('accessibility.commitment.title')}</p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="bg-gray-800/50 rounded-lg shadow-md p-8 border border-gray-700">
          <div className="prose max-w-none">
            <h2 className="text-2xl text-white mb-4">{t('accessibility.commitment.title')}</h2>
            <p className="text-gray-300 mb-6">
              {t('accessibility.commitment.description')}
            </p>

            <h2 className="text-2xl text-white mb-4 mt-8">{t('accessibility.measures.title')}</h2>
            <ul className="list-disc pl-6 text-gray-300 mb-6 space-y-2">
              {(t('accessibility.measures.list', { returnObjects: true }) as string[]).map((measure, index) => (
                <li key={index}>{measure}</li>
              ))}
            </ul>

            <h2 className="text-2xl text-white mb-4 mt-8">{t('accessibility.conformance.title')}</h2>
            <p className="text-gray-300 mb-6">
              {t('accessibility.conformance.description')}
            </p>

            <h2 className="text-2xl text-white mb-4 mt-8">{t('accessibility.feedback.title')}</h2>
            <p className="text-gray-300 mb-6">
              {t('accessibility.feedback.description')}
            </p>

            <div className="bg-gray-700/30 p-4 rounded-lg mt-8 border border-gray-600">
              <p className="text-gray-200 mb-2"><strong>{t('accessibility.contact')}</strong></p>
              <p className="text-gray-300 mb-1">Email: accessibility@ybhministries.org</p>
              <p className="text-gray-300 mb-1">Phone: +1 (555) 123-4567</p>
              <p className="text-gray-300">Address: 123 Worship Street, City, State 12345</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
