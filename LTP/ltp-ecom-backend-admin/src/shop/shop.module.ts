import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { City } from 'src/city/schemas/city.schema';
import { District } from 'src/district/schemas/district.schema';
import { JwtCoreModule } from 'src/jwt-core/jwt-core.module';
import { Ward } from 'src/ward/schemas/ward.schema';
import { ShopRepository } from './repositories/shop.repository';
import { ShopController } from './shop.controller';
import { ShopService } from './shop.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ShopRepository]),
    TypeOrmModule.forFeature([City, District, Ward]),
    JwtCoreModule,
  ],
  controllers: [ShopController],
  providers: [ShopService],
})
export class ShopModule { }
