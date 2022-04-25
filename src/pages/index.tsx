import type { GetStaticProps, NextPage } from 'next';
import Image from 'next/image';
import dayjs from 'dayjs';
import RenderMarkdown from '../components/RenderMarkdown/RenderMarkdown';
import Layout from '../components/Layout/Layout';
import { getContent } from '../utils/getContent';
import config from '../config/config.yml';
import { useRouter } from 'next/router';

const formatDates = (starting: Date, ending: Date, locale: string) => {
  if (locale === 'es')
    return `del ${dayjs(starting).format('D [de] MMMM')} al ${dayjs(ending).format('D [de] MMMM')}`;
  else return `from ${dayjs(starting).format('MMMM Do')} until ${dayjs(ending).format('MMMM Do')}`;
};

interface IHomeProps {
  whatIsSection: {
    meta: {
      title: string;
    };
    content: string;
  };
  accommodationSection: {
    meta: {
      title: string;
      background: string;
      imgs: string[];
    };
    content: string;
  };
}

const Home: NextPage<IHomeProps> = ({ whatIsSection, accommodationSection }) => {
  const { locale } = useRouter();
  return (
    <>
      <Layout>
        <video autoPlay loop>
          <source src="http://www.crisoldecuerda.com/wp-content/uploads/2015/01/videoweb.mp4" />
        </video>
        <div id="hero" className="hero">
          <div className="hero__page-title">
            <h1 className="hero__title">
              Crisol <br />
              de Cuerda
            </h1>
            <div className="hero__dates">
              <h3>{formatDates(config.startDate, config.endDate, locale ?? 'es')}</h3>
              <h1>{config.startDate.getFullYear()}</h1>
            </div>
          </div>
        </div>
        <h2>{whatIsSection.meta.title}</h2>
        <RenderMarkdown content={whatIsSection.content}></RenderMarkdown>

        <Image
          src={accommodationSection.meta.background}
          layout="responsive"
          width="100%"
          height="50%"
          alt="Granja Escuela Arlanzón"
        />
        <h2>{accommodationSection.meta.title}</h2>
        <RenderMarkdown content={accommodationSection.content} />
        {accommodationSection.meta.imgs.map(img => (
          <Image key={img} src={img} width="100%" height="70%" alt="granja escuela" />
        ))}
      </Layout>
      <style jsx>{`
        video {
          width: 100vw;
          position: absolute;
          top: 0;
          left: 0;
          filter: brightness(20%);
          z-index: -1;
        }

        .hero__page-title {
          display: flex;
          flex-direction: column;
          width: 344px;
        }

        .hero__title {
          width: 100%;
          color: white;
          white-space: pre-wrap;
          margin: 0;
          font-size: 3rem;
          line-height: 3.25rem;
          text-transform: uppercase;
        }

        .hero__dates {
          display: flex;
          gap: 1rem;

          h3 {
            flex-basis: 60%;
            color: orange;
            margin: 0;
            font-size: 1.2rem;
            line-height: 1.6rem;
            text-transform: uppercase;
          }
          h1 {
            flex-basis: 40%;
            color: white;
            margin: 0;
            font-size: 3rem;
            line-height: 3.25rem;
          }
        }
      `}</style>
    </>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const whatIsSection = await getContent(locale ?? 'es', 'registration');
  const accommodationSection = await getContent(locale ?? 'es', 'home_accommodation');
  return {
    props: {
      whatIsSection,
      accommodationSection,
    },
  };
};
