import {
  Controller,
  ClassSerializerInterceptor,
  UseInterceptors,
  UseGuards,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Headers,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiConsumes,
} from '@nestjs/swagger';
import { MicroserviceConsts } from '../../common/constants/microservices';
import { AuthToken } from '../../common/decorators/auth-token.decorator';
import { NewsCustomerSubscriptionDto } from './dto/news-customer-subscription.dto';
import { QueueSendEmailService } from './queue-send-email.service';

@Controller(`${MicroserviceConsts.PREFIX.ADMIN}/send-email`)
@ApiTags('Admin Send Email')
@ApiBearerAuth()
export class QueueSendEmailController {
  constructor(private readonly queueSendEmailService: QueueSendEmailService) {}

  @Post('/news')
  @ApiOperation({ summary: 'Send news email' })
  @ApiConsumes('application/x-www-form-urlencoded')
  async createQueueSendEmailNews(
    @Body() reqData: NewsCustomerSubscriptionDto,
    @AuthToken() authorization: string,
  ) {
    return await this.queueSendEmailService.createQueueSendEmailNews(
      authorization,
      reqData,
    );
  }
}
