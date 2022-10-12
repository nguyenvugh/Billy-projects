import { Injectable, HttpService } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { OrderShippingStatusConst } from '../../common/constants/order-shipping.constant';
import {
  buildRequestUrl,
  checkObjectIsEmpty,
} from '../../common/helpers/util.helper';
import { convertOrderShippingStatusToOrderShippingStatusFilter } from '../../common/helpers/order.helper';
import {
  ResultShippingStatus,
  ResultShippingError,
  OrderShippingFreeshipOptionsConst,
  OrderShippingWeightOptionsConst,
  OrderShippingTransportOptionsConst,
  ShippingExtendPrice,
  CalculateShippingPriceResult,
  CalculateShippingPriceResultInterface,
  DataCreateShipping,
  CreateShippingResult,
  CreateShippingResultInterface,
  OrderShippingDriverInterface,
  DataIpnUpdateShipping,
  IpnDataParseResult,
  IpnDataParseResultInterface,
  InformationProductShip,
  CancelShippingResultInterface,
  ConvertLogToStatusResultInterface,
  ActionShipping,
} from './base.driver';

@Injectable()
export class GhtkDriver implements OrderShippingDriverInterface {
  private testMode: boolean;
  private testModeIdentity: string;
  private apiToken: string;
  private apiUrl: string;

  constructor(
    private readonly configService: ConfigService,
    private jwtService: JwtService,
    private httpService: HttpService,
  ) {
    this.testMode = this.configService.get<boolean>('shipping.test_mode');
    this.testModeIdentity = this.testMode ? 'sandbox' : 'production';
    this.apiToken = this.configService.get<string>(
      `shipping.ghtk.${this.testModeIdentity}.api_key`,
    );
    this.apiUrl = this.configService.get<string>(
      `shipping.ghtk.${this.testModeIdentity}.api_url`,
    );
  }

  async checkCanShip(
    data: InformationProductShip[],
  ): Promise<ResultShippingStatus> {
    if (!data || !data.length) {
      return ResultShippingStatus.FAIL;
    }
    let rs: ResultShippingStatus = ResultShippingStatus.OK;
    const maxDimension = 80;
    const maxTotalDimension = maxDimension * maxDimension * maxDimension;
    const maxTotalWeight = 20 * 1000;
    let totalDimension = 0;
    let totalMinDimension = 0;
    let totalWeight = 0;
    data.every((product) => {
      if (
        !product.height ||
        !product.length ||
        !product.total ||
        !product.weight ||
        !product.width
      ) {
        rs = ResultShippingStatus.FAIL;
        return false;
      }
      // Điều kiện 1: Các chiều của sản phẩm phải bé hơn 80 cm
      if (
        product.length >= maxDimension ||
        product.width >= maxDimension ||
        product.height >= maxDimension
      ) {
        rs = ResultShippingStatus.FAIL;
        return false;
      }
      totalDimension +=
        product.total * product.length * product.width * product.height;
      totalWeight += product.total * product.weight;
      let minDimension = product.length;
      if (minDimension > product.width) {
        minDimension = product.width;
      }
      if (minDimension > product.height) {
        minDimension = product.height;
      }
      totalMinDimension += product.total * minDimension;

      return true;
    });
    if (rs == ResultShippingStatus.OK) {
      // Điều kiện 2: Khi đơn hàng gửi sang GHTK, Tổng thể tích các mặt hàng phải nhỏ hơn Thể tích quy định là 80 * 80 * 80 = 512.000 cm3 (Do giới hạn mỗi chiều của đơn hàng là 80cm).
      if (totalDimension >= maxTotalDimension) {
        rs = ResultShippingStatus.FAIL;
      }
      // Điều kiện 3: Tổng chiều nhỏ nhất của các sản phẩm phải bé hơn 80cm
      if (totalMinDimension >= maxDimension) {
        rs = ResultShippingStatus.FAIL;
      }
      // Trong trường hợp Tổng khối lượng các mặt hàng > Khối lượng quy định thì người dùng sẽ không được chọn GHTK
      if (totalWeight > maxTotalWeight) {
        rs = ResultShippingStatus.FAIL;
      }
    }

    return rs;
  }

  async calculateShippingPrice(
    data: any,
  ): Promise<CalculateShippingPriceResultInterface> {
    const rs: CalculateShippingPriceResultInterface = {
      status: ResultShippingStatus.FAIL,
      error: ResultShippingError.BAD_REQUEST,
      request: data,
    };
    if (!data) {
      return rs;
    }

    const urlRequest = buildRequestUrl(
      this.apiUrl + '/services/shipment/fee',
      data,
    );
    const response = await this.httpService
      .get(urlRequest, {
        headers: {
          token: this.apiToken,
        },
      })
      .toPromise();
    if (response && response.data) {
      const { success, message, fee } = response.data;
      rs.response = response.data;
      if (success && fee) {
        rs.error = '';
        if (fee.delivery) {
          rs.status = ResultShippingStatus.OK;
          rs.result = {
            fee: fee.fee,
            insurance_fee: fee.insurance_fee,
            total: fee.fee,
          };
          const extPrices: ShippingExtendPrice[] = [];
          if (fee.extFees && fee.extFees.length) {
            fee.extFees.forEach((extFee) => {
              const extPrice: ShippingExtendPrice = {
                fee: 0,
                title: '',
              };
              if (extFee.display) {
                extPrice.title += extFee.display;
              }
              if (extFee.title) {
                extPrice.title += extFee.title;
              }
              if (extFee.amount) {
                extPrice.fee = extFee.amount;
              }
              extPrices.push(extPrice);
            });
            rs.result.ext = extPrices;
          }
        } else {
          rs.error = ResultShippingError.NOT_DELIVERY;
        }
      } else {
        rs.error = message;
      }
    }
    return rs;
  }

  async createShipping(
    data: DataCreateShipping,
  ): Promise<CreateShippingResultInterface> {
    const rs: CreateShippingResultInterface = {
      status: ResultShippingStatus.FAIL,
      error: ResultShippingError.BAD_REQUEST,
      request: data,
      result: {
        fee: 0,
        insurance_fee: 0,
        total: 0,
        code: '',
        status: -1,
      },
    };
    if (!data) {
      return rs;
    }
    data.order.weight_option = OrderShippingWeightOptionsConst.GRAM;
    data.order.transport = OrderShippingTransportOptionsConst.ROAD;
    data.order.hamlet = 'Khác';

    const url = this.apiUrl + '/services/shipment/order/?ver=1.5';
    const response = await this.httpService
      .post(url, data, {
        headers: {
          token: this.apiToken,
          'Content-Type': 'application/json',
        },
      })
      .toPromise();
    if (response && response.data) {
      const { success, message, order } = response.data;
      rs.response = response.data;
      if (success && order) {
        rs.status = ResultShippingStatus.OK;
        rs.error = '';
        rs.result = {
          fee: order.fee,
          insurance_fee: order.insurance_fee,
          total: order.fee,
          code: order.label,
          // TODO: convert GHTK shipping status to NLT shipping status
          status: order.status_id,
        };
      } else {
        rs.error = message;
      }
    }

    return rs;
  }

  async ipnUpdateShipping(
    data: DataIpnUpdateShipping,
  ): Promise<IpnDataParseResultInterface> {
    const rs: IpnDataParseResultInterface = {
      status: ResultShippingStatus.FAIL,
      error: ResultShippingError.BAD_REQUEST,
      jwt_response: data.jwt,
      result: {
        shipping_code_request: '',
        shipping_code_response: '',
        status: -1,
      },
    };
    if (!data) {
      return rs;
    }

    try {
      rs.data_response = this.jwtService.decode(data.jwt);
      if (
        rs.data_response.hasOwnProperty('partner_id') &&
        rs.data_response.hasOwnProperty('label_id') &&
        rs.data_response.hasOwnProperty('status_id')
      ) {
        rs.status = ResultShippingStatus.OK;
        rs.error = '';
        rs.result = {
          shipping_code_request: rs.data_response.partner_id,
          shipping_code_response: rs.data_response.label_id,
          // TODO: convert GHTK shipping status to NLT shipping status
          status: rs.data_response.status_id,
        };
      }
    } catch (error) {
      rs.error = error;
    }

    return rs;
  }

  async cancelShipping(data: any): Promise<CancelShippingResultInterface> {
    const rs: CreateShippingResultInterface = {
      status: ResultShippingStatus.FAIL,
      error: ResultShippingError.BAD_REQUEST,
      request: data,
    };
    if (!data || !data.hasOwnProperty('shipping_code_response')) {
      return rs;
    }

    const url =
      this.apiUrl +
      `/services/shipment/cancel/${data['shipping_code_response']}`;
    const response = await this.httpService
      .post(url, data, {
        headers: {
          token: this.apiToken,
          'Content-Type': 'application/json',
        },
      })
      .toPromise();
    if (response && response.data) {
      const { success, message } = response.data;
      rs.response = response.data;
      if (success) {
        rs.status = ResultShippingStatus.OK;
        rs.error = '';
      } else {
        rs.error = message;
      }
    }

    return rs;
  }

  async convertLogToStatus(
    log: any,
  ): Promise<ConvertLogToStatusResultInterface> {
    const rs: ConvertLogToStatusResultInterface = {
      status: ResultShippingStatus.FAIL,
      result: -1,
    };
    if (checkObjectIsEmpty(log)) {
      return rs;
    }
    if (!log.hasOwnProperty('action')) {
      return rs;
    }
    try {
      switch (log['action']) {
        case ActionShipping.CANCEL_ORDER:
          if (ResultShippingStatus.OK == log['status']) {
            rs.status = ResultShippingStatus.OK;
            rs.result = convertOrderShippingStatusToOrderShippingStatusFilter(
              OrderShippingStatusConst.CANCELLED,
            );
          }
          break;
        case ActionShipping.IPN_UPDATE:
        case ActionShipping.CREATE_ORDER:
          if (ResultShippingStatus.OK == log['status']) {
            rs.status = ResultShippingStatus.OK;
            rs.result = convertOrderShippingStatusToOrderShippingStatusFilter(
              log['result']['status'],
            );
          }
          break;
      }
    } catch (err) {}
    return rs;
  }
}
