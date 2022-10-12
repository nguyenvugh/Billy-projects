import { Injectable } from '@nestjs/common';
import { FindAllWardsDto } from './dto/find-all-wards.dto';
import { WardRepository } from './repository/ward.repository';

@Injectable()
export class WardService {
  constructor(private wardRepository: WardRepository) {}

  async findAll(reqData: FindAllWardsDto) {
    const results = await this.wardRepository.find({
      where: {
        districtId: reqData.district,
      },
      order: {
        name: 'ASC',
      },
    });

    return { results };
  }
}
