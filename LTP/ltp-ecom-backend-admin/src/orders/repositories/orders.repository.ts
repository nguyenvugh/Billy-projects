import { EntityRepository, Repository } from 'typeorm';
import { Orders } from '../schemas/orders.schema';

@EntityRepository(Orders)
export class OrdersRepository extends Repository<Orders> { }
