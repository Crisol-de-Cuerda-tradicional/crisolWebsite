import { GetStaticProps } from 'next';
import { JSX } from 'react';

import { ContentLayout, Hero, RenderMarkdown, SEO } from '@components';
import { getContent, IContent } from '@utils/getContent';
import { getLocale, getStaticPaths } from '@utils/getStatic';

interface IHistoryProps {
  historyPage: IContent<{ title: string; description: string; hero: string }>;
}

const History = ({ historyPage }: IHistoryProps): JSX.Element => {
  return (
    <>
      <SEO
        title={historyPage.meta.title}
        description={historyPage.meta.description}
        keywords={[
          'music camp history',
          'Crisol origins',
          'Alasdair Fraser',
          'Spanish music camp',
          'traditional music history',
          'Burgos music',
          'camp founding',
        ]}
      />
      <Hero background={historyPage.meta.hero} pageTitle={historyPage.meta.title} />
      <ContentLayout>
        <RenderMarkdown content={historyPage.content} />
      </ContentLayout>
    </>
  );
};

export default History;

const getStaticProps: GetStaticProps = async ctx => {
  const locale = getLocale(ctx);
  const historyPage = await getContent(locale, 'about/history');

  return {
    props: {
      historyPage,
    },
  };
};

export { getStaticPaths, getStaticProps };
