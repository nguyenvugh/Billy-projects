import { Module } from '@nestjs/common';
import { DistrictService } from './district.service';
import { DistrictController } from './district.controller';
import { MicroserviceModule } from '../microservice/microservice.module';

@Module({
  imports: [MicroserviceModule],
  controllers: [DistrictController],
  providers: [DistrictService],
})
export class DistrictModule {}
