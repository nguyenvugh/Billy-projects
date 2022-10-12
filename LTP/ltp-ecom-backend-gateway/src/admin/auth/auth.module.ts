import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MicroserviceModule } from '../microservice/microservice.module';
@Module({
  controllers: [AuthController],
  imports: [MicroserviceModule],
  providers: [AuthService],
})
export class AuthModule {}
