import { Module } from '@nestjs/common';
import { MicroserviceModule } from '../microservice/microservice.module';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [MicroserviceModule],
})
export class UsersModule { }
