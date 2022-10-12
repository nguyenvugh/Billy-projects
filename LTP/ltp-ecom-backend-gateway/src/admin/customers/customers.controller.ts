import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Res,
  Headers,
} from '@nestjs/common';
import { Response } from 'express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { MicroserviceConsts } from 'src/common/constants/microservices';
import { CustomersService } from './customers.service';
import { FindCustomersByCriteriaDto } from './dto/find-by-criterial.dto';
import { DeactivateCustomerDto } from './dto/deactivate.dto';
import { UpdateCustomersDto } from './dto/update.dto';
import { FindByCriteriaDto } from '../orders/dto/find-by-criteria.dto';

@Controller(`${MicroserviceConsts.PREFIX.ADMIN}/customers`)
@ApiTags('Admin Customers Management')
@ApiBearerAuth()
export class CustomersController {
  constructor(private readonly customersService: CustomersService) { }

  @Get()
  @ApiOperation({ summary: 'Find customers by criterial' })
  @ApiConsumes('application/x-www-form-urlencoded')
  async findByCriteria(
    @Query() request: FindCustomersByCriteriaDto,
    @Res() res: Response,
    @Headers('Authorization') authorization: string,
  ) {
    const result = await this.customersService.findByCriteria(
      authorization,
      request,
    );
    const { code } = result;
    res.status(code).send(result);
  }

  @Post('activate/:id')
  @ApiOperation({ summary: 'Activate customer' })
  async activate(
    @Param('id') id: number,
    @Res() res: Response,
    @Headers('Authorization') authorization: string,
  ) {
    const result = await this.customersService.activate(authorization, id);
    const { code } = result;
    res.status(code).send(result);
  }

  @Post('deactivate/:id')
  @ApiOperation({ summary: 'Deactivate customer' })
  @ApiBody({
    type: DeactivateCustomerDto,
  })
  @ApiConsumes('application/x-www-form-urlencoded')
  async deactivate(
    @Param('id') id: number,
    @Body('reason') reason: string,
    @Res() res: Response,
    @Headers('Authorization') authorization: string,
  ) {
    const result = await this.customersService.deactivate(
      authorization,
      id,
      reason,
    );
    const { code } = result;
    res.status(code).send(result);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get customer detail' })
  @ApiConsumes('application/x-www-form-urlencoded')
  async findOne(
    @Param('id') id: number,
    @Res() res: Response,
    @Headers('Authorization') authorization: string,
  ) {
    const result = await this.customersService.findOne(authorization, id);
    const { code } = result;
    res.status(code).send(result);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update customer' })
  @ApiConsumes('application/json')
  @ApiBody({
    type: UpdateCustomersDto,
  })
  async update(
    @Param('id') id: number,
    @Body() updateBody: UpdateCustomersDto,
    @Res() res: Response,
    @Headers('Authorization') authorization: string,
  ) {
    const result = await this.customersService.update(
      authorization,
      id,
      updateBody,
    );
    const { code } = result;
    res.status(code).send(result);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete customer' })
  async delete(
    @Param('id') id: number,
    @Res() res: Response,
    @Headers('Authorization') authorization: string,
  ) {
    const result = await this.customersService.delete(authorization, id);
    const { code } = result;
    res.status(code).send(result);
  }

  @Get(':id/orders')
  @ApiOperation({ summary: 'Get orders by customer' })
  @ApiConsumes('application/x-www-form-urlencoded')
  async getOrders(
    @Param('id') id: number,
    @Query() request: FindByCriteriaDto,
    @Res() res: Response,
    @Headers('Authorization') authorization: string,
  ) {
    const result = await this.customersService.getOrders(
      authorization,
      id,
      request,
    );
    const { code } = result;
    res.status(code).send(result);
  }
}
