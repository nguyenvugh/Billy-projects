import { EntityRepository, Repository, Not, AbstractRepository } from 'typeorm';
import { ProductSlugHistory } from '../schema/product-slug-history.schema';

@EntityRepository(ProductSlugHistory)
export class ProductSlugHistoryRepo extends Repository<ProductSlugHistory> {}
