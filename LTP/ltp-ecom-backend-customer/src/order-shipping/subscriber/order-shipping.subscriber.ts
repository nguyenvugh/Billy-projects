import {
  Connection,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
  MoreThan,
} from 'typeorm';
import {
  OrderShippingStatusConst,
  OrderShippingStatusFilterConst,
} from '../../common/constants/order-shipping.constant';
import { OrderShippingDriverConst } from '../driver/base.driver';
import { OrderShipping } from '../schema/order-shipping.schema';
import { OrderShippingRepository } from '../repository/order-shipping.repository';
import { Product } from '../../product/schema/product.schema';
import { ProductRepository } from '../../product/repository/product.repository';

@EventSubscriber()
export class OrderShippingSubscriber
  implements EntitySubscriberInterface<OrderShipping>
{
  constructor(
    connection: Connection,
    private orderShippingRepo: OrderShippingRepository,
    private productRepo: ProductRepository,
  ) {
    connection.subscribers.push(this);
  }

  listenTo() {
    return OrderShipping;
  }

  /**
   * Called after entity update.
   */
  async afterUpdate(event: UpdateEvent<OrderShipping>) {
    // Get new data update from event entity
    const { status } = event.entity;
    // Get other data that not belong to data update
    const orderShippingUpdated = await this.orderShippingRepo.findOne({
      where: {
        id: event.entity.id,
      },
      relations: ['detail', 'detail.order_detail'],
    });
    if (!orderShippingUpdated) {
      return;
    }
    const { driver } = orderShippingUpdated;
    // Decrease num sold of product when cancel order shipping
    if (
      (OrderShippingDriverConst.GHTK == driver &&
        OrderShippingStatusConst.CANCELLED == status) ||
      // Using Number here to convert two different types (OrderShippingStatusConst and OrderShippingStatusFilterConst) to one type
      (OrderShippingDriverConst.LTP == driver &&
        Number(OrderShippingStatusFilterConst.CANCELLED) == Number(status))
    ) {
      const orderShippingDetails = orderShippingUpdated.detail;
      if (orderShippingDetails && orderShippingDetails.length) {
        const promiseUpdateProducts: any[] = [];
        orderShippingDetails.forEach((orderShippingDetail) => {
          promiseUpdateProducts.push(
            this.productRepo.manager
              .createQueryBuilder()
              .update(Product)
              .where({
                id: orderShippingDetail.order_detail.productId,
                num_sold: MoreThan(0),
              })
              .set({
                num_sold: () =>
                  `num_sold - ${orderShippingDetail.order_detail.number}`,
              })
              .execute(),
          );
        });
        await Promise.all(promiseUpdateProducts);
      }
    }
  }
}
