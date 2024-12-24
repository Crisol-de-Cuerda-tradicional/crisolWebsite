import { RefObject, useCallback, useEffect, useState } from 'react';

export const useGoTopCustom = (yShift: number, ref: RefObject<HTMLDivElement | null>) => {
  const [showGoTop, setShowGoTop] = useState(false);

  const handleScroll = useCallback(() => {
    if ((ref.current?.scrollTop ?? 0) > yShift) {
      setShowGoTop(true);
    } else {
      setShowGoTop(false);
    }
  }, [yShift, ref]);

  useEffect(() => {
    const refElement = ref?.current;
    if (!refElement) return;

    refElement.addEventListener('scroll', handleScroll);
    return () => refElement.removeEventListener('scroll', handleScroll);
  }, [handleScroll, ref]);

  const goToTopAction = () => {
    ref.current?.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return { showGoTop, goToTopAction };
};
