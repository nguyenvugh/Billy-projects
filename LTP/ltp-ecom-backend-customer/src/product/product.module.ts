import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { ProductRepository } from './repository/product.repository';
import { CustomerReviewRepository } from '../customer-review/repository/customer-review.repository';
import { ProductCategoryTranslateRepository } from '../product-category-translate/repository/product-category-translate.repository';
import { ProductTranslateRepository } from '../product-translate/repository/product-translate.repository';
import { ProductSlugHistoryRepo } from './repository/product-slug-history.repository';
import { CustomerSpecialProductRepository } from '../customer-special-product/repository/customer-special-product.repository';
import { FlashSaleModule } from '../flash-sale/flash-sale.module';
import { PromotionModule } from '../promotion/promotion.module';
import { CharityModule } from '../charity/charity.module';
import { ProductSubscriber } from './subscriber/product.subscriber';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProductRepository,
      ProductTranslateRepository,
      CustomerReviewRepository,
      ProductCategoryTranslateRepository,
      CustomerSpecialProductRepository,
      ProductSlugHistoryRepo,
    ]),
    FlashSaleModule,
    PromotionModule,
    CharityModule,
  ],
  controllers: [ProductController],
  providers: [ProductService, ProductSubscriber],
})
export class ProductModule {}
