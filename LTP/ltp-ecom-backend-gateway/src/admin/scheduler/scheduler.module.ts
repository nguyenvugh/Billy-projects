import { Module } from '@nestjs/common';
import { SchedulerService } from './scheduler.service';
import { SchedulerController } from './scheduler.controller';
import { SendNewsEmailSchedulerDriver } from './driver/send_news_email.driver';
import { AdminMicroserviceModule } from '../admin-microservice/admin-microservice.module';
import { MailModule } from '../../mail/mail.module';

@Module({
  imports: [AdminMicroserviceModule, MailModule],
  controllers: [SchedulerController],
  providers: [SchedulerService, SendNewsEmailSchedulerDriver],
})
export class SchedulerModule {}
