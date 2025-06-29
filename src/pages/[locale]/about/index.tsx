import { GetStaticProps } from 'next';
import Image from 'next/image';
import { JSX } from 'react';

import { ContentLayout, Hero, RenderMarkdown, SEO } from '@components';
import { baseUrl } from '@utils/baseUrl';
import { getContent, IContent } from '@utils/getContent';
import { getLocale, getStaticPaths } from '@utils/getStatic';

interface IAboutProps {
  aboutPage: IContent<{ title: string; description: string; hero: string }>;
  teachersSection: IContent<{ title: string; description: string; image: string }>;
}

const About = ({ aboutPage, teachersSection }: IAboutProps): JSX.Element => {
  return (
    <>
      <SEO
        title={aboutPage.meta.title}
        description={aboutPage.meta.description}
        keywords={[
          'traditional music',
          'fiddle camp',
          'music learning',
          'music community',
          'Burgos',
          'Spain music camp',
          'Arlanzón',
          'creative music',
        ]}
      />
      <Hero background={aboutPage.meta.hero} pageTitle={aboutPage.meta.title} />
      <ContentLayout>
        <section>
          <RenderMarkdown content={aboutPage.content} />
        </section>
        <section>
          <div className="img__wrapper">
            <Image
              src={baseUrl(`/images/about/${teachersSection.meta.image}`)}
              fill
              sizes="100%"
              style={{ objectFit: 'contain' }}
              alt={teachersSection.meta.title}
            />
          </div>
          <RenderMarkdown content={teachersSection.content} />
        </section>
      </ContentLayout>
      <style jsx>{`
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

const getStaticProps: GetStaticProps = async ctx => {
  const locale = getLocale(ctx);
  const aboutPage = await getContent(locale, 'about/about');
  const teachersSection = await getContent(locale, 'about/teachers');

  return {
    props: {
      aboutPage,
      teachersSection,
    },
  };
};

export { getStaticPaths, getStaticProps };
