import { DeleteMultiEmailSubscriptionDto } from './dto/delete-multi-email-sub.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { parseOffsetAndLimit } from '../common/helpers/paginate.helper';
import { FindEmailSub } from './dto/find-email-subscription.dto';
import { EmailSubscription } from './schema/email-subscription.schema';
import { RpcErrorExc } from '../common/exceptions/custom.exception';

@Injectable()
export class EmailSubscriptionService {
  constructor(
    @InjectRepository(EmailSubscription)
    private emailSubRepo: Repository<EmailSubscription>,
  ) {}

  async findAll(body: FindEmailSub) {
    const { q } = body;
    const { offset, limit } = parseOffsetAndLimit(body.page, body.limit);
    const [results, totalRecords] = await this.emailSubRepo.findAndCount({
      where: {
        email: Like(`%${q}%`),
      },
      order: {
        created_at: 'DESC',
      },
      skip: offset,
      take: limit,
    });

    return {
      results,
      totalRecords,
    };
  }

  async findAllWithoutPaginate() {
    return await this.emailSubRepo.find();
  }

  async remove(body: DeleteMultiEmailSubscriptionDto) {
    const result = await this.emailSubRepo.delete(body.ids);
    if (!result.affected)
      throw new RpcErrorExc(`bad_request:Xóa email không thành công!`);
    return 'success';
  }
}
