export enum OrderPaymentStatusConst {
  PROCESSING = 1,
  PAID = 2,
  CANCELLED = 3,
  REFUNDED = 4,
}

export enum OrderPaymentTypeConst {
  COD = 1,
  ONLINE = 2,
  LTP = 3,
}

export const OnlinePaymentTaxConst = {
  INTERNATIONAL_CARD: {
    name: 'order-payment.online_payment_tax.international',
    price: {
      fixed: 7150,
      percent: 2.75,
    },
  },
  DOMESTIC_CARD: {
    name: 'order-payment.online_payment_tax.domestic',
    price: {
      fixed: 1760,
      percent: 1.1,
    },
  },
  QR: {
    name: 'order-payment.online_payment_tax.qr',
    price: {
      fixed: 1760,
      percent: 1.1,
    },
  },
};
