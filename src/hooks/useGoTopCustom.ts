import { useCallback, useEffect, useState } from 'react';

export const useGoTopCustom = (yShift: number) => {
  const [showGoTop, setShowGoTop] = useState(false);

  const handleScroll = useCallback(() => {
    if (window.scrollY > yShift) {
      setShowGoTop(true);
    } else {
      setShowGoTop(false);
    }
  }, [yShift]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const goToTopAction = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return { showGoTop, goToTopAction };
};
