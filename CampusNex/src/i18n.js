// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
    en: {
        translation: {
            welcome: 'Welcome to CampusNex!',
            description: 'Discover opportunities for Cambodian students.'
        }
    },
    km: {
        translation: {
            welcome: 'សូមស្វាគមន៍មកកាន់ CampusNex!',
            description: 'ស្វែងរកឱកាសសម្រាប់និស្សិតកម្ពុជា។'
        }
    }
};

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;
