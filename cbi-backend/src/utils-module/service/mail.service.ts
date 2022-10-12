import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IGlobalConfig } from 'src/common/config/global.config';
import * as SendGrid from '@sendgrid/mail';

@Injectable()
export class MailService {
  private readonly emailFrom;
  private readonly templateId;
  constructor(private readonly configService: ConfigService<IGlobalConfig>) {
    this.emailFrom = this.configService.get('sendGrid.emailFrom', {
      infer: true,
    });
    this.templateId = this.configService.get('sendGrid.templateId', {
      infer: true,
    });
    SendGrid.setApiKey(
      this.configService.get('sendGrid.apiKey', { infer: true }),
    );
  }
  async send(mail: SendGrid.MailDataRequired) {
    const transport = await SendGrid.send(mail);
    return transport;
  }
  async sendEmail(email: string, link: string) {
    const mail = {
      to: email,
      from: this.emailFrom,
      templateId: this.templateId,
      dynamic_template_data: {
        email,
        link,
      },
    };

    return await this.send(mail);
  }

  async sendEmailWithTemplate(email: string, link: string, templateId: string) {
    const mail = {
      to: email,
      from: this.emailFrom,
      templateId,
      dynamic_template_data: {
        email,
        link,
      },
    };

    return await this.send(mail);
  }
}
