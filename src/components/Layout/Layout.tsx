import Head from 'next/head';
import { ReactNode } from 'react';
import Footer from '../Footer/Footer';
import Menu from '../Menu/Menu';
import Navbar from '../Navbar/Navbar';

interface ILayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: ILayoutProps) => {
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
      <Navbar />
      <Menu />
      <div className="main">{children}</div>
      <Footer />
      <style jsx>{`
        .main {
          width: 100%;
          margin: 0;
          position: relative;
        }
      `}</style>
    </>
  );
};

export default Layout;
