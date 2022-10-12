import { Injectable } from '@nestjs/common';
import { Between, Brackets } from 'typeorm';
import { OrderStatusConst } from '../common/constants/order.constant';
import {
  OrderShippingStatusConst,
  OrderShippingStatusFilterConst,
  OrderShippingDriverConst,
  OrderShippingTypeConst,
} from '../common/constants/order-shipping.constant';
import { OrderPaymentTypeConst } from '../common/constants/order-payment.constant';
import {
  convertOrderShippingStatusFilterToOrderShippingStatuses,
  convertOrderShippingStatusToOrderShippingStatusFilter,
  combineMultiOrderShippingStatusesToOneOrderShippingStatusFilter,
} from '../common/helpers/order.helper';
import { processTranslateData } from '../common/helpers/translate.helper';
import { processProductTranslateData } from '../common/helpers/product.helper';
import { OrdersRepository } from './repositories/orders.repository';
import { OrderPaymentRepository } from './repositories/order-payment.repository';
import { OrderShippingsRepository } from './repositories/order-shippings.repository';
import { Orders } from './schemas/orders.schema';
import { FindByCriteriaDto } from './dto/find-by-criteria.dto';
import { parseOffsetAndLimit } from 'src/common/helpers/paginate.helper';
import { DeletedConst } from 'src/common/constants/soft-delete.constant';
import { getDateString } from 'src/common/helpers/date.helper';

@Injectable()
export class OrdersService {
  constructor(
    private readonly orderRepository: OrdersRepository,
    private orderPaymentRepository: OrderPaymentRepository,
    private orderShippingsRepository: OrderShippingsRepository,
  ) {}

  async findByCriteria(
    findRequest: FindByCriteriaDto,
    id: number = null,
    searchFull: any = true,
  ): Promise<any> {
    try {
      const {
        search_value,
        payment_status,
        shipping_status,
        shipping_driver,
        order_date_from,
        order_date_to,
      } = findRequest;
      const { offset, limit } = parseOffsetAndLimit(
        findRequest.page,
        findRequest.limit,
      );
      const conditions = {};
      if (order_date_from && order_date_to) {
        conditions['created_at'] = Between(
          `${getDateString(new Date(order_date_from))} 00:00:00`,
          `${getDateString(new Date(order_date_from))} 23:59:59`,
        );
      }
      if (id) {
        conditions['customer'] = id;
      }
      const [results, totalRecords] = await this.orderRepository.findAndCount({
        join: {
          alias: 'orders',
          leftJoinAndSelect: {
            customer: 'orders.customer',
            order_details: 'orders.order_details',
            product: 'order_details.product',
            translates: 'product.translates',
            payments: 'orders.payments',
            order_shippings: 'orders.order_shippings',
            country: 'order_shippings.country',
            city: 'order_shippings.city',
            district: 'order_shippings.district',
            ward: 'order_shippings.ward',
          },
        },
        // select: ['id', 'status', 'total', 'created_at'],
        where: (qb) => {
          // TODO: remove failed order from list
          // TODO: temporary solution
          qb.where('orders.status <> :orders_status', {
            orders_status: OrderStatusConst.FAILED,
          });
          if (
            search_value ||
            payment_status ||
            shipping_status ||
            shipping_driver ||
            order_date_from ||
            order_date_to ||
            id
          ) {
            qb.where({
              ...conditions,
            });
            if (payment_status) {
              qb.andWhere('payments.status = :payment_status', {
                payment_status,
              });
            }
            if (shipping_status) {
              const orderShippingStatuses =
                convertOrderShippingStatusFilterToOrderShippingStatuses(
                  shipping_status,
                );
              qb.andWhere('order_shippings.status IN (:...shipping_statuses)', {
                shipping_statuses: orderShippingStatuses,
              });
            }
            if (shipping_driver) {
              qb.andWhere('order_shippings.driver = :shipping_driver', {
                shipping_driver,
              });
            }
            if (search_value) {
              if (searchFull) {
                qb.andWhere(
                  new Brackets((subQb) => {
                    subQb
                      .where('orders.code like :orderCode', {
                        orderCode: `%${search_value}%`,
                      })
                      .orWhere('customer.phone_number like :phoneNumber', {
                        phoneNumber: `%${search_value}%`,
                      })
                      .orWhere(
                        'order_shippings.phone_number like :phoneNumber',
                        {
                          phoneNumber: `%${search_value}%`,
                        },
                      );
                  }),
                );
              } else {
                qb.andWhere('orders.id like :orderId', {
                  orderId: `%${search_value}%`,
                });
              }
            }
          }
        },
        order: {
          created_at: 'DESC',
        },
        skip: offset,
        take: limit,
      });
      const promiseReFormattedResults: any[] = [];
      for (const item of results) {
        promiseReFormattedResults.push(this.reFormatOrderResponse(item));
      }
      const formattedResults = await Promise.all(promiseReFormattedResults);
      return {
        results: formattedResults,
        totalRecords,
      };
    } catch (err) {
      console.log(err);
      return {
        results: [],
        totalRecords: 0,
      };
    }
  }

  async findOne(id: number): Promise<any> {
    try {
      let order = await this.orderRepository.findOne({
        relations: [
          'order_details',
          'order_details.product',
          'order_details.product.translates',
          'order_details.inventory',
          'order_details.charity',
          'order_details.charity.translates',
          'order_details.product_combo',
          'order_details.product_combo.translates',
          'customer',
          'order_shippings',
          'payments',
          'order_shippings.country',
          'order_shippings.city',
          'order_shippings.district',
          'order_shippings.ward',
        ],
        where: {
          id,
        },
      });
      if (order) {
        order = await this.reFormatOrderResponse(order);
      }
      return order || null;
    } catch (err) {
      return null;
    }
  }

  async updateOne({
    id,
    payment_status,
    shipping_status,
    shipping_price,
  }): Promise<any> {
    const order = await this.orderRepository.findOne({
      relations: ['order_shippings', 'payments'],
      where: {
        id,
      },
    });
    if (order) {
      if (
        true == (await this.checkCanUpdateOrderPaymentAndShipping(id, order))
      ) {
        // TODO: don't need convert LTP shipping status to GHTK shipping status
        // TODO: because we only allow update status with LTP shipping and payment
        shipping_status = shipping_status;
        // Cancelling order shipping
        if (OrderShippingStatusFilterConst.CANCELLED == shipping_status) {
          const orderShipping = order.order_shippings[0];
          // Can not cancel when current status of order shipping is cancelled
          // Using Number here to convert two different types (OrderShippingStatusConst and OrderShippingStatusFilterConst) to one type
          if (
            Number(OrderShippingStatusFilterConst.CANCELLED) ==
            Number(orderShipping['status'])
          ) {
            return {
              code: 400,
              message: 'Không thể cập nhật',
            };
          }
        }
        const dataUpdateOrder = {
          id,
          shipping_price,
          total: Number(order.subtotal) + Number(shipping_price),
        };
        const dataUpdateOrderPayment: any[] = [];
        const dataUpdateOrderShipping: any[] = [];
        order.payments.forEach((payment) => {
          dataUpdateOrderPayment.push({
            id: payment.id,
            status: payment_status,
          });
        });
        order.order_shippings.forEach((shipping) => {
          dataUpdateOrderShipping.push({
            id: shipping.id,
            status: shipping_status,
          });
        });
        await Promise.all([
          this.orderRepository.save(dataUpdateOrder),
          this.orderPaymentRepository.save(dataUpdateOrderPayment),
          this.orderShippingsRepository.save(dataUpdateOrderShipping),
        ]);
        return {
          code: 200,
          data: order,
        };
      } else {
        return {
          code: 400,
          message: 'Không thể cập nhật',
        };
      }
    } else {
      return {
        code: 404,
        message: 'Order not found',
      };
    }
  }

  async delete(ids: string): Promise<any> {
    const idsArr = ids.split(',');
    const orders = await this.orderRepository.findByIds(idsArr);
    if (orders && orders.length > 0) {
      // TODO: check condition to allow delete order
      orders.map(async (order) => {
        order.deleted_at = new Date();
        order.deleted = DeletedConst.DELETED;
        // TODO: update number products in inventories and in list products
        await this.orderRepository.save(order);
      });
      return {
        code: 200,
        message: 'Selected orders deleted successfully',
      };
    } else {
      return {
        code: 404,
        message: 'Order not found',
      };
    }
  }

  async checkCanUpdateOrderPaymentAndShipping(
    id: number,
    order: Orders = null,
  ) {
    const rs = false;
    if (!id) {
      return rs;
    }
    order =
      order ??
      (await this.orderRepository.findOne({
        relations: ['order_shippings', 'payments'],
        where: {
          id,
        },
      }));
    if (
      !order.order_shippings ||
      !order.order_shippings.length ||
      !order.payments ||
      !order.payments.length
    ) {
      return rs;
    }
    const orderPaymentType = order.payments[0].type;
    const orderShippingDriver = order.order_shippings[0].driver;
    return (
      OrderShippingDriverConst.LTP == orderShippingDriver &&
      OrderPaymentTypeConst.LTP == orderPaymentType
    );
  }

  private async reFormatOrderResponse(order: Orders) {
    const canUpdateStatus = await this.checkCanUpdateOrderPaymentAndShipping(
      order.id,
      order,
    );
    order['can_update_status'] = canUpdateStatus;
    if (order.payments && order.payments.length) {
      order['payment_status'] = order.payments[0].status;
    }

    if (order.order_shippings && order.order_shippings.length) {
      // Convert shipping status to shipping status filter when using GHTK service
      if (false == canUpdateStatus) {
        // TODO: Combine status of shipping items into one shipping status filter
        const orderShippingStatuses = order.order_shippings.map((item) => {
          return item.status;
        });
        order['shipping_status'] =
          combineMultiOrderShippingStatusesToOneOrderShippingStatusFilter(
            orderShippingStatuses,
          );
      } else {
        order['shipping_status'] = order.order_shippings[0].status;
      }
    }

    // Calculate discount price of order
    let discountPrice = 0;
    if (order.order_details && order.order_details.length) {
      order.order_details = order.order_details.map((item) => {
        item['discount_program'] = '';
        if (item.sale_price) {
          item['discount_program'] = 'FlashSale';
          discountPrice += item.sale_price * item.number;
        } else if (item.promotion_price) {
          item['discount_program'] = 'Promotion Slider';
          discountPrice += item.promotion_price * item.number;
        } else if (item.combo_price && item.product_combo) {
          const translateData = processProductTranslateData(
            item.product_combo.translates,
          );
          item['discount_program'] = translateData['vi']['name'];
          discountPrice += item.combo_price * item.number;
        } else if (item.coupon_price) {
          item['discount_program'] = 'Coupon';
          discountPrice += item.coupon_price;
        } else if (item.charity_id && item.charity) {
          const translateData = processTranslateData(item.charity.translates);
          item['discount_program'] = translateData['vi']['name'];
        }

        return item;
      });
    }
    order['discount_price'] = discountPrice;

    return order;
  }
}
