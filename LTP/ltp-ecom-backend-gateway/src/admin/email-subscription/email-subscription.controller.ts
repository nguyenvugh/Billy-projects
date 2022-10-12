import { Body, Controller, Delete, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MicroserviceConsts } from '../../common/constants/microservices';
import { DeleteMultiEmailSubscriptionDto } from './dto/delete-multi-email-sub.dto';
import { FindEmailSub } from './dto/find-email-subscription.dto';
import { EmailSubscriptionService } from './email-subscription.service';

@Controller(`${MicroserviceConsts.PREFIX.ADMIN}/email-subscription`)
@ApiTags('Admin email subscription')
export class EmailSubscriptionController {
  constructor(
    private readonly emailSubscriptionService: EmailSubscriptionService,
  ) {}

  @Get()
  findAll(@Query() params: FindEmailSub) {
    return this.emailSubscriptionService.findAll(params);
  }

  @Delete()
  remove(
    @Body() deleteMultiEmailSubscriptionDto: DeleteMultiEmailSubscriptionDto,
  ) {
    return this.emailSubscriptionService.remove(
      deleteMultiEmailSubscriptionDto,
    );
  }
}
