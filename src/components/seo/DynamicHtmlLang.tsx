'use client';

import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export function DynamicHtmlLang() {
  const { i18n } = useTranslation();
  
  useEffect(() => {
    // Update HTML lang attribute based on current language
    const lang = i18n.language === 'te' ? 'te' : 'en';
    document.documentElement.setAttribute('lang', lang);
  }, [i18n.language]);
  
  return null;
}
