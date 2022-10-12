import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MicroserviceConsts } from '../../common/constants/microservices';
import { CreateEmailSubscriptionDto } from './dto/create-email-subscription.dto';
import { EmailSubscriptionService } from './email-subscription.service';

@Controller(`${MicroserviceConsts.PREFIX.CUSTOMER}/email-subscription`)
@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('Customer Email subscription')
export class EmailSubscriptionController {
  constructor(
    private readonly emailSubscriptionService: EmailSubscriptionService,
  ) {}

  @Post()
  create(@Body() createEmailSubscriptionDto: CreateEmailSubscriptionDto) {
    return this.emailSubscriptionService.create(createEmailSubscriptionDto);
  }
}
