import { EntityRepository, Repository, Not } from 'typeorm';
import { District } from '../schemas/district.schema';

@EntityRepository(District)
export class DistrictRepository extends Repository<District> {}
