import { Module } from '@nestjs/common';
import { MicroserviceModule } from '../microservice/microservice.module';
import { EmailSubscriptionController } from './email-subscription.controller';
import { EmailSubscriptionService } from './email-subscription.service';

@Module({
  imports: [MicroserviceModule],
  controllers: [EmailSubscriptionController],
  providers: [EmailSubscriptionService],
})
export class EmailSubscriptionModule {}
