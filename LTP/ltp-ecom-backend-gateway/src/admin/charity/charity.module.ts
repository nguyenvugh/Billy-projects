import { Module } from '@nestjs/common';
import { MicroserviceModule } from '../microservice/microservice.module';
import { CharityController } from './charity.controller';
import { CharityService } from './charity.service';

@Module({
  controllers: [CharityController],
  providers: [CharityService],
  imports: [MicroserviceModule],
})
export class CharityModule { }
