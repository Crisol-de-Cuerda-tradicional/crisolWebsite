import Image from 'next/image';

import { Link } from '@components';
import translations from '@config/translations.yml';
import { ITeacher } from '@crisolTypes/Teacher';
import { useLocale } from '@hooks';
import { baseUrl } from '@utils/baseUrl';

type TeacherListLinkProps = {
  teacher: ITeacher;
  withInstrument?: boolean;
};

export const TeacherListLink = ({ teacher, withInstrument }: TeacherListLinkProps) => {
  const locale = useLocale();

  return (
    <Link href={`#${teacher.id}`} className="links__item">
      <div>
        <Image
          src={baseUrl(`/images/teachers/${teacher.id}.webp`)}
          width="123"
          height="123"
          alt={teacher.name}
          style={{
            objectFit: 'cover',
          }}
        />
        <p>
          {teacher.name}
          {withInstrument ? ` - ${translations[teacher.lastInstrument][locale]}` : ''}
        </p>
      </div>
      <style jsx global>{`
        .links__item {
          width: 123px;
          cursor: pointer;
          color: var(--color-link);
          text-decoration: none;

          &:hover {
            color: var(--color-link);
            text-decoration: underline;
            text-decoration-color: var(--color-link-underline);
          }
        }
      `}</style>
    </Link>
  );
};
