import { EntityRepository, Repository, Not } from 'typeorm';
import { ProductTranslate } from '../schema/product-translate.schema';

@EntityRepository(ProductTranslate)
export class ProductTranslateRepository extends Repository<ProductTranslate> {}
