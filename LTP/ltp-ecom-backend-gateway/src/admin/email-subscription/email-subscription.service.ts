import { Injectable } from '@nestjs/common';
import { MicroserviceService } from '../microservice/microservice.service';
import { DeleteMultiEmailSubscriptionDto } from './dto/delete-multi-email-sub.dto';
import { FindEmailSub } from './dto/find-email-subscription.dto';

@Injectable()
export class EmailSubscriptionService {
  constructor(private microserviceService: MicroserviceService) {}

  // async create(createEmailSubscriptionDto: CreateEmailSubscriptionDto) {
  //   return await this.microserviceService.call(
  //     'customer-email-subscription-create',
  //     createEmailSubscriptionDto,
  //   );
  // }

  findAll(params: FindEmailSub) {
    return this.microserviceService.call(
      'admin-email-subscription-find',
      params,
    );
  }

  remove(deleteMultiEmailSubscriptionDto: DeleteMultiEmailSubscriptionDto) {
    return this.microserviceService.call(
      'admin-email-subscription-delete-multi',
      deleteMultiEmailSubscriptionDto,
    );
  }
}
