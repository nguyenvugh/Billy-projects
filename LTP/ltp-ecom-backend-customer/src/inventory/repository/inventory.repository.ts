import { EntityRepository, Repository, Not } from 'typeorm';
import { Inventory } from '../schema/inventory.schema';

@EntityRepository(Inventory)
export class InventoryRepository extends Repository<Inventory> {}
