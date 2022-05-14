import { GetStaticProps } from 'next';
import Image from 'next/image';
import Hero from '../../components/Hero/Hero';
import ContentLayout from '../../components/Layout/ContentLayout';
import Layout from '../../components/Layout/Layout';
import RenderMarkdown from '../../components/RenderMarkdown/RenderMarkdown';
import { getContent, IContent } from '../../utils/getContent';

interface IClassesProps {
  classesPage: IContent<{ title: string; hero: string; img: string }>;
}

const Classes = ({ classesPage }: IClassesProps): JSX.Element => {
  return (
    <Layout>
      <Hero background={classesPage.meta.hero} pageTitle={classesPage.meta.title} />
      <ContentLayout>
        <section>
          <div className="img__wrapper">
            <Image src={classesPage.meta.img} layout="fill" objectFit="contain" alt="Classes" />
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
    </Layout>
  );
};

export default Classes;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const classesPage = await getContent(locale ?? 'es', 'about/classes');

  return {
    props: {
      classesPage,
    },
  };
};
