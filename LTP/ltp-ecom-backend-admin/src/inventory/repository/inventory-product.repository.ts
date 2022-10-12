import { EntityRepository, Repository, Not, AbstractRepository } from 'typeorm';
import { InventoryProduct } from '../schemas/inventory-product.schema';

@EntityRepository(InventoryProduct)
export class InventoryProductRepo extends Repository<InventoryProduct> {}
