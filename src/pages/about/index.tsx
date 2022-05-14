import { GetStaticProps } from 'next';
import Hero from '../../components/Hero/Hero';
import ContentLayout from '../../components/Layout/ContentLayout';
import Layout from '../../components/Layout/Layout';
import RenderMarkdown from '../../components/RenderMarkdown/RenderMarkdown';
import { getContent, IContent } from '../../utils/getContent';

interface IAboutProps {
  aboutPage: IContent<{ title: string; hero: string }>;
}

const About = ({ aboutPage }: IAboutProps): JSX.Element => {
  return (
    <Layout>
      <Hero background={aboutPage.meta.hero} pageTitle={aboutPage.meta.title} />
      <ContentLayout>
        <RenderMarkdown content={aboutPage.content} />
      </ContentLayout>
    </Layout>
  );
};

export default About;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const aboutPage = await getContent(locale ?? 'es', 'about/about');

  return {
    props: {
      aboutPage,
    },
  };
};
