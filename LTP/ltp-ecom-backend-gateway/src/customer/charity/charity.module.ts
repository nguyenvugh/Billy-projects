import { Module } from '@nestjs/common';
import { MicroserviceModule } from '../microservice/microservice.module';
import { CharityController } from './charity.controller';
import { CharityService } from './charity.service';

@Module({
  imports: [MicroserviceModule],
  controllers: [CharityController],
  providers: [CharityService]
})
export class CharityModule { }
