import { ContentLayout, Hero, RenderMarkdown, SEO } from '@components';
import { IContent, getContent } from '@utils/getContent';
import { getLocale, getStaticPaths } from '@utils/getStatic';
import { GetStaticProps, NextPage } from 'next';

interface ILegalDisclaimerProps {
  legalDisclaimerPage: IContent<{ title: string; description: string; hero: string }>;
}

const LegalDisclaimer: NextPage<ILegalDisclaimerProps> = ({ legalDisclaimerPage }) => {
  return (
    <>
      <SEO
        title={legalDisclaimerPage.meta.title}
        description={legalDisclaimerPage.meta.description}
        keywords={[
          'legal disclaimer',
          'terms of use',
          'website policy',
          'legal information',
          'intellectual property',
          'Crisol legal',
        ]}
      />
      <Hero background={legalDisclaimerPage.meta.hero} pageTitle={legalDisclaimerPage.meta.title} />
      <ContentLayout>
        <RenderMarkdown content={legalDisclaimerPage.content} />
      </ContentLayout>
    </>
  );
};

export default LegalDisclaimer;

const getStaticProps: GetStaticProps = async ctx => {
  const locale = getLocale(ctx);
  const legalDisclaimerPage = await getContent(locale, 'legal_disclaimer');
  return {
    props: {
      legalDisclaimerPage,
    },
  };
};

export { getStaticPaths, getStaticProps };
