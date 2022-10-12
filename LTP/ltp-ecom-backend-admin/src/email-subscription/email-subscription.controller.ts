import { Body, Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { DeleteMultiEmailSubscriptionDto } from './dto/delete-multi-email-sub.dto';
import { FindEmailSub } from './dto/find-email-subscription.dto';
import { EmailSubscriptionService } from './email-subscription.service';

@Controller('email-subscription')
export class EmailSubscriptionController {
  constructor(
    private readonly emailSubscriptionService: EmailSubscriptionService,
  ) {}

  @MessagePattern('admin-email-subscription-find')
  findAll(@Body() body: FindEmailSub) {
    return this.emailSubscriptionService.findAll(body);
  }

  @MessagePattern('admin-email-subscription-find-all-without-paginate')
  findAllWithoutPaginate() {
    return this.emailSubscriptionService.findAllWithoutPaginate();
  }

  @MessagePattern('admin-email-subscription-delete-multi')
  remove(@Body() body: DeleteMultiEmailSubscriptionDto) {
    return this.emailSubscriptionService.remove(body);
  }
}
