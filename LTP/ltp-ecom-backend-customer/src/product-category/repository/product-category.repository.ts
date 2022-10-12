import { EntityRepository, Repository, Not } from 'typeorm';
import { ProductCategory } from '../schema/product-category.schema';

@EntityRepository(ProductCategory)
export class ProductCategoryRepository extends Repository<ProductCategory> {}
