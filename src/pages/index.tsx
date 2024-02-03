import type { GetStaticProps, NextPage } from 'next';
import dayjs from 'dayjs';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import RenderMarkdown from '../components/RenderMarkdown/RenderMarkdown';
import Layout from '../components/Layout/Layout';
import { getContent, IContent } from '../utils/getContent';
import config from '../config/config.yml';
import indexConfig from '../config/indexPage.yml';
import translations, { Language } from '../config/translations.yml';
import Button from '../components/Button/Button';
import ContentLayout from '../components/Layout/ContentLayout';
import ExpandingImg from '../components/ExpandingImg/ExpandingImg';
import homePageStyles from '../styles/home-page';
import Image from 'next/image';

const formatDates = (starting: Date, ending: Date, locale: string) => {
  if (locale === 'es')
    return `del ${dayjs(starting).format('D [de] MMMM')} al ${dayjs(ending).format('D [de] MMMM')}`;
  else return `from ${dayjs(starting).format('MMMM Do')} until ${dayjs(ending).format('MMMM Do')}`;
};

interface IHomeProps {
  whatIsSection: IContent<{ title: string }>;
  teachersContent: {
    id: string;
    instrument: string;
    meta: {
      name: string;
      picture: string;
    };
    content: string;
  }[];
  accommodationSection: IContent<{
    title: string;
    background: string;
    imgs: string[];
  }>;
}

const Home: NextPage<IHomeProps> = ({ teachersContent, whatIsSection, accommodationSection }) => {
  const router = useRouter();
  const locale = (router.locale ?? 'es') as Language;
  return (
    <>
      <Layout>
        <section className="hero__container">
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

            <div className="hero__registration">
              {config.displayRegistrationCaptcha ? (
                <h2>{indexConfig.registrationCaptcha[locale]}</h2>
              ) : null}
              {config.displayRegistrationCTA ? (
                <Link href={config.registrationLink} passHref>
                  <a target="_blank">
                    <Button size="xlg">{indexConfig.registrationCta[locale]}</Button>
                  </a>
                </Link>
              ) : null}
            </div>
          </div>
        </section>
        <ContentLayout id="about_crisol">
          <div className="centered">
            <h2>{whatIsSection.meta.title}</h2>
            <RenderMarkdown content={whatIsSection.content} />
          </div>
        </ContentLayout>
        <section className="about__featured">
          {indexConfig.aboutLinks.map(link => {
            return (
              <ExpandingImg key={link.link} bgSrc={link.img}>
                <div className="about__content">
                  <h2 className="about__title">{link.title[locale]}</h2>
                  <p className="about__subtitle">{link.title[locale]}</p>
                  <Link href={link.link} passHref>
                    <a>
                      <Button variant="light" size="xsm">
                        {indexConfig.knowMoreButton[locale]}
                      </Button>
                    </a>
                  </Link>
                </div>
              </ExpandingImg>
            );
          })}
        </section>
        <section id="teachers" className="teachers">
          <div className="centered">
            <h1>{`${translations.teachers[locale]} ${config.startDate.getFullYear()}`}</h1>
          </div>
          <div className="teachers__content">
            {teachersContent.map(teacher => {
              return (
                <Link key={teacher.id} href={`/${locale}/teachers#${teacher.id}`} passHref>
                  <a className="teachers__link">
                    <ExpandingImg bgSrc={teacher.meta.picture} maxWidth="250px">
                      <div className="teachers__infocontainer">
                        <div className="teachers__info">
                          <p>{teacher.meta.name}</p>
                          <p>{translations[teacher.instrument][locale]}</p>
                        </div>
                      </div>
                    </ExpandingImg>
                  </a>
                </Link>
              );
            })}
          </div>
          {config.pendingTeachers ? (
            <div className="centered teachers__more">{indexConfig.pendingTeachers[locale]}</div>
          ) : null}
        </section>
        <section id="accommodation" className="accommodation">
          <ContentLayout>
            <h1>{accommodationSection.meta.title}</h1>
            <RenderMarkdown content={accommodationSection.content} />
            <Link href={`/${locale}/accommodation`} passHref>
              <a>
                <Button variant="light">{indexConfig.knowMoreButton[locale]}</Button>
              </a>
            </Link>
            <div className="accommodation__images">
              {accommodationSection.meta.imgs.map(imgSrc => {
                return (
                  <div key={imgSrc} className="accommodation__images__wrapper">
                    <Image src={imgSrc} layout="fill" objectFit="cover" alt="accommodation" />
                  </div>
                );
              })}
            </div>
          </ContentLayout>
        </section>
        <section id="information" className="information">
          <div className="centered">
            <h1>{`${config.nameShort} ${config.startDate.getFullYear()}`}</h1>
          </div>
          <div className="information__wrapper">
            <div className="information__cardwrapper">
              <FontAwesomeIcon className="icon" icon={solid('circle-info')} size="4x" />
              <h2>{indexConfig.infoSection.information.title[locale]}</h2>
              <p>{indexConfig.infoSection.information.subtitle[locale]}</p>
              <Link href={indexConfig.infoSection.information.link} passHref>
                <a>
                  <Button variant="primary">{indexConfig.knowMoreButton[locale]}</Button>
                </a>
              </Link>
            </div>
            <div className="information__cardwrapper">
              <FontAwesomeIcon className="icon" icon={solid('file')} size="4x" />
              <h2>{indexConfig.infoSection.prices.title[locale]}</h2>
              <p>{indexConfig.infoSection.prices.subtitle[locale]}</p>
              <Link href={indexConfig.infoSection.prices.link} passHref>
                <a>
                  <Button variant="primary">{indexConfig.knowMoreButton[locale]}</Button>
                </a>
              </Link>
            </div>
            <div className="information__cardwrapper">
              <FontAwesomeIcon className="icon" icon={solid('circle-check')} size="4x" />
              <h2>{indexConfig.infoSection.register.title[locale]}</h2>
              <p>{indexConfig.infoSection.register.subtitle[locale]}</p>
              <Link href={indexConfig.infoSection.register.link} passHref>
                <a>
                  <Button variant="primary">{indexConfig.knowMoreButton[locale]}</Button>
                </a>
              </Link>
            </div>
            <div className="information__cardwrapper">
              <FontAwesomeIcon className="icon" icon={solid('circle-question')} size="4x" />
              <h2>{indexConfig.infoSection.scholarships.title[locale]}</h2>
              <p>{indexConfig.infoSection.scholarships.subtitle[locale]}</p>
              <Link href={indexConfig.infoSection.scholarships.link} passHref>
                <a>
                  <Button variant="primary">{indexConfig.knowMoreButton[locale]}</Button>
                </a>
              </Link>
            </div>
          </div>
        </section>
      </Layout>
      <style jsx>{homePageStyles}</style>
      <style jsx>{`
        .accommodation {
          background-image: url('/images/${accommodationSection.meta.background}');
        }
      `}</style>
    </>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const { teachers } = config;

  const whatIsSection = await getContent(locale ?? 'es', 'about/about');
  const accommodationSection = await getContent<{
    title: string;
    background: string;
    imgs: string[];
  }>(locale ?? 'es', 'home_accommodation');
  const teachersContent = await Promise.all(
    teachers.map(async teacher => {
      const teacherSection = await getContent<{ name: string; picture: string }>(
        locale ?? 'es',
        `teachers/bios/${teacher.id}`
      );
      return {
        ...teacherSection,
        ...teacher,
      };
    })
  );
  return {
    props: {
      whatIsSection,
      teachersContent,
      accommodationSection,
    },
  };
};
