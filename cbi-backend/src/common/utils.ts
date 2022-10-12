export const safeParseJson = (text: string) => {
  try {
    return JSON.parse(text);
  } catch (error) {
    return null;
  }
};

export const getVal = (obj, path, defaultValue = undefined) => {
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

export const isEmpty = (obj) =>
  [Object, Array].includes((obj || {}).constructor) &&
  !Object.entries(obj || {}).length;

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

export function toLimitOffset(page = 1, size = 10) {
  const limit = size;
  const offset = (page - 1) * size;
  return {
    limit,
    offset,
  };
}

export function toListResponse<T>(data: T[], total, size = 10) {
  return {
    results: data,
    total,
    totalPage: toTotalPage(total, size),
  };
}

export function toTotalPage(totalElement = 0, size = 10) {
  return Math.ceil(totalElement / size);
}

// TODO: temporary solution, will be deleted right after we has created_by relationship
export function embedCreatedByToList(list: any[] = []) {
  if (!list.length) {
    return list;
  }
  list = list.map((item: any) => {
    item = embedCreatedByToItem(item);
    return item;
  });
  return list;
}

export function embedCreatedByToItem(item: any = {}) {
  item['created_by'] = {
    id: '1',
    name: 'test',
  };
  return item;
}

// TODO: temporary solution, will be deleted right after we has updated_by relationship
export function embedUpdatedByToList(list: any[] = []) {
  if (!list.length) {
    return list;
  }
  list = list.map((item: any) => {
    item = embedUpdatedByToItem(item);
    return item;
  });
}

export function embedUpdatedByToItem(item: any = {}) {
  item['updated_by'] = {
    id: '1',
    name: 'test',
  };
  return item;
}

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

export const removeDuplicatesFromArray = (arrs: any[]) => {
  if (!arrs.length) {
    return arrs;
  }
  return Array.from(new Set(arrs));
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
