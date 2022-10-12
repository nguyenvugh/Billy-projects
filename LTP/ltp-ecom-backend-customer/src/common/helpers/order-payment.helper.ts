import { OnlinePaymentTaxConst } from '../constants/order-payment.constant';

export const calculateOnlinePaymentTax = (
  onlinePaymentMethodKey: string,
  orderTotal: number,
) => {
  if (!onlinePaymentMethodKey || !orderTotal) {
    return 0;
  }

  const onlinePaymentMethodKeys = Object.keys(OnlinePaymentTaxConst);
  if (-1 == onlinePaymentMethodKeys.indexOf(onlinePaymentMethodKey)) {
    return 0;
  }
  const onlinePaymentDetail = OnlinePaymentTaxConst[onlinePaymentMethodKey];

  return (
    Number(onlinePaymentDetail.price.fixed) +
    Math.round((onlinePaymentDetail.price.percent * orderTotal) / 100)
  );
};
