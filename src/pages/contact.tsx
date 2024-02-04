import { GetStaticProps, NextPage } from 'next';

import { ContentLayout, Hero, RenderMarkdown } from '@components';
import { IContent, getContent } from '@utils/getContent';

interface IContactProps {
  contactPage: IContent<{ title: string; hero: string }>;
}

const Contact: NextPage<IContactProps> = ({ contactPage }) => {
  return (
    <>
      <Hero background={contactPage.meta.hero} pageTitle={contactPage.meta.title} />
      <ContentLayout>
        <RenderMarkdown content={contactPage.content} />
      </ContentLayout>
    </>
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
