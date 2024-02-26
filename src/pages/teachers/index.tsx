import { GetStaticProps } from 'next';

import config from '@config/config.yml';
import teachersConfig from '@config/teachers.yml';

import { ButtonGoTop, ContentLayout, Hero, TeacherCard } from '@components';
import { getContent, IContent } from '@utils/getContent';
import { TeacherListLink } from '@components';
import type { ITeacher } from '@crisolTypes/Teacher';

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
            return <TeacherListLink key={teacher.id} teacher={teacher} withInstrument />;
          })}
        </div>
        {teachers.map(teacher => {
          return <TeacherCard key={teacher.id} teacher={teacher} />;
        })}
        <ButtonGoTop />
      </ContentLayout>
      <style jsx>{`
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
      `}</style>
    </>
  );
};

export default Teachers;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const { teachers } = teachersConfig;
  const { startDate } = config;
  const currentYearTeachers = teachers.filter(teacher =>
    teacher.years.includes(startDate.getFullYear())
  );

  const teachersPage = await getContent<{ title: string; hero: string }>(
    locale ?? 'es',
    'teachers/teachers'
  );
  const teachersContent = await Promise.all(
    currentYearTeachers.map(async teacher => {
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
