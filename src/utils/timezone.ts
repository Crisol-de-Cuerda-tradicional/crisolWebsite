import config from "@config/config.yml";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
dayjs.extend(timezone);

const registrationOpensAt = () =>
  dayjs.tz(
    config.registrationOpenLocal,
    "YYYY-MM-DD HH:mm:ss",
    config.dateTimezone
  );

export const tz = (date: Date) => dayjs.tz(date, config.dateTimezone);

export const shouldShowRegistration = () => {
  return (
    dayjs().isAfter(registrationOpensAt()) &&
    config.displayRegistrationCTA
  );
};
