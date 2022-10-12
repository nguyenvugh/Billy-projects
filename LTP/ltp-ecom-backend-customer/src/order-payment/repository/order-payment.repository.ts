import { EntityRepository, Repository, Not } from 'typeorm';
import { OrderPayment } from '../schema/order-payment.schema';

@EntityRepository(OrderPayment)
export class OrderPaymentRepository extends Repository<OrderPayment> {}
