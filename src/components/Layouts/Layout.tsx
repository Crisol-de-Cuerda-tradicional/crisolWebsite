import { ReactNode, useContext, useEffect, useRef } from 'react';

import { ButtonGoTop, Footer, Menu, MenuContext, Navbar } from '@components';
import { useRouter } from 'next/router';

interface ILayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: ILayoutProps) => {
  const router = useRouter();
  const { showMenu, toggleMenu } = useContext(MenuContext);
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
      <Menu />
      <div
        className={`modal__background ${showMenu ? 'is-active' : ''}`}
        onClick={e => {
          e.stopPropagation();
          toggleMenu();
        }}
      ></div>
      <div className={`main ${showMenu ? 'active-menu' : ''}`} ref={mainRef}>
        <Navbar />
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
          top: 0;
          left: 0;
          width: 100%;
          min-height: 100vh;
          margin: 0;
          overflow: scroll;
          inset: 0;
          background-color: var(--color-white);
          box-shadow: var(--shadow);
          overscroll-behavior-y: none;

          transition: transform 0.4s cubic-bezier(0.51, 0.26, 0.44, 1.37),
            top 0.4s cubic-bezier(0.51, 0.26, 0.44, 1.37),
            min-height 0.4s cubic-bezier(0.51, 0.26, 0.44, 1.37),
            border-radius 0.4s cubic-bezier(0.51, 0.26, 0.44, 1.37);

          -ms-overflow-style: none;
          scrollbar-width: none;
          &::-webkit-scrollbar {
            display: none;
          }

          &.active-menu {
            transform: translateX(-18rem);
            top: 3rem;
            height: calc(100vh - 6rem);
            min-height: calc(100vh - 6rem);
            border-radius: 2rem;
          }
        }

        .modal__background {
          background-color: transparent;
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 999;
          display: none;

          &.is-active {
            display: block;
            transform: translateX(-18rem);
            top: 3rem;
            height: calc(100vh - 6rem);
            min-height: calc(100vh - 6rem);
            border-radius: 2rem;
          }
        }
      `}</style>
    </>
  );
};
