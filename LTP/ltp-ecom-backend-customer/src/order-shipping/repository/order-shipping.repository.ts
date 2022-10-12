import { EntityRepository, Repository, Not } from 'typeorm';
import { OrderShipping } from '../schema/order-shipping.schema';

@EntityRepository(OrderShipping)
export class OrderShippingRepository extends Repository<OrderShipping> {}
