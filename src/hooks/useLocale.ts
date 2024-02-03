import { useRouter } from 'next/router';

export const useLocale = (): Language => {
  const router = useRouter();
  const locale = (router.locale ?? 'es') as Language;

  return locale;
};
