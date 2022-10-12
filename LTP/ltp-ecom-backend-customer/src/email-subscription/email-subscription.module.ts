import { Module } from '@nestjs/common';
import { EmailSubscriptionService } from './email-subscription.service';
import { EmailSubscriptionController } from './email-subscription.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailSubscription } from './schema/email-subscription.schema';

@Module({
  imports: [TypeOrmModule.forFeature([EmailSubscription])],
  controllers: [EmailSubscriptionController],
  providers: [EmailSubscriptionService],
})
export class EmailSubscriptionModule {}
