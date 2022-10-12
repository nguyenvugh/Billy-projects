import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { I18nService } from 'nestjs-i18n';
import { Repository } from 'typeorm';
import { RpcExc } from '../common/exceptions/custom.exception';
import { CreateEmailSubscriptionDto } from './dto/create-email-subscription.dto';
import { EmailSubscription } from './schema/email-subscription.schema';

@Injectable()
export class EmailSubscriptionService {
  constructor(
    @InjectRepository(EmailSubscription)
    private emailSubRepo: Repository<EmailSubscription>,
    private i18n: I18nService,
  ) {}

  async create(createEmailSubscriptionDto: CreateEmailSubscriptionDto) {
    const { email } = createEmailSubscriptionDto;
    const exist = await this.emailSubRepo.findOne({ email });
    const errMsg = await this.i18n.t('customer.email.existed');
    if (exist) throw new RpcExc(`conflict:${errMsg}`);

    const emailSub = this.emailSubRepo.create(createEmailSubscriptionDto);
    return this.emailSubRepo.save(emailSub);
  }
}
