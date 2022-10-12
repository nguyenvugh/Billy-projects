import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { FindAllDistrictsDto } from './dto/find-all-districts.dto';
import { DistrictService } from './district.service';

@Controller('district')
export class DistrictController {
  constructor(private readonly districtService: DistrictService) {}

  @MessagePattern('customer-district-find-all')
  async findAll(reqData: FindAllDistrictsDto) {
    return await this.districtService.findAll(reqData);
  }
}
