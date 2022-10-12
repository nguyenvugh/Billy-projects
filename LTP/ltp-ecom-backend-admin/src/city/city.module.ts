import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CityService } from './city.service';
import { CityController } from './city.controller';
import { CityRepository } from './repository/city.repository';
import { JwtCoreModule } from '../jwt-core/jwt-core.module';

@Module({
  imports: [TypeOrmModule.forFeature([CityRepository]), JwtCoreModule],
  controllers: [CityController],
  providers: [CityService],
})
export class CityModule {}
