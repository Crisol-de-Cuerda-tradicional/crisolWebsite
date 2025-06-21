import i18nConfig from 'next-i18next.config';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export const useLocale = (): Language => {
  const router = useRouter();
  const [locale, setLocale] = useState<Language>(i18nConfig.i18n.defaultLocale as Language);

  useEffect(() => {
    // This code only runs on the client, preventing hydration mismatch
    const determineLocale = () => {
      // First check if there's a valid locale in the URL path
      const urlLocale = router.asPath.split('/')[1];
      const isValidLocale = i18nConfig.i18n.locales.includes(urlLocale as Language);

      if (isValidLocale) {
        setLocale(urlLocale as Language);
        return;
      }

      // Fallback to the router's locale query parameter
      if (
        router.query.locale &&
        i18nConfig.i18n.locales.includes(router.query.locale as Language)
      ) {
        setLocale(router.query.locale as Language);
        return;
      }

      // Final fallback to default locale
      setLocale(i18nConfig.i18n.defaultLocale as Language);
    };

    determineLocale();
  }, [router.asPath, router.query.locale]);

  return locale;
};
