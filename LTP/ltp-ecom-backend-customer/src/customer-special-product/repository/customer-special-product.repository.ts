import { EntityRepository, Repository, Not } from 'typeorm';
import { CustomerSpecialProduct } from '../schema/customer-special-product.schema';

@EntityRepository(CustomerSpecialProduct)
export class CustomerSpecialProductRepository extends Repository<CustomerSpecialProduct> {}
