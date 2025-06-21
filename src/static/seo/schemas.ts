import config from '@config/config.yml';
import { ITeacher } from '@crisolTypes/Teacher';

export const generateIndexSchema = (description: string, teachers: { name: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'Event',
  name: config.name,
  description: description,
  startDate: config.startDate.toISOString(),
  endDate: config.endDate.toISOString(),
  eventStatus: 'https://schema.org/EventScheduled',
  eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
  location: {
    '@type': 'Place',
    name: 'Granja Escuela Arlanzón',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Camino de los Molinos s/n',
      addressLocality: 'Arlanzón',
      addressRegion: 'Burgos',
      postalCode: '09199',
      addressCountry: 'ES',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 42.3190065,
      longitude: -3.4720337,
    },
  },
  organizer: {
    '@type': 'Organization',
    name: 'Asociación Crisol de Cuerda Tradicional',
    url: 'https://crisoldecuerda.com',
  },
  offers: {
    '@type': 'Offer',
    url: 'https://crisoldecuerda.com/es/registration',
    availability: 'https://schema.org/InStock',
    priceCurrency: 'EUR',
  },
  image: 'https://crisoldecuerda.com/images/hero/teachers.webp',
  performer: teachers?.map(teacher => ({
    '@type': 'Person',
    name: teacher.name,
  })),
});

type Locale = 'en' | 'es';
export const generateTeachersSchema = (
  locale: Locale,
  teachers: ITeacher[],
  translations: Record<string, Record<Locale, string>>
) => ({
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  itemListElement: teachers.map((teacher, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    item: {
      '@type': 'Person',
      name: teacher.name,
      knowsAbout: teacher.instruments.map(
        instrument => translations[instrument]?.[locale] || instrument
      ),
      url: `https://crisoldecuerda.com/${locale}/teachers?teacher=${teacher.id}`,
      ...(teacher.media?.website ? { sameAs: teacher.media.website } : {}),
    },
  })),
});

export const generateCourseSchema = (locale: Locale, title: string, description: string) => ({
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: title,
  description: description,
  provider: {
    '@type': 'Organization',
    name: 'Crisol de Cuerda',
    sameAs: 'https://crisoldecuerda.com',
  },
  courseCode: `CRISOL-${config.startDate.getFullYear()}`,
  educationalLevel:
    locale === 'es'
      ? 'Todos los niveles - principiante a avanzado'
      : 'All levels - beginner to advanced',
  teaches:
    locale === 'es'
      ? [
          'Música tradicional',
          'Técnica de violín',
          'Técnica de viola',
          'Técnica de violonchelo',
          'Técnica de guitarra',
          'Improvisación',
          'Armonía',
          'Ritmos tradicionales',
          'Trabajo en conjunto',
        ]
      : [
          'Traditional music',
          'Violin technique',
          'Viola technique',
          'Cello technique',
          'Guitar technique',
          'Improvisation',
          'Harmony',
          'Traditional rhythms',
          'Ensemble playing',
        ],
  occupationalCategory: 'Musicians',
  hasCourseInstance: {
    '@type': 'CourseInstance',
    courseMode: 'full-time',
    courseWorkload: 'PT8H', // 8 hours per day
    location: {
      '@type': 'Place',
      name: 'Granja Escuela Arlanzón',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Camino de los Molinos s/n',
        addressLocality: 'Arlanzón',
        addressRegion: 'Burgos',
        postalCode: '09199',
        addressCountry: 'ES',
      },
    },
    startDate: config.startDate.toISOString(),
    endDate: config.endDate.toISOString(),
    offers: {
      '@type': 'Offer',
      price: config.registration.coursePrice,
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
      url: `https://crisoldecuerda.com/${locale}/registration`,
      eligibleCustomerType:
        locale === 'es' ? 'Músicos de todos los niveles' : 'Musicians of all levels',
      category: locale === 'es' ? 'Taller de música' : 'Music workshop',
      seller: {
        '@type': 'Organization',
        name: 'Asociación Crisol de Cuerda Tradicional',
        url: 'https://crisoldecuerda.com',
      },
    },
    instructor: [
      {
        '@type': 'Person',
        name:
          locale === 'es'
            ? 'Equipo de profesores internacionales'
            : 'Team of international teachers',
      },
    ],
  },
  educationalCredentialAwarded:
    locale === 'es' ? 'Certificado de participación' : 'Certificate of participation',
  educationalProgramMode: 'full-time',
  inLanguage: locale === 'es' ? 'es' : 'en',
  timeRequired: `P${Math.round(
    (config.endDate.getTime() - config.startDate.getTime()) / (1000 * 60 * 60 * 24)
  )}D`,
});
