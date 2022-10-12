import { City } from '../../city/schema/city.schema';
import { District } from '../../district/schema/district.schema';
import { Ward } from '../../ward/schema/ward.schema';
import { Product } from '../../product/schema/product.schema';
import { OrderProductDto } from '../../order/dto/order-product.dto';
import { CouponDetailInOrderDto } from '../../order/dto/coupon-detail-in-order.dto';
import { BooleanValue } from './global.constant';

export enum OrderStatusConst {
  CONFIRMED = 1,
  PENDING_PAYMENT = 2,
  PAID = 3,
  PREPARE_DELIVERY = 4,
  DELIVERING = 5,
  DELIVERED = 6,
  CANCELLED = 7,
  REFUNDED = 8,
  FAILED = 9,
}

export enum GroupSellableProductsStatus {
  OK = 'ok',
  FAIL = 'fail',
}

export interface ShippingAddress {
  address: string;
  country: number;
  city: number;
  district: number;
  ward: number;
}

export interface GroupSellableProductsResult {
  status: GroupSellableProductsStatus;
  inventories: any;
  cities: City[];
  districts: District[];
  wards: Ward[];
  products: Product[];
}

export interface CheckRealtimeDataProductsInOrderResult {
  status: BooleanValue;
  products: OrderProductDto[];
  coupon?: CouponDetailInOrderDto;
}
