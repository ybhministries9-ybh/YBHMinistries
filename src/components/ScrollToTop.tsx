import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from 'react-i18next';

export function ScrollToTop() {
  const { t } = useTranslation('common');
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 group cursor-pointer"
          aria-label="Scroll to top"
        >
          <div className="relative">
            {/* Main button */}
            <div className="flex flex-col items-center justify-center w-14 h-14 bg-[#FDB813] rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110">
              <ArrowUp className="w-6 h-6 text-[#2E2E2E]" strokeWidth={3} />
            </div>
            
            {/* Tooltip */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
              <div className="bg-[#2E2E2E] text-white px-3 py-1 rounded text-sm whitespace-nowrap text-center">
                {t('common.backToTop')}
              </div>
              {/* Arrow */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1">
                <div className="border-4 border-transparent border-t-[#2E2E2E]"></div>
              </div>
            </div>
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
