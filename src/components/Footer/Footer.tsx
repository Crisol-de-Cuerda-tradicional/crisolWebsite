import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import config from '../../config/config.yml';
import menu, { MenuItem } from '../../config/menu.yml';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { brands } from '@fortawesome/fontawesome-svg-core/import.macro';
import Button from '../Button/Button';

const Footer = () => {
  const router = useRouter();
  const locale = (router.locale ?? 'es') as keyof MenuItem;
  return (
    <div className="footer">
      <div className="footer__content">
        <Link href="/" passHref>
          <a>
            <Image src="/logo.png" height="90" width="352" alt={config.name} />
          </a>
        </Link>
        <div className="footer__policies">
          <Link href={menu.legalDisclaymer.link}>{menu.legalDisclaymer[locale]}</Link>
          <Link href={menu.privacyPolicy.link}>{menu.privacyPolicy[locale]}</Link>
          <Link href={menu.cookies.link}>{menu.cookies[locale]}</Link>
        </div>
        <div className="footer__subscribe">
          {menu.newsletter[locale]}
          <Link href={config.newsletterLink} passHref>
            <Button>{menu.subscribe[locale]}</Button>
          </Link>
        </div>
      </div>
      <div className="footer__social">
        <div className="social__links">
          <Link href={config.socialMedia.instagram} passHref>
            <a>
              <FontAwesomeIcon icon={brands('instagram')} size="2x" />
            </a>
          </Link>
          <Link href={config.socialMedia.tiktok} passHref>
            <a>
              <FontAwesomeIcon icon={brands('tiktok')} size="2x" />
            </a>
          </Link>
          <Link href={config.socialMedia.spotify} passHref>
            <a>
              <FontAwesomeIcon icon={brands('spotify')} size="2x" />
            </a>
          </Link>
          <Link href={config.socialMedia.youtube} passHref>
            <a>
              <FontAwesomeIcon icon={brands('youtube')} size="2x" />
            </a>
          </Link>
          <Link href={config.socialMedia.facebook} passHref>
            <a>
              <FontAwesomeIcon icon={brands('facebook')} size="2x" />
            </a>
          </Link>
        </div>
        <div>&copy;2022 Created by Bernat Duran</div>
      </div>

      <style jsx>{`
        .footer {
          width: 100%;
          background-image: url('http://www.crisoldecuerda.com/wp-content/themes/crisoltemplate/images/footerimg.jpg');
          background-repeat: no-repeat;
          background-position: center top;
          background-size: cover;
          background-color: var(--color-black);
          padding: 2rem 0 0 0;

          .footer__content {
            display: flex;
            justify-content: space-evenly;
            align-items: center;
            flex-wrap: wrap;
            gap: 3.5rem;
            padding: 1.5rem;
            max-width: 1024px;
            margin: 0 auto;

            color: var(--color-white);
            font-size: 1.25rem;

            a {
              display: inline-block;
            }

            .footer__policies {
              display: flex;
              flex-direction: column;
              gap: 1rem;
              text-align: center;

              text-decoration: underline;
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

export default Footer;
