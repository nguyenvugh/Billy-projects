import { EntityRepository, Repository } from 'typeorm';
import { ProductComboDetail } from '../schema/product-combo-detail.schema';

@EntityRepository(ProductComboDetail)
export class ProductComboDetailRepository extends Repository<ProductComboDetail> {}
