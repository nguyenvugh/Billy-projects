import { Controller, UseGuards } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AuthGuard } from '../common/guards/auth.guard';
import { FindAllDistrictsDto } from './dto/find-all-districts.dto';
import { DistrictService } from './district.service';

@Controller('district')
@UseGuards(AuthGuard)
export class DistrictController {
  constructor(private readonly districtService: DistrictService) {}

  @MessagePattern('admin-district-find-all')
  async findAll({ body }: { body: FindAllDistrictsDto }) {
    return await this.districtService.findAll(body);
  }
}
