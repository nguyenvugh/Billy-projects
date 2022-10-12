import { EntityRepository, Repository, Not } from 'typeorm';
import { Country } from '../schemas/country.schema';

@EntityRepository(Country)
export class CountryRepository extends Repository<Country> {}
