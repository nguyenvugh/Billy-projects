import { Module } from '@nestjs/common';
import { ShopService } from './shop.service';
import { ShopController } from './shop.controller';
import { MicroserviceModule } from '../microservice/microservice.module';

@Module({
  imports: [MicroserviceModule],
  controllers: [ShopController],
  providers: [ShopService],
})
export class ShopModule {}
