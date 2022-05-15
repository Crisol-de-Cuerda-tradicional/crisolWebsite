import type { GetStaticProps, NextPage } from 'next';
import Image from 'next/image';
import dayjs from 'dayjs';
import RenderMarkdown from '../components/RenderMarkdown/RenderMarkdown';
import Layout from '../components/Layout/Layout';
import { getContent, IContent } from '../utils/getContent';
import config from '../config/config.yml';
import indexConfig from '../config/indexPage.yml';
import translations, { Language } from '../config/translations.yml';
import { useRouter } from 'next/router';
import Button from '../components/Button/Button';
import ContentLayout from '../components/Layout/ContentLayout';
import ExpandingImg from '../components/ExpandingImg/ExpandingImg';
import Link from 'next/link';

const formatDates = (starting: Date, ending: Date, locale: string) => {
  if (locale === 'es')
    return `del ${dayjs(starting).format('D [de] MMMM')} al ${dayjs(ending).format('D [de] MMMM')}`;
  else return `from ${dayjs(starting).format('MMMM Do')} until ${dayjs(ending).format('MMMM Do')}`;
};

interface IHomeProps {
  whatIsSection: IContent<{ title: string }>;
}

const Home: NextPage<IHomeProps> = ({ whatIsSection }) => {
  const router = useRouter();
  const locale = (router.locale ?? 'es') as Language;
  return (
    <>
      <Layout>
        <div className="hero__container">
          <video autoPlay loop muted>
            <source src="http://www.crisoldecuerda.com/wp-content/uploads/2015/01/videoweb.mp4" />
          </video>
          <div id="hero" className="hero">
            <div className="hero__page-title">
              <h1 className="hero__title">
                Crisol <br />
                de Cuerda
              </h1>
              <div className="hero__dates">
                <h3>{formatDates(config.startDate, config.endDate, locale ?? 'es')}</h3>
                <h1>{config.startDate.getFullYear()}</h1>
              </div>
            </div>

            {config.registrationOpen ? (
              <div className="hero__registration">
                <h2>Registration open</h2>
                <Button size="xlg">Register now</Button>
              </div>
            ) : null}
          </div>
        </div>
        <ContentLayout>
          <div className="centered">
            <h2>{whatIsSection.meta.title}</h2>
            <RenderMarkdown content={whatIsSection.content}></RenderMarkdown>
          </div>
        </ContentLayout>
        <div className="about__featured">
          {indexConfig.aboutLinks.map(link => {
            return (
              <ExpandingImg key={link.link} bgSrc={link.img}>
                <div className="about__content">
                  <h2 className="about__title">{translations[link.title][locale]}</h2>
                  <p className="about__subtitle">{translations[link.subtitle][locale]}</p>
                  <Link href={link.link} passHref>
                    <Button variant="light" size="xsm">
                      {translations.know_more[locale]}
                    </Button>
                  </Link>
                </div>
              </ExpandingImg>
            );
          })}
        </div>
      </Layout>
      <style jsx>{`
        video {
          min-width: 100%;
          min-height: 100%;
          position: absolute;
          filter: brightness(20%);
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          z-index: -1;
        }

        .hero__container {
          position: relative;
          width: 100%;
          height: 30rem;
          overflow: hidden;
        }

        .hero {
          position: relative;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;

          padding: 1rem;

          .hero__page-title {
            display: flex;
            flex-direction: column;
            width: 344px;

            .hero__title {
              width: 100%;
              color: var(--color-white);
              white-space: pre-wrap;
              margin: 0;
              font-size: 3rem;
              line-height: 3.25rem;
              text-transform: uppercase;
            }

            .hero__dates {
              display: flex;
              gap: 1rem;

              h3 {
                flex-basis: 60%;
                color: var(--color-primary);
                margin: 0;
                font-size: 1.2rem;
                line-height: 1.6rem;
                text-transform: uppercase;
              }
              h1 {
                flex-basis: 40%;
                color: var(--color-white);
                margin: 0;
                font-size: 3rem;
                line-height: 3.25rem;
              }
            }
          }

          .hero__registration {
            color: var(--color-white);
          }
        }

        .centered {
          text-align: center;
        }

        .about__featured {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));

          .about__content {
            width: 100%;
            align-self: center;
            justify-self: center;
            padding: 1rem;
            z-index: 1;

            color: var(--color-white);
            text-align: center;
          }
        }
      `}</style>
    </>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const whatIsSection = await getContent(locale ?? 'es', 'about/about');
  return {
    props: {
      whatIsSection,
    },
  };
};
