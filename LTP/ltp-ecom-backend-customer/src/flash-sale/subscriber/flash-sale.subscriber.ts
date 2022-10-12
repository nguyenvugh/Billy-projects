import {
  Connection,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';
import { convertUTCToTimezone } from '../../common/helpers/date-time.helper';
import { FlashSale } from '../schema/flash-sale.schema';

@EventSubscriber()
export class FlashSaleSubscriber
  implements EntitySubscriberInterface<FlashSale>
{
  constructor(connection: Connection) {
    connection.subscribers.push(this);
  }

  listenTo() {
    return FlashSale;
  }

  /**
   * Called after entity is loaded.
   */
  afterLoad(entity: FlashSale) {
    // TODO: check why need data MYSQL is timezone +7 but typeorm get data is timezone +0
    if (entity.start_date) {
      const dateTimeConverted = convertUTCToTimezone(entity.start_date);
      if (dateTimeConverted) {
        entity.start_date = dateTimeConverted;
      }
    }
    if (entity.end_date) {
      const dateTimeConverted = convertUTCToTimezone(entity.end_date);
      if (dateTimeConverted) {
        entity.end_date = dateTimeConverted;
      }
    }
  }
}
