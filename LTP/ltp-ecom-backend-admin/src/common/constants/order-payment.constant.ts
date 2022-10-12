export enum OrderPaymentStatusConst {
  PROCESSING = 1,
  PAID = 2,
  CANCELLED = 3,
  REFUNDED = 4,
}

export enum OrderPaymentStatusFilterConst {
  NOT_PAY = -1,
  PAID = 1,
}

export enum OrderPaymentTypeConst {
  COD = 1,
  ONLINE = 2,
  LTP = 3,
}
