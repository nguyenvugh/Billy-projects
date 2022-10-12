import { EntityRepository, Repository } from 'typeorm';
import { FlashSale } from '../schemas/flash-sale.schema';

@EntityRepository(FlashSale)
export class FlashSaleRepository extends Repository<FlashSale> { }
