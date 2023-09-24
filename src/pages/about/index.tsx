import { GetStaticProps } from 'next';
import Hero from '../../components/Hero/Hero';
import ContentLayout from '../../components/Layout/ContentLayout';
import Layout from '../../components/Layout/Layout';
import RenderMarkdown from '../../components/RenderMarkdown/RenderMarkdown';
import { getContent, IContent } from '../../utils/getContent';
import Image from 'next/image';

interface IAboutProps {
  aboutPage: IContent<{ title: string; hero: string }>;
  teachersSection: IContent<{ title: string; image: string }>;
}

const About = ({ aboutPage, teachersSection }: IAboutProps): JSX.Element => {
  return (
    <Layout>
      <Hero background={aboutPage.meta.hero} pageTitle={aboutPage.meta.title} />
      <ContentLayout>
        <section>
          <RenderMarkdown content={aboutPage.content} />
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

export default About;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const aboutPage = await getContent(locale ?? 'es', 'about/about');
  const teachersSection = await getContent(locale ?? 'es', 'about/teachers');

  return {
    props: {
      aboutPage,
      teachersSection,
    },
  };
};
