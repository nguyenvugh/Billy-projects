import { EntityRepository, Repository } from 'typeorm';
import { Office } from '../schema/office.schema';

@EntityRepository(Office)
export class OfficeRepository extends Repository<Office> {}
