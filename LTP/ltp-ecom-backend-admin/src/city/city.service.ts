import { Injectable } from '@nestjs/common';
import { FindAllCitiesDto } from './dto/find-all-cities.dto';
import { CityRepository } from './repository/city.repository';

@Injectable()
export class CityService {
  constructor(private cityRepository: CityRepository) {}

  async findAll(reqData: FindAllCitiesDto) {
    const results = await this.cityRepository.find({
      where: {
        countryId: reqData.country,
      },
      order: {
        name: 'ASC',
      },
    });

    return { results };
  }
}
