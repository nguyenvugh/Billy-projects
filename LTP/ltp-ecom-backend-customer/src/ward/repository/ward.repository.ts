import { EntityRepository, Repository, Not } from 'typeorm';
import { Ward } from '../schema/ward.schema';

@EntityRepository(Ward)
export class WardRepository extends Repository<Ward> {}
