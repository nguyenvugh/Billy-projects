import { EntityRepository, Repository } from 'typeorm';
import { ProductCombo } from '../schema/product-combo.schema';

@EntityRepository(ProductCombo)
export class ProductComboRepository extends Repository<ProductCombo> {}
