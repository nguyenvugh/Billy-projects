import { Exclude, Transform } from 'class-transformer';
import { ApiHideProperty } from '@nestjs/swagger';
import { ProductEntity } from '../../product/entities/product.entity';
import { InventoryEntity } from '../../inventory/entities/inventory.entity';

export class CustomerOrderDetailEntity {
  @Transform((value) => new ProductEntity(value.value))
  product: ProductEntity;

  @Transform((value) => new InventoryEntity(value.value))
  inventory: InventoryEntity;

  @Exclude()
  @ApiHideProperty()
  id: number;

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

  constructor(partial: Partial<CustomerOrderDetailEntity>) {
    Object.assign(this, partial);
  }
}
