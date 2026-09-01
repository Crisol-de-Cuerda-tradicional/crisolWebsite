import {
  faFacebook,
  faInstagram,
  faPatreon,
  faSpotify,
  faTiktok,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";

import { Link } from "@components";
import collaboratorsConfig from "@config/collaborators.yml";
import config from "@config/config.yml";
import menu from "@config/menu.yml";
import translations from "@config/translations.yml";
import { useLocale } from "@hooks";
import { baseUrl } from "@utils/baseUrl";

const socialLinks = [
  { href: config.socialMedia.instagram, icon: faInstagram, label: "Instagram" },
  { href: config.socialMedia.patreon, icon: faPatreon, label: "Patreon" },
  { href: config.socialMedia.tiktok, icon: faTiktok, label: "TikTok" },
  { href: config.socialMedia.spotify, icon: faSpotify, label: "Spotify" },
  { href: config.socialMedia.youtube, icon: faYoutube, label: "Youtube" },
  { href: config.socialMedia.facebook, icon: faFacebook, label: "Facebook" },
] as const;

export const Footer = () => {
  const locale = useLocale();
  const { collaborators } = collaboratorsConfig;

  return (
    <footer className="footer">
      <div className="footer__main footer__content">
        <section className="footer__brand">
          <Link href="/" className="footer__brand-link">
            <Image
              src={baseUrl("/images/logo-black.png")}
              height={51}
              width={200}
              alt={config.name}
              className="footer__logo"
            />
          </Link>
          <p className="footer__label">{translations.footer_contact[locale]}</p>
          <a className="footer__email" href={`mailto:${config.contact.email}`}>
            {config.contact.email}
          </a>
        </section>

        <section className="footer__updates">
          <h2 className="footer__updates-heading">
            {translations.footer_newsletter_heading[locale]}
          </h2>
          <Link
            href={config.newsletterLink}
            target="_blank"
            rel="noopener noreferrer"
            className="footer__updates-link"
          >
            {translations.subscribe[locale]}
          </Link>
        </section>

        <nav className="footer__nav" aria-label="Footer navigation">
          <div className="footer__nav-group">
            <p className="footer__label">
              {translations.footer_links_heading[locale]}
            </p>
            <ul className="footer__nav-list">
              <li>
                <Link href={menu.home.link}>{menu.home[locale]}</Link>
              </li>
              <li>
                <Link href={menu.about.link}>
                  {translations.footer_spirit[locale]}
                </Link>
              </li>
              <li>
                <Link href={menu.association.link}>
                  {menu.association[locale]}
                </Link>
              </li>
            </ul>
          </div>

          <div className="footer__nav-group">
            <p className="footer__label">
              {translations.footer_help_heading[locale]}
            </p>
            <ul className="footer__nav-list">
              <li>
                <Link href="/#faqs">{translations.faqs[locale]}</Link>
              </li>
              <li>
                <Link href={menu.legalDisclaimer.link}>
                  {menu.legalDisclaimer[locale]}
                </Link>
              </li>
              <li>
                <Link href={menu.privacyPolicy.link}>
                  {menu.privacyPolicy[locale]}
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>

      {collaborators.length > 0 && (
        <>
          <div className="footer__content">
            <hr className="footer__divider" />
          </div>
          <section className="footer__collaborators footer__content">
            <p className="footer__label footer__collaborators-title">
              {translations.collaborators[locale]}
            </p>
            <div className="footer__collaborators-logos">
              {collaborators.map((collaborator) => {
                const logo = (
                  <Image
                    src={baseUrl(
                      `/images/collaborators/${collaborator.id}.webp`,
                    )}
                    width={280}
                    height={76}
                    alt={collaborator.name}
                    className="footer__collaborator-logo"
                    style={{
                      width: "auto",
                      height: "56px",
                      maxWidth: "280px",
                      objectFit: "contain",
                    }}
                  />
                );

                if (!collaborator.url) {
                  return (
                    <span
                      key={collaborator.id}
                      className="footer__collaborator-item"
                    >
                      {logo}
                    </span>
                  );
                }

                return (
                  <Link
                    key={collaborator.id}
                    href={collaborator.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={collaborator.name}
                    className="footer__collaborator-item"
                  >
                    {logo}
                  </Link>
                );
              })}
            </div>
          </section>
        </>
      )}

      <div className="footer__content">
        <hr className="footer__divider" />
      </div>
      <div className="footer__networks footer__content">
        <div className="footer__network-links">
          {socialLinks.map(({ href, icon, label }) => (
            <Link
              key={label}
              href={href}
              target="_blank"
              aria-label={label}
              className="footer__network-link"
            >
              <FontAwesomeIcon size="xl" icon={icon} />
            </Link>
          ))}
        </div>
      </div>

      <style jsx>{`
        .footer {
          width: 100%;
          background-color: var(--color-primary-light);
          color: var(--color-neutral-900);
          --footer-content-max-width: 1300px;
        }

        .footer__content {
          width: 100%;
          max-width: var(--footer-content-max-width);
          margin-inline: auto;
          padding-inline: 1.5rem;
        }

        .footer :global(a) {
          text-decoration: none;
        }

        .footer__nav-list :global(a) {
          color: var(--color-neutral-900);
          font-weight: inherit;
        }

        .footer__nav-list :global(a:hover),
        .footer__nav-list :global(a:active) {
          color: var(--color-primary);
        }

        .footer__main {
          display: flex;
          flex-direction: column;
          gap: 3.5rem;
          padding-block: 2.5rem;
        }

        .footer__brand {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .footer :global(a.footer__brand-link) {
          display: block;
          max-width: 15.5rem;
          width: 100%;
          text-decoration: none;
        }

        .footer :global(a.footer__brand-link) :global(img) {
          width: 100% !important;
          height: auto !important;
        }

        .footer__label {
          margin: 0;
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: var(--size-md);
          color: var(--color-neutral-700);
        }

        .footer :global(a.footer__email) {
          font-size: var(--size-md);
          font-weight: 400;
          color: var(--color-primary);
          text-decoration: none;
        }

        .footer :global(a.footer__email:hover),
        .footer :global(a.footer__email:active) {
          color: var(--color-primary-dark);
        }

        .footer__updates {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .footer__updates-heading {
          margin: 0;
          font-weight: 700;
          font-size: var(--size-lg);
          line-height: 1.4;
          color: var(--color-neutral-900);
          text-wrap: balance;
        }

        .footer :global(a.footer__updates-link) {
          display: block;
          width: 100%;
          max-width: 22rem;
          padding: 0.875rem 1.5rem;
          border-radius: var(--border-radius-large);
          background-color: var(--color-primary);
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: var(--size-md);
          text-align: center;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          color: var(--color-neutral-900);
          text-decoration: none;
          transition: background-color 0.2s ease;
        }

        .footer :global(a.footer__updates-link:hover),
        .footer :global(a.footer__updates-link:active) {
          background-color: var(--color-primary-dark);
          color: var(--color-neutral-900);
        }

        .footer__nav {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
        }

        .footer__nav-group {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .footer__nav-list {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .footer__nav-list :global(a) {
          font-size: var(--size-md);
          color: var(--color-neutral-900);
        }

        .footer__divider {
          border: 0;
          border-top: 1px solid var(--color-neutral-500);
          width: 75%;
          margin: 0 auto;
        }

        .footer__collaborators {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          padding-block: 2rem;
        }

        .footer__collaborators-title {
          text-align: center;
        }

        .footer__collaborators-logos {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          align-items: center;
          gap: 1.5rem;
          width: 100%;
        }

        .footer__collaborator-item {
          display: flex;
          flex: 0 0 auto;
          align-items: center;
          justify-content: center;
          height: 56px;
        }

        .footer__collaborator-item :global(img) {
          display: block;
          width: auto !important;
          height: 56px !important;
          max-width: 280px;
          object-fit: contain;
          object-position: center;
        }

        .footer__networks {
          padding-block: 4rem 4.5rem;
        }

        .footer__network-links {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          align-items: center;
          gap: 1rem;
        }

        .footer :global(a.footer__network-link) {
          color: var(--color-neutral-900);
        }

        .footer :global(a.footer__network-link:hover),
        .footer :global(a.footer__network-link:active) {
          color: var(--color-primary);
        }

        @media (min-width: 768px) {
          .footer__content {
            padding-inline: 2rem;
          }

          .footer__main {
            padding-block: 3rem;
            gap: 4rem;
          }

          .footer__updates-heading {
            font-size: var(--size-xlg);
          }

          .footer__networks {
            padding-block: 3.5rem 4rem;
          }
        }

        @media (min-width: 1024px) {
          .footer__content {
            padding-inline: 2.5rem;
          }

          .footer__main {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            align-items: start;
            gap: 3.5rem;
            padding-block: 3.5rem;
          }

          .footer__nav {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1rem;
          }
        }

        @media (min-width: 1440px) {
          .footer__content {
            padding-inline: 3rem;
          }

          .footer__main {
            gap: 5rem;
            padding-block: 4rem;
          }
        }
      `}</style>
    </footer>
  );
};
