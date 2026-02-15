import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { Link } from "@components";
import config from "@config/config.yml";
import menu, { MenuItem } from "@config/menu.yml";
import translations, { Language } from "@config/translations.yml";
import { useLocale } from "@hooks";
import { baseUrl } from "@utils/baseUrl";

const NAVBAR_HEIGHT = "4.5rem";

interface NavLinkProps {
  menuItem: MenuItem;
  pathPrefix?: string;
  locale: Language;
  noHighlight?: boolean;
  exactMatch?: boolean;
}

const NavLink = ({
  menuItem,
  pathPrefix,
  locale,
  noHighlight,
  exactMatch,
}: NavLinkProps) => {
  const router = useRouter();
  const route = `${pathPrefix ?? ""}${menuItem.link}`;
  const fullPath = `/${locale}${route}`.replace(/\/$/, "") || `/${locale}`;
  const isActive = exactMatch
    ? router.asPath === fullPath
    : router.asPath === fullPath ||
      (route !== "/" && router.asPath.startsWith(fullPath));

  return (
    <Link
      href={route}
      replace
      className={`nav-link ${isActive && !noHighlight ? "active" : ""}`}
    >
      {menuItem[locale]}
    </Link>
  );
};

export const Navbar = () => {
  const locale = useLocale();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const [experienceDropdownOpen, setExperienceDropdownOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [router.asPath]);

  return (
    <>
      <header className="navbar">
        <Link href="/" className="navbar__logo">
          <Image
            src={baseUrl("/logo.png")}
            height={51}
            width={200}
            alt={config.name}
          />
        </Link>

        <nav className="navbar__nav">
          <div
            className="navbar__dropdown"
            onMouseEnter={() => setAboutDropdownOpen(true)}
            onMouseLeave={() => setAboutDropdownOpen(false)}
          >
            <button
              type="button"
              className={`nav-link nav-link--dropdown ${
                router.asPath.startsWith(`/${locale}/about`) ? "active" : ""
              }`}
              onClick={() => setAboutDropdownOpen(!aboutDropdownOpen)}
              aria-expanded={aboutDropdownOpen}
              aria-haspopup="true"
            >
              {menu.about[locale]}
              <span className="navbar__dropdown-arrow">▼</span>
            </button>
            <ul
              className={`navbar__dropdown-menu ${
                aboutDropdownOpen ? "is-open" : ""
              }`}
              role="menu"
            >
              <li>
                <NavLink
                  menuItem={menu.aboutLink}
                  locale={locale}
                  pathPrefix=""
                  exactMatch
                />
              </li>
              <li>
                <NavLink
                  menuItem={menu.classes}
                  locale={locale}
                  pathPrefix="/about"
                />
              </li>
              <li>
                <NavLink
                  menuItem={menu.history}
                  locale={locale}
                  pathPrefix="/about"
                />
              </li>
              <li>
                <NavLink
                  menuItem={menu.media}
                  locale={locale}
                  pathPrefix="/about"
                />
              </li>
              <li>
                <NavLink
                  menuItem={menu["crisol-book"]}
                  locale={locale}
                  pathPrefix="/about"
                />
              </li>
            </ul>
          </div>

          <div
            className="navbar__dropdown"
            onMouseEnter={() => setExperienceDropdownOpen(true)}
            onMouseLeave={() => setExperienceDropdownOpen(false)}
          >
            <button
              type="button"
              className={`nav-link nav-link--dropdown ${
                router.asPath.startsWith(`/${locale}/teachers`) ||
                router.asPath.startsWith(`/${locale}/accommodation`)
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                setExperienceDropdownOpen(!experienceDropdownOpen)
              }
              aria-expanded={experienceDropdownOpen}
              aria-haspopup="true"
            >
              {menu.theExperience[locale]}
              <span className="navbar__dropdown-arrow">▼</span>
            </button>
            <ul
              className={`navbar__dropdown-menu ${
                experienceDropdownOpen ? "is-open" : ""
              }`}
              role="menu"
            >
              <li>
                <NavLink menuItem={menu.teachers} locale={locale} noHighlight />
              </li>
              <li>
                <NavLink menuItem={menu.accommodation} locale={locale} />
              </li>
            </ul>
          </div>

          <NavLink menuItem={menu.contact} locale={locale} />
          {!config.hideRegistrationPage && (
            <NavLink menuItem={menu.registration} locale={locale} />
          )}

          <div
            className="navbar__dropdown navbar__dropdown--right"
            onMouseEnter={() => setLangDropdownOpen(true)}
            onMouseLeave={() => setLangDropdownOpen(false)}
          >
            <button
              type="button"
              className={`nav-link nav-link--dropdown ${
                langDropdownOpen ? "active" : ""
              }`}
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              aria-expanded={langDropdownOpen}
              aria-haspopup="true"
            >
              {translations.languages[locale]}
              <span className="navbar__dropdown-arrow">▼</span>
            </button>
            <ul
              className={`navbar__dropdown-menu ${
                langDropdownOpen ? "is-open" : ""
              }`}
              role="menu"
            >
              <li>
                <Link
                  href={router.pathname}
                  locale="es"
                  className={`nav-link ${locale === "es" ? "active" : ""}`}
                >
                  {translations.spanish[locale]}
                </Link>
              </li>
              <li>
                <Link
                  href={router.pathname}
                  locale="en"
                  className={`nav-link ${locale === "en" ? "active" : ""}`}
                >
                  {translations.english[locale]}
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        <button
          className={`hamburger hamburger--spin ${
            mobileMenuOpen ? "is-active" : ""
          }`}
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-menu"
        >
          <span className="hamburger-box">
            <span className="hamburger-inner" />
          </span>
        </button>
      </header>

      <div
        id="mobile-menu"
        className={`navbar__mobile ${mobileMenuOpen ? "is-open" : ""}`}
      >
        <nav className="navbar__mobile-nav">
          <NavLink
            menuItem={menu.aboutLink}
            locale={locale}
            pathPrefix=""
            exactMatch
          />
          <NavLink
            menuItem={menu.classes}
            locale={locale}
            pathPrefix="/about"
          />
          <NavLink
            menuItem={menu.history}
            locale={locale}
            pathPrefix="/about"
          />
          <NavLink menuItem={menu.media} locale={locale} pathPrefix="/about" />
          <NavLink
            menuItem={menu["crisol-book"]}
            locale={locale}
            pathPrefix="/about"
          />
          <NavLink menuItem={menu.teachers} locale={locale} noHighlight />
          <NavLink menuItem={menu.accommodation} locale={locale} />
          <NavLink menuItem={menu.contact} locale={locale} />
          {!config.hideRegistrationPage && (
            <NavLink menuItem={menu.registration} locale={locale} />
          )}
          <div className="navbar__mobile-lang">
            <Link
              href={router.pathname}
              locale="es"
              className={`nav-link ${locale === "es" ? "active" : ""}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              {translations.spanish[locale]}
            </Link>
            <Link
              href={router.pathname}
              locale="en"
              className={`nav-link ${locale === "en" ? "active" : ""}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              {translations.english[locale]}
            </Link>
          </div>
        </nav>
      </div>

      <style jsx>{`
        .navbar {
          --navbar-height: ${NAVBAR_HEIGHT};
          --nav-item-padding: 0.75rem 1.25rem;
          --nav-item-radius: 6px;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: var(--navbar-height);
          display: flex;
          justify-content: space-between;
          align-items: center;
          background-color: var(--color-dark);
          padding: 0 2rem;
          z-index: 1000;
        }

        .navbar :global(a) {
          color: var(--color-white) !important;
          text-decoration: none !important;
          transition: background-color 0.2s, color 0.2s;
        }

        .navbar :global(a:hover),
        .navbar :global(a:active),
        .navbar :global(a.active) {
          background-color: var(--color-neutral);
          color: var(--color-white) !important;
        }

        .navbar__logo {
          flex-shrink: 0;
          text-decoration: none !important;
        }

        .navbar__logo:hover {
          background-color: transparent !important;
        }

        .navbar__logo :global(img) {
          display: block;
          height: 51px;
          width: auto;
        }

        .navbar__nav {
          display: none;
        }

        @media (min-width: 900px) {
          .navbar__nav {
            display: flex;
            align-items: center;
            gap: 0;
            flex-wrap: wrap;
          }
        }

        .nav-link {
          display: inline-block;
          padding: var(--nav-item-padding);
          margin: 0 0.5rem;
          color: var(--color-white);
          text-decoration: none !important;
          font-weight: 400;
          font-size: var(--size-md);
          border-radius: var(--nav-item-radius);
          transition: background-color 0.2s, color 0.2s;
        }

        .nav-link:hover {
          background-color: var(--color-neutral);
          color: var(--color-white);
        }

        .nav-link.active {
          background-color: var(--color-neutral);
          color: var(--color-white);
        }

        .nav-link--dropdown {
          background: none;
          border: none;
          font: inherit;
          font-weight: 400;
          color: var(--color-white) !important;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
          border-radius: var(--nav-item-radius);
          padding: var(--nav-item-padding);
          margin: 0 0.5rem;
          transition: background-color 0.2s, color 0.2s;
        }

        .nav-link--dropdown:hover,
        .nav-link--dropdown.active {
          background-color: var(--color-neutral);
          color: var(--color-white) !important;
        }

        .navbar__nav :global(a) {
          display: inline-block !important;
          padding: var(--nav-item-padding) !important;
          margin: 0 0.5rem !important;
          border-radius: var(--nav-item-radius) !important;
          color: var(--color-white) !important;
          text-decoration: none !important;
          font-weight: 400 !important;
          font-size: var(--size-md) !important;
          transition: background-color 0.2s, color 0.2s;
        }

        .navbar__nav :global(a:hover),
        .navbar__nav :global(a:active),
        .navbar__nav :global(a.active) {
          background-color: var(--color-neutral) !important;
          color: var(--color-white) !important;
        }

        .navbar__dropdown-arrow {
          font-size: 0.6em;
          opacity: 0.8;
        }

        .navbar__dropdown {
          position: relative;
        }

        .navbar__dropdown--right .navbar__dropdown-menu {
          left: auto;
          right: 0.5rem;
        }

        .navbar__dropdown-menu {
          position: absolute;
          top: 100%;
          left: 0.5rem;
          margin: 0.25rem 0 0;
          padding: 0.5rem;
          list-style: none;
          background-color: var(--color-dark);
          border-radius: var(--nav-item-radius);
          width: max-content;
          white-space: nowrap;
          opacity: 0;
          visibility: hidden;
          transform: translateY(-0.5rem);
          transition: opacity 0.2s, transform 0.2s, visibility 0.2s;
          z-index: 10;
        }

        .navbar__dropdown-menu.is-open {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
        }

        .navbar__dropdown-menu li {
          margin: 0;
          width: 100%;
        }

        .navbar__dropdown-menu :global(a) {
          display: block !important;
          width: 100% !important;
          box-sizing: border-box;
          padding: var(--nav-item-padding);
          white-space: nowrap;
          color: var(--color-white);
          text-decoration: none !important;
          font-weight: 400;
          font-size: var(--size-md);
          border-radius: var(--nav-item-radius);
          margin: 0 0 0.25rem 0 !important;
          transition: background-color 0.2s, color 0.2s;
        }

        .navbar__dropdown-menu :global(a:last-child) {
          margin-bottom: 0 !important;
        }

        .navbar__dropdown-menu :global(a:hover),
        .navbar__dropdown-menu :global(a.active) {
          background-color: var(--color-neutral);
          color: var(--color-white);
        }

        .hamburger {
          display: block;
        }

        @media (min-width: 900px) {
          .hamburger {
            display: none;
          }
        }

        .navbar__mobile {
          --nav-item-padding: 0.75rem 1.25rem;
          --nav-item-radius: 6px;
          position: fixed;
          top: var(--navbar-height);
          left: 0;
          right: 0;
          background-color: var(--color-dark);
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.3s ease-out;
          z-index: 999;
        }

        .navbar__mobile.is-open {
          max-height: 80vh;
          overflow-y: auto;
        }

        @media (min-width: 900px) {
          .navbar__mobile {
            display: none;
          }
        }

        .navbar__mobile-nav {
          display: flex;
          flex-direction: column;
          padding: 1rem 2rem 2rem;
          gap: 0.25rem;
        }

        .navbar__mobile-nav :global(a) {
          padding: var(--nav-item-padding);
          border-radius: var(--nav-item-radius);
          color: var(--color-white);
          text-decoration: none !important;
          font-weight: 400;
          font-size: var(--size-md);
          margin: 0 0.5rem;
          transition: background-color 0.2s, color 0.2s;
        }

        .navbar__mobile-nav :global(a:hover) {
          background-color: var(--color-neutral);
          color: var(--color-white);
        }

        .navbar__mobile-nav :global(a.active) {
          background-color: var(--color-neutral);
          color: var(--color-white);
        }

        .navbar__mobile-lang {
          display: flex;
          gap: 1rem;
          margin-top: 1rem;
          padding-top: 1rem;
          border-top: 1px solid var(--color-neutral);
        }

        .navbar__mobile-lang :global(a) {
          font-size: var(--size-md);
          font-weight: 400;
          color: var(--color-white);
          text-decoration: none !important;
          padding: var(--nav-item-padding);
          border-radius: var(--nav-item-radius);
          transition: background-color 0.2s, color 0.2s;
        }

        .navbar__mobile-lang :global(a:hover) {
          background-color: var(--color-neutral);
          color: var(--color-white);
        }

        .navbar__mobile-lang :global(a.active) {
          background-color: var(--color-neutral);
          color: var(--color-white);
        }
      `}</style>
    </>
  );
};
