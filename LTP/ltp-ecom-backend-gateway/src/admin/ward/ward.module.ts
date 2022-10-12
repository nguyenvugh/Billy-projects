import { Module } from '@nestjs/common';
import { WardService } from './ward.service';
import { WardController } from './ward.controller';
import { MicroserviceModule } from '../microservice/microservice.module';

@Module({
  imports: [MicroserviceModule],
  controllers: [WardController],
  providers: [WardService],
})
export class WardModule {}
