import {
  Connection,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';
import { convertUTCToTimezone } from '../../common/helpers/date-time.helper';
import { OrderShippingHistory } from '../schema/order-shipping-history.schema';

@EventSubscriber()
export class OrderShippingHistorySubscriber
  implements EntitySubscriberInterface<OrderShippingHistory>
{
  constructor(connection: Connection) {
    connection.subscribers.push(this);
  }

  listenTo() {
    return OrderShippingHistory;
  }

  /**
   * Called after entity is loaded.
   */
  afterLoad(entity: OrderShippingHistory) {
    // TODO: check why need data MYSQL is timezone +7 but typeorm get data is timezone +0
    if (entity.created_at) {
      const dateTimeConverted = convertUTCToTimezone(entity.created_at);
      if (dateTimeConverted) {
        entity.created_at = dateTimeConverted;
      }
    }
    if (entity.log) {
      entity.log = JSON.parse(entity.log);
    }
  }
}
