import { EntityRepository, Repository } from 'typeorm';
import { FlashSaleProduct } from '../schemas/flash-sale-product.schema';

@EntityRepository(FlashSaleProduct)
export class FlashSaleProductRepository extends Repository<FlashSaleProduct> { }
