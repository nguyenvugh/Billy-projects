import { EntityRepository, Repository, Not } from 'typeorm';
import { CustomerConnectSocial } from '../schema/customer-connect-social.schema';

@EntityRepository(CustomerConnectSocial)
export class CustomerConnectSocialRepository extends Repository<CustomerConnectSocial> {}
