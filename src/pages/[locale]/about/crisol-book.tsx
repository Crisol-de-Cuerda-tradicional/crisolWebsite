import { GetStaticProps, NextPage } from 'next';

import { ContentLayout, Hero, Link, RenderMarkdown, SEO } from '@components';
import crisolBook from '@config/crisolBookIndex.yml';
import translations from '@config/translations.yml';
import { useLocale } from '@hooks';
import { getContent, IContent } from '@utils/getContent';
import { getLocale, getStaticPaths } from '@utils/getStatic';
import { tz } from '@utils/timezone';

interface ICrisolBookProps {
  crisolBookPage: IContent<{
    title: string;
    description: string;
    hero: string;
    downloadLink: string;
  }>;
}

const CrisolBook: NextPage<ICrisolBookProps> = ({ crisolBookPage }) => {
  const locale = useLocale();

  return (
    <>
      <SEO
        title={crisolBookPage.meta.title}
        description={crisolBookPage.meta.description}
        keywords={[
          'Crisol Book',
          'sheet music',
          'traditional tunes',
          'fiddle music',
          'music collection',
          'folk tunes',
          'Spanish traditional music',
          'music scores',
        ]}
      />
      <Hero background={crisolBookPage.meta.hero} pageTitle={crisolBookPage.meta.title} />
      <ContentLayout>
        <RenderMarkdown content={crisolBookPage.content} />
        <Link href={crisolBook.downloadLink} className="download__btn" download target="_blank">
          {translations.download_crisol_book[locale]}
        </Link>
        <p>
          {translations.last_update[locale]}: {tz(crisolBook.lastUpdated).format('ll')}
        </p>
        <section>
          <h2>{translations.crisol_book_index[locale]}:</h2>
          <ul className="index__list">
            {crisolBook.index.map((tune, i) => (
              <li key={`${tune.title}-${i}`} className="index__tune">
                <div className="tune__title">
                  <b>{tune.title}</b> -{' '}
                  <em>
                    {tune.author === 'traditional' ? translations.traditional[locale] : tune.author}
                  </em>
                </div>
                <div className="tune__origin">{translations[tune.origin][locale]}</div>
              </li>
            ))}
          </ul>
        </section>
      </ContentLayout>
      <style jsx>{`
        .download__btn {
          background-color: var(--color-primary);
          border-radius: var(--border-radius);
          border: 2px solid var(--color-primary);
          box-shadow: 0 0 8px var(--color-dark);
          width: fit-content;
          padding: 0.5rem 2rem;
          margin: 2rem auto;

          transition: all 0.4s cubic-bezier(0.41, -0.6, 0.41, 1.6);
          font-weight: bold;
          color: var(--color-black);
          text-align: center;
        }

        .index__list {
          list-style-type: none;
          padding: 0;
        }

        .index__tune {
          display: block;
          padding: 0.5rem;
        }

        .index__tune:not(:last-of-type) {
          border-bottom: 1px solid var(--color-neutral);
        }

        .tune__title {
        }

        .tune__origin {
          color: var(--color-dark);
          font-size: var(--size-sm);
          text-transform: capitalize;
        }
      `}</style>
    </>
  );
};

export default CrisolBook;

const getStaticProps: GetStaticProps = async ctx => {
  const locale = getLocale(ctx);
  const crisolBookPage = await getContent(locale, 'about/crisol_book');
  return {
    props: {
      crisolBookPage,
    },
  };
};

export { getStaticPaths, getStaticProps };
