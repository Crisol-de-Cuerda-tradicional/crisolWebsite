import { GetStaticProps } from 'next';
import { JSX } from 'react';

import { ContentLayout, Hero, RenderMarkdown } from '@components';
import { getContent, IContent } from '@utils/getContent';
import { getLocale, getStaticPaths } from '@utils/getStatic';

interface IHistoryProps {
  historyPage: IContent<{ title: string; hero: string }>;
}

const History = ({ historyPage }: IHistoryProps): JSX.Element => {
  return (
    <>
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
