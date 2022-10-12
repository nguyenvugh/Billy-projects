import { BadRequestExc, ConflictExc } from './exceptions/custom.exception';

// Use this function to create string value of enum, for Check constraint in Entity
export const getEnumStr = (enumData: Record<string, any>) => {
  const arrayVals = Object.values(enumData);
  let resultStr = '';
  arrayVals.forEach((val, index) => {
    const lastStr = index === arrayVals.length - 1 ? '' : ', ';
    resultStr = resultStr + `'${val}'` + lastStr;
  });

  return resultStr;
};

// Use this function to get enum value. Use for dto
export const getValEnumNumber = (enumData: Record<string, any>) => {
  return Object.values(enumData).filter((v) => Number.isFinite(v));
};

// Use this function to get enum value. Use for dto
export const getValEnumStr = (enumData: Record<string, any>) => {
  return Object.values(enumData).filter((v) => !Number.isFinite(v));
};

export function getNumberArrayValid(numberArr: string[] | number[]) {
  const validIds = numberArr.map((id) => {
    if (isNaN(+id)) throw new BadRequestExc(`Id not valid: ${id}`);
    return +id;
  });

  return validIds;
}

const findDuplicates = (arr) =>
  arr.filter((item, index) => arr.indexOf(item) != index);

export function validateDuplicateByField<
  K extends string,
  T extends Record<K, any>,
>(key: K, data: T[], message?: string) {
  const arrLang = data.map((item) => item[key]);
  if ([...new Set(findDuplicates(arrLang))].length)
    throw new ConflictExc(message || `Duplicate ${key}`);
}

export function getPagingParams(page = 1, size = 10) {
  if (page === 0 || size <= 0) throw new BadRequestExc('page or size invalid');
  const skip = (page - 1) * size || 0;
  return { take: size, skip };
}

export const getFieldValueOfObjectData = (
  obj,
  path,
  defaultValue = undefined,
) => {
  const travel = (regexp) =>
    String.prototype.split
      .call(path, regexp)
      .filter(Boolean)
      .reduce(
        (res, key) => (res !== null && res !== undefined ? res[key] : res),
        obj,
      );
  const result = travel(/[,[\]]+?/) || travel(/[,[\].]+?/);
  return result === undefined || result === obj ? defaultValue : result;
};

export const generateMapDataWithKeyFieldPair = (
  data: any[],
  keyField: string,
  valueField: string = null,
) => {
  const result: any = {};
  if (!keyField || !data || !data.length) {
    return result;
  }

  data.forEach((item: any) => {
    const valueOfkeyField = getFieldValueOfObjectData(item, keyField, '');
    if (valueOfkeyField) {
      if (valueField) {
        const valueOfvalueField = getFieldValueOfObjectData(
          item,
          valueField,
          '',
        );
        result[valueOfkeyField] = valueOfvalueField;
      } else {
        result[valueOfkeyField] = item;
      }
    }
  });

  return result;
};

export const validateValueInEnum = (enumObj: any, value: any) => {
  if (!enumObj || !value) {
    return false;
  }

  return value in enumObj;
};
