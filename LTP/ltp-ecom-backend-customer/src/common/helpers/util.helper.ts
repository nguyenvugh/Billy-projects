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

export const buildRequestUrl = (url: string, data: any) => {
  const ret = [];
  for (const d in data) {
    if (Array.isArray(data[d])) {
      for (let index = 0; index < data[d].length; index++) {
        ret.push(
          encodeURIComponent(d + `[${index}]`) +
            '=' +
            encodeURIComponent(data[d][index]),
        );
      }
    } else {
      ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
    }
  }

  return `${url}?${ret.join('&')}`;
};

export const sortObject = (object: any, sortByKey = true) => {
  if (sortByKey) {
    return Object.keys(object)
      .sort()
      .reduce((obj, key) => {
        obj[key] = object[key];
        return obj;
      }, {});
  } else {
    const sortable = [];
    for (const key in object)
      if (object.hasOwnProperty(key)) sortable.push([key, object[key]]); // each item is an array in format [key, value]

    // sort items by value
    // array in format [ [ key1, val1 ], [ key2, val2 ], ... ]
    sortable.sort(function (a, b) {
      return a[1] - b[1]; // compare numbers
    });
    const objSorted = {};
    sortable.forEach(function (item) {
      objSorted[item[0]] = item[1];
    });
    return objSorted;
  }
};

export const generateRandomNumber = (length = 20) => {
  let result = '';
  const characters = '0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export const generateUniqueString = () => {
  /*return createHash('sha1')
    .update(new Date().getTime().toString() + generateRandomString(20))
    .digest('hex');*/
  return new Date().getTime().toString() + generateRandomNumber(3);
};

export const checkItemInArray = (arr: any[], item: any) => {
  if (!arr.length || !item) {
    return false;
  }

  return arr.includes(item);
};

export const roundNumber = (value: number, precision: number) => {
  if (!value) {
    return 0;
  }
  const multiplier = Math.pow(10, precision || 0);
  return Math.round(value * multiplier) / multiplier;
};

export const removeDuplicateItemsFromArray = (arr: any[]) => {
  return [...new Set(arr)];
};

export const findMatchElementsFromMultiArrays = (arrs: any[]) => {
  return arrs.shift().filter(function (v) {
    return arrs.every(function (a) {
      return a.indexOf(v) !== -1;
    });
  });
};

export const sortArrayObjectsByField = (
  arrObjects: any[],
  fieldName: string,
) => {
  return arrObjects.sort((a, b) =>
    a[fieldName] > b[fieldName] ? 1 : b[fieldName] > a[fieldName] ? -1 : 0,
  );
};
