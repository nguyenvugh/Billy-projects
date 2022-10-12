import { EntityRepository, Repository } from 'typeorm';
import { Charity } from '../schema/charity.schema';

@EntityRepository(Charity)
export class CharityRepository extends Repository<Charity> { }
