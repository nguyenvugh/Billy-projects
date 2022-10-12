import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShopService } from './shop.service';
import { ShopController } from './shop.controller';
import { ShopRepository } from './repository/shop.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ShopRepository])],
  controllers: [ShopController],
  providers: [ShopService],
})
export class ShopModule {}
