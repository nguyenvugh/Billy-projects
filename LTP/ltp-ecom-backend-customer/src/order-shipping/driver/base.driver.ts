import {
  OrderShippingStatusConst,
  OrderShippingStatusFilterConst,
} from '../../common/constants/order-shipping.constant';

export enum OrderShippingDriverConst {
  GHTK = 1,
  LTP = 2,
}

export enum OrderShippingDriverNameConst {
  GHTK = 'ghtk',
  LTP = 'ltp',
}

export enum OrderShippingTypeConst {
  GHTC = 1,
  GHN = 2,
}

export const OrderShippingDriverTypeConst = {
  1: [OrderShippingTypeConst.GHTC, OrderShippingTypeConst.GHN],
  2: [OrderShippingTypeConst.GHTC],
};

export enum OrderShippingDeliveryOptionsConst {
  GHTC = 'none',
  GHN = 'xteam',
}

export const OrderShippingDriverDeliveryOptionConst = {
  1: [
    OrderShippingDeliveryOptionsConst.GHTC,
    OrderShippingDeliveryOptionsConst.GHN,
  ],
  2: [OrderShippingDeliveryOptionsConst.GHTC],
};

export enum OrderShippingFreeshipOptionsConst {
  YES = 1,
  NO = 0,
}

export enum OrderShippingWeightOptionsConst {
  GRAM = 'gram',
  KYLOGRAM = 'kilogram',
}

export enum OrderShippingTransportOptionsConst {
  ROAD = 'road',
  FLY = 'fly',
}

export enum ResultShippingStatus {
  OK = 'ok',
  FAIL = 'fail',
}

export enum ResultShippingError {
  BAD_REQUEST = 'bad request',
  AUTH_FAIL = 'authenticate fail or token invalid',
  JWT_DECODE_FAIL = 'jwt decode fail',
  NOT_DELIVERY = 'not delivery',
}

export enum ActionShipping {
  CREATE_ORDER = 'create_order',
  IPN_UPDATE = 'ipn_update',
  CHECK_ORDER = 'check_order',
  CANCEL_ORDER = 'cancel_order',
}

export interface ShippingExtendPrice {
  fee: number;
  title: string;
}

export interface CalculateShippingPriceResult {
  fee: number;
  insurance_fee: number;
  ext?: ShippingExtendPrice[];
  total: number;
}

export interface ProductShippingCreateOrder {
  name: string;
  weight: number;
  price?: number;
  quantity?: number;
  product_code?: string;
}

export interface OrderInfoCreateOrder {
  id: string;
  pick_name: string;
  pick_money: number;
  pick_address: string;
  pick_province: string;
  pick_district: string;
  pick_tel: string;
  name: string;
  address: string;
  province: string;
  district: string;
  ward?: string;
  street?: string;
  hamlet?: string;
  tel: string;
  email: string;
  value: number;
  deliver_option: OrderShippingDeliveryOptionsConst;
  is_freeship?: OrderShippingFreeshipOptionsConst;
  weight_option?: OrderShippingWeightOptionsConst;
  transport?: OrderShippingTransportOptionsConst;
}

export interface DataCreateShipping {
  products: ProductShippingCreateOrder[];
  order: OrderInfoCreateOrder;
}

export interface CreateShippingResult {
  fee: number;
  insurance_fee: number;
  ext_fee?: number;
  total: number;
  code: string;
  status: OrderShippingStatusConst;
}

export interface DataIpnUpdateShipping {
  jwt: string;
}

export interface IpnDataParseResult {
  shipping_code_request: string;
  shipping_code_response: string;
  status: OrderShippingStatusConst;
}

export interface InformationProductWeight {
  weight: number;
  length: number;
  width: number;
  height: number;
}

export interface InformationProductShip extends InformationProductWeight {
  total: number;
}

export interface CalculateShippingPriceResultInterface {
  status: ResultShippingStatus;
  request: any;
  response?: any;
  error: any;
  result?: CalculateShippingPriceResult;
}

export interface CreateShippingResultInterface {
  status: ResultShippingStatus;
  request: any;
  response?: any;
  error: any;
  result?: CreateShippingResult;
}

export interface IpnDataParseResultInterface {
  status: ResultShippingStatus;
  jwt_response: string;
  data_response?: any;
  error: any;
  result?: IpnDataParseResult;
}

export interface CancelShippingResultInterface {
  status: ResultShippingStatus;
  request: any;
  response?: any;
  error: any;
}

export interface ConvertLogToStatusResultInterface {
  status: ResultShippingStatus;
  result: OrderShippingStatusFilterConst;
}

export interface OrderShippingDriverInterface {
  checkCanShip(data: InformationProductShip[]): Promise<ResultShippingStatus>;
  calculateShippingPrice(
    data: any,
  ): Promise<CalculateShippingPriceResultInterface>;
  createShipping(
    data: DataCreateShipping,
  ): Promise<CreateShippingResultInterface>;
  cancelShipping(data: any): Promise<CancelShippingResultInterface>;
  convertLogToStatus(log: any): Promise<ConvertLogToStatusResultInterface>;
  ipnUpdateShipping(
    data: DataIpnUpdateShipping,
  ): Promise<IpnDataParseResultInterface>;
}
