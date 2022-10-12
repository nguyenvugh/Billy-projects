import {
  Connection,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcryptjs';
import { Customer } from '../schema/customer.schema';

@EventSubscriber()
export class CustomerSubscriber implements EntitySubscriberInterface<Customer> {
  constructor(connection: Connection, private configService: ConfigService) {
    connection.subscribers.push(this);
  }

  listenTo() {
    return Customer;
  }

  /**
   * Called before insertion.
   */
  async beforeInsert(event: InsertEvent<Customer>) {
    if (event.entity.password) {
      const salt: number = +this.configService.get('other.salt');
      event.entity.password = await bcrypt.hash(event.entity.password, salt);
    }
  }

  /**
   * Called before update.
   */
  async beforeUpdate(event: UpdateEvent<Customer>) {
    if (event.entity.password) {
      const salt: number = +this.configService.get('other.salt');
      event.entity.password = await bcrypt.hash(event.entity.password, salt);
    }
  }
}
