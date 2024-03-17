import { GetStaticProps, NextPage } from 'next';

import { ContentLayout, Hero, RenderMarkdown } from '@components';
import { IContent, getContent } from '@utils/getContent';
import { getLocale, getStaticPaths } from '@utils/getStatic';

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

const getStaticProps: GetStaticProps = async ctx => {
  const locale = getLocale(ctx);
  const contactPage = await getContent(locale, 'contact');
  return {
    props: {
      contactPage,
    },
  };
};

export { getStaticPaths, getStaticProps };
