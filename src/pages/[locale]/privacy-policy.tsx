import { ContentLayout, Hero, RenderMarkdown } from '@components';
import { IContent, getContent } from '@utils/getContent';
import { getLocale, getStaticPaths } from '@utils/getStatic';
import { GetStaticProps, NextPage } from 'next';

interface IPrivacyPolicyProps {
  privacyPolicyPage: IContent<{ title: string; hero: string }>;
}

const PrivacyPolicy: NextPage<IPrivacyPolicyProps> = ({ privacyPolicyPage }) => {
  return (
    <>
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
