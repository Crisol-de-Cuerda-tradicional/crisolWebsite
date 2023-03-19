import Head from 'next/head';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import Footer from '../Footer/Footer';
import Menu from '../Menu/Menu';
import Navbar from '../Navbar/Navbar';

interface ILayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: ILayoutProps) => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Crisol de Cuerda Tradicional</title>
        <meta
          name="description"
          content="Crisol de Cuerda is a traditional violin, cello, guitar and fulte music camp celebrated in Spain"
        />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Menu />
      <div className={`main ${router.query.menu === 'true' ? 'active-menu' : ''}`}>
        <div
          className={`modal__background ${router.query.menu === 'true' ? 'is-active' : ''}`}
          onClick={e => {
            e.stopPropagation();

            const queries = { ...router.query };
            delete queries.menu;
            router.push(
              {
                query: queries,
              },
              undefined,
              { scroll: false }
            );
          }}
        ></div>
        <div className="content">
          <Navbar />
          {children}
          <Footer />
        </div>
      </div>
      <style jsx>{`
        .main {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          min-height: 100vh;
          margin: 0;
          overflow: scroll;
          background-color: var(--color-white);
          box-shadow: 0 0 6px var(--color-neutral);

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
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 999;
          display: none;

          &.is-active {
            display: block;
          }
        }
      `}</style>
    </>
  );
};

export default Layout;
