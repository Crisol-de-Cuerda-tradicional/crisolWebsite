import { GetStaticProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { ButtonGoTop, ContentLayout, Hero, RenderMarkdown } from '@components';
import config from '@config/config.yml';
import teachersConfig from '@config/teachers.yml';
import { IContent, getContent } from '@utils/getContent';

interface ITeacher extends IContent<{ name: string; picture: string }> {
  id: string;
  years: string[];
}

interface ITeachersProps {
  teachers: ITeacher[];
  teachersPage: IContent<{ title: string; hero: string }>;
}

const Teachers = ({ teachers, teachersPage }: ITeachersProps): JSX.Element => {
  return (
    <>
      <Hero
        background={teachersPage.meta.hero}
        pageTitle={`${teachersPage.meta.title} - ${config.startDate.getFullYear()}`}
      />
      <ContentLayout>
        <div className="teachers__links">
          {teachers.map(teacher => {
            return (
              <div key={teacher.id}>
                <Link href={`#${teacher.id}`}>
                  <div className="links__item">
                    <Image
                      src={teacher.meta.picture}
                      width="123"
                      height="123"
                      alt={teacher.meta.name}
                    />
                    <p>{teacher.meta.name}</p>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
        {teachers.map(teacher => {
          return (
            <section id={teacher.id} key={teacher.id}>
              <span className="teacher__header">
                <h2>{teacher.meta.name}</h2>
                <p className="teacher__years">({teacher.years.join(', ')})</p>
              </span>
              <div className="img__wrapper">
                <Image
                  src={teacher.meta.picture}
                  width="300"
                  height="300"
                  alt={teacher.meta.name}
                />
              </div>
              <RenderMarkdown content={teacher.content} />
            </section>
          );
        })}
        <ButtonGoTop />
      </ContentLayout>
      <style jsx>{`
        section {
          scroll-margin-top: 89px;
          padding: 1rem 0 2rem 0;
          border-top: 1px solid var(--color-neutral);

          .img__wrapper {
            float: left;
            margin: 0 auto 1rem auto;
          }
        }

        .teachers__links {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 1rem;

          text-align: center;
          font-size: var(--size-sm);
          line-height: calc(1.2 * var(--size-sm));

          .links__item {
            width: 123px;
            cursor: pointer;
          }
        }
        .teacher {
          &__header {
            display: flex;
            gap: 1rem;
            align-items: baseline;
          }

          &__years {
            font-size: var(--size-md);
            color: var(--color-neutral);
          }
        }

        @media (min-width: 340px) {
          section .img__wrapper {
            margin: 0 1rem 1rem 0;
          }
        }
      `}</style>
    </>
  );
};

export default Teachers;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const { teachers } = teachersConfig;
  const teachersPage = await getContent<{ title: string; hero: string }>(
    locale ?? 'es',
    'teachers/teachers'
  );
  const teachersContent = await Promise.all(
    teachers.map(async teacher => {
      const teacherSection = await getContent(locale ?? 'es', `teachers/bios/${teacher.id}`);
      return {
        ...teacherSection,
        ...teacher,
      };
    })
  );

  return {
    props: {
      teachers: teachersContent,
      teachersPage,
    },
  };
};
