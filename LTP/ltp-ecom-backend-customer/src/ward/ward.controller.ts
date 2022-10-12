import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { FindAllWardsDto } from './dto/find-all-wards.dto';
import { WardService } from './ward.service';

@Controller('ward')
export class WardController {
  constructor(private readonly wardService: WardService) {}

  @MessagePattern('customer-ward-find-all')
  async findAll(reqData: FindAllWardsDto) {
    return await this.wardService.findAll(reqData);
  }
}
