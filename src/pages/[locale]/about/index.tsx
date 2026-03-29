import { GetStaticProps } from "next";
import Image from "next/image";
import { JSX } from "react";

import { ContentLayout, Hero, RenderMarkdown, SEO } from "@components";
import { baseUrl } from "@utils/baseUrl";
import { getContent, IContent } from "@utils/getContent";
import { getLocale, getStaticPaths } from "@utils/getStatic";

interface IAboutProps {
  aboutPage: IContent<{
    title: string;
    description: string;
    hero: string;
    image?: string;
    imageAlt?: string;
  }>;
  teachersSection?: IContent<{
    title: string;
    description: string;
    image: string;
  }>;
}

const About = ({ aboutPage, teachersSection }: IAboutProps): JSX.Element => {
  return (
    <>
      <SEO
        title={aboutPage.meta.title}
        description={aboutPage.meta.description}
        keywords={[
          "traditional music",
          "fiddle camp",
          "music learning",
          "music community",
          "Burgos",
          "Spain music camp",
          "Arlanzón",
          "creative music",
        ]}
      />
      <Hero background={aboutPage.meta.hero} pageTitle={aboutPage.meta.title} />
      <ContentLayout>
        {aboutPage.meta.image ? (
          <section className="about__intro about__intro--with-image">
            <div className="about__intro-image">
              <div className="about__intro-image-tilt">
                <Image
                  src={baseUrl(`/images/about/${aboutPage.meta.image}`)}
                  width={1200}
                  height={1687}
                  sizes="(max-width: 899px) 100vw, 33vw"
                  style={{ width: "100%", height: "auto" }}
                  alt={aboutPage.meta.imageAlt ?? aboutPage.meta.title}
                />
              </div>
            </div>
            <div className="about__intro-text">
              <RenderMarkdown content={aboutPage.content} />
            </div>
          </section>
        ) : (
          <section>
            <RenderMarkdown content={aboutPage.content} />
          </section>
        )}
        {teachersSection && (
          <section>
            {teachersSection.meta.image && (
              <div className="img__wrapper">
                <Image
                  src={baseUrl(`/images/about/${teachersSection.meta.image}`)}
                  fill
                  sizes="100%"
                  style={{ objectFit: "contain" }}
                  alt={teachersSection.meta.title}
                />
              </div>
            )}
            <RenderMarkdown content={teachersSection.content} />
          </section>
        )}
      </ContentLayout>
      <style jsx>{`
        .about__intro {
          display: grid;
          gap: 2rem;
          align-items: center;

          @media (min-width: 900px) {
            gap: 2.5rem;
          }

          @media (min-width: 1100px) {
            gap: 5rem;
          }
        }

        .about__intro--with-image {
          @media (min-width: 900px) {
            grid-template-columns: 1fr 2fr;
          }
        }

        .about__intro-image {
          width: 100%;
          max-width: 100%;
        }

        .about__intro-image-tilt {
          transform: rotate(0);

          @media (min-width: 1100px) {
            transform: rotate(-5deg);
          }

          img {
            display: block;
            border-radius: 2px;
            box-shadow:
              0 12px 28px rgba(0, 0, 0, 0.18),
              0 4px 8px rgba(0, 0, 0, 0.08);
          }
        }

        .about__intro-text :global(:first-child) {
          margin-top: 0;
        }

        .img__wrapper {
          position: relative;
          width: 100%;
          max-width: 450px;
          aspect-ratio: 500 / 405;
          float: left;
          margin: 1rem auto;
        }

        @media (min-width: 340px) {
          .img__wrapper {
            margin: 1rem 1rem 1rem 0;
          }
        }
      `}</style>
    </>
  );
};

export default About;

const getStaticProps: GetStaticProps = async (ctx) => {
  const locale = getLocale(ctx);
  const aboutPage = await getContent(locale, "about/about");
  const teachersSection = await getContent(locale, "about/teachers");

  return {
    props: {
      aboutPage,
      teachersSection,
    },
  };
};

export { getStaticPaths, getStaticProps };
