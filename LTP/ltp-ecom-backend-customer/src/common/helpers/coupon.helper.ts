import {
  CouponErrorCodes,
  CouponSearchStatusConst,
  CouponStatusConst,
  CouponTypeConst,
} from '../constants/coupon.constant';
import { OrderPaymentTypeConst } from '../constants/order-payment.constant';
import { sortObject, generateMapDataWithKeyFieldPair } from './util.helper';
import { Coupon } from '../../coupon/schemas/coupon.schema';

export const calculateOrderCouponPriceOfOrder = (
  couponData: any[],
  orderTotal: number,
) => {
  let orderCouponPrice = 0;
  orderTotal = Number(orderTotal);
  if (!couponData || !couponData.length || orderTotal <= 0) {
    return orderCouponPrice;
  }
  let mapOrderCouponRequirement = generateMapDataWithKeyFieldPair(
    'price',
    'value',
    couponData,
  );
  mapOrderCouponRequirement = sortObject(mapOrderCouponRequirement);
  Object.keys(mapOrderCouponRequirement).forEach((price) => {
    const value = Number(mapOrderCouponRequirement[price]);
    const priceToCompare = Number(price);
    if (0 < value && 0 < priceToCompare) {
      if (orderTotal >= priceToCompare) {
        if (value <= 100) {
          orderCouponPrice = Math.floor((value * orderTotal) / 100);
        } else {
          orderCouponPrice = value;
        }
      }
    }
  });

  return orderCouponPrice;
};

export const calculateProductCouponPriceOfProduct = (
  couponData: any[],
  productNumber: number,
  productPrice: number,
) => {
  let productCouponPrice = 0;
  productNumber = Number(productNumber);
  productPrice = Number(productPrice);
  if (
    !couponData ||
    !couponData.length ||
    productNumber <= 0 ||
    productPrice <= 0
  ) {
    return productCouponPrice;
  }
  let mapProductCouponRequirement = generateMapDataWithKeyFieldPair(
    'quantity',
    'percentage',
    couponData,
  );
  mapProductCouponRequirement = sortObject(mapProductCouponRequirement);
  Object.keys(mapProductCouponRequirement).forEach((number) => {
    const percentage = Number(mapProductCouponRequirement[number]);
    const numberToCompare = Number(number);
    if (0 < percentage && 0 < numberToCompare) {
      if (productNumber >= numberToCompare) {
        if (percentage <= 100) {
          productCouponPrice = Math.floor((percentage * productPrice) / 100);
        } else {
          productCouponPrice = percentage;
        }
      }
    }
  });

  return productCouponPrice;
};

export const checkCouponCanUse = (
  couponCode: string,
  activeCoupons: Coupon[],
  paymentType: OrderPaymentTypeConst = 0,
  customerId = 0,
) => {
  const rs: CheckCouponCanUseResultInterface = {
    canUse: false,
    coupon: null,
  };
  // Not have any active coupons
  if (!couponCode || !activeCoupons || !activeCoupons.length) {
    return rs;
  }
  // Not login
  if (!customerId) {
    return rs;
  }
  for (const coupon of activeCoupons) {
    if (coupon.code == couponCode) {
      rs.canUse = true;
      rs.coupon = coupon;
      break;
    }
  }
  // Not found coupon
  if (!rs.canUse) {
    return rs;
  }
  // Can not use order coupon with COD payment
  if (
    paymentType &&
    CouponTypeConst.ORDER == rs.coupon.type &&
    OrderPaymentTypeConst.COD == paymentType
  ) {
    rs.canUse = false;
    rs.coupon = null;
  }

  return rs;
};

export interface CheckCouponCanUseResultInterface {
  canUse: boolean;
  coupon: Coupon;
}
