import { ReactNode, useEffect, useRef } from 'react';

import { ButtonGoTop, Footer, Navbar } from '@components';
import { useRouter } from 'next/router';

interface ILayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: ILayoutProps) => {
  const router = useRouter();
  const mainRef = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleRouteChange = () => {
      topRef.current?.scrollIntoView();
    };
    router.events.on('routeChangeComplete', handleRouteChange);
  }, [router]);
  return (
    <>
      <Navbar />
      <div className="main" ref={mainRef}>
        <div className="top" ref={topRef} />
        {children}
        <ButtonGoTop parentRef={mainRef} />
        <Footer />
      </div>
      <style jsx>{`
        .top {
          position: absolute;
          top: 0;
          left: 0;
        }
        .main {
          position: absolute;
          top: var(--navbar-height, 4.5rem);
          left: 0;
          right: 0;
          width: 100%;
          height: calc(100vh - var(--navbar-height, 4.5rem));
          margin: 0;
          overflow-y: auto;
          background-color: var(--color-white);
          box-shadow: var(--shadow);
          overscroll-behavior-y: none;

          -ms-overflow-style: none;
          scrollbar-width: none;
          &::-webkit-scrollbar {
            display: none;
          }
        }
      `}</style>
    </>
  );
};
