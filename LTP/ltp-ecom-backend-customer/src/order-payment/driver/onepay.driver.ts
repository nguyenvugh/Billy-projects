import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createHmac } from 'crypto';
import { sortObject, buildRequestUrl } from '../../common/helpers/util.helper';
import {
  RequestPaymentLinkStatus,
  ResultPaymentStatus,
  OrderPaymentDriverInterface,
  RequestPaymentLinkResultInterface,
  CheckPaymentResultInterface,
} from './base.driver';

export enum OnePayOnlinePaymentCardListConst {
  INTERNATIONAL_CARD = 'INTERNATIONAL',
  DOMESTIC_CARD = 'DOMESTIC',
  QR = 'QR',
}

@Injectable()
export class OnepayDriver implements OrderPaymentDriverInterface {
  private testMode: boolean;
  private testModeIdentity: string;

  constructor(private readonly configService: ConfigService) {
    this.testMode = this.configService.get<boolean>('payment.test_mode');
    this.testModeIdentity = this.testMode ? 'sandbox' : 'production';
  }

  generateRequestPaymentLink(data: any): RequestPaymentLinkResultInterface {
    const result: RequestPaymentLinkResultInterface = {
      status: RequestPaymentLinkStatus.FAIL,
      req_params: {},
      link: '',
      error: '',
    };
    const {
      amount,
      online_payment_method,
      order_code,
      return_url,
      customer_ip_address,
    } = data;
    if (
      !amount ||
      !online_payment_method ||
      !order_code ||
      !return_url ||
      !customer_ip_address
    ) {
      return result;
    }
    const onePayOnlinePaymentCardListKeys = Object.keys(
      OnePayOnlinePaymentCardListConst,
    );
    if (-1 == onePayOnlinePaymentCardListKeys.indexOf(online_payment_method)) {
      return result;
    }
    const reqUrl: string = this.configService.get<string>(
      `payment.onepay.request_payment.${this.testModeIdentity}.url`,
    );
    const reqParam: any = this.configService.get<string>(
      `payment.onepay.request_payment.${this.testModeIdentity}.parameters`,
    );
    const globalReqParam: any = this.configService.get<string>(
      `payment.onepay.request_payment.global_parameters`,
    );
    const hashKey: string = this.configService.get<string>(
      `payment.onepay.${this.testModeIdentity}.hash_key`,
    );
    reqParam.vpc_Amount = amount * 100;
    reqParam.vpc_MerchTxnRef = order_code;
    reqParam.vpc_OrderInfo = order_code;
    reqParam.vpc_ReturnURL = return_url;
    reqParam.vpc_TicketNo = customer_ip_address;
    reqParam.vpc_CardList =
      OnePayOnlinePaymentCardListConst[online_payment_method];
    const orderedReqParam = sortObject(reqParam);
    const secureHash = this.hash(orderedReqParam, hashKey);
    result.link =
      buildRequestUrl(reqUrl, {
        ...reqParam,
        ...globalReqParam,
      }) + `&vpc_SecureHash=${secureHash}`;
    result.req_params = {
      ...reqParam,
      ...globalReqParam,
      vpc_SecureHash: secureHash,
    };
    result.status = RequestPaymentLinkStatus.OK;

    return result;
  }

  ipnCheckPaymentResult(response: any): CheckPaymentResultInterface {
    const result: CheckPaymentResultInterface = {
      status: ResultPaymentStatus.FAIL,
      response: 'responsecode=1&desc=confirm-success',
      error: '',
      order_code: '',
    };
    if (!response) {
      return result;
    }
    const {
      vpc_SecureHash,
      vpc_TxnResponseCode,
      vpc_Message,
      vpc_MerchTxnRef,
    } = response;
    if (!vpc_SecureHash || '' == vpc_TxnResponseCode || !vpc_MerchTxnRef) {
      return result;
    }
    result.order_code = vpc_MerchTxnRef;

    const hashKey: string = this.configService.get<string>(
      `payment.onepay.${this.testModeIdentity}.hash_key`,
    );
    const orderedReqParam = sortObject(response);
    const strHashed = this.hash(orderedReqParam, hashKey);
    if (strHashed != vpc_SecureHash) {
      result.error = 'wrong secure hash';
      return result;
    }
    if ('0' != vpc_TxnResponseCode) {
      result.error = vpc_Message;
      if ('99' == vpc_TxnResponseCode) {
        result.status = ResultPaymentStatus.CANCELLED;
      }
    } else {
      result.status = ResultPaymentStatus.OK;
    }

    return result;
  }

  private hash(data: any, key: string) {
    let dataHash = '';
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        const value = data[key];
        if (-1 != key.indexOf('vpc_') && 'vpc_SecureHash' != key) {
          if ('' == dataHash) {
            dataHash = `${key}=${value}`;
          } else {
            dataHash += `&${key}=${value}`;
          }
        }
      }
    }
    const hash = createHmac('sha256', Buffer.from(key, 'hex'))
      .update(dataHash)
      .digest('hex')
      .toUpperCase();
    return hash;
  }
}
