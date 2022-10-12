import { EntityRepository, Repository, Not, AbstractRepository } from 'typeorm';
import { ProductCategorySlugHistory } from '../schema/product-category-slug-history.schema';

@EntityRepository(ProductCategorySlugHistory)
export class ProductCategorySlugHistoryRepository extends Repository<ProductCategorySlugHistory> {}
