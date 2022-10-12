import { Transform } from 'class-transformer';
import { ShopEntity } from './shop.entity';

export class ListShopsEntity {
  @Transform((value) => value.value.map((el) => new ShopEntity(el)))
  results: ShopEntity[];

  constructor(partial: Partial<ListShopsEntity>) {
    Object.assign(this, partial);
  }
}
