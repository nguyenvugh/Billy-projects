import { EntityRepository, Repository } from 'typeorm';
import { CustomersAddresses } from '../schemas/customers-addresses.schema';

@EntityRepository(CustomersAddresses)
export class CustomersAddressesRepository extends Repository<CustomersAddresses> { }
