import { GetStaticProps } from 'next';

import { ContentLayout, Hero, RenderMarkdown } from '@components';
import { getContent, IContent } from '@utils/getContent';

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

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const historyPage = await getContent(locale ?? 'es', 'about/history');

  return {
    props: {
      historyPage,
    },
  };
};
