import { GetStaticProps, NextPage } from 'next';
import Hero from '../components/Hero/Hero';
import ContentLayout from '../components/Layout/ContentLayout';
import Layout from '../components/Layout/Layout';
import RenderMarkdown from '../components/RenderMarkdown/RenderMarkdown';
import { getContent, IContent } from '../utils/getContent';

interface IContactProps {
  contactPage: IContent<{ title: string; hero: string }>;
}

const Contact: NextPage<IContactProps> = ({ contactPage }) => {
  return (
    <Layout>
      <Hero background={contactPage.meta.hero} pageTitle={contactPage.meta.title} />
      <ContentLayout>
        <RenderMarkdown content={contactPage.content}></RenderMarkdown>
      </ContentLayout>
    </Layout>
  );
};

export default Contact;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const contactPage = await getContent(locale ?? 'es', 'contact');
  return {
    props: {
      contactPage,
    },
  };
};
