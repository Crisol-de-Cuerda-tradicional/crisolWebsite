import { brands } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@components';
import config from '@config/config.yml';
import translations from '@config/translations.yml';
import { useLocale } from '@hooks';

export const Footer = () => {
  const locale = useLocale();

  return (
    <div className="footer">
      <div className="footer__content">
        <Link href="/">
          <Image src="/assets/logo.png" height="90" width="352" alt={config.name} />
        </Link>
        <div className="footer__subscribe">
          {translations.newsletter[locale]}
          <Link href={config.newsletterLink}>
            <Button>{translations.subscribe[locale]}</Button>
          </Link>
        </div>
      </div>
      <div className="footer__social">
        <div className="social__links">
          <Link href={config.socialMedia.instagram}>
            <FontAwesomeIcon icon={brands('instagram')} size="2x" />
          </Link>
          <Link href={config.socialMedia.tiktok}>
            <FontAwesomeIcon icon={brands('tiktok')} size="2x" />
          </Link>
          <Link href={config.socialMedia.spotify}>
            <FontAwesomeIcon icon={brands('spotify')} size="2x" />
          </Link>
          <Link href={config.socialMedia.youtube}>
            <FontAwesomeIcon icon={brands('youtube')} size="2x" />
          </Link>
          <Link href={config.socialMedia.facebook}>
            <FontAwesomeIcon icon={brands('facebook')} size="2x" />
          </Link>
        </div>
        <div>&copy;2023 Created by Bernat Duran</div>
      </div>

      <style jsx>{`
        .footer {
          width: 100%;
          background-image: url('http://www.crisoldecuerda.com/wp-content/themes/crisoltemplate/images/footerimg.jpg');
          background-repeat: no-repeat;
          background-position: center top;
          background-size: cover;
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

            .footer__policies {
              display: flex;
              flex-direction: column;
              gap: 1rem;
              text-align: center;

              text-decoration: underline;

              & > a {
                display: inline-block;
                color: var(--color-white);
              }
            }

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
          justify-content: center;
          align-items: center;

          padding: 1rem;

          .social__links {
            display: flex;
            justify-content: center;
            gap: 1rem;
          }
        }
      `}</style>
    </div>
  );
};
