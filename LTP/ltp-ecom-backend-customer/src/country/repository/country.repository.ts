import { EntityRepository, Repository, Not } from 'typeorm';
import { Country } from '../schema/country.schema';

@EntityRepository(Country)
export class CountryRepository extends Repository<Country> {}
