import { GetStaticProps } from 'next';

import { ButtonGoTop, ContentLayout, Hero, TeacherCard } from '@components';
import config from '@config/config.yml';
import teachersConfig from '@config/teachers.yml';
import { IContent, getContent } from '@utils/getContent';
import { TeacherListLink } from 'src/components/Teacher';
import { ITeacher } from '@crisolTypes/Teacher';

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
            return <TeacherListLink key={teacher.id} teacher={teacher} />;
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
