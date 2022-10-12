import { Injectable } from '@nestjs/common';
import { FindAllDistrictsDto } from './dto/find-all-districts.dto';
import { DistrictRepository } from './repository/district.repository';

@Injectable()
export class DistrictService {
  constructor(private districtRepository: DistrictRepository) {}

  async findAll(reqData: FindAllDistrictsDto) {
    return await this.districtRepository.find({
      where: {
        cityId: reqData.city,
      },
      order: {
        name: 'ASC',
      },
    });
  }
}
