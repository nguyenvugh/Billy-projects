import { EntityRepository, Repository } from 'typeorm';
import { Customers } from '../schemas/customers.schema';

@EntityRepository(Customers)
export class CustomersRepository extends Repository<Customers> { }
