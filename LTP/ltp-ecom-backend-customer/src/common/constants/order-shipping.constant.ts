export enum OrderShippingStatusConst {
  CANCELLED = -1,
  NOT_RECEIVE = 1,
  RECEIVED = 2,
  PICKED = 3,
  DELIVERING = 4,
  DELIVERED = 5,
  CHECKED = 6, // Đã đối soát
  CAN_NOT_PICK = 7,
  DELAY_PICK = 8,
  CAN_NOT_DELIVERY = 9,
  DELAY_DELIVERY = 10,
  DONE = 11, // Đã đối soát sổ sách
  PICKING = 12,
  REFUND = 13,
  RETURNING = 20,
  RETURNED = 21,
  SHIPPER_PICKED = 123,
  SHIPPER_CAN_NOT_PICK = 127,
  SHIPPER_DELAY_PICK = 128,
  SHIPPER_DELIVERED = 45,
  SHIPPER_CAN_NOT_DELIVERY = 49,
  SHIPPER_DELAY_DELIVERY = 410,
}

export enum OrderShippingStatusFilterConst {
  CONFIRMED = 1,
  RECEIVING = 2,
  DELIVERING = 3,
  DELIVERED_FULL = 4,
  DELIVERED_NOT_FULL = 5,
  REFUNDED = 6,
  CANCELLED = 7,
}

const weightOrderShippingStatusFilter: any = {};
weightOrderShippingStatusFilter[OrderShippingStatusFilterConst.DELIVERING] = 1;
weightOrderShippingStatusFilter[OrderShippingStatusFilterConst.RECEIVING] = 2;
weightOrderShippingStatusFilter[OrderShippingStatusFilterConst.CONFIRMED] = 3;
weightOrderShippingStatusFilter[
  OrderShippingStatusFilterConst.DELIVERED_NOT_FULL
] = 4;
weightOrderShippingStatusFilter[
  OrderShippingStatusFilterConst.DELIVERED_FULL
] = 5;
weightOrderShippingStatusFilter[OrderShippingStatusFilterConst.REFUNDED] = 6;
weightOrderShippingStatusFilter[OrderShippingStatusFilterConst.CANCELLED] = 7;
export const weightOrderShippingStatusFilterConst =
  weightOrderShippingStatusFilter;
