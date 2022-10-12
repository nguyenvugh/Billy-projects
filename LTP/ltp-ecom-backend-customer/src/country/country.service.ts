import { Injectable } from '@nestjs/common';
import { CreateCountryDto } from './dto/create-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';
import { CountryRepository } from './repository/country.repository';

@Injectable()
export class CountryService {
  constructor(private countryRepository: CountryRepository) {}

  create(createCountryDto: CreateCountryDto) {
    return 'This action adds a new country';
  }

  async findAll() {
    return await this.countryRepository.find({
      order: {
        name: 'ASC',
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} country`;
  }

  update(id: number, updateCountryDto: UpdateCountryDto) {
    return `This action updates a #${id} country`;
  }

  remove(id: number) {
    return `This action removes a #${id} country`;
  }
}
