import Link from 'next/link';
import { NextRouter, useRouter } from 'next/router';
import { ReactNode } from 'react';
import config from '../../config/config.yml';
import menu, { MenuItem } from '../../config/menu.yml';
import translations, { Language } from '../../config/translations.yml';

interface IMenuProps {
  children: ReactNode;
}
interface ICustomLinkProps {
  menuItem: MenuItem;
  subRoute?: string;
  router: NextRouter;
  locale: Language;
  children?: ReactNode;
}

const CustomLink = ({
  menuItem,
  subRoute,
  router,
  locale,
  children,
}: ICustomLinkProps): JSX.Element => {
  const link = `${subRoute ?? ''}${menuItem.link}`;
  return (
    <Link href={link} replace>
      <a className={router.pathname === link ? 'active-path' : ''}>
        {children ?? menuItem[locale]}
      </a>
    </Link>
  );
};

const Menu = ({ children }: IMenuProps): JSX.Element => {
  const router = useRouter();
  const locale = (router.locale ?? 'es') as Language;
  const itemProps = { router, locale };

  const toggleMenu = () => {
    const queries = { ...router.query };
    delete queries.menu;
    router.push(
      {
        query: queries,
      },
      undefined,
      { scroll: false }
    );
  };

  return (
    <>
      <div
        className={`main__container ${router.query.menu === 'true' ? 'is-active' : ''}`}
        onClick={e => e.stopPropagation()}
      >
        <div
          className={`container__overlay ${router.query.menu === 'true' ? 'is-active' : ''}`}
          onClick={e => {
            e.stopPropagation();
            toggleMenu();
          }}
        ></div>
        {children}
      </div>
      <nav
        className={`menu ${router.query.menu === 'true' ? 'is-active' : ''}`}
        onClick={e => {
          e.stopPropagation();
          toggleMenu();
        }}
      >
        <div className="menu__list">
          <ul>
            <li>
              <CustomLink menuItem={menu.home} {...itemProps} />
            </li>
            <li>
              <CustomLink menuItem={menu.about} {...itemProps} />
              <ul>
                <li>
                  <CustomLink menuItem={menu['crisol-spirit']} subRoute="/about" {...itemProps} />
                </li>
                <li>
                  <CustomLink menuItem={menu.classes} subRoute="/about" {...itemProps} />
                </li>
                <li>
                  <CustomLink menuItem={menu.history} subRoute="/about" {...itemProps} />
                </li>
                <li>
                  <CustomLink menuItem={menu.media} subRoute="/about" {...itemProps} />
                </li>
                <li>
                  <CustomLink menuItem={menu['crisol-book']} subRoute="/about" {...itemProps} />
                </li>
              </ul>
            </li>
            <li>
              <CustomLink menuItem={menu.teachers} {...itemProps} />
              <ul>
                <li>
                  <CustomLink menuItem={menu.teachers} {...itemProps}>
                    {menu.teachers[locale]} {config.startDate.getFullYear()}
                  </CustomLink>
                </li>
                <li>
                  <CustomLink menuItem={menu['teachers-annuary']} {...itemProps} />
                </li>
              </ul>
            </li>
            <li>
              <CustomLink menuItem={menu.accommodation} {...itemProps} />
            </li>
            <li>
              <CustomLink menuItem={menu.support} {...itemProps} />
            </li>
            <li>
              <CustomLink menuItem={menu.contact} {...itemProps} />
            </li>
            <li>
              <CustomLink menuItem={menu.registration} {...itemProps} />
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
        </div>
      </nav>
      <style jsx global>{`
        .main__container {
          background-color: transparent;
          position: relative;
          top: 0;
          right: 0;
          bottom: 0;
          width: 100vw;
          max-height: 100vh;
          border-radius: 0;
          z-index: 1;
          box-shadow: (0 0 4px var(--color-neutral));

          transition: right 0.4s cubic-bezier(0.51, 0.26, 0.44, 1.37),
            top 0.4s cubic-bezier(0.51, 0.26, 0.44, 1.37),
            max-height 0.4s cubic-bezier(0.51, 0.26, 0.44, 1.37);

          -ms-overflow-style: none;
          scrollbar-width: none;
          &::-webkit-scrollbar {
            display: none;
          }

          &.is-active {
            display: block;
            top: 35px;
            right: 18rem;
            max-height: calc(100vh - 70px);
            border-radius: 1.5rem;
            overflow-y: scroll;
          }
        }

        .container__overlay {
          position: absolute;
          width: 100%;
          height: 100%;
          display: none;
          z-index: 999;

          &.is-active {
            display: block;
          }
        }

        .menu {
          width: 100vw;
          height: 100vh;
          position: fixed;
          top: 0;
          right: 0;
          background-color: var(--color-dark);
          z-index: 0;
          color: var(--color-white);
          overflow-y: auto;
          padding-bottom: 3rem;

          transition: right 0.5s ease-in-out;

          & * {
            transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;
          }

          &__list {
            width: 17rem;
            max-width: 100%;
            position: absolute;
            top: 0;
            right: 0;
            padding: 4rem 0;
          }

          & ul {
            list-style-type: none;
            background-color: var(--color-dark);
            margin: 0;
            padding: 0;
          }

          & li {
            margin: 2px 0;
            padding: 0;

            & a {
              border-top-left-radius: 6px;
              border-bottom-left-radius: 6px;

              &:hover {
                background-color: var(--color-neutral);
                font-weight: bold;
              }
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
          & .active-path {
            background-color: var(--color-neutral);
            font-weight: bold;
          }
        }
      `}</style>
    </>
  );
};

export default Menu;
