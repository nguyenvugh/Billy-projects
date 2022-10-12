import { Injectable } from '@nestjs/common';
import { MicroserviceService } from '../microservice/microservice.service';
import { CreateEmailSubscriptionDto } from './dto/create-email-subscription.dto';

@Injectable()
export class EmailSubscriptionService {
  constructor(private microserviceService: MicroserviceService) {}

  async create(createEmailSubscriptionDto: CreateEmailSubscriptionDto) {
    return await this.microserviceService.call(
      'customer-email-subscription-create',
      createEmailSubscriptionDto,
    );
  }
}
