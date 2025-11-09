import config from '../config/config.yml';

const transformDates = (obj: typeof config): typeof config => {
  const transformed = {
    ...obj,
    startDate: new Date(obj.startDate),
    endDate: new Date(obj.endDate),
    registration: {
      ...obj.registration,
      endOfEarlyRegistrationDate: new Date(obj.registration.endOfEarlyRegistrationDate),
      scholarshipLimitDate: new Date(obj.registration.scholarshipLimitDate),
    },
  };
  return transformed;
};

export default transformDates(config);
