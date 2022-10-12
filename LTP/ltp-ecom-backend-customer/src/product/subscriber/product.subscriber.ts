import {
  Connection,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';
import { Product } from '../schema/product.schema';
import { reCalculateNumberRemainProductInInventories } from '../../common/helpers/product.helper';

@EventSubscriber()
export class ProductSubscriber implements EntitySubscriberInterface<Product> {
  constructor(connection: Connection) {
    connection.subscribers.push(this);
  }

  listenTo() {
    return Product;
  }

  /**
   * Called after entity is loaded.
   */
  afterLoad(entity: Product) {
    if (entity.inventory_products && entity.inventory_products.length) {
      entity.inventory_products = reCalculateNumberRemainProductInInventories(
        entity.inventory_products,
      );
    }
  }
}
