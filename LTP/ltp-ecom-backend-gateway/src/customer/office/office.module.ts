import { Module } from '@nestjs/common';
import { OfficeService } from './office.service';
import { OfficeController } from './office.controller';
import { MicroserviceModule } from '../microservice/microservice.module';

@Module({
  imports: [MicroserviceModule],
  controllers: [OfficeController],
  providers: [OfficeService],
})
export class OfficeModule {}
