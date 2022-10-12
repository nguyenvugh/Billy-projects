import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductCategoryTranslateService } from './product-category-translate.service';
import { ProductCategoryTranslateController } from './product-category-translate.controller';
import { ProductCategoryTranslateRepository } from './repository/product-category-translate.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ProductCategoryTranslateRepository])],
  controllers: [ProductCategoryTranslateController],
  providers: [ProductCategoryTranslateService],
})
export class ProductCategoryTranslateModule {}
