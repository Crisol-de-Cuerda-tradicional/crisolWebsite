import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { Button, Link } from "@components";
import config from "@config/config.yml";
import menu, { MenuItem } from "@config/menu.yml";
import translations, { Language } from "@config/translations.yml";
import { useLocale } from "@hooks";
import { baseUrl } from "@utils/baseUrl";
import { shouldShowRegistration } from "@utils/timezone";

const NAVBAR_HEIGHT = "4.5rem";
/** Desktop: full nav + centered logo; below this: burger + logo left */
const NAVBAR_DESKTOP_MIN = "1000px";
/** At this width and below: header logo hidden (logo in drawer); bar = CTA left, burger right */
const NAVBAR_COMPACT_MAX = "500px";

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

  const showRegistrationCta = shouldShowRegistration();

  return (
    <>
      <header className="navbar">
        <nav
          className="navbar__nav navbar__nav--left"
          aria-label={`${menu.about[locale]}, ${menu.theExperience[locale]}`}
        >
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
              onClick={() => setExperienceDropdownOpen(!experienceDropdownOpen)}
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
        </nav>

        <div className="navbar__logo">
          <Link href="/" className="navbar__logo-link" data-navbar-brand>
            <Image
              src={baseUrl("/images/logo-black.png")}
              height={51}
              width={200}
              alt={config.name}
            />
          </Link>
        </div>

        <nav
          className="navbar__nav navbar__nav--right"
          aria-label={`${menu.contact[locale]}${
            config.hideRegistrationPage ? "" : `, ${menu.registration[locale]}`
          }, ${translations.languages[locale]}`}
        >
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

        <div
          className={`navbar__trailing${
            showRegistrationCta ? " navbar__trailing--has-cta" : ""
          }`}
        >
          {showRegistrationCta ? (
            <div className="navbar__registration-cta">
              <Link
                href={config.registrationLink}
                target="_blank"
                data-registration-cta
              >
                <Button size="sm">{menu.registration[locale]}</Button>
              </Link>
            </div>
          ) : null}
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
        </div>
      </header>

      <div
        id="mobile-menu"
        className={`navbar__mobile ${mobileMenuOpen ? "is-open" : ""}`}
      >
        <nav className="navbar__mobile-nav">
          <div className="navbar__mobile-logo">
            <Link
              href="/"
              className="navbar__mobile-logo-link"
              data-mobile-menu-brand
              onClick={() => setMobileMenuOpen(false)}
            >
              <Image
                src={baseUrl("/images/logo-black.png")}
                height={51}
                width={200}
                alt={config.name}
              />
            </Link>
          </div>
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
          align-items: center;
          justify-content: space-between;
          gap: 0.5rem;
          background-color: var(--ds-nav-surface);
          padding: 0 2rem;
          z-index: 1000;
        }

        @media (min-width: ${NAVBAR_DESKTOP_MIN}) {
          .navbar {
            justify-content: center;
            gap: 0;
          }
        }

        /* Nav links only — brand logo link excluded (no hover / highlight) */
        .navbar
          :global(a:not([data-navbar-brand]):not([data-registration-cta])) {
          color: var(--ds-nav-text) !important;
          text-decoration: none !important;
          transition:
            background-color 0.2s,
            color 0.2s;
        }

        .navbar
          :global(
            a:not([data-navbar-brand]):not([data-registration-cta]):hover
          ),
        .navbar
          :global(
            a:not([data-navbar-brand]):not([data-registration-cta]):active
          ) {
          background-color: var(--ds-nav-item-hover-bg);
          color: var(--ds-nav-item-hover-text) !important;
        }

        .navbar
          :global(
            a:not([data-navbar-brand]):not([data-registration-cta]).active
          ) {
          background-color: var(--ds-nav-item-active-bg);
          color: var(--ds-nav-item-active-text) !important;
        }

        .navbar__trailing {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          flex-shrink: 0;
        }

        .navbar__registration-cta {
          position: static;
        }

        @media (min-width: ${NAVBAR_DESKTOP_MIN}) {
          .navbar__trailing {
            position: absolute;
            right: 2rem;
            top: 0;
            bottom: 0;
            z-index: 2;
            pointer-events: none;
          }

          .navbar__trailing .navbar__registration-cta,
          .navbar__trailing .hamburger {
            pointer-events: auto;
          }

          .navbar__registration-cta {
            position: absolute;
            right: 0;
          }
        }

        /* Wrapper must be a real div so styled-jsx scopes display:none under 500px (Link did not get scoped class reliably). */
        .navbar__logo {
          flex-shrink: 0;
        }

        .navbar__logo-link {
          display: inline-block;
          text-decoration: none !important;
          background-color: var(--ds-nav-logo-hover-bg) !important;
        }

        .navbar__logo-link:hover,
        .navbar__logo-link:active,
        .navbar__logo-link:focus,
        .navbar__logo-link:focus-visible {
          background-color: var(--ds-nav-logo-hover-bg) !important;
          color: inherit !important;
          opacity: 1;
        }

        .navbar__logo-link :global(img) {
          display: block;
          height: 51px;
          width: auto;
        }

        .navbar__mobile-logo {
          display: none;
          padding-bottom: 1rem;
          margin-bottom: 0.75rem;
          border-bottom: 1px solid var(--ds-border-subtle);
          text-align: center;
        }

        .navbar__mobile-logo-link {
          display: inline-block;
          text-decoration: none !important;
          background: transparent !important;
        }

        /* Beat globals.css a:hover — no hover chrome on drawer logo */
        .navbar__mobile :global(a[data-mobile-menu-brand]),
        .navbar__mobile :global(a[data-mobile-menu-brand]:hover),
        .navbar__mobile :global(a[data-mobile-menu-brand]:active),
        .navbar__mobile :global(a[data-mobile-menu-brand]:focus),
        .navbar__mobile :global(a[data-mobile-menu-brand]:focus-visible) {
          font-weight: 400 !important;
          color: var(--ds-nav-text) !important;
          text-decoration: none !important;
          background: transparent !important;
          opacity: 1 !important;
        }

        .navbar__mobile-logo-link :global(img) {
          display: block;
          height: 48px;
          width: auto;
          margin: 0 auto;
        }

        @media (max-width: ${NAVBAR_COMPACT_MAX}) {
          .navbar__logo {
            display: none !important;
          }

          .navbar__trailing {
            flex: 1;
            width: 100%;
            min-width: 0;
            justify-content: flex-end;
          }

          .navbar__trailing--has-cta {
            justify-content: space-between;
          }

          .navbar__mobile-logo {
            display: block;
          }
        }

        .navbar__nav {
          display: none;
        }

        @media (min-width: ${NAVBAR_DESKTOP_MIN}) {
          .navbar__nav--left,
          .navbar__nav--right {
            display: flex;
            align-items: center;
            flex: 1;
            flex-wrap: wrap;
            gap: 0;
            min-width: 0;
          }

          .navbar__nav--left {
            justify-content: flex-end;
          }

          .navbar__nav--right {
            justify-content: flex-start;
          }
        }

        .nav-link {
          display: inline-block;
          padding: var(--nav-item-padding);
          margin: 0 0.5rem;
          color: var(--ds-nav-text);
          text-decoration: none !important;
          font-weight: 400;
          font-size: var(--size-md);
          border-radius: var(--nav-item-radius);
          transition:
            background-color 0.2s,
            color 0.2s;
        }

        .nav-link:hover {
          background-color: var(--ds-nav-item-hover-bg);
          color: var(--ds-nav-item-hover-text);
        }

        .nav-link.active {
          background-color: var(--ds-nav-item-active-bg);
          color: var(--ds-nav-item-active-text);
        }

        .nav-link--dropdown {
          background: none;
          border: none;
          font: inherit;
          font-weight: 400;
          color: var(--ds-nav-text) !important;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
          border-radius: var(--nav-item-radius);
          padding: var(--nav-item-padding);
          margin: 0 0.5rem;
          transition:
            background-color 0.2s,
            color 0.2s;
        }

        .nav-link--dropdown:hover,
        .nav-link--dropdown.active {
          background-color: var(--ds-nav-item-hover-bg);
          color: var(--ds-nav-item-hover-text) !important;
        }

        .navbar__nav :global(a) {
          display: inline-block !important;
          padding: var(--nav-item-padding) !important;
          margin: 0 0.5rem !important;
          border-radius: var(--nav-item-radius) !important;
          color: var(--ds-nav-text) !important;
          text-decoration: none !important;
          font-weight: 400 !important;
          font-size: var(--size-md) !important;
          transition:
            background-color 0.2s,
            color 0.2s;
        }

        .navbar__nav :global(a:hover),
        .navbar__nav :global(a:active) {
          background-color: var(--ds-nav-item-hover-bg) !important;
          color: var(--ds-nav-item-hover-text) !important;
        }

        .navbar__nav :global(a.active) {
          background-color: var(--ds-nav-item-active-bg) !important;
          color: var(--ds-nav-item-active-text) !important;
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
          background-color: var(--ds-nav-surface);
          border: 1px solid var(--ds-border-subtle);
          border-radius: var(--nav-item-radius);
          width: max-content;
          white-space: nowrap;
          opacity: 0;
          visibility: hidden;
          transform: translateY(-0.5rem);
          transition:
            opacity 0.2s,
            transform 0.2s,
            visibility 0.2s;
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
          color: var(--ds-nav-text);
          text-decoration: none !important;
          font-weight: 400;
          font-size: var(--size-md);
          border-radius: var(--nav-item-radius);
          margin: 0 0 0.25rem 0 !important;
          transition:
            background-color 0.2s,
            color 0.2s;
        }

        .navbar__dropdown-menu :global(a:last-child) {
          margin-bottom: 0 !important;
        }

        .navbar__dropdown-menu :global(a:hover),
        .navbar__dropdown-menu :global(a:active) {
          background-color: var(--ds-nav-item-hover-bg);
          color: var(--ds-nav-item-hover-text);
        }

        .navbar__dropdown-menu :global(a.active) {
          background-color: var(--ds-nav-item-active-bg);
          color: var(--ds-nav-item-active-text);
        }

        .hamburger {
          display: block;
        }

        @media (min-width: ${NAVBAR_DESKTOP_MIN}) {
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
          background-color: var(--ds-nav-surface);
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.3s ease-out;
          z-index: 999;
        }

        .navbar__mobile.is-open {
          max-height: 80vh;
          overflow-y: auto;
        }

        @media (min-width: ${NAVBAR_DESKTOP_MIN}) {
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
          color: var(--ds-nav-text);
          text-decoration: none !important;
          font-weight: 400;
          font-size: var(--size-md);
          margin: 0 0.5rem;
          transition:
            background-color 0.2s,
            color 0.2s;
        }

        .navbar__mobile-nav :global(a:hover),
        .navbar__mobile-nav :global(a:active) {
          background-color: var(--ds-nav-item-hover-bg);
          color: var(--ds-nav-item-hover-text);
        }

        .navbar__mobile-nav :global(a.active) {
          background-color: var(--ds-nav-item-active-bg);
          color: var(--ds-nav-item-active-text);
        }

        .navbar__mobile-lang {
          display: flex;
          gap: 1rem;
          margin-top: 1rem;
          padding-top: 1rem;
          border-top: 1px solid var(--ds-border-subtle);
        }

        .navbar__mobile-lang :global(a) {
          font-size: var(--size-md);
          font-weight: 400;
          color: var(--ds-nav-text);
          text-decoration: none !important;
          padding: var(--nav-item-padding);
          border-radius: var(--nav-item-radius);
          transition:
            background-color 0.2s,
            color 0.2s;
        }

        .navbar__mobile-lang :global(a:hover),
        .navbar__mobile-lang :global(a:active) {
          background-color: var(--ds-nav-item-hover-bg);
          color: var(--ds-nav-item-hover-text);
        }

        .navbar__mobile-lang :global(a.active) {
          background-color: var(--ds-nav-item-active-bg);
          color: var(--ds-nav-item-active-text);
        }
      `}</style>
    </>
  );
};
