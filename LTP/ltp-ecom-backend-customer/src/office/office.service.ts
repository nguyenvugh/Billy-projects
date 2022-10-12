import { Injectable } from '@nestjs/common';
import { OfficeRepository } from './repository/office.repository';

@Injectable()
export class OfficeService {
  constructor(private officeRepo: OfficeRepository) {}

  async findAllOffices() {
    const results = await this.officeRepo.find({
      relations: ['ward', 'district', 'city'],
    });

    return { results };
  }
}
