import { EntityRepository, Repository, Not } from 'typeorm';
import { City } from '../schema/city.schema';

@EntityRepository(City)
export class CityRepository extends Repository<City> {}
