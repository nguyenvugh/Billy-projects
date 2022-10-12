import { Module } from '@nestjs/common';
import { ProductReviewService } from './product-review.service';
import { ProductReviewController } from './product-review.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductReview } from './schema/product-review.schema';
import { AuthModule } from '../auth/auth.module';
import { JwtCoreModule } from '../jwt-core/jwt-core.module';
import { ProductRepository } from '../product/repositories/product.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductReview, ProductRepository]),
    AuthModule,
    JwtCoreModule,
  ],
  controllers: [ProductReviewController],
  providers: [ProductReviewService],
})
export class ProductReviewModule {}
