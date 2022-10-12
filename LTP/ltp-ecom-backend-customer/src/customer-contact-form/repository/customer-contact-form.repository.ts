import { EntityRepository, Repository, Not } from 'typeorm';
import { CustomerContactForm } from '../schema/customer-contact-form.schema';

@EntityRepository(CustomerContactForm)
export class CustomerContactFormRepository extends Repository<CustomerContactForm> {}
