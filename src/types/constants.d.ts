type Language = "en" | "es";
type Translation = Record<Language, string>;
declare module "*config.yml" {
  interface Config {
    name: string;
    nameShort: string;
    startDate: Date;
    endDate: Date;
    dateTimezone: string;
    displayRegistrationSlogan: boolean;
    displayRegistrationCTA: boolean;
    registrationOpenDateTime: Date;
    registrationLink: string;
    hideRegistrationPage: boolean;
    pendingTeachers: boolean;
    newsletterLink: string;
    registration: {
      coursePrice: number;
      bookingFee: number;
      refundLimit: number;
      endOfEarlyRegistrationDate: Date;
      underageAuthorisationFile: string;
      under14AuthorisationFile: string;
      acceptanceOfGuardianshipFile: string;
      scholarshipDiscount: number;
      familyDiscount: number;
      familyDiscountMinimum: number;
      scholarshipLimitDate: Date;
      referralDiscount: number;
    };
    socialMedia: {
      facebook: string;
      instagram: string;
      patreon: string;
      spotify: string;
      tiktok: string;
      vimeo: string;
      youtube: string;
    };
  }
  const config: Config;
  export default config;
}

declare module "*crisolBookIndex.yml" {
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
  const crisolBookIndex: CrisolBookIndex;
  export default crisolBookIndex;
}

declare module "*teachers.yml" {
  interface Teacher {
    id: string;
    lastInstrument: string;
    instruments: string[];
    name: string;
    years: number[];
  }

  type TeachersConfig = {
    teachers: Teacher[];
  };

  const teachersConfig: TeachersConfig;

  export default teachersConfig;
}

declare module "*menu.yml" {
  export interface MenuItem {
    en: string;
    es: string;
    link: string;
  }

  const menuItems: Record<string, MenuItem>;

  export default menuItems;
}

declare module "*translations.yml" {
  export type Language = "en" | "es";
  type Translation = Record<Language, string>;
  type TranslationsConfig = Record<string, Translation>;

  const translations: TranslationsConfig;
  export default translations;
}

declare module "*indexPage.yml" {
  interface InfoSection {
    title: Translation;
    subtitle: Translation;
    link: string;
  }

  interface AboutLink extends InfoSection {
    img: string;
  }

  interface IndexPageConfig {
    registrationSlogan: Translation;
    registrationCta: Translation;
    knowMoreButton: Translation;
    aboutLinks: AboutLink[];
    infoSection: Record<string, InfoSection>;
    pendingTeachers: Translation;
  }

  const indexPageConfig: IndexPageConfig;
  export default indexPageConfig;
}

declare module "*media.yml" {
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
