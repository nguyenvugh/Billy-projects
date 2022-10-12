import { EntityRepository, Repository, Not } from 'typeorm';
import { OrderHistory } from '../schema/order-history.schema';

@EntityRepository(OrderHistory)
export class OrderHistoryRepository extends Repository<OrderHistory> {}
