import { Lang } from './common.interfaces';
export function toQueryString(objParams: object) {
  const str = [];
  for (const p in objParams) {
    if (
      Object.prototype.hasOwnProperty.call(objParams, p) &&
      // @ts-ignore
      objParams[p] + ''
    ) {
      str.push(
        // @ts-ignore
        `${encodeURIComponent(p)}=${encodeURIComponent(objParams[p])}`
      );
    }
  }

  return str.join('&');
}

export function toUrl(url: string, query: object) {
  return `${url}?${toQueryString(query)}`;
}

export function getMessError(message: string | string[]) {
  if (typeof message === 'string') {
    return message;
  }
  return message[0] || 'Lỗi không xác định!';
}

export function getUniqueArray(originArray: (string | number)[]) {
  // @ts-ignore
  return [...new Set(originArray)];
}

export function translatesToObj<T extends { lang: Lang }>(translations: T[]) {
  return translations.reduce((previous, trans) => {
    previous[trans.lang] = trans;
    return previous;
  }, {} as { [K in Lang]: T });
}
