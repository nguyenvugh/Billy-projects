import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { QueueSendEmailService } from './queue-send-email.service';
import { QueueSendEmailController } from './queue-send-email.controller';
import { MicroserviceModule } from '../microservice/microservice.module';

@Module({
  imports: [MicroserviceModule, ConfigModule],
  controllers: [QueueSendEmailController],
  providers: [QueueSendEmailService],
  exports: [QueueSendEmailService],
})
export class QueueSendEmailModule {}
