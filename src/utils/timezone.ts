import dayjs from 'dayjs';
import config from '@config/config.yml';

export const tz = (date: Date) => dayjs.tz(date, config.dateTimezone);
