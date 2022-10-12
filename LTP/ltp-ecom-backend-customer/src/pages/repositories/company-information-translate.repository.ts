import { EntityRepository, Repository } from 'typeorm';
import { CompanyInformationTranslate } from '../schemas/company-information-translate.schema';

@EntityRepository(CompanyInformationTranslate)
export class CompanyInformationTranslateRepository extends Repository<CompanyInformationTranslate> { }
