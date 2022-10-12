import { EntityRepository, Repository } from 'typeorm';
import { OrderShippings } from '../schemas/order-shippings.schema';

@EntityRepository(OrderShippings)
export class OrderShippingsRepository extends Repository<OrderShippings> { }
