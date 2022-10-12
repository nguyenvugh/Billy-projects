import { Transform } from 'class-transformer';
import { FlashSaleEntity } from './flash-sale.entity';

export class FlashSaleHomePageEntity {
  @Transform((value) => new FlashSaleEntity(value.value))
  result: FlashSaleEntity;

  product_statuses: any[];

  constructor(partial: Partial<FlashSaleHomePageEntity>) {
    Object.assign(this, partial);
  }
}
