import { EntityRepository, Repository } from 'typeorm';
import { Charity } from '../schemas/charity.schema';

@EntityRepository(Charity)
export class CharityRepository extends Repository<Charity> { }
