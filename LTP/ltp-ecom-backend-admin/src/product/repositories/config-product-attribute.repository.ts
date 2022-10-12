import { EntityRepository, Repository, Not, AbstractRepository } from 'typeorm';
import { ConfigProductAttribute } from '../schemas/config-product-attribute.schema';

@EntityRepository(ConfigProductAttribute)
export class ConfigProductAttributeRepo extends Repository<ConfigProductAttribute> {}
