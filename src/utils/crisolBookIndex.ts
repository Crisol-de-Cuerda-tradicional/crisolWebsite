import crisolBookIndex from '../config/crisolBookIndex.yml';
const transformDates = (obj: typeof crisolBookIndex): typeof crisolBookIndex => {
  return {
    ...obj,
    lastUpdated: new Date(obj.lastUpdated),
  };
};

export default transformDates(crisolBookIndex);
