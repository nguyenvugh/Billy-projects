import { EntityRepository, Repository, Not } from 'typeorm';
import { OrderShippingHistory } from '../schema/order-shipping-history.schema';

@EntityRepository(OrderShippingHistory)
export class OrderShippingHistoryRepository extends Repository<OrderShippingHistory> {}
