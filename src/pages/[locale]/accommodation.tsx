import { GetStaticProps, NextPage } from 'next';
import Image from 'next/image';

import { ContentLayout, Hero, RenderMarkdown, SEO } from '@components';
import { baseUrl } from '@utils/baseUrl';
import { getContent, IContent } from '@utils/getContent';
import { getLocale, getStaticPaths } from '@utils/getStatic';

interface IAccommodationProps {
  descriptionSection: IContent<{ title: string; description: string; img: string; hero: string }>;
  locationSection: IContent<{ locationSrc: string }>;
}

const Accommodation: NextPage<IAccommodationProps> = ({ descriptionSection, locationSection }) => {
  return (
    <>
      <SEO
        title={descriptionSection.meta.title}
        description={descriptionSection.meta.description}
        keywords={[
          'accommodation',
          'lodging',
          'Granja Escuela',
          'Arlanzón',
          'Burgos',
          'shared dormitories',
          'music camp facilities',
          'full board',
        ]}
      />
      <Hero background={descriptionSection.meta.hero} pageTitle={descriptionSection.meta.title} />
      <ContentLayout>
        <div className="flex--column">
          <section className="section">
            <div className="section__frame">
              <Image
                src={baseUrl(`/images/accommodation/${descriptionSection.meta.img}`)}
                fill
                sizes="100%"
                style={{ objectFit: 'contain' }}
                alt="Granja Escuela Arlanzón"
              />
            </div>
            <div className="section__text">
              <RenderMarkdown content={descriptionSection.content} />
            </div>
          </section>
          <section className="section location">
            <div className="section__frame">
              <iframe
                width="100%"
                height="100%"
                id="gmap_canvas"
                src={locationSection.meta.locationSrc}
                style={{
                  border: 0,
                  overflow: 'hidden',
                  margin: 0,
                }}
                title="Granja Escuela Arlanzón"
                loading="lazy"
              />
            </div>
            <div className="section__text">
              <RenderMarkdown content={locationSection.content} />
            </div>
          </section>
        </div>
      </ContentLayout>
      <style jsx>{`
        .flex--column {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .section {
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 2rem;
        }

        .section__frame {
          position: relative;
          width: 100%;
          max-width: 100%;
          height: auto;
          aspect-ratio: 3/2;
        }

        .section__text {
          flex-basis: 50%;
        }

        @media (min-width: 1100px) {
          .section {
            flex-direction: row-reverse;
          }

          .location {
            flex-direction: row;
            .section__text {
              flex-basis: 50%;
            }
          }

          .section__text {
            flex-basis: 100%;
          }
        }
      `}</style>
    </>
  );
};

export default Accommodation;

const getStaticProps: GetStaticProps = async ctx => {
  const locale = getLocale(ctx);
  const descriptionSection = await getContent(locale, 'accommodation');
  const locationSection = await getContent(locale, 'accommodation_location');
  return {
    props: {
      descriptionSection,
      locationSection,
    },
  };
};

export { getStaticPaths, getStaticProps };
