import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { processTranslateData } from '../../common/helpers/translate.helper';
import { InternalServerErrorExc } from '../../common/exceptions/custom.exception';
import { NewsCustomerSubscriptionDto } from './dto/news-customer-subscription.dto';
import { CreateOneQueueSendEmailDto } from './dto/create-one-queue-send-email.dto';
import { MicroserviceService } from '../microservice/microservice.service';

@Injectable()
export class QueueSendEmailService {
  constructor(
    private microserviceService: MicroserviceService,
    private configService: ConfigService,
  ) {}

  async createQueueSendEmailNews(
    authorization,
    reqData: NewsCustomerSubscriptionDto,
  ) {
    const [news, listEmailsSubscription] = await Promise.all([
      this.microserviceService.call('admin-news-find-by-id', {
        id: reqData.news_id,
        authorization,
      }),
      this.microserviceService.call(
        'admin-email-subscription-find-all-without-paginate',
      ),
    ]);
    if (!news || !listEmailsSubscription || !listEmailsSubscription.length) {
      throw new InternalServerErrorExc();
    }
    if (!news.translates) {
      throw new InternalServerErrorExc();
    }
    const lang = 'vi';
    const newsTranslate = processTranslateData(news.translates);
    const rootFEUrl = this.configService.get<string>('web.customer.root');
    const dataCreateQueueSendEmailsNews: CreateOneQueueSendEmailDto[] =
      listEmailsSubscription.map((item) => {
        return {
          email: item.email,
          title: 'Bản tin mới nhất từ Long Thành Plastic',
          template: `admin_news_email_subscription.${lang}`,
          data: {
            news: {
              title: newsTranslate[lang]['name'],
              content: newsTranslate[lang]['desc'],
              url: `${rootFEUrl}article/${news.category}/${news.id}`,
            },
          },
        };
      });
    await this.microserviceService.call('admin-queue-send-email-create-many', {
      body: {
        items: dataCreateQueueSendEmailsNews,
      },
      authorization,
    });

    return 'ok';
  }
}
