import type { GetStaticProps, NextPage } from 'next';
import RenderMarkdown from '../components/RenderMarkdown/RenderMarkdown';
import Layout from '../components/Layout/Layout';
import { getContent } from '../utils/getContent';

interface IHomeProps {
  crisolBookPage: {
    meta: {
      title: string;
    };
    content: string;
  };
}

const Home: NextPage<IHomeProps> = ({ crisolBookPage }) => {
  return (
    <Layout>
      <h2>{crisolBookPage.meta.title}</h2>
      <RenderMarkdown content={crisolBookPage.content}></RenderMarkdown>
    </Layout>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const crisolBookPage = await getContent(locale ?? 'es', 'home_what_is');
  return {
    props: {
      crisolBookPage,
    },
  };
};
