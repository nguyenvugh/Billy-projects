import { Injectable } from '@nestjs/common';
import { CountryRepository } from './repository/country.repository';

@Injectable()
export class CountryService {
  constructor(private countryRepository: CountryRepository) {}

  async findAll() {
    const results = await this.countryRepository.find({
      order: {
        name: 'ASC',
      },
    });

    return { results };
  }
}
