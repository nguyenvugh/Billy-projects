import { Module } from '@nestjs/common';
import { ProductReviewService } from './product-review.service';
import { ProductReviewController } from './product-review.controller';
import { MicroserviceModule } from '../microservice/microservice.module';

@Module({
  imports: [MicroserviceModule],
  controllers: [ProductReviewController],
  providers: [ProductReviewService],
})
export class ProductReviewModule {}
