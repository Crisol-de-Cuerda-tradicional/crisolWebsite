type Language = 'en' | 'es';
type Translation = Record<Language, string>;
declare module '*config.yml' {
  interface ICurrentYearTeacher {
    id: string;
    instrument: string;
  }
  interface Config {
    name: string;
    nameShort: string;
    startDate: Date;
    endDate: Date;
    displayRegistrationCaptcha: boolean;
    displayRegistrationCTA: boolean;
    registrationLink: string;
    teachers: ICurrentYearTeacher[];
    pendingTeachers: boolean;
    newsletterLink: string;
    socialMedia: {
      instagram: string;
      facebook: string;
      vimeo: string;
      youtube: string;
      spotify: string;
      tiktok: string;
    };
  }
  const config: Config;
  export default config;
}

declare module '*crisolBookIndex.yml' {
  interface CrisolBookEntry {
    title: string;
    author: string;
    origin: string;
  }

  interface CrisolBookIndex {
    lastUpdated: Date;
    downloadLink: string;
    index: CrisolBookEntry[];
  }
  const crisolBoookIndex: CrisolBookIndex;
  export default crisolBoookIndex;
}

declare module '*teachers.yml' {
  interface Teacher {
    id: string;
    name: string;
    years: number[];
  }

  type TeachersConfig = {
    teachers: Teacher[];
  };

  const teachersConfig: TeachersConfig;

  export default teachersConfig;
}

declare module '*menu.yml' {
  export interface MenuItem {
    en: string;
    es: string;
    link: string;
  }

  const menuItems: Record<string, MenuItem>;

  export default menuItems;
}

declare module '*translations.yml' {
  export type Language = 'en' | 'es';
  type Translation = Record<Language, string>;
  type TranslationsConfig = Record<string, Translation>;

  const translations: TranslationsConfig;
  export default translations;
}

declare module '*indexPage.yml' {
  interface AboutLink {
    title: Translation;
    subtitle: Translation;
    img: string;
    link: string;
  }

  interface InfoSection extends Omit<AboutLink, 'img'> {}

  interface IndexPageConfig {
    registrationCaptcha: Translation;
    registrationCta: Translation;
    knowMoreButton: Translation;
    aboutLinks: AboutLink[];
    infoSection: Record<string, InfoSection>;
    pendingTeachers: Translation;
  }

  const indexPageConfig: IndexPageConfig;
  export default indexPageConfig;
}

declare module '*media.yml' {
  interface IMedia {
    videos: {
      title: string;
      urlId: string;
    }[];
    bg: string;
    title: Translation;
    mediaCaptcha: Translation;
    videosTitle: Translation;
    photosTitle: Translation;
    photosAlbumId: string;
  }

  const mediaPageConfig: IMedia;
  export default mediaPageConfig;
}
