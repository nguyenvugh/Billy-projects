import { Transform } from 'class-transformer';
import { CustomerSpecialProductComboEntity } from './customer-special-product-combo.entity';

export class ListCustomerSpecialProductCombosEntity {
  @Transform((value) =>
    value.value.map((el) => new CustomerSpecialProductComboEntity(el)),
  )
  results: CustomerSpecialProductComboEntity[];

  total: number;

  max_page: number;

  constructor(partial: Partial<ListCustomerSpecialProductCombosEntity>) {
    Object.assign(this, partial);
  }
}
