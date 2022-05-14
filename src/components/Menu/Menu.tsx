import Link from 'next/link';
import { useRouter } from 'next/router';
import config from '../../config/config.yml';
import menu from '../../config/menu.yml';
import translations, { Language } from '../../config/translations.yml';

const Menu = () => {
  const router = useRouter();
  const locale = (router.locale ?? 'es') as Language;
  return (
    <>
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
      >
        a
      </div>
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
        <p>{translations.languages[locale]}:</p>
        <ul>
          <li>
            <Link href={router.pathname} locale="es">
              <a className={`${locale === 'es' ? 'bold' : ''}`}>{translations.spanish[locale]}</a>
            </Link>
          </li>
          <li>
            <Link href={router.pathname} locale="en">
              <a className={`${locale === 'en' ? 'bold' : ''}`}>{translations.english[locale]}</a>
            </Link>
          </li>
        </ul>
      </nav>
      <style jsx>{`
        .modal__background {
          background-color: transparent;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          width: 100vw;
          height: 100vh;
          z-index: 89;
          display: none;

          &.is-active {
            display: block;
          }
        }

        .menu {
          width: 20rem;
          height: calc(100vh - 83px);
          position: fixed;
          top: calc(0 + 83px);
          right: -20rem;
          background-color: var(--color-dark);
          z-index: 90;
          color: var(--color-white);
          overflow-y: auto;

          transition: right 0.5s ease-in-out;

          & * {
            transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;
          }

          &.is-active {
            right: 0;
          }

          & ul {
            list-style-type: none;
            background-color: var(--color-dark);
            margin: 0;
            padding: 0;
          }

          & li {
            margin: 0;
            padding: 0;

            & a:hover {
              background-color: var(--color-neutral);
              font-weight: bold;
            }
          }

          & ul li ul {
            padding: 0;
          }

          & a {
            display: inline-block;
            padding: 0.5rem;
            width: 100%;
            height: 2.5rem;
            color: var(--color-white);
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
    </>
  );
};

export default Menu;
