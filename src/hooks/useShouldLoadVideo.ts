import { useEffect, useState } from 'react';

export const useShouldLoadVideo = () => {
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userAgent = window.navigator.userAgent ?? '';

      const isMobile = /android.+mobile|ip(hone|[oa]d)/i.test(userAgent);

      // Only load video on desktop devices
      // This saves network traffic
      setShouldLoadVideo(!isMobile);
    }
  }, []);

  return shouldLoadVideo;
};
