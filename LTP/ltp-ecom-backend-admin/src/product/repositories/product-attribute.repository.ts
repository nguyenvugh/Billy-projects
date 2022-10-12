import { EntityRepository, Repository, Not, AbstractRepository } from 'typeorm';
import { ProductAttribute } from '../schemas/product-attribute.schema';
import { Product } from '../schemas/product.schema';

@EntityRepository(ProductAttribute)
export class ProductAttributeRepo extends Repository<ProductAttribute> {}
