import { EntityRepository, Repository, Not, AbstractRepository } from 'typeorm';
import { Product } from '../schemas/product.schema';

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {}
