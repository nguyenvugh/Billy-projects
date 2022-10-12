import { Transform } from 'class-transformer';
import { CustomerSpecialProductEntity } from './customer-special-product.entity';

export class ListCustomerSpecialProductsEntity {
  @Transform((value) =>
    value.value.map((el) => new CustomerSpecialProductEntity(el)),
  )
  results: CustomerSpecialProductEntity[];

  total: number;

  max_page: number;

  constructor(partial: Partial<ListCustomerSpecialProductsEntity>) {
    Object.assign(this, partial);
  }
}
