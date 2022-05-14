import { GetStaticProps } from 'next';
import Image from 'next/image';
import Hero from '../../components/Hero/Hero';
import ContentLayout from '../../components/Layout/ContentLayout';
import Layout from '../../components/Layout/Layout';
import RenderMarkdown from '../../components/RenderMarkdown/RenderMarkdown';
import { getContent, IContent } from '../../utils/getContent';

interface ISpiritProps {
  spiritSection: IContent<{ title: string; hero: string }>;
  teachersSection: IContent<{ title: string; image: string }>;
}

const Spirit = ({ spiritSection, teachersSection }: ISpiritProps): JSX.Element => {
  return (
    <Layout>
      <Hero background={spiritSection.meta.hero} pageTitle={spiritSection.meta.title} />
      <ContentLayout>
        <section>
          <RenderMarkdown content={spiritSection.content} />
        </section>
        <section>
          <div className="img__wrapper">
            <Image
              src={`/images/${teachersSection.meta.image}`}
              layout="fill"
              objectFit="contain"
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
    </Layout>
  );
};

export default Spirit;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const spiritSection = await getContent(locale ?? 'es', 'about/spirit');
  const teachersSection = await getContent(locale ?? 'es', 'about/teachers');

  return {
    props: {
      spiritSection,
      teachersSection,
    },
  };
};
