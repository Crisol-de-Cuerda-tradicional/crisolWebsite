import { GetStaticProps } from 'next';
import { NextParsedUrlQuery } from 'next/dist/server/request-meta';
import { useRouter } from 'next/router';
import { JSX, useEffect, useState } from 'react';

import teachersConfig from '@config/teachers.yml';
import translations from '@config/translations.yml';

import { ContentLayout, Hero, Link, TeacherCard, TeacherListLink } from '@components';
import type { ITeacher } from '@crisolTypes/Teacher';
import { useLocale } from '@hooks';
import { getContent, IContent } from '@utils/getContent';
import { getLocale, getStaticPaths } from '@utils/getStatic';

interface ITeachersProps {
  teachers: ITeacher[];
  teachersPage: IContent<{ title: string; hero: string }>;
  years: (number | 'all')[];
}

const Teachers = ({ teachers, teachersPage, years }: ITeachersProps): JSX.Element => {
  const router = useRouter();
  const locale = useLocale();
  const [filteredTeachers, setFilteredTeachers] = useState(teachers);

  useEffect(() => {
    if (!router.query.year) {
      setFilteredTeachers(() => teachers);
    } else {
      const filtered = teachers.filter(teacher =>
        teacher.years.includes(Number(router.query.year))
      );
      setFilteredTeachers(() => filtered);
    }
  }, [router, teachers]);

  const handleQueryParam = (year: number | 'all'): NextParsedUrlQuery => {
    const queries = { ...router.query };
    if (year === 'all') {
      delete queries.year;
      return queries;
    }
    return {
      ...queries,
      year: year.toString(),
    };
  };

  return (
    <>
      <Hero background={teachersPage.meta.hero} pageTitle={teachersPage.meta.title} />
      <ContentLayout>
        <div className="years">
          {years.map(year => {
            return (
              <div key={year} className="years__year">
                <Link
                  className={router.query.year === year.toString() ? 'years__year--active' : ''}
                  href={{
                    pathname: router.pathname,
                    query: handleQueryParam(year),
                  }}
                  shallow
                >
                  <span>{year === 'all' ? translations[year][locale] : year}</span>
                </Link>
              </div>
            );
          })}
        </div>

        <div className="teachers__links">
          {filteredTeachers.map(teacher => {
            return <TeacherListLink key={teacher.id} teacher={teacher} withInstrument />;
          })}
        </div>
        {filteredTeachers.map(teacher => {
          return <TeacherCard key={teacher.id} teacher={teacher} />;
        })}
      </ContentLayout>
      <style jsx global>{`
        .years {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
          margin-bottom: 2rem;
          font-size: var(--size-lg);

          &__year {
            &:not(:last-child):after {
              color: var(--color-primary);
              content: '-';
              margin-left: 1rem;
            }

            a {
              text-decoration: none;

              &:hover {
                color: var(--color-link);
                text-decoration: underline;
                text-decoration-color: var(--color-link-underline);
              }
            }

            a.years__year--active {
              text-decoration: underline;
              text-decoration-color: var(--color-link-underline);
            }
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
      `}</style>
    </>
  );
};

export default Teachers;

const getStaticProps: GetStaticProps = async ctx => {
  const locale = getLocale(ctx);
  const { teachers } = teachersConfig;

  const teachersPage = await getContent<{ title: string; hero: string }>(
    locale ?? 'es',
    'teachers/teachers'
  );

  const years = teachers.flatMap(teacher => teacher.years);
  const uniqueYears = Array.from(new Set(years)).sort().reverse();

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
      years: ['all', ...uniqueYears],
    },
  };
};

export { getStaticPaths, getStaticProps };
