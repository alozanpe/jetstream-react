import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import es from './Locales/es/translations.json';
import en from './Locales/en/translations.json';

i18n.use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            es: { translation: { ...es } },
            en: { translation: { ...en } },
        },
        fallbackLng: 'es',
        debug: process.env.NODE_ENV !== 'production',
        saveMissing: true,
        interpolation: {
            escapeValue: false,
        },
        react: {
            wait: true,
        },
    });

export default i18n;
