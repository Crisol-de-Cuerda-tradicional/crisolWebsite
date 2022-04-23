import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import RenderMarkdown from '../components/RenderMarkdown/RenderMarkdown';
import Layout from '../components/Layout/Layout';
import { getContent } from '../utils/getContent';

interface IHomeProps {
  crisolBookPage: {
    meta: {
      img: string;
      title: string;
    };
    content: string;
  };
}

const Home: NextPage<IHomeProps> = ({ crisolBookPage }) => {
  return (
    <Layout>
      <h2>{crisolBookPage.meta.title}</h2>
      <Image
        src={`/images/${crisolBookPage.meta.img}`}
        width={500}
        height={400}
        alt="CrisolBook creation process"
      />
      <RenderMarkdown content={crisolBookPage.content}></RenderMarkdown>
    </Layout>
  );
};

export default Home;

export const getStaticProps = async () => {
  const crisolBookPage = await getContent('es', 'registration');
  return {
    props: {
      crisolBookPage,
    },
  };
};
