import { Exclude, Transform } from 'class-transformer';
import { ApiHideProperty } from '@nestjs/swagger';
import { CustomerOrderEntity } from './customer-order.entity';
import { ProductEntity } from '../../product/entities/product.entity';

export class CustomerOrderShippingTrackingEntity {
  @Transform((value) => new CustomerOrderEntity(value.value))
  order: CustomerOrderEntity;

  @Transform((value) => value.value.map((el) => new ProductEntity(el)))
  products: ProductEntity[];

  @Exclude()
  @ApiHideProperty()
  id: number;

  @Exclude()
  @ApiHideProperty()
  shipping_code_request: string;

  @Exclude()
  @ApiHideProperty()
  shipping_code_response: string;

  @Exclude()
  @ApiHideProperty()
  histories: any;

  @Exclude()
  @ApiHideProperty()
  detail: any;

  @Exclude()
  @ApiHideProperty()
  created_at: Date;

  @Exclude()
  @ApiHideProperty()
  updated_at: Date;

  @Exclude()
  @ApiHideProperty()
  deleted_at: Date;

  @Exclude()
  @ApiHideProperty()
  deleted: number;

  @Exclude()
  @ApiHideProperty()
  deleted_by: number;

  constructor(partial: Partial<CustomerOrderShippingTrackingEntity>) {
    Object.assign(this, partial);
  }
}
