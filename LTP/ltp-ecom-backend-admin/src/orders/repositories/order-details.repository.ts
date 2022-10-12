import { EntityRepository, Repository } from 'typeorm';
import { OrderDetails } from '../schemas/order-details.schema';

@EntityRepository(OrderDetails)
export class OrderDetailsRepository extends Repository<OrderDetails> { }
