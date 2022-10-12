import { EntityRepository, Repository, Not } from 'typeorm';
import { CustomerAddress } from '../schema/customer-address.schema';

@EntityRepository(CustomerAddress)
export class CustomerAddressRepository extends Repository<CustomerAddress> {}
