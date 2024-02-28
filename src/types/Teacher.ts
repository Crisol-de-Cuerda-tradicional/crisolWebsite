import { IContent } from '@utils/getContent';

export interface ITeacher extends IContent<undefined> {
  id: string;
  lastInstrument: string;
  instruments: string[];
  media?: {
    spotify?: string;
    instagram?: string;
    website?: string;
    fb?: string;
    tiktok?: string;
    soundcloud?: string;
    youtubeVideo?: string;
    youtubeChannel?: string;
  }
  name: string;
  years: number[];
}
