import { Exclude, Transform } from 'class-transformer';
import { ApiHideProperty } from '@nestjs/swagger';
import { ProductImageEntity } from './product-image.entity';
import { ProductCategoryEntity } from '../../product-category/entities/product-category.entity';
import { FlashSaleProductOnlyEntity } from '../../flash-sale/entities/flash-sale-product-only.entity';
import { ProductPromotionOnlyEntity } from '../../promotion/entities/product-promotion-only.entity';

export class ProductEntity {
  id: number;

  code: string;

  name: string;

  is_feature: number;

  status: number;

  status_display: number;

  price: number;

  avg_rating: number;

  categoryId: number;

  @Transform((value) => new ProductCategoryEntity(value.value))
  category: ProductCategoryEntity;

  @Transform((value) => value.value.map((el) => new ProductImageEntity(el)))
  images: ProductImageEntity[];

  @Transform((value) => new FlashSaleProductOnlyEntity(value.value))
  flash_sale: FlashSaleProductOnlyEntity;

  @Transform((value) => new ProductPromotionOnlyEntity(value.value))
  promotion: ProductPromotionOnlyEntity;

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

  constructor(partial: Partial<ProductEntity>) {
    Object.assign(this, partial);
  }
}
