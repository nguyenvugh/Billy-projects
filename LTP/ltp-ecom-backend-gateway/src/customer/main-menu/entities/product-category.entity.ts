import { Exclude, Transform } from 'class-transformer';
import { ApiHideProperty } from '@nestjs/swagger';

export class ProductCategoryEntity {
  id: number;

  name: string;

  parent: number;

  is_feature: number;

  count_products: number;

  @Transform((value) => value.value.map((el) => new ProductCategoryEntity(el)))
  childs: ProductCategoryEntity[];

  @Exclude()
  @ApiHideProperty()
  imageId: number;

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

  constructor(partial: Partial<ProductCategoryEntity>) {
    Object.assign(this, partial);
  }
}
