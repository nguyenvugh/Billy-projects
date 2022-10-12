import { EntityRepository, Repository, Not, AbstractRepository } from 'typeorm';
import { CreateProductCategoryTransDto } from '../dto/create-product-category.dto';
import { ProductCategorySlugHistory } from '../schemas/product-category-slug-history.schema';

@EntityRepository(ProductCategorySlugHistory)
export class ProductCategorySlugHistoryRepository extends Repository<ProductCategorySlugHistory> {}
