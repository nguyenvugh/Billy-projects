import { Module } from '@nestjs/common';
import { MicroserviceModule } from '../microservice/microservice.module';
import { SliderController } from './slider.controller';
import { SliderService } from './slider.service';

@Module({
  controllers: [SliderController],
  providers: [SliderService],
  imports: [MicroserviceModule],
})
export class SliderModule { }
