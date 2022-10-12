import { Module } from '@nestjs/common';
import { ProductComboService } from './product-combo.service';
import { ProductComboController } from './product-combo.controller';
import { MicroserviceModule } from '../microservice/microservice.module';

@Module({
  imports: [MicroserviceModule],
  controllers: [ProductComboController],
  providers: [ProductComboService],
})
export class ProductComboModule {}
