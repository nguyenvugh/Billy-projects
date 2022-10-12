export const isAllAttributesIsEmpty = (object: Object) =>
  Object.values(object).every((x) => !x || (typeof x === 'string' && !x.trim()));