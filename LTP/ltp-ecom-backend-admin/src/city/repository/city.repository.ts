import { EntityRepository, Repository, Not } from 'typeorm';
import { City } from '../schemas/city.schema';

@EntityRepository(City)
export class CityRepository extends Repository<City> {}
