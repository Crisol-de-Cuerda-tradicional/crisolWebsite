import { ReactNode } from 'react';
import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import Image from 'next/image';
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion';
import teachersConfig from '../../config/teachers.yml';
import Hero from '../../components/Hero/Hero';
import Layout from '../../components/Layout/Layout';
import { getContent, IContent } from '../../utils/getContent';
import ContentLayout from '../../components/Layout/ContentLayout';
import ButtonGoTop from '../../components/ButtonGoTop/ButtonGoTop';
import { timelineStyles } from '../../styles/teachers-annuary';
import RenderMarkdown from '../../components/RenderMarkdown/RenderMarkdown';

interface ITeacher extends IContent<{ name: string; picture: string }> {
  id: string;
  name: string;
  years: number[];
}

interface IAnnuaryPageProps {
  annuaryPage: IContent<{ title: string; hero: string }>;
  teachers: ITeacher[];
  years: number[];
}

const Annuary = ({ annuaryPage, teachers, years }: IAnnuaryPageProps) => {
  const router = useRouter();
  const locale = (router.locale ?? 'es') as Language;

  return (
    <Layout>
      <Hero background={annuaryPage.meta.hero} pageTitle={annuaryPage.meta.title} />
      <ContentLayout>
        <div className="timeline__container">
          {years.map(year => {
            return (
              <div key={year} className="timeline__item">
                <h3>{year}</h3>
                <Accordion allowZeroExpanded={true}>
                  <div className="teachers__wrapper">
                    {teachers.reduce<ReactNode[]>((acc, teacher) => {
                      if (teacher.years.includes(year)) {
                        const node = (
                          <AccordionItem key={`${teacher.id}-${year}`}>
                            <AccordionItemHeading>
                              <AccordionItemButton>
                                {/* <p>{teacher.name}</p> */}
                                <div className="teachers__card">
                                  <Image
                                    src={teacher.meta.picture}
                                    layout="fill"
                                    objectFit="cover"
                                    alt={teacher.name}
                                  />
                                </div>
                              </AccordionItemButton>
                            </AccordionItemHeading>
                            <AccordionItemPanel>
                              <RenderMarkdown content={teacher.content} />
                            </AccordionItemPanel>
                          </AccordionItem>
                        );
                        acc = [...acc, node];
                      }
                      return acc;
                    }, [])}
                  </div>
                </Accordion>
                <span className="circle" />
              </div>
            );
          })}
        </div>
        <ButtonGoTop />
      </ContentLayout>
      <style jsx>{timelineStyles}</style>
    </Layout>
  );
};

export default Annuary;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const annuaryPage = await getContent<{ title: string; hero: string }>(
    locale ?? 'es',
    'teachers/annuary'
  );
  const teachers = await Promise.all(
    teachersConfig.teachers.map(async teacher => {
      const teacherBio = await getContent<{ name: string; picture: string }>(
        locale ?? 'es',
        `teachers/bios/${teacher.id}`
      );
      return {
        ...teacherBio,
        ...teacher,
      };
    })
  );

  const years = teachers.reduce((acc, teacher) => {
    teacher.years.forEach(year => acc.add(year));
    return acc;
  }, new Set<number>());

  return {
    props: {
      annuaryPage,
      teachers,
      years: Array.from(years).sort((a, b) => a - b),
    },
  };
};
