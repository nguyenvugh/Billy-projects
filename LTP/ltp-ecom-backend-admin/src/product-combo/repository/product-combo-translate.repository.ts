import { EntityRepository, Repository } from 'typeorm';
import { ProductComboTranslate } from '../schema/product-combo-translate.schema';

@EntityRepository(ProductComboTranslate)
export class ProductComboTranslateRepository extends Repository<ProductComboTranslate> {}
