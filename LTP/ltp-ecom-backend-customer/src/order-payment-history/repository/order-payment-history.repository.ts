import { EntityRepository, Repository, Not } from 'typeorm';
import { OrderPaymentHistory } from '../schema/order-payment-history.schema';

@EntityRepository(OrderPaymentHistory)
export class OrderPaymentHistoryRepository extends Repository<OrderPaymentHistory> {}
