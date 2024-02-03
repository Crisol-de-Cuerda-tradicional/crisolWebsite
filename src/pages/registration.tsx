import { GetStaticProps, NextPage } from 'next';

import { ContentLayout, Hero, Layout, RenderMarkdown } from '@components';
import { IContent, getContent } from '@utils/getContent';

interface IRegistrationProps {
  registrationPage: IContent<{ title: string; hero: string }>;
}

const Registration: NextPage<IRegistrationProps> = ({ registrationPage }) => {
  return (
    <Layout>
      <Hero background={registrationPage.meta.hero} pageTitle={registrationPage.meta.title} />
      <ContentLayout>
        <RenderMarkdown content={registrationPage.content} />
      </ContentLayout>
    </Layout>
  );
};

export default Registration;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const registrationPage = await getContent(locale ?? 'es', 'registration');
  return {
    props: {
      registrationPage,
    },
  };
};
