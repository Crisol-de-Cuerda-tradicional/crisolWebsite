import { brands, solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';

import { Link, RenderMarkdown, Spotify, YoutubeEmbed } from '@components';
import translations from '@config/translations.yml';
import { ITeacher } from '@crisolTypes/Teacher';
import { useLocale } from '@hooks';
import { baseUrl } from '@utils/baseUrl';

type TeacherCardProps = {
  teacher: ITeacher;
};

export const TeacherCard = ({ teacher }: TeacherCardProps) => {
  const locale = useLocale();

  return (
    <section id={teacher.id} key={teacher.id}>
      <div className="teacher__header">
        <span className="teacher__header--title">
          <h2>{teacher.name}</h2>
          <p className="teacher__header--instruments">
            {teacher.instruments.map(i => translations[i][locale]).join(', ')}
          </p>
        </span>
        <p className="teacher__header--subtitle">{teacher.years.join(', ')}</p>
      </div>
      <div className="media">
        <div className="img__wrapper">
          <Image
            src={baseUrl(`/images/teachers/${teacher.id}.jpg`)}
            width="360"
            height="360"
            alt={teacher.name}
            style={{
              objectFit: 'cover',
            }}
          />
        </div>
        {teacher.media?.spotify ? <Spotify wide artistId={teacher.media.spotify} /> : null}
        {teacher.media?.youtubeVideo ? (
          <YoutubeEmbed embedId={teacher.media.youtubeVideo} title={teacher.name} wide />
        ) : null}
      </div>
      {teacher.media ? (
        <div className="teacher__links">
          {teacher.media.website ? (
            <Link href={teacher.media.website} target="_blank">
              <FontAwesomeIcon icon={solid('globe')} size="2x" />
            </Link>
          ) : null}
          {teacher.media.instagram ? (
            <Link href={teacher.media.instagram} target="_blank">
              <FontAwesomeIcon icon={brands('instagram')} size="2x" />
            </Link>
          ) : null}
          {teacher.media.tiktok ? (
            <Link href={teacher.media.tiktok} target="_blank">
              <FontAwesomeIcon icon={brands('tiktok')} size="2x" />
            </Link>
          ) : null}
          {teacher.media.soundcloud ? (
            <Link href={teacher.media.soundcloud} target="_blank">
              <FontAwesomeIcon icon={brands('soundcloud')} size="2x" />
            </Link>
          ) : null}
          {teacher.media.bandcamp ? (
            <Link href={teacher.media.bandcamp} target="_blank">
              <FontAwesomeIcon icon={brands('bandcamp')} size="2x" />
            </Link>
          ) : null}
          {teacher.media.youtubeChannel ? (
            <Link href={teacher.media.youtubeChannel} target="_blank">
              <FontAwesomeIcon icon={brands('youtube')} size="2x" />
            </Link>
          ) : null}
          {teacher.media.fb ? (
            <Link href={teacher.media.fb} target="_blank">
              <FontAwesomeIcon icon={brands('facebook')} size="2x" />
            </Link>
          ) : null}
          {teacher.media.twitter ? (
            <Link href={teacher.media.twitter} target="_blank">
              <FontAwesomeIcon icon={brands('twitter')} size="2x" />
            </Link>
          ) : null}
        </div>
      ) : null}
      <RenderMarkdown content={teacher.content} />

      <style jsx>{`
        section {
          scroll-margin-top: 89px;
          padding: 1rem 0 2rem 0;
          border-top: 1px solid var(--color-neutral);
        }

        .teacher {
          &__header {
            display: flex;
            flex-direction: column;

            &--title {
              display: flex;
              gap: 1rem;
              align-items: baseline;

              & > * {
                margin: 0;
              }
            }

            &--subtitle {
              font-size: var(--size-md);
              color: var(--color-neutral);
              margin-top: 0;
            }

            &--instruments {
              font-size: var(--size-md);
              color: var(--color-neutral);
            }
          }

          &__links {
            display: flex;
            gap: 1rem;
            justify-content: left;
            margin-top: 1rem;
          }
        }

        .media {
          display: flex;
          gap: 1rem;
          align-items: flex-start;
          flex-wrap: wrap;
        }
      `}</style>
    </section>
  );
};
