import { EntityRepository, Repository } from 'typeorm';
import { FlashSale } from '../schema/flash-sale.schema';

@EntityRepository(FlashSale)
export class FlashSaleRepository extends Repository<FlashSale> {}
