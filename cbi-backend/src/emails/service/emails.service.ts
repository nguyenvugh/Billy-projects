import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { toLimitOffset, toListResponse } from 'src/common/utils';
import PaginateDto from 'src/utils-module/pagination/dto/paginate.dto';
import { In, Like } from 'typeorm';
import { CreateEmailDto } from '../dto/create-emails.dto';
import { DeleteEmailDto } from '../dto/delete-emails.dto';
import { EmailsRepository } from '../repository/emails.repository';
import { Emails } from '../entity/emails.entity';

@Injectable()
export class EmailsService {
  constructor(
    @InjectRepository(EmailsRepository)
    private emailRepository: EmailsRepository,
  ) {}

  async create(body: CreateEmailDto) {
    // check if email existed
    const existedEmail = await this.emailRepository.findOne({
      where: {
        email: body.email,
      },
    });
    if (existedEmail) {
      throw new BadRequestException('Email already exist');
    }

    // if not exist, create new
    const newEmail = this.emailRepository.create({ email: body.email });
    return this.emailRepository.save(newEmail);
  }

  async getEmails({ searchText, page, limit }: PaginateDto) {
    const { limit: size, offset } = toLimitOffset(page, limit);
    const [data, total] = await this.emailRepository.findAndCount({
      where: {
        email: searchText ? Like(`%${searchText}%`) : Like(`%`),
      },
      skip: offset,
      take: size,
      order: {
        id: 'DESC',
      },
    });

    return toListResponse(data, total, size);
    // return this.emailRepository.findEmails({ q: searchText, size, offset });
  }

  async deleteEmailsByIds({ ids }: DeleteEmailDto) {
    return this.emailRepository.delete({
      id: In(ids),
    });
  }
}
