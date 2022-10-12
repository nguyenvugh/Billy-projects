import { Injectable } from '@nestjs/common';
import { toLimitOffset, toListResponse } from 'src/common/utils';
import { EntityRepository, Like, Repository } from 'typeorm';
import { Emails } from '../entity/emails.entity';

interface IFindEmails {
  q: string;
  size: number;
  offset: number;
}

@Injectable()
@EntityRepository(Emails)
export class EmailsRepository extends Repository<Emails> {
  async findEmails({ q, size, offset }: IFindEmails) {
    const [data, total] = await this.findAndCount({
      where: {
        email: q ? Like(`%${q}%`) : Like(`%`),
      },
      skip: offset,
      take: size,
      order: {
        id: 'DESC',
      },
    });

    return toListResponse(data, total, size);
  }

  async createNew({ email }) {
    const newEmail = this.create({ email });
    newEmail.email = email.email;
    return this.save(newEmail);
  }
}
