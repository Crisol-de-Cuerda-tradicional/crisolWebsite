import config from "@config/config.yml";
import dayjs from "dayjs";

export const tz = (date: Date) => dayjs.tz(date, config.dateTimezone);

export const shouldShowRegistration = () => {
  return (
    dayjs().isAfter(dayjs(config.registrationOpenDateTime)) &&
    config.displayRegistrationCTA
  );
};
