import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { languageDetector } from '@utils/languageDetector';

export const useRedirect = (path?: string) => {
  const router = useRouter();
  const to = path || router.asPath;

  // language detection
  useEffect(() => {
    const detectedLng = languageDetector.detect() ?? 'es';
    if (to.startsWith('/' + detectedLng) && router.route === '/404') {
      // prevent endless loop
      router.replace('/' + detectedLng + router.route);
      return;
    }

    // if the path already has the detected language, do nothing
    if (to.startsWith('/' + detectedLng)) {
      router.replace(to);
      return;
    }

    languageDetector.cache && languageDetector.cache(detectedLng);
    router.replace('/' + detectedLng + to);
  });

  return <></>;
};

const Redirect = () => {
  useRedirect();
  return <></>;
};

export default Redirect;
