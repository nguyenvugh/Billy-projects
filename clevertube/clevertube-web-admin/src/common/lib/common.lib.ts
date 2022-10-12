export function toQueryString(objParams: object) {
  const str = [];
  for (const p in objParams) {
    if (
      Object.prototype.hasOwnProperty.call(objParams, p) &&
      // @ts-ignore
      objParams[p] + ""
    ) {
      str.push(
        // @ts-ignore
        `${encodeURIComponent(p)}=${encodeURIComponent(objParams[p])}`
      );
    }
  }

  return str.join("&");
}

export function replacePathParams(path: string, newData: object): string {
  let newPath = path;
  Object.keys(newData).forEach((it) => {
    newPath = newPath.replace(`:${it}`, newData[it]);
  });
  return newPath;
}
