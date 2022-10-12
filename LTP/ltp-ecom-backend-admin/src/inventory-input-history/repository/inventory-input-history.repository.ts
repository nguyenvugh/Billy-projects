import { EntityRepository, Repository, Not } from 'typeorm';
import { InventoryInputHistory } from '../schema/inventory-input-history.schema';

@EntityRepository(InventoryInputHistory)
export class InventoryInputHistoryRepository extends Repository<InventoryInputHistory> {}
