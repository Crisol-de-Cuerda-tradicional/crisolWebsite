import type { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';

import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Button, ContentLayout, ExpandingImg, Link, RenderMarkdown } from '@components';
import config from '@config/config.yml';
import indexConfig from '@config/indexPage.yml';
import teachersConfig from '@config/teachers.yml';
import translations from '@config/translations.yml';
import { ITeacher } from '@crisolTypes/Teacher';
import { useLocale } from '@hooks';
import homePageStyles from '@styles/home-page';
import { getContent, IContent } from '@utils/getContent';
import { baseUrl } from '@utils/baseUrl';
import { getLocale, getStaticPaths } from '@utils/getStatic';
import { tz } from '@utils/timezone';

const formatDates = (starting: Date, ending: Date, locale: string) => {
  if (locale === 'es')
    return `del ${tz(starting).format('D [de] MMMM')} al ${tz(ending).format('D [de] MMMM')}`;
  else return `from ${tz(starting).format('MMMM Do')} until ${tz(ending).format('MMMM Do')}`;
};

interface IHomeProps {
  whatIsSection: IContent<{ title: string }>;
  teachersContent: ITeacher[];
  accommodationSection: IContent<{
    title: string;
    background: string;
    imgs: string[];
  }>;
}

const Home: NextPage<IHomeProps> = ({ teachersContent, whatIsSection, accommodationSection }) => {
  const locale = useLocale();

  return (
    <>
      <Head>
        <title>{config.name}</title>
      </Head>
      <section className="hero__container">
        <video autoPlay loop muted>
          <source src={baseUrl('/media/videoweb.mp4')} />
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
            {config.displayRegistrationSlogan ? (
              <h2>{indexConfig.registrationSlogan[locale]}</h2>
            ) : null}
            {config.displayRegistrationCTA ? (
              <Link href={config.registrationLink} target="_blank">
                <Button size="xlg">{indexConfig.registrationCta[locale]}</Button>
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
                <p className="about__subtitle">{link.subtitle[locale]}</p>
                <Link href={link.link}>
                  <Button variant="light" size="xsm">
                    {indexConfig.knowMoreButton[locale]}
                  </Button>
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
              <Link
                key={teacher.id}
                href={`/teachers?year=${config.startDate.getFullYear()}#${teacher.id}`}
                className="teachers__link"
              >
                <ExpandingImg
                  bgSrc={baseUrl(`/images/teachers/${teacher.id}.jpg`)}
                  maxWidth="250px"
                >
                  <div className="teachers__infocontainer">
                    <div className="teachers__info">
                      <p>{teacher.name}</p>
                      <p>{translations[teacher.lastInstrument][locale]}</p>
                    </div>
                  </div>
                </ExpandingImg>
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
          <Link href={`/accommodation`}>
            <Button variant="light">{indexConfig.knowMoreButton[locale]}</Button>
          </Link>
          <div className="accommodation__images">
            {accommodationSection.meta.imgs.map(imgSrc => {
              return (
                <div key={imgSrc} className="accommodation__images__wrapper">
                  <Image
                    src={imgSrc}
                    fill
                    sizes="100%"
                    style={{ objectFit: 'cover' }}
                    alt="accommodation"
                  />
                </div>
              );
            })}
          </div>
        </ContentLayout>
      </section>
      {config.hideRegistrationPage ? null : (
        <section id="information" className="information">
          <div className="centered">
            <h1>{`${config.nameShort} ${config.startDate.getFullYear()}`}</h1>
          </div>
          <div className="information__wrapper">
            <div className="information__cardwrapper">
              <FontAwesomeIcon className="icon" icon={solid('circle-info')} size="4x" />
              <h2>{indexConfig.infoSection.information.title[locale]}</h2>
              <p>{indexConfig.infoSection.information.subtitle[locale]}</p>
              <Link href={indexConfig.infoSection.information.link}>
                <Button variant="primary">{indexConfig.knowMoreButton[locale]}</Button>
              </Link>
            </div>
            <div className="information__cardwrapper">
              <FontAwesomeIcon className="icon" icon={solid('file')} size="4x" />
              <h2>{indexConfig.infoSection.prices.title[locale]}</h2>
              <p>{indexConfig.infoSection.prices.subtitle[locale]}</p>
              <Link href={indexConfig.infoSection.prices.link}>
                <Button variant="primary">{indexConfig.knowMoreButton[locale]}</Button>
              </Link>
            </div>
            <div className="information__cardwrapper">
              <FontAwesomeIcon className="icon" icon={solid('circle-check')} size="4x" />
              <h2>{indexConfig.infoSection.register.title[locale]}</h2>
              <p>{indexConfig.infoSection.register.subtitle[locale]}</p>
              <Link href={indexConfig.infoSection.register.link}>
                <Button variant="primary">{indexConfig.knowMoreButton[locale]}</Button>
              </Link>
            </div>
            <div className="information__cardwrapper">
              <FontAwesomeIcon className="icon" icon={solid('circle-question')} size="4x" />
              <h2>{indexConfig.infoSection.scholarships.title[locale]}</h2>
              <p>{indexConfig.infoSection.scholarships.subtitle[locale]}</p>
              <Link href={indexConfig.infoSection.scholarships.link}>
                <Button variant="primary">{indexConfig.knowMoreButton[locale]}</Button>
              </Link>
            </div>
          </div>
        </section>
      )}
      <style jsx>{homePageStyles}</style>
      <style jsx>{`
        .accommodation {
          background-image: url(${baseUrl(
            '/images/index/' + accommodationSection.meta.background
          )});
        }
      `}</style>
    </>
  );
};

export default Home;

const getStaticProps: GetStaticProps = async ctx => {
  const locale = getLocale(ctx);
  const { teachers } = teachersConfig;
  const teachersContent = teachers.filter(teacher =>
    teacher.years.includes(config.startDate.getFullYear())
  );

  const whatIsSection = await getContent(locale, 'about/about');
  const accommodationSection = await getContent<{
    title: string;
    background: string;
    imgs: string[];
  }>(locale, 'home_accommodation');

  return {
    props: {
      whatIsSection,
      teachersContent,
      accommodationSection,
    },
  };
};

export { getStaticPaths, getStaticProps };
