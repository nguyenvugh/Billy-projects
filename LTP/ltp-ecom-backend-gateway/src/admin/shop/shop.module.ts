import { Module } from '@nestjs/common';
import { MicroserviceModule } from '../microservice/microservice.module';
import { ShopController } from './shop.controller';
import { ShopService } from './shop.service';

@Module({
  controllers: [ShopController],
  providers: [ShopService],
  imports: [MicroserviceModule],
})
export class ShopModule { }
