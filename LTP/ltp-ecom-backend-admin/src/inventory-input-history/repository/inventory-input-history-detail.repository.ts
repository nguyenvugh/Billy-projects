import { EntityRepository, Repository, Not } from 'typeorm';
import { InventoryInputHistoryDetail } from '../schema/inventory-input-history-detail.schema';

@EntityRepository(InventoryInputHistoryDetail)
export class InventoryInputHistoryDetailRepository extends Repository<InventoryInputHistoryDetail> {}
