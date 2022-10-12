import { EntityRepository, Repository } from 'typeorm';
import { UserCompany } from '../entities/user-company.entity';

@EntityRepository(UserCompany)
export class UserCompanyRepository extends Repository<UserCompany> {}
