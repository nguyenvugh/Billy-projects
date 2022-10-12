import { EntityRepository, Repository, Not } from 'typeorm';
import { Product } from '../schema/product.schema';

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {}
