import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translation files (TypeScript modules)
import commonEN from './locales/en/common';
import commonTE from './locales/te/common';
import homeEN from './locales/en/home';
import homeTE from './locales/te/home';
import aboutEN from './locales/en/about';
import aboutTE from './locales/te/about';
import ministriesEN from './locales/en/ministries';
import ministriesTE from './locales/te/ministries';
import galleryEN from './locales/en/gallery';
import galleryTE from './locales/te/gallery';
import resourcesEN from './locales/en/resources';
import resourcesTE from './locales/te/resources';
import newsEN from './locales/en/news';
import newsTE from './locales/te/news';
import donateEN from './locales/en/donate';
import donateTE from './locales/te/donate';
import careersEN from './locales/en/careers';
import careersTE from './locales/te/careers';
import directorsEN from './locales/en/directors';
import directorsTE from './locales/te/directors';
import storiesEN from './locales/en/stories';
import storiesTE from './locales/te/stories';
import legalEN from './locales/en/legal';
import legalTE from './locales/te/legal';
import contactEN from './locales/en/contact';
import contactTE from './locales/te/contact';
import awardsEN from './locales/en/awards';
import awardsTE from './locales/te/awards';

const resources = {
  en: {
    common: commonEN,
    home: homeEN,
    about: aboutEN,
    ministries: ministriesEN,
    gallery: galleryEN,
    resources: resourcesEN,
    news: newsEN,
    donate: donateEN,
    careers: careersEN,
    directors: directorsEN,
    stories: storiesEN,
    legal: legalEN,
    contact: contactEN,
    awards: awardsEN,
  },
  te: {
    common: commonTE,
    home: homeTE,
    about: aboutTE,
    ministries: ministriesTE,
    gallery: galleryTE,
    resources: resourcesTE,
    news: newsTE,
    donate: donateTE,
    careers: careersTE,
    directors: directorsTE,
    stories: storiesTE,
    legal: legalTE,
    contact: contactTE,
    awards: awardsTE,
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // Default language
    fallbackLng: 'en',
    defaultNS: 'common',
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;
