import { GetStaticProps } from 'next';
import Image from 'next/image';
import { JSX } from 'react';

import { ContentLayout, Hero, RenderMarkdown, SEO } from '@components';
import { getContent, IContent } from '@utils/getContent';
import { getLocale, getStaticPaths } from '@utils/getStatic';

interface IClassesProps {
  classesPage: IContent<{ title: string; description: string; hero: string; img: string }>;
}

const Classes = ({ classesPage }: IClassesProps): JSX.Element => {
  return (
    <>
      <SEO
        title={classesPage.meta.title}
        description={classesPage.meta.description}
        keywords={[
          'music classes',
          'fiddle classes',
          'traditional music learning',
          'music lessons',
          'teaching philosophy',
          'music education',
          'group lessons',
        ]}
      />
      <Hero background={classesPage.meta.hero} pageTitle={classesPage.meta.title} />
      <ContentLayout>
        <section>
          <div className="img__wrapper">
            <Image
              src={classesPage.meta.img}
              fill
              sizes="100%"
              style={{ objectFit: 'contain' }}
              alt="Classes"
            />
          </div>
          <RenderMarkdown content={classesPage.content} />
        </section>
      </ContentLayout>
      <style jsx>{`
        .img__wrapper {
          position: relative;
          width: 100%;
          max-width: 450px;
          aspect-ratio: 520 / 347;
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

export default Classes;

const getStaticProps: GetStaticProps = async ctx => {
  const locale = getLocale(ctx);
  const classesPage = await getContent(locale, 'about/classes');

  return {
    props: {
      classesPage,
    },
  };
};

export { getStaticPaths, getStaticProps };
