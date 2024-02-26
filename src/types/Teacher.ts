import { IContent } from '@utils/getContent';

export interface ITeacher extends IContent<{ name: string; picture: string }> {
  id: string;
  lastInstrument: string;
  instruments: string[];
  name: string;
  years: number[];
}
