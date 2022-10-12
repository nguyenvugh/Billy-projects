import { EntityRepository, Repository, Not } from 'typeorm';
import { CustomerSpecialProductCombo } from '../schema/customer-special-product-combo.schema';

@EntityRepository(CustomerSpecialProductCombo)
export class CustomerSpecialProductComboRepository extends Repository<CustomerSpecialProductCombo> {}
