import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DistrictService } from './district.service';
import { DistrictController } from './district.controller';
import { DistrictRepository } from '../district/repository/district.repository';
import { JwtCoreModule } from '../jwt-core/jwt-core.module';

@Module({
  imports: [TypeOrmModule.forFeature([DistrictRepository]), JwtCoreModule],
  controllers: [DistrictController],
  providers: [DistrictService],
})
export class DistrictModule {}
