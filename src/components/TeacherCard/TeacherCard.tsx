import Image from "next/image";
import { RenderMarkdown } from "../RenderMarkdown";
import { ITeacher } from "@crisolTypes/Teacher";
import translations from "@config/translations.yml";
import { useLocale } from "@hooks";
import { baseUrl } from "@utils/baseUrl";

type TeacherCardProps = {
  teacher: ITeacher;
};

export const TeacherCard = ({ teacher }: TeacherCardProps) => {
  const locale = useLocale();

  return (
    <section id={teacher.id} key={teacher.id}>
      <div className="teacher__header">
        <span className="teacher__header--title">
          <h2>{teacher.meta.name}</h2>
          <p className="teacher__header--instruments">
            {teacher.instruments.map(i => translations[i][locale]).join(", ")}
          </p>
        </span>
        <p className="teacher__header--subtitle">{teacher.years.join(", ")}</p>
      </div>
      <div className="img__wrapper">
        <Image
          src={baseUrl(`/images/teachers/${teacher.id}.jpg`)}
          width="300"
          height="300"
          alt={teacher.meta.name}
        />
      </div>
      <RenderMarkdown content={teacher.content} />
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
        }

        @media (min-width: 340px) {
          section .img__wrapper {
            margin: 0 1rem 1rem 0;
          }
        }
      `}</style>
    </section>
  );
};
