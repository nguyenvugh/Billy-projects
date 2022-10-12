import { Controller, UseGuards } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AuthGuard } from '../common/guards/auth.guard';
import { FindAllWardsDto } from './dto/find-all-wards.dto';
import { WardService } from './ward.service';

@Controller('ward')
@UseGuards(AuthGuard)
export class WardController {
  constructor(private readonly wardService: WardService) {}

  @MessagePattern('admin-ward-find-all')
  async findAll({ body }: { body: FindAllWardsDto }) {
    return await this.wardService.findAll(body);
  }
}
