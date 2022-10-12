import { EntityRepository, Repository } from 'typeorm';
import { FlashSaleProduct } from '../schema/flash-sale-product.schema';

@EntityRepository(FlashSaleProduct)
export class FlashSaleProductRepository extends Repository<FlashSaleProduct> {}
