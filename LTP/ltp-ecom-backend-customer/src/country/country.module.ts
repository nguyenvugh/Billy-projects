import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CountryService } from './country.service';
import { CountryController } from './country.controller';
import { CountryRepository } from './repository/country.repository';

@Module({
  imports: [TypeOrmModule.forFeature([CountryRepository])],
  controllers: [CountryController],
  providers: [CountryService],
})
export class CountryModule {}
