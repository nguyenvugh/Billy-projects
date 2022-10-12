export function toQueryString(objParams: any) {
  const str = [];
  for (const p in objParams) {
    if (
      Object.prototype.hasOwnProperty.call(objParams, p) &&
      objParams[p] + ""
    ) {
      str.push(
        // @ts-ignore
        `${encodeURIComponent(p)}=${encodeURIComponent(objParams[p])}`
      );
    }
  }

  return "?" + str.join("&");
}
