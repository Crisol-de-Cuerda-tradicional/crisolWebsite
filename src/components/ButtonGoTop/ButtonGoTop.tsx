import Link from 'next/link';
import { useEffect, useState } from 'react';

const ButtonGoTop = () => {
  const [showTopBtn, setShowTopBtn] = useState(false);
  useEffect(() => {
    const handleButtonDisplay = () => {
      if (window.scrollY > 400) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    };
    window.addEventListener('scroll', handleButtonDisplay);
    return () => {
      window.removeEventListener('scroll', handleButtonDisplay);
    };
  }, []);

  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      <button className={`goTop ${!showTopBtn ? 'hidden' : ''}`} onClick={goToTop}></button>
      <style jsx>{`
        .hidden {
          opacity: 0;
          pointer-events: none;
        }

        .goTop {
          position: sticky;
          bottom: 2rem;
          align-self: flex-end;
          z-index: 1;

          width: 45px;
          aspect-ratio: 1;
          background: var(--color-primary);
          border-radius: var(--border-radius);
          border: none;

          transition: opacity 0.3s ease-in-out;
        }
        .goTop::before {
          content: '';
          position: absolute;
          inset: 30%;
          transform: translateY(20%) rotate(-45deg);
          border-top: 5px solid #fff;
          border-right: 5px solid #fff;
        }
      `}</style>
    </>
  );
};

export default ButtonGoTop;
