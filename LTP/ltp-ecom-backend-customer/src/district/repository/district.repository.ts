import { EntityRepository, Repository, Not } from 'typeorm';
import { District } from '../schema/district.schema';

@EntityRepository(District)
export class DistrictRepository extends Repository<District> {}
