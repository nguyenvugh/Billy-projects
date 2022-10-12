const moment = require('moment-timezone');
import { AppConst } from '../constants/app.constant';
import { DateTimeConst } from '../constants/date-time.constant';

export const getCurrentDateTimeFormatted = () => {
  const d = new Date();
  const year = d.getFullYear();
  const month = d.getMonth() + 1;
  const date = d.getDate();
  const hour = d.getHours();
  const min = d.getMinutes();
  const dateString = `${year}-${month < 10 ? '0' + month : month}-${
    date < 10 ? '0' + date : date
  } ${hour}:${min}`;
  return dateString;
};

export const convertUTCToTimezone = (
  utcDateTime: any,
  timezone: string = AppConst.TIMEZONE,
  format: string = DateTimeConst.FORMATS.MYSQL_DATETIME_WITH_SECOND,
) => {
  let rs = null;
  if (!utcDateTime || !timezone) {
    return rs;
  }
  try {
    rs = moment.utc(utcDateTime).tz(timezone).format(format);
  } catch (err) {}

  return rs;
};
