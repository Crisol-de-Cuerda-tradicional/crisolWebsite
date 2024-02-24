import type { GetStaticProps, NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import dayjs from 'dayjs';

import { Button, ContentLayout, ExpandingImg, RenderMarkdown } from '@components';
import config from '@config/config.yml';
import indexConfig from '@config/indexPage.yml';
import translations, { Language } from '@config/translations.yml';
import homePageStyles from '@styles/home-page';
import { getContent, IContent } from '@utils/getContent';

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
                href={`/${locale}/teachers#${teacher.id}`}
                className="teachers__link"
              >
                <ExpandingImg bgSrc={`/assets/images/teachers/${teacher.id}.jpg`} maxWidth="250px">
                  <div className="teachers__infocontainer">
                    <div className="teachers__info">
                      <p>{teacher.meta.name}</p>
                      <p>{translations[teacher.instrument][locale]}</p>
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
          <Link href={`/${locale}/accommodation`}>
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
      <style jsx>{homePageStyles}</style>
      <style jsx>{`
        .accommodation {
          background-image: url('/assets/images/index/${accommodationSection.meta.background}');
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
