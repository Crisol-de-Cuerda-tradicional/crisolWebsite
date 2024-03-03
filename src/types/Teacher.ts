import { IContent } from '@utils/getContent';

export interface ITeacher extends IContent<undefined> {
  id: string;
  lastInstrument: string;
  instruments: string[];
  media?: {
    bandcamp?: string;
    fb?: string;
    instagram?: string;
    soundcloud?: string;
    spotify?: string;
    tiktok?: string;
    twitter?: string;
    website?: string;
    youtubeChannel?: string;
    youtubeVideo?: string;
  };
  name: string;
  years: number[];
}
