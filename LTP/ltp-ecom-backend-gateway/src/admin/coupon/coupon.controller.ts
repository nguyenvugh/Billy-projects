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
import { CouponService } from './coupon.service';
import { CreateCouponDto } from './dto/create.dto';
import { DeleteCouponDto } from './dto/delete.dto';
import { FindCouponByCriteriaDto } from './dto/find-by-criteria.dto';

@Controller(`${MicroserviceConsts.PREFIX.ADMIN}/coupon`)
@ApiTags('Admin Coupon Management')
@ApiBearerAuth()
export class CouponController {
  constructor(private readonly couponService: CouponService) { }

  @Get()
  @ApiOperation({ summary: 'Find coupon by criteria' })
  @ApiConsumes('application/x-www-form-urlencoded')
  async findByCriteria(
    @Query() request: FindCouponByCriteriaDto,
    @Res() res: Response,
    @Headers('Authorization') authorization: string,
  ) {
    const result = await this.couponService.findByCriteria(
      authorization,
      request,
    );
    const { code } = result;
    res.status(code).send(result);
  }

  @Post()
  @ApiOperation({ summary: 'Create new coupon' })
  @ApiConsumes('application/json')
  @ApiBody({
    type: CreateCouponDto,
  })
  async create(
    @Body() createBody: CreateCouponDto,
    @Res() res: Response,
    @Headers('Authorization') authorization: string,
  ) {
    const result = await this.couponService.create(authorization, createBody);
    const { code } = result;
    res.status(code).send(result);
  }

  @Get('get-product-list')
  @ApiOperation({ summary: 'Get product list' })
  @ApiConsumes('application/x-www-form-urlencoded')
  async getProductList(
    @Res() res: Response,
    @Headers('Authorization') authorization: string,
  ) {
    const result = await this.couponService.getProductList(authorization);
    const { code } = result;
    res.status(code).send(result);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get coupon detail' })
  @ApiConsumes('application/x-www-form-urlencoded')
  async findOne(
    @Param('id') id: number,
    @Res() res: Response,
    @Headers('Authorization') authorization: string,
  ) {
    const result = await this.couponService.findOne(authorization, id);
    const { code } = result;
    res.status(code).send(result);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update branch' })
  @ApiConsumes('application/json')
  @ApiBody({
    type: CreateCouponDto,
  })
  async update(
    @Param('id') id: number,
    @Body() updateBody: CreateCouponDto,
    @Res() res: Response,
    @Headers('Authorization') authorization: string,
  ) {
    const result = await this.couponService.update(
      authorization,
      id,
      updateBody,
    );
    const { code } = result;
    res.status(code).send(result);
  }

  @Post('delete')
  @ApiOperation({ summary: 'Delete coupon' })
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiBody({
    type: DeleteCouponDto,
  })
  async delete(
    @Body('ids') ids: [number],
    @Res() res: Response,
    @Headers('Authorization') authorization: string,
  ) {
    const result = await this.couponService.delete(authorization, ids);
    const { code } = result;
    res.status(code).send(result);
  }

}
