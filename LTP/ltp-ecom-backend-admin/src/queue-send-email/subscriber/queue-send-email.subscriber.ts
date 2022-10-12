import {
  Connection,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';
import { QueueSendEmail } from '../schema/queue-send-email.schema';

@EventSubscriber()
export class QueueSendEmailSubscriber
  implements EntitySubscriberInterface<QueueSendEmail>
{
  constructor(connection: Connection) {
    connection.subscribers.push(this);
  }

  listenTo() {
    return QueueSendEmail;
  }

  /**
   * Called after entity is loaded.
   */
  afterLoad(entity: QueueSendEmail) {
    if (entity.data) {
      try {
        entity.data = JSON.parse(entity.data);
      } catch (error) {
        entity.data = null;
      }
    }
  }

  /**
   * Called before insertion.
   */
  async beforeInsert(event: InsertEvent<QueueSendEmail>) {
    if (event.entity.data) {
      event.entity.data = JSON.stringify(event.entity.data);
    }
  }
}
