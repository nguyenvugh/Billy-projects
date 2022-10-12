import { EntityRepository, Repository, Not } from 'typeorm';
import { ProductCategoryTranslate } from '../schema/product-category-translate.schema';

@EntityRepository(ProductCategoryTranslate)
export class ProductCategoryTranslateRepository extends Repository<ProductCategoryTranslate> {}
