import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundExc } from 'src/common/exceptions/custom.exception';
import PaginateDto from 'src/utils-module/pagination/dto/paginate.dto';
import { In, IsNull, Repository } from 'typeorm';
import { CreateContactDto } from './dto/create-contact.dto';
import { Contact } from './entities/contact.entity';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(Contact)
    private contactRepository: Repository<Contact>,
  ) {}

  async create(createContactDto: CreateContactDto) {
    const { name, phone, email, content } = createContactDto;
    const newContact = this.contactRepository.create({
      name,
      phone,
      email,
      content,
    });

    const saved = await this.contactRepository.save(newContact);
    return saved;
  }

  async getContacts({ searchText, page, limit: take }: PaginateDto) {
    const queryBuilder = this.contactRepository.createQueryBuilder('contact');
    const skip = (page - 1) * take;
    const [results, total] = await queryBuilder
      .where('contact.email LIKE :searchText', {
        searchText: `%${searchText}%`,
      })
      .orderBy({
        'contact.createdAt': 'DESC',
      })
      .skip(skip)
      .take(take)
      .getManyAndCount();
    return { results, total };
  }

  async remove(id: string) {
    const result = await this.contactRepository.softDelete({
      id,
      deletedAt: IsNull(),
    });
    if (!result.affected) throw new NotFoundExc('Contact');
    return;
  }

  async removeMulti(ids: string[]) {
    const result = await this.contactRepository.softDelete({
      id: In(ids),
      deletedAt: IsNull(),
    });

    if (!result.affected) throw new NotFoundExc('Contact');
    return;
  }
}
