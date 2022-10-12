import { Transform } from 'class-transformer';
import { CustomerAddressEntity } from './customer-address.entity';

export class ListCustomerAddressesEntity {
  @Transform((value) => value.value.map((el) => new CustomerAddressEntity(el)))
  results: CustomerAddressEntity[];

  constructor(partial: Partial<ListCustomerAddressesEntity>) {
    Object.assign(this, partial);
  }
}
