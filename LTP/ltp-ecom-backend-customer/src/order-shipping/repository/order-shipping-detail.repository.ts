import { EntityRepository, Repository, Not } from 'typeorm';
import { OrderShippingDetail } from '../schema/order-shipping-detail.schema';

@EntityRepository(OrderShippingDetail)
export class OrderShippingDetailRepository extends Repository<OrderShippingDetail> {}
