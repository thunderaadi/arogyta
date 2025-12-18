// lib/i18n.ts
'use client'

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translation files
import translationEN from '../locales/en/translation.json';
import translationHI from '../locales/hi/translation.json';
import translationPA from '../locales/pa/translation.json';
import translationMR from '../locales/mr/translation.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: translationEN },
      hi: { translation: translationHI },
      pa: { translation: translationPA },
      mr: { translation: translationMR },
    },
    lng: 'en', // default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;