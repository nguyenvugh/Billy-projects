import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CountryService } from './country.service';
import { CountryController } from './country.controller';
import { CountryRepository } from './repository/country.repository';
import { JwtCoreModule } from '../jwt-core/jwt-core.module';

@Module({
  imports: [TypeOrmModule.forFeature([CountryRepository]), JwtCoreModule],
  controllers: [CountryController],
  providers: [CountryService],
})
export class CountryModule {}
