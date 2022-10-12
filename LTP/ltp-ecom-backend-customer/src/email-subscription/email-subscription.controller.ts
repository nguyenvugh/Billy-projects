import { Body, Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CreateEmailSubscriptionDto } from './dto/create-email-subscription.dto';
import { EmailSubscriptionService } from './email-subscription.service';

@Controller('email-subscription')
export class EmailSubscriptionController {
  constructor(
    private readonly emailSubscriptionService: EmailSubscriptionService,
  ) {}

  @MessagePattern('customer-email-subscription-create')
  create(@Body() createEmailSubscriptionDto: CreateEmailSubscriptionDto) {
    return this.emailSubscriptionService.create(createEmailSubscriptionDto);
  }
}
