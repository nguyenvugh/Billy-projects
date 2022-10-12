import { createHash } from 'crypto';

const getFieldValueOfObjectData = (field: string, objectData: any) => {
  let rs: any = null;
  if (!objectData) {
    return rs;
  }

  try {
    rs = objectData[field];
  } catch (error) {}

  return rs;
};

export const checkObjectIsEmpty = (obj: any) => {
  return Object.keys(obj).length ? false : true;
};

export const generateMapDataWithKeyFieldPair = (
  keyField: string,
  valueField: string,
  data: any[] = [],
) => {
  const rs: any = {};
  if ('' === keyField || !data || !data.length) {
    return rs;
  }

  data.forEach((item: any) => {
    const valueOfkeyField = getFieldValueOfObjectData(keyField, item);
    if (valueOfkeyField) {
      if ('' !== valueField) {
        let valueOfvalueField = getFieldValueOfObjectData(valueField, item);
        valueOfvalueField = valueOfvalueField ? valueOfvalueField : '';
        rs[valueOfkeyField] = valueOfvalueField;
      } else {
        rs[valueOfkeyField] = item;
      }
    }
  });

  return rs;
};

export const generateMapArrayDataWithKeyPair = (
  keyField: string,
  data: any[] = [],
) => {
  const rs: any = {};
  if ('' === keyField || !data || !data.length) {
    return rs;
  }

  data.forEach((item: any) => {
    const valueOfkeyField = getFieldValueOfObjectData(keyField, item);
    if (valueOfkeyField) {
      if (!rs.hasOwnProperty(valueOfkeyField)) {
        rs[valueOfkeyField] = [];
      }
      rs[valueOfkeyField].push(item);
    }
  });

  return rs;
};

export const checkItemInArray = (arr: any[], item: any) => {
  if (!arr.length || !item) {
    return false;
  }

  return arr.includes(item);
};

export const mergeArrays = (...arrs: any[]) => {
  let newArr: any[] = [];
  arrs.forEach((arr) => {
    newArr = newArr.concat(arr);
  });
  return newArr;
};

export const roundNumber = (value: number, precision: number) => {
  if (!value) {
    return 0;
  }
  const multiplier = Math.pow(10, precision || 0);
  return Math.round(value * multiplier) / multiplier;
};

export const convertVietnameseCharsToEnglishChars = (
  vietnameseChars: string,
) => {
  if (!vietnameseChars) {
    return vietnameseChars;
  }
  let englishChars = vietnameseChars;
  englishChars = englishChars.replace(
    /à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,
    'a',
  );
  englishChars = englishChars.replace(
    /À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g,
    'A',
  );
  englishChars = englishChars.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
  englishChars = englishChars.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'E');
  englishChars = englishChars.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
  englishChars = englishChars.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'I');
  englishChars = englishChars.replace(
    /ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,
    'o',
  );
  englishChars = englishChars.replace(
    /Ò|Ó|Ọ|Ỏ|Ỗ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g,
    'O',
  );
  englishChars = englishChars.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
  englishChars = englishChars.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'U');
  englishChars = englishChars.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
  englishChars = englishChars.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'Y');
  englishChars = englishChars.replace(/đ/g, 'd');
  englishChars = englishChars.replace(/Đ/g, 'D');

  return englishChars;
};
