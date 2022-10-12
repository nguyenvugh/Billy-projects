import { EntityRepository, Repository, Not, AbstractRepository } from 'typeorm';
import { Inventory } from '../schemas/inventory.schema';

@EntityRepository(Inventory)
export class InventoryRepo extends Repository<Inventory> {}
