import { GetStaticProps, NextPage } from 'next';
import Image from 'next/image';

import { ContentLayout, Hero, Layout, RenderMarkdown } from '@components';
import { getContent, IContent } from '@utils/getContent';

interface IAccommodationProps {
  descriptionSection: IContent<{ title: string; img: string; hero: string }>;
  locationSection: IContent<{ locationSrc: string }>;
}

const Accommodation: NextPage<IAccommodationProps> = ({ descriptionSection, locationSection }) => {
  return (
    <Layout>
      <Hero background={descriptionSection.meta.hero} pageTitle={descriptionSection.meta.title} />
      <ContentLayout>
        <div className="flex--column">
          <section className="section">
            <div className="section__frame">
              <Image
                src={`/images/${descriptionSection.meta.img}`}
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
    </Layout>
  );
};

export default Accommodation;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const descriptionSection = await getContent(locale ?? 'es', 'accommodation');
  const locationSection = await getContent(locale ?? 'es', 'accommodation_location');
  return {
    props: {
      descriptionSection,
      locationSection,
    },
  };
};
