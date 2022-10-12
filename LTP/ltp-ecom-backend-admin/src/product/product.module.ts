import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductRepository } from './repositories/product.repository';
import { ConfigProductAttributeRepo } from './repositories/config-product-attribute.repository';
import { ProductAttributeRepo } from './repositories/product-attribute.repository';
import { ProductAttributeTranslateRepo } from './repositories/product-attribute-translate.repository';
import { ProductCategoryModule } from 'src/product-category/product-category.module';
import { MediaUploadModule } from 'src/media-upload/media-upload.module';
import { ProductTranslateRepo } from './repositories/product-translate.repository';
import { ProductSlugHistoryRepo } from './repositories/product-slug-history.repository';
import { ProductImageRepo } from './repositories/product-image.repository';
import { ProductSubscriber } from './subscribers/product.subscriber';
import { InventoryModule } from 'src/inventory/inventory.module';
import { JwtCoreModule } from 'src/jwt-core/jwt-core.module';
import { SlugService } from '../common/services/slug.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProductRepository,
      ConfigProductAttributeRepo,
      ProductAttributeRepo,
      ProductAttributeTranslateRepo,
      ProductTranslateRepo,
      ProductSlugHistoryRepo,
      ProductImageRepo,
    ]),
    ProductCategoryModule,
    MediaUploadModule,
    InventoryModule,
    JwtCoreModule,
  ],
  controllers: [ProductController],
  providers: [ProductService, ProductSubscriber, SlugService],
})
export class ProductModule {}
