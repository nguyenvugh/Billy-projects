export enum RequestPaymentLinkStatus {
  OK = 'ok',
  FAIL = 'fail',
}

export enum ResultPaymentStatus {
  OK = 'ok',
  FAIL = 'fail',
  CANCELLED = 'cancelled',
}

export enum ActionPayment {
  REQUEST_PAYMENT = 'request_payment',
  IPN_UPDATE = 'ipn_update',
  CHECK_PAYMENT = 'check_payment',
}

export interface RequestPaymentLinkResultInterface {
  status: RequestPaymentLinkStatus;
  req_params: any;
  link: string;
  error: string;
}

export interface CheckPaymentResultInterface {
  status: ResultPaymentStatus;
  req_params?: any;
  response: any;
  error: string;
  order_code: string;
}

export interface OrderPaymentDriverInterface {
  generateRequestPaymentLink(data: any): RequestPaymentLinkResultInterface;
  ipnCheckPaymentResult(response: any): CheckPaymentResultInterface;
}
