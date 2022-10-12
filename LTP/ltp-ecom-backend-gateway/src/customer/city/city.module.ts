import { Module } from '@nestjs/common';
import { CityService } from './city.service';
import { CityController } from './city.controller';
import { MicroserviceModule } from '../microservice/microservice.module';

@Module({
  imports: [MicroserviceModule],
  controllers: [CityController],
  providers: [CityService],
})
export class CityModule {}
