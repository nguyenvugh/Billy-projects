import { Transform } from 'class-transformer';
import { PromotionEntity } from './promotion.entity';

export class ListPromotionsEntity {
  @Transform((value) => value.value.map((el) => new PromotionEntity(el)))
  results: PromotionEntity[];

  constructor(partial: Partial<ListPromotionsEntity>) {
    Object.assign(this, partial);
  }
}
