import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QueueSendEmailService } from './queue-send-email.service';
import { QueueSendEmailController } from './queue-send-email.controller';
import { QueueSendEmailRepository } from './repository/queue-send-email.repository';
import { QueueSendEmailSubscriber } from './subscriber/queue-send-email.subscriber';
import { AuthModule } from 'src/auth/auth.module';
import { JwtCoreModule } from '../jwt-core/jwt-core.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([QueueSendEmailRepository]),
    AuthModule,
    JwtCoreModule,
  ],
  controllers: [QueueSendEmailController],
  providers: [QueueSendEmailService, QueueSendEmailSubscriber],
})
export class QueueSendEmailModule {}
