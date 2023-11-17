import { isNull } from 'lodash';

export const checkSameDate = (date1: Date | null, date2: Date | null) => {
  if (isNull(date1) || isNull(date2)) return false;
  return date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth() && date1.getDate() === date2.getDate();
};
