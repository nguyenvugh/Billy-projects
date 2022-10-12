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
import { Response } from 'express';
import { MicroserviceConsts } from 'src/common/constants/microservices';
import { CreateShopDto } from './dto/create.dto';
import { DeleteShopDto } from './dto/delete.dto';
import { FindAllShopDto } from './dto/find-all.dto';
import { ShopService } from './shop.service';

@Controller(`${MicroserviceConsts.PREFIX.ADMIN}/shop`)
@ApiTags('Admin Shop Management')
@ApiBearerAuth()
export class ShopController {
  constructor(private readonly shopService: ShopService) { }

  @Get()
  @ApiOperation({ summary: 'Find all shop' })
  @ApiConsumes('application/x-www-form-urlencoded')
  async findByCriteria(
    @Query() request: FindAllShopDto,
    @Res() res: Response,
    @Headers('Authorization') authorization: string,
  ) {
    const result = await this.shopService.findAll(authorization, request);
    const { code } = result;
    res.status(code).send(result);
  }

  @Post()
  @ApiOperation({ summary: 'Create new shop' })
  @ApiConsumes('application/json')
  @ApiBody({
    type: CreateShopDto,
  })
  async create(
    @Body() createBody: CreateShopDto,
    @Res() res: Response,
    @Headers('Authorization') authorization: string,
  ) {
    const result = await this.shopService.create(authorization, createBody);
    const { code } = result;
    res.status(code).send(result);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get shop detail' })
  @ApiConsumes('application/x-www-form-urlencoded')
  async findOne(
    @Param('id') id: number,
    @Res() res: Response,
    @Headers('Authorization') authorization: string,
  ) {
    const result = await this.shopService.findOne(authorization, id);
    const { code } = result;
    res.status(code).send(result);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update shop' })
  @ApiConsumes('application/json')
  @ApiBody({
    type: CreateShopDto,
  })
  async update(
    @Param('id') id: number,
    @Body() updateBody: CreateShopDto,
    @Res() res: Response,
    @Headers('Authorization') authorization: string,
  ) {
    const result = await this.shopService.update(authorization, id, updateBody);
    const { code } = result;
    res.status(code).send(result);
  }

  @Post('delete')
  @ApiOperation({ summary: 'Delete shop' })
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiBody({
    type: DeleteShopDto,
  })
  async delete(
    @Body('ids') ids: [number],
    @Res() res: Response,
    @Headers('Authorization') authorization: string,
  ) {
    const result = await this.shopService.delete(authorization, ids);
    const { code } = result;
    res.status(code).send(result);
  }
}
