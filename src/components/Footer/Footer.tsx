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

import { Button, Link } from "@components";
import config from "@config/config.yml";
import menu from "@config/menu.yml";
import translations from "@config/translations.yml";
import { useLocale } from "@hooks";
import { baseUrl } from "@utils/baseUrl";

export const Footer = () => {
  const locale = useLocale();

  return (
    <div className="footer">
      <div className="footer__content">
        <Link href="/">
          <Image
            src={baseUrl("/logo.png")}
            height="90"
            width="352"
            alt={config.name}
          />
        </Link>
        <div className="footer__subscribe">
          {translations.newsletter[locale]}
          <Link
            href={config.newsletterLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button>{translations.subscribe[locale]}</Button>
          </Link>
        </div>
      </div>
      <div className="footer__social">
        <div className="social__links">
          <Link
            href={config.socialMedia.instagram}
            target="_blank"
            aria-label="Instagram"
          >
            <FontAwesomeIcon icon={faInstagram} size="2x" />
          </Link>
          <Link
            href={config.socialMedia.patreon}
            target="_blank"
            aria-label="Patreon"
          >
            <FontAwesomeIcon icon={faPatreon} size="2x" />
          </Link>
          <Link
            href={config.socialMedia.tiktok}
            target="_blank"
            aria-label="TikTok"
          >
            <FontAwesomeIcon icon={faTiktok} size="2x" />
          </Link>
          <Link
            href={config.socialMedia.spotify}
            target="_blank"
            aria-label="Spotify"
          >
            <FontAwesomeIcon icon={faSpotify} size="2x" />
          </Link>
          <Link
            href={config.socialMedia.youtube}
            target="_blank"
            aria-label="Youtube"
          >
            <FontAwesomeIcon icon={faYoutube} size="2x" />
          </Link>
          <Link
            href={config.socialMedia.facebook}
            target="_blank"
            aria-label="Facebook"
          >
            <FontAwesomeIcon icon={faFacebook} size="2x" />
          </Link>
        </div>
      </div>
      <div className="footer__legal">
        <div className="legal__policies">
          <Link href={menu.legalDisclaimer.link}>
            {menu.legalDisclaimer[locale]}
          </Link>
          <Link href={menu.privacyPolicy.link}>
            {menu.privacyPolicy[locale]}
          </Link>
        </div>
        <div className="legal__created">
          &copy;2023 Created by{" "}
          <a
            href="https://github.com/Ishdril"
            rel="noopener noreferrer"
            target="_blank"
          >
            Bernat Duran
          </a>
        </div>
      </div>

      <style jsx global>{`
        .footer {
          width: 100%;
          background-color: var(--color-black);
          padding: 0;

          .footer__content {
            display: flex;
            justify-content: space-evenly;
            align-items: center;
            flex-wrap: wrap;
            gap: 3.5rem;
            padding: 3rem;
            margin: 0 auto;

            color: var(--color-white);
            font-size: 1.25rem;

            .footer__subscribe {
              border: var(--color-primary) solid 2px;
              padding: 1.5rem;
              text-align: center;
              display: flex;
              flex-direction: column;
              align-items: center;
              gap: 1.5rem;
              max-width: 350px;
            }
          }
        }
        .footer__social {
          background-color: var(--color-white);
          width: 100%;
          display: flex;
          flex-wrap: wrap;
          gap: 2rem;
          row-gap: 1rem;
          justify-content: center;
          align-items: center;

          padding: 1rem;

          .social__links {
            display: flex;
            justify-content: center;
            gap: 1rem;
          }
        }
        .footer__legal {
          width: 100%;
          background-color: var(--color-black);
          color: var(--color-light);
          padding: 0;

          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          flex-wrap: wrap;
          gap: 2rem;
          padding: 2rem;
          margin: 0 auto;

          & > * {
            width: 300px;
          }

          .legal__policies {
            a {
              display: flex;
              flex-direction: column;

              color: var(--color-light);
              font-weight: 400;
              text-decoration: underline;
            }
          }

          .legal__created {
            a {
              color: var(--color-primary);

              text-decoration: none;

              &:hover {
                text-decoration: underline;
              }
            }
          }
        }
      `}</style>
    </div>
  );
};
