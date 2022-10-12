import { Module } from '@nestjs/common';
import { MicroserviceModule } from '../microservice/microservice.module';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';

@Module({
  controllers: [AdminController],
  providers: [AdminService],
  imports: [MicroserviceModule],
})
export class AdminModule { }
