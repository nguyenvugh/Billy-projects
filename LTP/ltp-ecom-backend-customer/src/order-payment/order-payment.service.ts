import { Injectable } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
import { ConfigService } from '@nestjs/config';
import { OrderStatusConst } from '../common/constants/order.constant';
import { OrderPaymentStatusConst } from '../common/constants/order-payment.constant';
import {
  OrderPaymentTypeConst,
  OnlinePaymentTaxConst,
} from '../common/constants/order-payment.constant';
import { CouponTypeConst } from '../common/constants/coupon.constant';
import { BooleanValue } from '../common/constants/global.constant';
import { checkItemInArray } from '../common/helpers/util.helper';
import {
  checkCouponCanUse,
  CheckCouponCanUseResultInterface,
} from '../common/helpers/coupon.helper';
import { calculateOnlinePaymentTax } from '../common/helpers/order-payment.helper';
import { RpcExc } from '../common/exceptions/custom.exception';
import { FindAllTypesDto } from './dto/find-all-types.dto';
import { CalculateOnlinePaymentTaxDto } from './dto/calculate-online-payment-tax.dto';
import {
  RequestPaymentLinkStatus,
  ResultPaymentStatus,
  RequestPaymentLinkResultInterface,
  CheckPaymentResultInterface,
  ActionPayment,
} from './driver/base.driver';
import { OnepayDriver } from './driver/onepay.driver';
import { OrderPaymentRepository } from './repository/order-payment.repository';
import { OrderPayment } from './schema/order-payment.schema';
import { OrderRepository } from '../order/repository/order.repository';
import { Order } from '../order/schema/order.schema';
import { OrderHistoryRepository } from '../order-history/repository/order-history.repository';
import { OrderPaymentHistoryRepository } from '../order-payment-history/repository/order-payment-history.repository';
import { ProductRepository } from '../product/repository/product.repository';
import { OrderShippingDriverConst } from '../order-shipping/driver/base.driver';
import { CouponService } from '../coupon/coupon.service';

@Injectable()
export class OrderPaymentService {
  constructor(
    private i18n: I18nService,
    private onepayDriver: OnepayDriver,
    private configService: ConfigService,
    private couponService: CouponService,
    private orderPaymentRepository: OrderPaymentRepository,
    private productRepo: ProductRepository,
  ) {}

  async calculateOnlinePaymentTax(reqData: CalculateOnlinePaymentTaxDto) {
    if (!reqData.order_total) {
      return [];
    }

    const onlinePaymentTaxes: any[] = [];
    for (const key in OnlinePaymentTaxConst) {
      if (OnlinePaymentTaxConst.hasOwnProperty(key)) {
        const onlinePaymentTax = OnlinePaymentTaxConst[key];
        onlinePaymentTaxes.push({
          key: key,
          name: await this.i18n.t(onlinePaymentTax.name),
          price: calculateOnlinePaymentTax(key, reqData.order_total),
        });
      }
    }

    return onlinePaymentTaxes;
  }

  async getListPaymentTypes(reqData: FindAllTypesDto) {
    let activeCoupon = null;
    if (reqData.coupon_code) {
      const [activeCoupons, couponInvalid] = await Promise.all([
        this.couponService.getActivatingCouponQuery().getMany(),
        this.i18n.t('order.validate.coupon_invalid'),
      ]);
      const rsCheckCouponCanUse: CheckCouponCanUseResultInterface =
        checkCouponCanUse(
          reqData.coupon_code,
          activeCoupons,
          0,
          reqData.customerId,
        );
      if (!rsCheckCouponCanUse.canUse) {
        throw new RpcExc(`bad_request:${couponInvalid}`);
      }
      activeCoupon = rsCheckCouponCanUse.coupon;
    }
    const results: any[] = [];
    const productIds = reqData.products.map((item) => {
      return item.productId;
    });
    const productsGet = await this.productRepo.findByIds(productIds);
    let allowCOD = true;
    for (const productGet of productsGet) {
      if (BooleanValue.FALSE == productGet.allow_cod) {
        allowCOD = false;
        break;
      }
    }
    Object.values(OrderPaymentTypeConst).forEach(async (id: any) => {
      if (isNaN(id)) {
        return;
      }
      const [name, description] = await Promise.all([
        this.i18n.t(`order-payment.types.${id}.name`),
        this.i18n.t(`order-payment.types.${id}.description`),
      ]);
      let disabled =
        !this.checkPaymentTypeValidOnDriver(reqData.driver, id) ||
        (OrderPaymentTypeConst.COD == id && !allowCOD);
      if (!disabled && activeCoupon) {
        if (
          OrderPaymentTypeConst.COD == id &&
          CouponTypeConst.ORDER == activeCoupon.type
        ) {
          disabled = true;
        }
      }
      results.push({
        id,
        name,
        description,
        disabled,
      });
    });

    return results;
  }

  generateRequestPaymentLink(data: any): RequestPaymentLinkResultInterface {
    let result: RequestPaymentLinkResultInterface = {
      status: RequestPaymentLinkStatus.FAIL,
      req_params: {},
      link: '',
      error: '',
    };
    if (!data) {
      return result;
    }
    const driver = this.configService.get<string>('payment.driver');
    switch (driver) {
      case 'onepay':
        result = this.onepayDriver.generateRequestPaymentLink(data);
        break;
    }

    return result;
  }

  async ipnUpdatePayment(response: any): Promise<CheckPaymentResultInterface> {
    let result: CheckPaymentResultInterface = {
      status: ResultPaymentStatus.FAIL,
      response: '',
      error: '',
      order_code: '',
    };
    const driver = this.configService.get<string>('payment.driver');
    switch (driver) {
      case 'onepay':
        result = this.onepayDriver.ipnCheckPaymentResult(response);
        break;
    }
    if (!result.order_code) {
      return result.response;
    }

    const ipnUpdateResult = this.orderPaymentRepository.manager.transaction(
      async (entityManager) => {
        const orderRepo = entityManager.getCustomRepository(OrderRepository);
        const orderHistoryRepo = entityManager.getCustomRepository(
          OrderHistoryRepository,
        );
        const orderPaymentRepo = entityManager.getCustomRepository(
          OrderPaymentRepository,
        );
        const orderPaymentHistoryRepo = entityManager.getCustomRepository(
          OrderPaymentHistoryRepository,
        );
        const { order_code } = result;

        const ordersGet = await orderRepo.find({
          where: {
            code: order_code,
          },
          take: 1,
          relations: ['payments'],
        });
        if (!ordersGet || !ordersGet.length) {
          return;
        }
        const orderGet: Order = ordersGet[0];
        if (!orderGet.payments || !orderGet.payments.length) {
          return;
        }
        const orderPaymentGet: OrderPayment = orderGet.payments[0];
        const logOrderPaymentHistory: any = {
          action: ActionPayment.IPN_UPDATE,
          response: response,
          result: result,
        };
        let stopProcess = false;
        // Stop process if order payment processed
        if (
          OrderStatusConst.PAID == orderGet.status ||
          OrderPaymentStatusConst.PAID == orderPaymentGet.status
        ) {
          logOrderPaymentHistory['debug'] =
            'Stop process because order payment processed';
          stopProcess = true;
        }
        // Stop process if order payment cancelled
        if (
          OrderStatusConst.CANCELLED == orderGet.status ||
          OrderPaymentStatusConst.CANCELLED == orderPaymentGet.status
        ) {
          logOrderPaymentHistory['debug'] =
            'Stop process because order payment cancelled';
          stopProcess = true;
        }
        const orderPaymentHistoryInsertData: any = {
          orderPaymentId: orderPaymentGet.id,
          log: JSON.stringify(logOrderPaymentHistory),
        };
        if (true == stopProcess) {
          await orderPaymentHistoryRepo.save(orderPaymentHistoryInsertData);
          return;
        }
        const orderUpdateData: any = {
          id: orderGet.id,
          status: OrderStatusConst.PAID,
        };
        const orderPaymentUpdateData: any = {
          id: orderPaymentGet.id,
          status: OrderPaymentStatusConst.PAID,
        };
        const orderHistoryInsertData: any = {
          orderId: orderGet.id,
          log: 'IPN update payment',
        };
        if (ResultPaymentStatus.FAIL == result.status) {
          orderUpdateData['status'] = OrderStatusConst.PENDING_PAYMENT;
          orderPaymentUpdateData['status'] = OrderPaymentStatusConst.PROCESSING;
        } else if (ResultPaymentStatus.CANCELLED == result.status) {
          orderUpdateData['status'] = OrderStatusConst.CANCELLED;
          orderPaymentUpdateData['status'] = OrderPaymentStatusConst.CANCELLED;
        }

        await Promise.all([
          orderRepo.save(orderUpdateData),
          orderPaymentRepo.save(orderPaymentUpdateData),
          orderHistoryRepo.save(orderHistoryInsertData),
          orderPaymentHistoryRepo.save(orderPaymentHistoryInsertData),
        ]);

        return;
      },
    );

    return result.response;
  }

  checkPaymentTypeValidOnDriver(driver: number, type: number): boolean {
    let rs = false;
    if (!driver || !type) {
      return rs;
    }
    const validDrivers = Object.values(OrderShippingDriverConst);
    const validPaymentTypes = Object.values(OrderPaymentTypeConst);
    if (
      !checkItemInArray(validDrivers, driver) ||
      !checkItemInArray(validPaymentTypes, type)
    ) {
      return rs;
    }
    switch (driver) {
      case OrderShippingDriverConst.GHTK:
        rs =
          OrderPaymentTypeConst.COD == type ||
          OrderPaymentTypeConst.ONLINE == type;
        break;
      case OrderShippingDriverConst.LTP:
        rs = OrderPaymentTypeConst.LTP == type;
        break;
    }

    return rs;
  }

  checkOnlinePaymentMethod(method: string): boolean {
    if (!method) {
      return false;
    }

    const onlinePaymentMethodKeys = Object.keys(OnlinePaymentTaxConst);
    if (-1 == onlinePaymentMethodKeys.indexOf(method)) {
      return false;
    }

    return true;
  }
}
