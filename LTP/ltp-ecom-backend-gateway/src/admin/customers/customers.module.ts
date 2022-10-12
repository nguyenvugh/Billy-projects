import { Module } from '@nestjs/common';
import { MicroserviceModule } from '../microservice/microservice.module';
import { CustomersController } from './customers.controller';
import { CustomersService } from './customers.service';

@Module({
  controllers: [CustomersController],
  providers: [CustomersService],
  imports: [MicroserviceModule],
})
export class CustomersModule { }
