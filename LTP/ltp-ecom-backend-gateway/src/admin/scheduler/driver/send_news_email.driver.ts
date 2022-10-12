import { Scheduler } from './base.driver';
import { AdminMicroserviceService } from '../../admin-microservice/admin-microservice.service';
import { MailService } from '../../../mail/mail.service';

export class SendNewsEmailSchedulerDriver implements Scheduler {
  constructor(
    private microserviceService: AdminMicroserviceService,
    private mailService: MailService,
  ) {}

  async run(): Promise<void> {
    const emailsToSend = await this.microserviceService.call(
      'admin-queue-send-email-get-list-emails-to-send',
      {
        body: {
          page: 1,
          limit: 10,
        },
      },
    );
    console.log(emailsToSend);
    if (!emailsToSend || !emailsToSend.length) {
      return;
    }
    const emailsDelete = emailsToSend.map((item) => {
      return item.id;
    });
    console.log(emailsDelete);
    await this.microserviceService.call('admin-queue-send-email-delete-many', {
      body: {
        ids: emailsDelete,
      },
    });
    return;
  }
}
