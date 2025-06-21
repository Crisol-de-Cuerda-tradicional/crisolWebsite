import { GetStaticProps, NextPage } from 'next';

import { ContentLayout, Hero, RenderMarkdown, SEO } from '@components';
import { IContent, getContent } from '@utils/getContent';
import { getLocale, getStaticPaths } from '@utils/getStatic';

interface IContactProps {
  contactPage: IContent<{ title: string; description: string; hero: string }>;
}

const Contact: NextPage<IContactProps> = ({ contactPage }) => {
  return (
    <>
      <SEO
        title={contactPage.meta.title}
        description={contactPage.meta.description}
        keywords={[
          'contact',
          'get in touch',
          'music camp contact',
          'Crisol de Cuerda contact',
          'Spanish music organization',
          'email Crisol',
        ]}
      />
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
