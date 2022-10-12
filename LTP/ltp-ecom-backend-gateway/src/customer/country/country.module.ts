import { Module } from '@nestjs/common';
import { CountryService } from './country.service';
import { CountryController } from './country.controller';
import { MicroserviceModule } from '../microservice/microservice.module';

@Module({
  imports: [MicroserviceModule],
  controllers: [CountryController],
  providers: [CountryService],
})
export class CountryModule {}
