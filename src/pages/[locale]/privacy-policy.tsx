import { ContentLayout, Hero, RenderMarkdown, SEO } from '@components';
import { IContent, getContent } from '@utils/getContent';
import { getLocale, getStaticPaths } from '@utils/getStatic';
import { GetStaticProps, NextPage } from 'next';

interface IPrivacyPolicyProps {
  privacyPolicyPage: IContent<{ title: string; description: string; hero: string }>;
}

const PrivacyPolicy: NextPage<IPrivacyPolicyProps> = ({ privacyPolicyPage }) => {
  return (
    <>
      <SEO
        title={privacyPolicyPage.meta.title}
        description={privacyPolicyPage.meta.description}
        keywords={[
          'privacy policy',
          'personal data',
          'GDPR',
          'data protection',
          'cookies policy',
          'website privacy',
        ]}
      />
      <Hero background={privacyPolicyPage.meta.hero} pageTitle={privacyPolicyPage.meta.title} />
      <ContentLayout>
        <RenderMarkdown content={privacyPolicyPage.content} />
      </ContentLayout>
    </>
  );
};

export default PrivacyPolicy;

const getStaticProps: GetStaticProps = async ctx => {
  const locale = getLocale(ctx);
  const privacyPolicyPage = await getContent(locale, 'privacy_policy');
  return {
    props: {
      privacyPolicyPage,
    },
  };
};

export { getStaticPaths, getStaticProps };
