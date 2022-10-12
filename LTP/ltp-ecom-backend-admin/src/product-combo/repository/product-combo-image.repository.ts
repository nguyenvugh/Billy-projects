import { EntityRepository, Repository } from 'typeorm';
import { ProductComboImage } from '../schema/product-combo-image.schema';

@EntityRepository(ProductComboImage)
export class ProductComboImageRepository extends Repository<ProductComboImage> {}
