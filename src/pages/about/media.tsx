import { GetStaticProps } from 'next';
import Hero from '../../components/Hero/Hero';
import Layout from '../../components/Layout/Layout';
import mediaConfig from '../../config/media.yml';
import ContentLayout from '../../components/Layout/ContentLayout';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { getPhotos } from '../../utils/getPhotos';
import Link from 'next/link';

interface IMediaProps {
  photos: string[];
}

const Media = ({ photos }: IMediaProps): JSX.Element => {
  const router = useRouter();
  const locale = (router.locale ?? 'es') as Language;

  return (
    <Layout>
      <Hero background={mediaConfig.bg} pageTitle={mediaConfig.title[locale]} />
      <ContentLayout>
        <h2>{mediaConfig.mediaCaptcha[locale]}</h2>
        <h1>{mediaConfig.videosTitle[locale]}</h1>
        <div className="video__wrapper">
          {mediaConfig.videos.map(video => {
            return (
              <div key={video.urlId} className="video__container">
                <h2>{video.title}</h2>
                <iframe
                  width="100%"
                  height="315"
                  src={`https://www.youtube.com/embed/${video.urlId}`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            );
          })}
        </div>
        <h1>{mediaConfig.photosTitle[locale]}</h1>
        <div className="photos__wrapper">
          {photos.map(photo => {
            return (
              <Link
                key={photo}
                href={`https://photos.app.goo.gl/${mediaConfig.photosAlbumId}`}
                passHref
              >
                <a target="_blank">
                  <div className="photos__card">
                    <Image src={photo} layout="fill" objectFit="cover" alt="photo" priority />
                  </div>
                </a>
              </Link>
            );
          })}
        </div>
      </ContentLayout>
      <style jsx>{`
        .video {
          &__wrapper {
            display: flex;
            flex-wrap: wrap;
            gap: 2rem;
            justify-content: center;

            width: 100%;
          }

          &__container {
            max-width: 560px;
            width: 100vw;
          }
        }

        .photos {
          &__wrapper {
            display: flex;
            flex-wrap: wrap;
          }
          &__card {
            position: relative;
            width: 200px;
            height: 200px;
          }
        }
      `}</style>
    </Layout>
  );
};

export default Media;

export const getStaticProps: GetStaticProps = async () => {
  const photos = await getPhotos(mediaConfig.photosAlbumId);
  return {
    props: { photos },
  };
};
