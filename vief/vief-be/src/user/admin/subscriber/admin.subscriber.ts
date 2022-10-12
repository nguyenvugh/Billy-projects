import {
  Connection,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { PASSWORD_SALT_LENGTH } from '../../../common/constants/global.constant';
import { Admin } from '../entities/admin.entity';

@EventSubscriber()
export class AdminSubscriber implements EntitySubscriberInterface<Admin> {
  constructor(connection: Connection) {
    connection.subscribers.push(this);
  }

  listenTo() {
    return Admin;
  }

  /**
   * Called before post insertion.
   */
  async beforeInsert(event: InsertEvent<Admin>) {
    if (event.entity.password) {
      event.entity.password = await bcrypt.hash(
        event.entity.password,
        PASSWORD_SALT_LENGTH,
      );
    }
  }

  /**
   * Called before update.
   */
  async beforeUpdate(event: UpdateEvent<Admin>) {
    if (event.entity.password) {
      event.entity.password = await bcrypt.hash(
        event.entity.password,
        PASSWORD_SALT_LENGTH,
      );
    }
  }
}
