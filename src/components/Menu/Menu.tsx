import Link from 'next/link';
import { NextRouter, useRouter } from 'next/router';
import { ReactNode, useCallback, useEffect } from 'react';
import config from '../../config/config.yml';
import menu, { MenuItem } from '../../config/menu.yml';
import translations, { Language } from '../../config/translations.yml';

interface IMenuItemProps {
  menuItem: MenuItem;
  pathPrefix?: string;
  noHighlight?: boolean;
  locale: Language;
  router: NextRouter;
  children?: ReactNode;
}

const MenuLink = ({
  menuItem,
  pathPrefix,
  noHighlight,
  locale,
  children,
  router,
}: IMenuItemProps) => {
  const route = `${pathPrefix ?? ''}${menuItem.link}`;
  return (
    <Link href={route} replace>
      <a className={`${router.pathname === route && !noHighlight ? 'active-nav' : ''}`}>
        {children ?? menuItem[locale]}
      </a>
    </Link>
  );
};

const Menu = () => {
  const router = useRouter();
  const locale = (router.locale ?? 'es') as Language;
  const itemProps = { locale, router };

  useEffect(() => {
    window.addEventListener('keyup', handleEsc);

    return () => {
      window.removeEventListener('keyup', handleEsc);
    };
  });

  const toggleMenu = useCallback(() => {
    const queries = { ...router.query };
    delete queries.menu;
    router.push(
      {
        query: queries,
      },
      undefined,
      { scroll: false }
    );
  }, [router]);

  const handleEsc = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape' && router.query.menu === 'true') {
        toggleMenu();
      }
    },
    [toggleMenu, router]
  );

  return (
    <>
      <div
        className="menu__background"
        onClick={e => {
          e.stopPropagation();
          toggleMenu();
        }}
      >
        <nav
          className={`menu ${router.query.menu === 'true' ? 'is-active' : ''}`}
          onClick={e => {
            e.stopPropagation();
          }}
        >
          <ul>
            <li>
              <MenuLink menuItem={menu.home} {...itemProps} />
            </li>
            <li>
              <MenuLink menuItem={menu.about} {...itemProps} />
              <ul>
                <li>
                  <MenuLink menuItem={menu['crisol-spirit']} pathPrefix="/about" {...itemProps} />
                </li>
                <li>
                  <MenuLink menuItem={menu.classes} pathPrefix="/about" {...itemProps} />
                </li>
                <li>
                  <MenuLink menuItem={menu.history} pathPrefix="/about" {...itemProps} />
                </li>
                <li>
                  <MenuLink menuItem={menu.media} pathPrefix="/about" {...itemProps} />
                </li>
                <li>
                  <MenuLink menuItem={menu['crisol-book']} pathPrefix="/about" {...itemProps} />
                </li>
              </ul>
            </li>
            <li>
              <MenuLink menuItem={menu.teachers} noHighlight {...itemProps} />
              <ul>
                <li>
                  <MenuLink menuItem={menu.teachers} {...itemProps}>
                    {menu.teachers[locale]} {config.startDate.getFullYear()}
                  </MenuLink>
                </li>
                <li>
                  <MenuLink
                    menuItem={menu['teachers-annuary']}
                    pathPrefix="/teachers"
                    {...itemProps}
                  />
                </li>
              </ul>
            </li>
            <li>
              <MenuLink menuItem={menu.accommodation} {...itemProps} />
            </li>
            <li>
              <MenuLink menuItem={menu.support} {...itemProps} />
            </li>
            <li>
              <MenuLink menuItem={menu.contact} {...itemProps} />
            </li>
            <li>
              <MenuLink menuItem={menu.registration} {...itemProps} />
            </li>
          </ul>
          <p>{translations.languages[locale]}:</p>
          <ul>
            <li>
              <Link href={router.pathname} locale="es">
                <a className={`${locale === 'es' ? 'active-lng' : ''}`}>
                  {translations.spanish[locale]}
                </a>
              </Link>
            </li>
            <li>
              <Link href={router.pathname} locale="en">
                <a className={`${locale === 'en' ? 'active-lng' : ''}`}>
                  {translations.english[locale]}
                </a>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <style jsx global>{`
        .menu__background {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background-color: var(--color-dark);
          z-index: -1;
        }

        .menu {
          width: 17rem;
          height: 100vh;
          position: fixed;
          top: 0;
          right: 0rem;
          padding: 3rem 0;
          z-index: 3;
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
            border-top-left-radius: 6px;
            border-bottom-left-radius: 6px;

            &.active-nav {
              background-color: var(--color-neutral);
            }
          }

          & ul > li > a,
          & p {
            padding-left: 1.5rem;
          }

          & ul > li > ul > li > a {
            padding-left: 3rem;
          }

          & a:not(.active-lng) {
            color: var(--color-white);
          }

          & .active-lng {
            color: var(--color-primary);
          }
        }
      `}</style>
    </>
  );
};

export default Menu;
