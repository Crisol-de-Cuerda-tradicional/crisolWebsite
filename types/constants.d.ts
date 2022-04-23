declare module '*config.yml' {
  interface Config {
    name: string;
    nameShort: string;
    startDate: Date;
    endDate: Date;
    registrationOpen: boolean;
    teachers: {
      fiddle: string[];
      cello: string[];
      guitar: string[];
      flute: string[];
      voice: string[];
      dance: string[];
      houseBand: string[];
      pendingTeachers: boolean;
    };
    socialMedia: {
      instagram: string;
      facebook: string;
      vimeo: string;
      youtube: string;
      spotify: string;
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

  export const teachers: Teacher[];
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
