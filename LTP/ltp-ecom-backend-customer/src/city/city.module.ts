import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CityService } from './city.service';
import { CityController } from './city.controller';
import { CityRepository } from './repository/city.repository';
import { MapInventoryCityToCustomerCityRepository } from './repository/map_inventory_city_to_customer_city.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CityRepository,
      MapInventoryCityToCustomerCityRepository,
    ]),
  ],
  controllers: [CityController],
  providers: [CityService],
})
export class CityModule {}
