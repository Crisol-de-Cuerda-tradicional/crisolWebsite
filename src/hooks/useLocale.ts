import i18nConfig from 'next-i18next.config';
import { useRouter } from 'next/router';

export const useLocale = (): Language => {
  const router = useRouter();
  const locale = (router.query.locale ?? i18nConfig.i18n.defaultLocale) as Language;

  return locale;
};
