import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import config from '../../config/config.yml';

const Navbar = () => {
  const router = useRouter();

  return (
    <div className="navbar">
      <Link href="/" passHref>
        <a>
          <Image src="/logo.png" height={51} width={200} alt={config.name} />
        </a>
      </Link>
      <button
        className={`hamburger hamburger--spin ${router.query.menu === 'true' ? 'is-active' : ''}`}
        type="button"
        onClick={() => {
          const queries = { ...router.query };
          if (queries.menu) delete queries.menu;
          else queries.menu = 'true';
          router.push(
            {
              query: queries,
            },
            undefined,
            { scroll: false }
          );
        }}
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

export default Navbar;
