import Image from 'next/image';

import translations from '@config/translations.yml';
import { ITeacher } from '@crisolTypes/Teacher';
import { Link } from '@components';
import { useLocale } from '@hooks';
import { baseUrl } from '@utils/baseUrl';

type TeacherListLinkProps = {
  teacher: ITeacher;
  withInstrument?: boolean;
};

export const TeacherListLink = ({ teacher, withInstrument }: TeacherListLinkProps) => {
  const locale = useLocale();

  return (
    <Link href={`#${teacher.id}`}>
      <div className="links__item">
        <Image
          src={baseUrl(`/images/teachers/${teacher.id}.jpg`)}
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
      <style jsx>{`
        .links__item {
          width: 123px;
          cursor: pointer;
        }
      `}</style>
    </Link>
  );
};
