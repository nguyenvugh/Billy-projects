import { Injectable } from '@nestjs/common';
import { parseOffsetAndLimit } from '../common/helpers/paginate.helper';
import { FindAllQueueSendEmailsDto } from './dto/find-all-queue-send-emails.dto';
import { CreateManyQueueSendEmailsDto } from './dto/create-many-queue-send-emails.dto';
import { DeleteManyQueueSendEmailsDto } from './dto/delete-many-queue-send-emails.dto';
import { QueueSendEmailRepository } from './repository/queue-send-email.repository';

@Injectable()
export class QueueSendEmailService {
  constructor(private queueSendEmailRepo: QueueSendEmailRepository) {}

  async getListEmailsToSend(reqData: FindAllQueueSendEmailsDto) {
    const { offset, limit } = parseOffsetAndLimit(reqData.page, reqData.limit);
    const results = await this.queueSendEmailRepo
      .createQueryBuilder('queue_send_email')
      // TODO: check using NOW function to make sure condition compatible with RDBMS drivers
      .where('send_at <= NOW()')
      .orderBy({
        send_at: 'ASC',
      })
      .skip(offset)
      .take(limit)
      .getMany();

    return { results };
  }

  async createMany(reqData: CreateManyQueueSendEmailsDto) {
    return await this.queueSendEmailRepo.save(reqData.items);
  }

  async deleteMany(reqData: DeleteManyQueueSendEmailsDto) {
    return await this.queueSendEmailRepo.delete(reqData.ids);
  }
}
