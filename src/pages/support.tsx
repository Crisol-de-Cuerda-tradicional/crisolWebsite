import { GetStaticProps, NextPage } from 'next';
import Hero from '../components/Hero/Hero';
import ContentLayout from '../components/Layout/ContentLayout';
import Layout from '../components/Layout/Layout';
import RenderMarkdown from '../components/RenderMarkdown/RenderMarkdown';
import { getContent, IContent } from '../utils/getContent';

interface ISupportProps {
  supportPage: IContent<{ title: string; hero: string }>;
}

const Support: NextPage<ISupportProps> = ({ supportPage }) => {
  return (
    <Layout>
      <Hero background={supportPage.meta.hero} pageTitle={supportPage.meta.title} />
      <ContentLayout>
        <RenderMarkdown content={supportPage.content}></RenderMarkdown>
      </ContentLayout>
    </Layout>
  );
};

export default Support;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const supportPage = await getContent(locale ?? 'es', 'support');
  return {
    props: {
      supportPage,
    },
  };
};
