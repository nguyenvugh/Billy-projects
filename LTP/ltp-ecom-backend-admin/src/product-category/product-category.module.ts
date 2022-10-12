import { Module } from '@nestjs/common';
import { ProductCategoryController } from './product-category.controller';
import { MediaUploadModule } from 'src/media-upload/media-upload.module';
import { ProductCategoryService } from './product-category.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductCategoryRepository } from './repositories/product-category.repository';
import { ProductCategoryTranslateRepository } from './repositories/product-category-translate.repository';
import { ProductCategorySlugHistoryRepository } from './repositories/product-category-slug-history.repository';
import { JwtCoreModule } from 'src/jwt-core/jwt-core.module';
import { SlugService } from '../common/services/slug.service';

@Module({
  imports: [
    MediaUploadModule,
    JwtCoreModule,
    TypeOrmModule.forFeature([
      ProductCategoryRepository,
      ProductCategoryTranslateRepository,
      ProductCategorySlugHistoryRepository,
    ]),
  ],
  controllers: [ProductCategoryController],
  providers: [ProductCategoryService, SlugService],
  exports: [ProductCategoryService, TypeOrmModule],
})
export class ProductCategoryModule {}
