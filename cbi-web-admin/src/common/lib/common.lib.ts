import { PAGE_SIZE } from "../constants/common.constant";

export function toQueryString(objParams: object) {
  const str = [];
  for (const p in objParams) {
    if (objParams.hasOwnProperty(p) && objParams[p] + "") {
      str.push(
        // @ts-ignore
        `${encodeURIComponent(p)}=${encodeURIComponent(objParams[p])}`,
      );
    }
  }

  return "?" + str.join("&");
}

export function toUrlQueryString(url: string, objParams?: object) {
  return objParams ? `${url}${toQueryString(objParams)}` : url;
}

export function replacePathParams(path: string, newData: object): string {
  let newPath = path;
  Object.keys(newData).forEach((it) => {
    newPath = newPath.replace(`:${it}`, newData[it]);
  });
  return newPath;
}

export async function fakeApiRequest<T = any>(data: any, delay: number = 1000, isErr?: boolean) {
  return new Promise<T>((resolve, reject) => {
    setTimeout(() => (isErr ? reject(data) : resolve(data)), delay);
  });
}

export function toTotalPage(totalElement = 0, size = PAGE_SIZE) {
  return Math.ceil(totalElement / size);
}

export function toPresentValue(value: any) {
  if (value === undefined || value === "" || value === null) {
    return "_";
  }
  return value;
}
