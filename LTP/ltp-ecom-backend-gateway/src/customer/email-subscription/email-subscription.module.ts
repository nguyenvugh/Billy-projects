import { Module } from '@nestjs/common';
import { EmailSubscriptionService } from './email-subscription.service';
import { EmailSubscriptionController } from './email-subscription.controller';
import { MicroserviceModule } from '../microservice/microservice.module';

@Module({
  imports: [MicroserviceModule],
  controllers: [EmailSubscriptionController],
  providers: [EmailSubscriptionService],
})
export class EmailSubscriptionModule {}
