import { Controller, UseGuards } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateSliderDto } from './dto/create.dto';
import { FindSliderByCriteriaDto } from './dto/find-by-criteria.dto';
import { UpdateSliderDto } from './dto/update.dto';
import { SliderService } from './slider.service';

import { AuthGuard } from 'src/common/guards/auth.guard';
import { PermissionsGuard } from 'src/common/guards/permissions.guard';
import { Permissions } from 'src/common/decorators/permissions.decorator';

@Controller('slider')
@UseGuards(AuthGuard, PermissionsGuard)
export class SliderController {
  constructor(private readonly sliderService: SliderService) { }

  @MessagePattern('admin-slider-find-by-criteria')
  @Permissions('slider')
  async findByCriteria({ body }: { body: FindSliderByCriteriaDto }) {
    return {
      code: 200,
      data: await this.sliderService.findByCriteria(body),
    };
  }

  @MessagePattern('admin-slider-create')
  @Permissions('slider')
  async create({ body }: { body: CreateSliderDto }) {
    return await this.sliderService.create(body);
  }

  @MessagePattern('admin-slider-find-one')
  @Permissions('slider')
  async findOne({ body }) {
    const { id } = body;
    const result = await this.sliderService.findOne(id);
    return {
      code: result ? 200 : 404,
      data: result || 'Slider not found',
    };
  }

  @MessagePattern('admin-slider-update-one')
  @Permissions('slider')
  async updateOne({ body }: { body: UpdateSliderDto }) {
    const result = await this.sliderService.update(body);
    return result;
  }

  @MessagePattern('admin-slider-delete')
  @Permissions('slider')
  async delete({ body }) {
    const { ids } = body;
    const result = await this.sliderService.delete(ids);
    return result;
  }
}
