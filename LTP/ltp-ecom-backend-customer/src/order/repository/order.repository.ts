import { EntityRepository, Repository, Not } from 'typeorm';
import { Order } from '../schema/order.schema';

@EntityRepository(Order)
export class OrderRepository extends Repository<Order> {}
