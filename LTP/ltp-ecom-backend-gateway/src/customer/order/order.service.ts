import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { I18nService } from 'nestjs-i18n';
import { BooleanValue } from '../../common/constants/global.constant';
import { MicroserviceConsts } from '../../common/constants/microservices';
import { CustomerCreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ValidateProductsOrderDto } from './dto/validate-products-order.dto';
import { MicroserviceService } from '../microservice/microservice.service';
import { MailService } from '../../mail/mail.service';

@Injectable()
export class OrderService {
  constructor(
    private microserviceService: MicroserviceService,
    private mailService: MailService,
    private configService: ConfigService,
    private i18n: I18nService,
  ) {}

  async createOne(
    createOrderDto: CustomerCreateOrderDto,
    customer: number,
    curLang: string,
  ) {
    const reqData: any = {
      ...createOrderDto,
    };
    if (customer) {
      reqData['customerId'] = customer;
    }
    const rsNewOrder = await this.microserviceService.call(
      'customer-order-create-one',
      reqData,
    );
    if (BooleanValue.TRUE == rsNewOrder.status) {
      const newOrder = rsNewOrder.order;
      // Only send email when guest create order and entered email
      if (newOrder && !customer && createOrderDto.shipping.email) {
        // TODO: check current lang
        const [subject] = await Promise.all([
          this.i18n.t('mail.customer.subject.guest_create_order'),
        ]);
        const template = `${MicroserviceConsts.MAIL_TEMPLATE.CUSTOMER}_guest_create_order.${curLang}`;
        const url = `${this.configService.get<string>(
          'web.customer.root',
        )}?screenActive=2`;
        await this.mailService.send(
          createOrderDto.shipping.email,
          subject,
          template,
          {
            url: url,
            email: this.configService.get<string>('web.customer.email_support'),
          },
        );
      }
    }

    return rsNewOrder;
  }

  async validateProductsOrder(reqData: ValidateProductsOrderDto) {
    return await this.microserviceService.call(
      'customer-order-validate-products-order',
      reqData,
    );
  }

  findAll() {
    return `This action returns all order`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
