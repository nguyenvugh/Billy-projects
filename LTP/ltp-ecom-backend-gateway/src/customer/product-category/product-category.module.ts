import { Module } from '@nestjs/common';
import { ProductCategoryService } from './product-category.service';
import { ProductCategoryController } from './product-category.controller';
import { MicroserviceModule } from '../microservice/microservice.module';

@Module({
  imports: [MicroserviceModule],
  controllers: [ProductCategoryController],
  providers: [ProductCategoryService],
})
export class ProductCategoryModule {}
