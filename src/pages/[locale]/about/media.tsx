import { GetStaticProps } from 'next';
import Image from 'next/image';
import { JSX } from 'react';

import { ContentLayout, Hero, Link, YoutubeEmbed } from '@components';
import mediaConfig from '@config/media.yml';
import { useLocale } from '@hooks';
import { getPhotos } from '@utils/getPhotos';
import { getStaticPaths } from '@utils/getStatic';

interface IMediaProps {
  photos: string[];
}

const Media = ({ photos }: IMediaProps): JSX.Element => {
  const locale = useLocale();

  return (
    <>
      <Hero background={mediaConfig.bg} pageTitle={mediaConfig.title[locale]} />
      <ContentLayout>
        <h2>{mediaConfig.mediaCaptcha[locale]}</h2>
        <h1>{mediaConfig.videosTitle[locale]}</h1>
        <div className="video__wrapper">
          {mediaConfig.videos.map(video => {
            return (
              <div key={video.urlId} className="video__container">
                <h2>{video.title}</h2>
                <YoutubeEmbed embedId={video.urlId} title={video.title} />
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
                target="_blank"
              >
                <div className="photos__card">
                  <Image
                    src={photo}
                    fill
                    sizes="100%"
                    style={{ objectFit: 'cover' }}
                    alt="photo"
                    priority
                  />
                </div>
              </Link>
            );
          })}
        </div>
      </ContentLayout>
      <style jsx>{`
        .video__wrapper {
          display: flex;
          flex-wrap: wrap;
          gap: 2rem;
          justify-content: center;

          width: 100%;
        }

        .video__container {
          max-width: 560px;
          width: 100vw;
        }

        .photos__wrapper {
          display: flex;
          flex-wrap: wrap;
        }
        .photos__card {
          position: relative;
          width: 200px;
          height: 200px;
        }
      `}</style>
    </>
  );
};

export default Media;

const getStaticProps: GetStaticProps = async () => {
  const photos = await getPhotos(mediaConfig.photosAlbumId);
  return {
    props: { photos },
  };
};

export { getStaticPaths, getStaticProps };
