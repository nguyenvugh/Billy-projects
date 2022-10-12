import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  Res,
  Headers,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { MicroserviceConsts } from 'src/common/constants/microservices';
import { CreateSliderDto } from './dto/create.dto';
import { DeleteSliderDto } from './dto/delete.dto';
import { FindSliderByCriteriaDto } from './dto/find-by-criterial.dto';
import { SliderService } from './slider.service';

@Controller(`${MicroserviceConsts.PREFIX.ADMIN}/slider`)
@ApiTags('Admin Slider Management')
@ApiBearerAuth()
export class SliderController {
  constructor(private readonly sliderService: SliderService) { }

  @Get()
  @ApiOperation({ summary: 'Find all slider' })
  @ApiConsumes('application/x-www-form-urlencoded')
  async findByCriteria(
    @Query() request: FindSliderByCriteriaDto,
    @Res() res: Response,
    @Headers('Authorization') authorization: string,
  ) {
    const result = await this.sliderService.findByCriteria(
      authorization,
      request,
    );
    const { code } = result;
    res.status(code).send(result);
  }

  @Post()
  @ApiOperation({ summary: 'Create new slider' })
  @ApiConsumes('application/json')
  @ApiBody({
    type: CreateSliderDto,
  })
  async create(
    @Body() createBody: CreateSliderDto,
    @Res() res: Response,
    @Headers('Authorization') authorization: string,
  ) {
    const result = await this.sliderService.create(authorization, createBody);
    const { code } = result;
    res.status(code).send(result);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get slider detail' })
  @ApiConsumes('application/x-www-form-urlencoded')
  async findOne(
    @Param('id') id: number,
    @Res() res: Response,
    @Headers('Authorization') authorization: string,
  ) {
    const result = await this.sliderService.findOne(authorization, id);
    const { code } = result;
    res.status(code).send(result);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update slider' })
  @ApiConsumes('application/json')
  @ApiBody({
    type: CreateSliderDto,
  })
  async update(
    @Param('id') id: number,
    @Body() updateBody: CreateSliderDto,
    @Res() res: Response,
    @Headers('Authorization') authorization: string,
  ) {
    const result = await this.sliderService.update(
      authorization,
      id,
      updateBody,
    );
    const { code } = result;
    res.status(code).send(result);
  }

  @Post('delete')
  @ApiOperation({ summary: 'Delete slider' })
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiBody({
    type: DeleteSliderDto,
  })
  async delete(
    @Body('ids') ids: [number],
    @Res() res: Response,
    @Headers('Authorization') authorization: string,
  ) {
    const result = await this.sliderService.delete(authorization, ids);
    const { code } = result;
    res.status(code).send(result);
  }
}
