const moment = require('moment-timezone');
import { DATE_TIME_CONST } from '../constants/datetime.constant';

export const getCurrentTimestamp = (
  format: string = DATE_TIME_CONST.FORMATS.FORMAT_TIMESTAMP_WITH_TIMEZONE,
) => {
  try {
    const dateObj = moment.tz(DATE_TIME_CONST.DEFAULT_TIMEZONE);
    if (false === dateObj.isValid()) {
      return null;
    }
    if (format) {
      return dateObj.format(format);
    }

    return dateObj;
  } catch (error) {
    return null;
  }
};

export const modifyDateTimeFromCurrentTimestamp = (
  quantity: number,
  unitModify: string = DATE_TIME_CONST.UNIT_TIMES.HOURS,
  format: string = DATE_TIME_CONST.FORMATS.FORMAT_TIMESTAMP_WITH_TIMEZONE,
) => {
  let currentTimestampObj = getCurrentTimestamp('');
  if (!currentTimestampObj) {
    return null;
  }
  try {
    if (quantity > 0) {
      currentTimestampObj = currentTimestampObj.add(quantity, unitModify);
    } else if (quantity < 0) {
      currentTimestampObj = currentTimestampObj.subtract(
        Math.abs(quantity),
        unitModify,
      );
    }
    if (format) {
      return currentTimestampObj.format(format);
    }

    return currentTimestampObj;
  } catch (error) {
    return null;
  }
};

export const calculateDiffFromTimestampToCurrentTimestamp = (
  timestamp: any,
  format: string = DATE_TIME_CONST.FORMATS.FORMAT_TIMESTAMP_WITH_TIMEZONE,
  unitOutput: string = DATE_TIME_CONST.UNIT_TIMES.YEARS,
) => {
  const currentTimestampObj = getCurrentTimestamp('');
  const timestampObj = createObjFromTimestampString(timestamp, format);
  if (!currentTimestampObj || !timestampObj) {
    return false;
  }
  try {
    return timestampObj.diff(currentTimestampObj, unitOutput);
  } catch (error) {
    return false;
  }
};

export const convertTimestampStringToTimestampWithTimezoneString = (
  timestamp: string,
  format: string = DATE_TIME_CONST.FORMATS.FORMAT_TIMESTAMP_WITH_TIMEZONE,
) => {
  const timestampObj = createObjFromTimestampString(timestamp, format);
  if (!timestampObj) {
    return '';
  }
  try {
    return timestampObj.format(
      DATE_TIME_CONST.FORMATS.FORMAT_TIMESTAMP_WITH_TIMEZONE,
    );
  } catch (error) {
    return '';
  }
};

const createObjFromTimestampString = (
  timestamp: string,
  format: string = DATE_TIME_CONST.FORMATS.FORMAT_TIMESTAMP_WITH_TIMEZONE,
) => {
  if (!timestamp) {
    return null;
  }
  try {
    let obj = null;
    if (format) {
      obj = moment.tz(timestamp, format, DATE_TIME_CONST.DEFAULT_TIMEZONE);
    } else {
      obj = moment.tz(timestamp, DATE_TIME_CONST.DEFAULT_TIMEZONE);
    }
    if (false === obj.isValid()) {
      return null;
    }
    return obj;
  } catch (error) {
    return null;
  }
};
