import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DistrictService } from './district.service';
import { DistrictController } from './district.controller';
import { DistrictRepository } from '../district/repository/district.repository';

@Module({
  imports: [TypeOrmModule.forFeature([DistrictRepository])],
  controllers: [DistrictController],
  providers: [DistrictService],
})
export class DistrictModule {}
