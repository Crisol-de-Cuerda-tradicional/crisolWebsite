import nextLanguageDetector from 'next-language-detector';
import i18nextConfig from '../../next-i18next.config';

export const languageDetector = nextLanguageDetector({
  supportedLngs: i18nextConfig.i18n.locales,
  fallbackLng: i18nextConfig.i18n.defaultLocale,
});
