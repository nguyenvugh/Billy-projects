import { Injectable } from '@nestjs/common';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { FindAllCitiesDto } from './dto/find-all-cities.dto';
import { CityRepository } from './repository/city.repository';

@Injectable()
export class CityService {
  constructor(private cityRepository: CityRepository) {}

  create(createCityDto: CreateCityDto) {
    return 'This action adds a new city';
  }

  async findAll(reqData: FindAllCitiesDto) {
    return await this.cityRepository.find({
      where: {
        countryId: reqData.country,
      },
      order: {
        name: 'ASC',
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} city`;
  }

  update(id: number, updateCityDto: UpdateCityDto) {
    return `This action updates a #${id} city`;
  }

  remove(id: number) {
    return `This action removes a #${id} city`;
  }
}
