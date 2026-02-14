import type { GetStaticProps, NextPage } from "next";
import Image from "next/image";

import {
  faCircleCheck,
  faCircleInfo,
  faCircleQuestion,
  faFile,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  Button,
  ContentLayout,
  ExpandingImg,
  Link,
  RenderMarkdown,
  SEO,
} from "@components";
import config from "@config/config.yml";
import indexConfig from "@config/indexPage.yml";
import teachersConfig from "@config/teachers.yml";
import translations from "@config/translations.yml";
import { ITeacher } from "@crisolTypes/Teacher";
import { useLocale, useShouldLoadVideo } from "@hooks";
import homePageStyles from "@styles/home-page";
import { baseUrl } from "@utils/baseUrl";
import { getContent, IContent } from "@utils/getContent";
import { getLocale, getStaticPaths } from "@utils/getStatic";
import { shouldShowRegistration, tz } from "@utils/timezone";
import { generateIndexSchema } from "src/static/seo/schemas";

const formatDates = (starting: Date, ending: Date, locale: string) => {
  if (locale === "es")
    return `del ${tz(starting).format("D [de] MMMM")} al ${tz(ending).format(
      "D [de] MMMM"
    )}`;
  else
    return `from ${tz(starting).format("MMMM Do")} until ${tz(ending).format(
      "MMMM Do"
    )}`;
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

const Home: NextPage<IHomeProps> = ({
  teachersContent,
  whatIsSection,
  accommodationSection,
}) => {
  const locale = useLocale();
  const shouldLoadVideo = useShouldLoadVideo();

  const description =
    locale === "es"
      ? "Crisol de Cuerda, campamento de música tradicional para violín, violonchelo, guitarra y flauta en España"
      : "Crisol de Cuerda, traditional music camp for violin, cello, guitar and flute in Spain";

  return (
    <>
      <SEO
        title={config.name}
        description={description}
        schema={generateIndexSchema(description, teachersContent)}
        keywords={[
          "music camp",
          "summer camp",
          "music",
          "traditional music",
          "folk music",
          "fiddle",
          "violin",
          "cello",
          "guitar",
          "flute",
          "Crisol de Cuerda",
          "string instruments",
          "violin workshop",
          "cello workshop",
          "Arlanzon",
          "Burgos",
          "Spain",
          "music workshop",
          "fiddle camp",
          "Alasdair Fraser",
          "Natalie Haas",
        ]}
      />
      <div className="hero__container">
        {shouldLoadVideo ? (
          <video
            autoPlay
            loop
            muted
            poster={baseUrl("/images/video_poster.webp")}
            style={{ objectFit: "cover" }}
          >
            <source src={baseUrl("/media/videoweb.mp4")} />
          </video>
        ) : null}
        <div id="hero" className="hero">
          <div className="hero__page-title">
            <h1 className="hero__title">
              Crisol <br />
              de Cuerda
            </h1>
            <div className="hero__dates">
              <span className="hero__dates--text" suppressHydrationWarning>
                {formatDates(config.startDate, config.endDate, locale ?? "es")}
              </span>
              <span className="hero__dates--year">
                {config.startDate.getFullYear()}
              </span>
            </div>
          </div>

          <div className="hero__registration">
            {config.displayRegistrationSlogan ? (
              <h2>{indexConfig.registrationSlogan[locale]}</h2>
            ) : null}
            {shouldShowRegistration() ? (
              <Link
                href={config.registrationLink}
                target="_blank"
                className="test"
              >
                <Button size="xlg">
                  {indexConfig.registrationCta[locale]}
                </Button>
              </Link>
            ) : null}
          </div>
        </div>
      </div>
      <ContentLayout id="about_crisol">
        <div className="centered">
          <h2>{whatIsSection.meta.title}</h2>
          <RenderMarkdown content={whatIsSection.content} />
        </div>
      </ContentLayout>
      <section className="about__featured">
        {indexConfig.aboutLinks.map((link) => {
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
          <h2>{`${
            translations.teachers[locale]
          } ${config.startDate.getFullYear()}`}</h2>
        </div>
        <div className="teachers__content">
          {teachersContent.map((teacher) => {
            return (
              <Link
                key={teacher.id}
                href={`/teachers?year=${config.startDate.getFullYear()}#${
                  teacher.id
                }`}
                className="teachers__link"
              >
                <ExpandingImg
                  bgSrc={baseUrl(`/images/teachers/${teacher.id}.webp`)}
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
          <div className="centered teachers__more">
            {indexConfig.pendingTeachers[locale]}
          </div>
        ) : null}
      </section>
      <section id="accommodation" className="accommodation">
        <ContentLayout>
          <h2>{accommodationSection.meta.title}</h2>
          <RenderMarkdown content={accommodationSection.content} />
          <Link href={`/accommodation`}>
            <Button variant="light">
              {indexConfig.knowMoreButton[locale]}
            </Button>
          </Link>
          <div className="accommodation__images">
            {accommodationSection.meta.imgs.map((imgSrc) => {
              return (
                <div key={imgSrc} className="accommodation__images__wrapper">
                  <Image
                    src={imgSrc}
                    fill
                    sizes="100%"
                    style={{ objectFit: "cover" }}
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
            <h2>{`${config.nameShort} ${config.startDate.getFullYear()}`}</h2>
          </div>
          <div className="information__wrapper">
            <div className="information__cardwrapper">
              <FontAwesomeIcon className="icon" icon={faCircleInfo} size="4x" />
              <h3>{indexConfig.infoSection.information.title[locale]}</h3>
              <p>{indexConfig.infoSection.information.subtitle[locale]}</p>
              <Link href={indexConfig.infoSection.information.link}>
                <Button variant="primary">
                  {indexConfig.knowMoreButton[locale]}
                </Button>
              </Link>
            </div>
            <div className="information__cardwrapper">
              <FontAwesomeIcon className="icon" icon={faFile} size="4x" />
              <h3>{indexConfig.infoSection.prices.title[locale]}</h3>
              <p>{indexConfig.infoSection.prices.subtitle[locale]}</p>
              <Link href={indexConfig.infoSection.prices.link}>
                <Button variant="primary">
                  {indexConfig.knowMoreButton[locale]}
                </Button>
              </Link>
            </div>
            <div className="information__cardwrapper">
              <FontAwesomeIcon
                className="icon"
                icon={faCircleCheck}
                size="4x"
              />
              <h3>{indexConfig.infoSection.register.title[locale]}</h3>
              <p>{indexConfig.infoSection.register.subtitle[locale]}</p>
              <Link href={indexConfig.infoSection.register.link}>
                <Button variant="primary">
                  {indexConfig.knowMoreButton[locale]}
                </Button>
              </Link>
            </div>
            <div className="information__cardwrapper">
              <FontAwesomeIcon
                className="icon"
                icon={faCircleQuestion}
                size="4x"
              />
              <h3>{indexConfig.infoSection.scholarships.title[locale]}</h3>
              <p>{indexConfig.infoSection.scholarships.subtitle[locale]}</p>
              <Link href={indexConfig.infoSection.scholarships.link}>
                <Button variant="primary">
                  {indexConfig.knowMoreButton[locale]}
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}
      <style jsx>{homePageStyles}</style>
      <style jsx>{`
        .accommodation {
          background-image: url(${baseUrl(
            "/images/index/" + accommodationSection.meta.background
          )});
        }
      `}</style>
      <style jsx global>{`
        .hero__container {
          img {
            filter: brightness(40%);
          }
        }
      `}</style>
    </>
  );
};

export default Home;

const getStaticProps: GetStaticProps = async (ctx) => {
  const locale = getLocale(ctx);
  const { teachers } = teachersConfig;
  const teachersContent = teachers.filter((teacher) =>
    teacher.years.includes(config.startDate.getFullYear())
  );

  const whatIsSection = await getContent(locale, "about/about");
  const accommodationSection = await getContent<{
    title: string;
    background: string;
    imgs: string[];
  }>(locale, "home_accommodation");

  return {
    props: {
      whatIsSection,
      teachersContent,
      accommodationSection,
    },
  };
};

export { getStaticPaths, getStaticProps };
