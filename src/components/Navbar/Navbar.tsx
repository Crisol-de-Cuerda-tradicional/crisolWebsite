import { useContext } from 'react';
import Image from 'next/image';

import config from '@config/config.yml';
import { MenuContext, Link } from '@components';
import { baseUrl } from '@utils/baseUrl';

export const Navbar = () => {
  const { showMenu, toggleMenu } = useContext(MenuContext);

  return (
    <div className="navbar">
      <Link href="/">
        <Image src={baseUrl('/logo.png')} height={51} width={200} alt={config.name} />
      </Link>
      <button
        className={`hamburger hamburger--spin ${showMenu ? 'is-active' : ''}`}
        type="button"
        onClick={toggleMenu}
      >
        <span className="hamburger-box">
          <span className="hamburger-inner" />
        </span>
      </button>
      <style jsx>{`
        .navbar {
          position: sticky;
          top: 0;
          left: 0;
          right: 0;
          display: flex;
          justify-content: space-between;
          align-items: self-end;
          background-color: var(--color-dark);
          padding: 1rem 2rem;
          z-index: 100;
        }
      `}</style>
    </div>
  );
};
