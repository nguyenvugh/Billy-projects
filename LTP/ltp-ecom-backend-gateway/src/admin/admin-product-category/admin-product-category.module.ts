import { Module } from '@nestjs/common';
import { AdminProductCategoryService } from './admin-product-category.service';
import { AdminProductCategoryController } from './admin-product-category.controller';
import { AdminMicroserviceModule } from '../admin-microservice/admin-microservice.module';

@Module({
  imports: [AdminMicroserviceModule],
  controllers: [AdminProductCategoryController],
  providers: [AdminProductCategoryService],
})
export class AdminProductCategoryModule {}
