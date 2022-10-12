import {
  OrderShippingStatusConst,
  OrderShippingStatusFilterConst,
  weightOrderShippingStatusFilterConst,
} from '../constants/order-shipping.constant';
import { OrderPaymentStatusConst } from '../constants/order-payment.constant';
import { OrderStatusConst } from '../constants/order.constant';

export const convertOrderShippingStatusFilterToOrderShippingStatuses = (
  orderShippingStatusFilter: OrderShippingStatusFilterConst,
): OrderShippingStatusConst[] => {
  switch (orderShippingStatusFilter) {
    case OrderShippingStatusFilterConst.CONFIRMED:
      return [OrderShippingStatusConst.NOT_RECEIVE];
    case OrderShippingStatusFilterConst.RECEIVING:
      return [OrderShippingStatusConst.RECEIVED];
    case OrderShippingStatusFilterConst.DELIVERING:
      return [
        OrderShippingStatusConst.PICKED,
        OrderShippingStatusConst.DELIVERING,
      ];
    case OrderShippingStatusFilterConst.DELIVERED_FULL:
      return [OrderShippingStatusConst.DELIVERED];
    case OrderShippingStatusFilterConst.DELIVERED_NOT_FULL:
      return [OrderShippingStatusConst.DELIVERED];
    case OrderShippingStatusFilterConst.CANCELLED:
      return [
        OrderShippingStatusConst.CAN_NOT_PICK,
        OrderShippingStatusConst.CANCELLED,
      ];
    case OrderShippingStatusFilterConst.REFUNDED:
      return [OrderShippingStatusConst.CAN_NOT_DELIVERY];
    default:
      return [OrderShippingStatusConst.NOT_RECEIVE];
  }
};

export const convertOrderShippingStatusToOrderShippingStatusFilter = (
  orderShippingStatus: OrderShippingStatusConst,
): OrderShippingStatusFilterConst => {
  switch (orderShippingStatus) {
    case OrderShippingStatusConst.NOT_RECEIVE:
      return OrderShippingStatusFilterConst.CONFIRMED;
    case OrderShippingStatusConst.RECEIVED:
      return OrderShippingStatusFilterConst.RECEIVING;
    case OrderShippingStatusConst.PICKED:
    case OrderShippingStatusConst.DELIVERING:
      return OrderShippingStatusFilterConst.DELIVERING;
    case OrderShippingStatusConst.DELIVERED:
      return OrderShippingStatusFilterConst.DELIVERED_FULL;
    case OrderShippingStatusConst.CAN_NOT_PICK:
    case OrderShippingStatusConst.CANCELLED:
      return OrderShippingStatusFilterConst.CANCELLED;
    case OrderShippingStatusConst.CAN_NOT_DELIVERY:
      return OrderShippingStatusFilterConst.REFUNDED;
    default:
      return OrderShippingStatusFilterConst.CONFIRMED;
  }
};

export const combineMultiOrderShippingStatusesToOneOrderShippingStatusFilter = (
  orderShippingStatuses: OrderShippingStatusConst[],
) => {
  let combinedOrderShippingStatusFilter =
    OrderShippingStatusFilterConst.CANCELLED;
  orderShippingStatuses.forEach((orderShippingStatus) => {
    const orderShippingStatusFilter =
      convertOrderShippingStatusToOrderShippingStatusFilter(
        orderShippingStatus,
      );
    if (
      weightOrderShippingStatusFilterConst[orderShippingStatusFilter] <
      weightOrderShippingStatusFilterConst[combinedOrderShippingStatusFilter]
    ) {
      combinedOrderShippingStatusFilter = orderShippingStatusFilter;
    }
  });

  return combinedOrderShippingStatusFilter;
};

// TODO: using order shipping status and order payment status to know order status
export const convertOrderShippingStatusAndOrderPaymentStatusToOrderStatus = (
  orderShippingStatus: OrderShippingStatusConst,
  orderPaymentStatus: OrderPaymentStatusConst,
) => {
  switch (orderPaymentStatus) {
    case OrderPaymentStatusConst.PROCESSING:
      return OrderStatusConst.CONFIRMED;
  }
};
