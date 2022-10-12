export enum DeletedConst {
  NOT_DELETE = -1,
  DELETED = 1,
}

export enum BooleanValue {
  FALSE = -1,
  TRUE = 1,
}

export const PrefixException = {
  BadRequest: 'bad_request:',
  Conflict: 'conflict:',
  Unothorized: 'unauthorize:',
  NotFound: 'not_found:',
};

export enum SortValueConst {
  ASC = 'ASC',
  DESC = 'DESC',
}

export enum ProductStatusConst {
  STOCKING = 1,
  OUT_OF_STOCK = 2,
}

export enum ProductPopularConst {
  NOT_POPULAR = -1,
  POPULAR = 1,
}

export enum ProductFavouriteConst {
  NOT_FAVOURITE = -1,
  FAVOURITE = 1,
}

export enum ProductFlashSaleConst {
  NOT_FLASH_SALE = -1,
  FLASH_SALE = 1,
}

export const FieldsTranslate = ['name'];
export const Limit = 20;
export const MAX_FEATURE_PRODUCT_CATEGORY = 4;
export const MAX_FEATURE_PRODUCT = 4;
