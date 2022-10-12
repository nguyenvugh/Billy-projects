import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {
  constructor(
    private mailerService: MailerService,
    private configService: ConfigService,
  ) {}

  async send(to: string, subject: string, template: string, data: any = {}) {
    if (!to || !subject || !template) {
      return false;
    }

    await this.mailerService.sendMail({
      to: to,
      // from: '"Support Team" <support@example.com>', // override default from
      subject: subject,
      template: `./${template}.hbs`, // `.hbs` extension is appended automatically
      context: this.combineEmailDataWithMainData(data),
    });

    return true;
  }

  private combineEmailDataWithMainData(data: any = {}) {
    const rootFEUrl = this.configService.get<string>('web.customer.root');
    const emailSupport = this.configService.get<string>(
      'web.customer.email_support',
    );
    return {
      ...data,
      header: {
        banner: `${rootFEUrl}imgs/nlt-emailverify-banner.jpg`,
      },
      footer: {
        email_support: emailSupport,
      },
    };
  }
}
