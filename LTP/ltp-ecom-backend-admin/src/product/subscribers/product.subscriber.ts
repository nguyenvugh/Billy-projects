import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { ProductCategoryRepository } from 'src/product-category/repositories/product-category.repository';
import {
  Connection,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  RemoveEvent,
  UpdateEvent,
} from 'typeorm';
import { TransactionCommitEvent } from 'typeorm/subscriber/event/TransactionCommitEvent';
import { TransactionRollbackEvent } from 'typeorm/subscriber/event/TransactionRollbackEvent';
import { TransactionStartEvent } from 'typeorm/subscriber/event/TransactionStartEvent';
import { ProductService } from '../product.service';
import { Product } from '../schemas/product.schema';

@Injectable()
@EventSubscriber()
export class ProductSubscriber implements EntitySubscriberInterface<Product> {
  constructor(@InjectConnection() readonly connection: Connection) {
    connection.subscribers.push(this);
  }

  /**
   * Indicates that this subscriber only listen to Post events.
   */
  listenTo() {
    return Product;
  }

  /**
   * Called after entity is loaded.
   */
  // afterLoad(entity: any) {
  //   console.log(`AFTER ENTITY LOADED: `);
  // }

  /**
   * Called before post insertion.
   */
  beforeInsert(event: InsertEvent<any>) {
    console.log(`BEFORE POST INSERTED: `);
  }

  /**
   * Called after entity insertion.
   */
  async afterInsert(event: InsertEvent<Product>) {
    // const productEntity = event.entity;
    // const productCateRepo = await event.manager.getCustomRepository(
    //   ProductCategoryRepository,
    // );
    // const category = await productCateRepo.findOne(productEntity.category);
    // await productCateRepo.update(category.id, {
    //   count_products: category.count_products + 1,
    // });
  }

  /**
   * Called before entity update.
   */
  beforeUpdate(event: UpdateEvent<any>) {
    console.log(`BEFORE ENTITY UPDATED: `);
  }

  /**
   * Called after entity update.
   */
  afterUpdate(event: UpdateEvent<any>) {
    console.log(`AFTER ENTITY UPDATED: `);
  }

  /**
   * Called before entity removal.
   */
  beforeRemove(event: RemoveEvent<any>) {
    console.log(`BEFORE ENTITY WITH ID ${event.entityId} REMOVED: `);
  }

  /**
   * Called after entity removal.
   */
  async afterRemove(event: RemoveEvent<Product>) {
    // console.log(`AFTER ENTITY WITH ID ${event.entity} REMOVED: `);
    // const productEntity = event.entity;
    // const productCateRepo = await event.manager.getCustomRepository(
    //   ProductCategoryRepository,
    // );
    // const category = await productCateRepo.findOne(productEntity.category);
    // await productCateRepo.update(category.id, {
    //   count_products: category.count_products - 1,
    // });
  }

  /**
   * Called before transaction start.
   */
  // beforeTransactionStart(event: TransactionStartEvent) {
  //   console.log(`BEFORE TRANSACTION STARTED: `);
  // }

  // /**
  //  * Called after transaction start.
  //  */
  // afterTransactionStart(event: TransactionStartEvent) {
  //   console.log(`AFTER TRANSACTION STARTED: `);
  // }

  // /**
  //  * Called before transaction commit.
  //  */
  // beforeTransactionCommit(event: TransactionCommitEvent) {
  //   console.log(`BEFORE TRANSACTION COMMITTED: `);
  // }

  // /**
  //  * Called after transaction commit.
  //  */
  // afterTransactionCommit(event: TransactionCommitEvent) {
  //   console.log(`AFTER TRANSACTION COMMITTED: `);
  // }

  // /**
  //  * Called before transaction rollback.
  //  */
  // beforeTransactionRollback(event: TransactionRollbackEvent) {
  //   console.log(`BEFORE TRANSACTION ROLLBACK: `);
  // }

  // /**
  //  * Called after transaction rollback.
  //  */
  // afterTransactionRollback(event: TransactionRollbackEvent) {
  //   console.log(`AFTER TRANSACTION ROLLBACK: `);
  // }
}
