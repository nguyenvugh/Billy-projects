import { EntityRepository, Repository, Not } from 'typeorm';
import { InventoryProduct } from '../schema/inventory-product.schema';

@EntityRepository(InventoryProduct)
export class InventoryProductRepository extends Repository<InventoryProduct> {}
