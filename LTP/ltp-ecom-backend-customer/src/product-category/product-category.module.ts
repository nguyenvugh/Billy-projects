import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductCategoryService } from './product-category.service';
import { ProductCategoryController } from './product-category.controller';
import { ProductCategoryRepository } from './repository/product-category.repository';
import { ProductCategorySlugHistoryRepository } from './repository/product-category-slug-history.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProductCategoryRepository,
      ProductCategorySlugHistoryRepository,
    ]),
  ],
  controllers: [ProductCategoryController],
  providers: [ProductCategoryService],
})
export class ProductCategoryModule {}
