import { GetStaticProps, NextPage } from 'next';
import Image from 'next/image';
import Layout from '../../components/Layout/Layout';
import RenderMarkdown from '../../components/RenderMarkdown/RenderMarkdown';
import { getContent } from '../../utils/getContent';

interface ICrisolBookProps {
  crisolBookPage: {
    meta: {
      img: string;
      title: string;
    };
    content: string;
  };
}

const CrisolBook: NextPage<ICrisolBookProps> = ({ crisolBookPage }) => {
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

export default CrisolBook;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const crisolBookPage = await getContent(locale ?? 'es', 'about_crisol_book');
  return {
    props: {
      crisolBookPage,
    },
  };
};
