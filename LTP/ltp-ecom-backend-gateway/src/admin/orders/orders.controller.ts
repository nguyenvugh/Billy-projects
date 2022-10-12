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
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { MicroserviceConsts } from 'src/common/constants/microservices';
import { Response } from 'express';

import { OrdersService } from './orders.service';
import { FindByCriteriaDto } from './dto/find-by-criteria.dto';
import { DeleteDto } from './dto/delete.dto';
import { UpdateDto } from './dto/update.dto';

@Controller(`${MicroserviceConsts.PREFIX.ADMIN}/orders`)
@ApiTags('Admin Orders Management')
@ApiBearerAuth()
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  @ApiOperation({ summary: 'Find orders by criteria' })
  @ApiConsumes('application/x-www-form-urlencoded')
  async findByCriteria(
    @Query() request: FindByCriteriaDto,
    @Res() res: Response,
    @Headers('Authorization') authorization: string,
  ) {
    const result = await this.ordersService.findByCriteria(
      authorization,
      request,
    );
    const { code } = result;
    res.status(code).send(result);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get order detail' })
  @ApiConsumes('application/x-www-form-urlencoded')
  async findOne(
    @Param('id') id: number,
    @Res() res: Response,
    @Headers('Authorization') authorization: string,
  ) {
    const result = await this.ordersService.findOne(authorization, id);
    const { code } = result;
    res.status(code).send(result);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update order detail' })
  @ApiConsumes('application/x-www-form-urlencoded')
  async updateOne(
    @Param('id') id: number,
    @Body() reqData: UpdateDto,
    @Res() res: Response,
    @Headers('Authorization') authorization: string,
  ) {
    const result = await this.ordersService.update(authorization, id, reqData);
    const { code } = result;
    res.status(code).send(result);
  }

  @Post('delete')
  @ApiOperation({ summary: 'Delete orders' })
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiBody({
    type: DeleteDto,
  })
  async delete(
    @Body('ids') ids: [number],
    @Res() res: Response,
    @Headers('Authorization') authorization: string,
  ) {
    const result = await this.ordersService.delete(authorization, ids);
    const { code } = result;
    res.status(code).send(result);
  }
}
