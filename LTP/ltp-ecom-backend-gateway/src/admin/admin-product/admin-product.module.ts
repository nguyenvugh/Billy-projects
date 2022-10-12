import { Module } from '@nestjs/common';
import { AdminProductService } from './admin-product.service';
import { AdminProductController } from './admin-product.controller';
import { AdminMicroserviceModule } from '../admin-microservice/admin-microservice.module';

@Module({
  imports: [AdminMicroserviceModule],
  controllers: [AdminProductController],
  providers: [AdminProductService],
})
export class AdminProductModule {}
