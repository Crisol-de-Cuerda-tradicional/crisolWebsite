import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';

export const useMenuToggle = () => {
  const [showMenu, setShowMenu] = useState(false);
  const router = useRouter();

  const toggleMenu = useCallback(() => {
    const queries = { ...router.query };
    if (queries.menu) {
      delete queries.menu;
    } else {
      queries.menu = 'true';
    }
    router.push(
      {
        query: queries,
      },
      undefined,
      { scroll: false }
    );
  }, [router]);

  const handleKeyboard = useCallback(
    (e: KeyboardEvent) => {
      const toggles: boolean[] = [
        e.key === 'Escape' && router.query.menu === 'true', // Close menu on ESC
        e.key === 'm', // Toggle menu on M
      ];

      if (toggles.some(t => t)) {
        toggleMenu();
      }
    },
    [toggleMenu, router]
  );

  useEffect(() => {
    if (router.query.menu === 'true') {
      setShowMenu(true);
    } else {
      setShowMenu(false);
    }
  }, [router]);

  useEffect(() => {
    window.addEventListener('keyup', handleKeyboard);

    return () => {
      window.removeEventListener('keyup', handleKeyboard);
    };
  });

  return {
    showMenu,
    toggleMenu,
  };
};
