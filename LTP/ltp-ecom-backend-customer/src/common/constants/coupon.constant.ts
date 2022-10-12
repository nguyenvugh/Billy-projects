export enum CouponSearchStatusConst {
  HAPPENING = 1,
  UPCOMING = 2,
  EXPIRED = 3,
}

export enum CouponStatusConst {
  ACTIVATED = 1,
  INACTIVATED = -1,
}

export enum CouponTypeConst {
  ORDER = 1,
  PRODUCT_QUANTITY = 2,
}

export enum CouponRequirementTypeConst {
  PRICE = 1,
  PERCENTAGE = 2,
}

const prefix = 'coupon::';
export const CouponErrorCodes = {
  [`${prefix}001`]: 'Can not create coupon',
  [`${prefix}002`]: 'Coupon not found',
  [`${prefix}003`]: 'type field is required',
  [`${prefix}004`]: 'type not found',
  [`${prefix}005`]: 'status field is required',
  [`${prefix}006`]: 'status not found',
  [`${prefix}007`]: 'start date time can not greater than end date time',
  [`${prefix}008`]: 'coupon code already exist',
};
