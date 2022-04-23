import Link from 'next/link';
import { useRouter } from 'next/router';
import config from '../../config/config.yml';
import menu, { MenuItem } from '../../config/menu.yml';

const Menu = () => {
  const router = useRouter();
  const locale = (router.locale ?? 'es') as keyof MenuItem;
  return (
    <nav
      className={`menu ${router.query.menu === 'true' ? 'is-active' : ''}`}
      onClick={e => e.stopPropagation()}
    >
      <ul>
        <li>
          <Link href={menu.home.link} replace>
            <a>{menu.home[locale]}</a>
          </Link>
        </li>
        <li>
          <Link href={menu.about.link} replace>
            <a>{menu.about[locale]}</a>
          </Link>
          <ul>
            <li>
              <Link href={`/about${menu['crisol-spirit'].link}`} replace>
                <a>{menu['crisol-spirit'][locale]}</a>
              </Link>
            </li>
            <li>
              <Link href={`/about${menu.classes.link}`} replace>
                <a>{menu.classes[locale]}</a>
              </Link>
            </li>
            <li>
              <Link href={`/about${menu.history.link}`} replace>
                <a>{menu.history[locale]}</a>
              </Link>
            </li>
            <li>
              <Link href={`/about${menu.media.link}`} replace>
                <a>{menu.media[locale]}</a>
              </Link>
            </li>
            <li>
              <Link href={`/about${menu['crisol-book'].link}`} replace>
                <a>{menu['crisol-book'][locale]}</a>
              </Link>
            </li>
          </ul>
        </li>
        <li>
          <Link href={menu.teachers.link} replace>
            <a>{menu.teachers[locale]}</a>
          </Link>
          <ul>
            <li>
              <Link href={menu.teachers.link} replace>
                <a>
                  {menu.teachers[locale]} {config.startDate.getFullYear()}
                </a>
              </Link>
            </li>
            <li>
              <Link href={menu['teachers-annuary'].link} replace>
                <a>{menu['teachers-annuary'][locale]}</a>
              </Link>
            </li>
          </ul>
        </li>
        <li>
          <Link href={menu.accommodation.link} replace>
            <a>{menu.accommodation[locale]}</a>
          </Link>
        </li>
        <li>
          <Link href={menu.support.link} replace>
            <a>{menu.support[locale]}</a>
          </Link>
        </li>
        <li>
          <Link href={menu.contact.link} replace>
            <a>{menu.contact[locale]}</a>
          </Link>
        </li>
        <li>
          <Link href={menu.registration.link} replace>
            <a>{menu.registration[locale]}</a>
          </Link>
        </li>
      </ul>
      <p>{menu.languages[locale]}:</p>
      <ul>
        <li>
          <Link href={router.pathname} locale="es">
            <a className={`${locale === 'es' ? 'bold' : ''}`}>{menu.spanish[locale]}</a>
          </Link>
        </li>
        <li>
          <Link href={router.pathname} locale="en">
            <a className={`${locale === 'en' ? 'bold' : ''}`}>{menu.english[locale]}</a>
          </Link>
        </li>
      </ul>
      <style jsx>{`
        .menu {
          width: 100vw;
          height: calc(100vh - 83px);
          position: fixed;
          top: calc(0 + 83px);
          left: 100vw;
          background-color: gray;
          z-index: 90;
          color: white;
          overflow-y: scroll;

          transition: left 0.5s ease-in-out;

          &.is-active {
            left: 0;
          }

          & ul {
            list-style-type: none;
            background-color: #b0b0b0;
            margin: 0;
            padding: 1rem 0;
          }

          & li {
            margin: 0;
            padding: 0;
          }

          & ul li ul {
            padding: 0;
          }

          & a {
            display: inline-block;
            padding: 0.5rem;
          }

          & ul > li > a,
          & p {
            padding-left: 1.5rem;
          }

          & ul > li > ul > li > a {
            padding-left: 3rem;
          }
        }
        .bold {
          font-weight: 700;
        }
      `}</style>
    </nav>
  );
};

export default Menu;
