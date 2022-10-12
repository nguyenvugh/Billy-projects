import { EntityRepository, Repository } from 'typeorm';
import { CompanyInformation } from '../schemas/company-information.schema';

@EntityRepository(CompanyInformation)
export class CompanyInformationRepository extends Repository<CompanyInformation> { }
