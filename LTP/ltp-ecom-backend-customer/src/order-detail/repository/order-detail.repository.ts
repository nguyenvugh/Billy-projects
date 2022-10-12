import { EntityRepository, Repository, Not } from 'typeorm';
import { OrderDetail } from '../schema/order-detail.schema';

@EntityRepository(OrderDetail)
export class OrderDetailRepository extends Repository<OrderDetail> {}
