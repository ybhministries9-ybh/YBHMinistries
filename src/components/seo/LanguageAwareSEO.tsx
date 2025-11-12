import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export function useDynamicSEO(pageKey: string) {
  const { t, i18n } = useTranslation();
  
  useEffect(() => {
    // Update HTML lang attribute
    document.documentElement.lang = i18n.language === 'te' ? 'te' : 'en';
    
    // Update page title with translation
    const titleKey = `${pageKey}.meta.title`;
    const title = t(titleKey, { defaultValue: document.title });
    if (title !== titleKey) {
      document.title = title;
    }
    
    // Update meta description
    const descKey = `${pageKey}.meta.description`;
    const description = t(descKey, { defaultValue: '' });
    if (description && description !== descKey) {
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', description);
      } else {
        const meta = document.createElement('meta');
        meta.name = 'description';
        meta.content = description;
        document.head.appendChild(meta);
      }
    }
    
    // Update OG tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle && title !== titleKey) {
      ogTitle.setAttribute('content', title);
    }
    
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc && description && description !== descKey) {
      ogDesc.setAttribute('content', description);
    }
    
    // Update Twitter tags
    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle && title !== titleKey) {
      twitterTitle.setAttribute('content', title);
    }
    
    const twitterDesc = document.querySelector('meta[name="twitter:description"]');
    if (twitterDesc && description && description !== descKey) {
      twitterDesc.setAttribute('content', description);
    }
    
  }, [i18n.language, pageKey, t]);
}

export function LanguageAwareSEO({ pageKey }: { pageKey: string }) {
  useDynamicSEO(pageKey);
  return null;
}
