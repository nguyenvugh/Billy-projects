import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { MicroserviceModule } from '../microservice/microservice.module';
import { MailModule } from '../../mail/mail.module';

@Module({
  imports: [MicroserviceModule, MailModule, ConfigModule],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
