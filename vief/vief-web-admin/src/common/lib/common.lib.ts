export function toQueryString(objParams: any) {
  const str = [];
  for (const p in objParams) {
    //for ..in to loop property of an obj
    if (objParams.hasOwnProperty(p) && objParams[p] + '') {
      str.push(
        // @ts-ignore
        `${encodeURIComponent(p)}=${encodeURIComponent(objParams[p])}`
      );
    }
  }

  return '?' + str.join('&');
}
