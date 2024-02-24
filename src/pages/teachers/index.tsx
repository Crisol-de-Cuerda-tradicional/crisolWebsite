import { GetStaticProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import config from '@config/config.yml';
import translations, { Language } from '@config/translations.yml';

import { ButtonGoTop, ContentLayout, Hero, RenderMarkdown } from '@components';
import { getContent, IContent } from '@utils/getContent';

interface ITeacher extends IContent<{ name: string; picture: string }> {
  id: string;
  instrument: string;
}

interface ITeachersProps {
  teachers: ITeacher[];
  teachersPage: IContent<{ title: string; hero: string }>;
}

const Teachers = ({ teachers, teachersPage }: ITeachersProps): JSX.Element => {
  const router = useRouter();
  const locale = (router.locale ?? 'es') as Language;

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
                      src={`/assets/images/teachers/${teacher.id}.jpg`}
                      width="123"
                      height="123"
                      alt={teacher.meta.name}
                    />
                    <p>
                      {teacher.meta.name} - {translations[teacher.instrument][locale]}
                    </p>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
        {teachers.map(teacher => {
          return (
            <section id={teacher.id} key={teacher.id}>
              <h2>{teacher.meta.name}</h2>
              <div className="img__wrapper">
                <Image
                  src={`/assets/images/teachers/${teacher.id}.jpg`}
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
  const { teachers } = config;
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
