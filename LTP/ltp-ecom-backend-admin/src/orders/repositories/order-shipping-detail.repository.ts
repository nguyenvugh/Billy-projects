import { EntityRepository, Repository } from 'typeorm';
import { OrderShippingDetail } from '../schemas/order-shipping-detail.schema';

@EntityRepository(OrderShippingDetail)
export class OrderShippingDetailRepository extends Repository<OrderShippingDetail> {}
