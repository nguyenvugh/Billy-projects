import { EntityRepository, Repository, Not } from 'typeorm';
import { MapInventoryCityToCustomerCity } from '../schema/map_inventory_city_to_customer_city.schema';

@EntityRepository(MapInventoryCityToCustomerCity)
export class MapInventoryCityToCustomerCityRepository extends Repository<MapInventoryCityToCustomerCity> {}
