import { GetStaticProps } from 'next';

import { ContentLayout, Hero, Layout, RenderMarkdown } from '@components';
import { getContent, IContent } from '@utils/getContent';

interface IHistoryProps {
  historyPage: IContent<{ title: string; hero: string }>;
}

const History = ({ historyPage }: IHistoryProps): JSX.Element => {
  return (
    <Layout>
      <Hero background={historyPage.meta.hero} pageTitle={historyPage.meta.title} />
      <ContentLayout>
        <RenderMarkdown content={historyPage.content} />
      </ContentLayout>
    </Layout>
  );
};

export default History;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const historyPage = await getContent(locale ?? 'es', 'about/history');

  return {
    props: {
      historyPage,
    },
  };
};
