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
import { CharityService } from './charity.service';
import { CreateCharityProductRequirementDto } from './dto/create-product.dto';
import { CreateCharityDto } from './dto/create.dto';
import { DeleteCharityProductDto } from './dto/delete-product.dto';
import { DeleteCharityDto } from './dto/delete.dto';
import { FindAllCharityProductDto } from './dto/find-all-product.dto';
import { FindCharityByCriteriaDto } from './dto/find-by-criteria.dto';

@Controller(`${MicroserviceConsts.PREFIX.ADMIN}/charity`)
@ApiTags('Admin Charity Program Management')
@ApiBearerAuth()
export class CharityController {
  constructor(private readonly charityService: CharityService) { }

  @Get()
  @ApiOperation({ summary: 'Find charity by criteria' })
  @ApiConsumes('application/x-www-form-urlencoded')
  async findByCriteria(
    @Query() request: FindCharityByCriteriaDto,
    @Res() res: Response,
    @Headers('Authorization') authorization: string,
  ) {
    const result = await this.charityService.findByCriteria(
      authorization,
      request,
    );
    const { code } = result;
    res.status(code).send(result);
  }

  @Post()
  @ApiOperation({ summary: 'Create new charity' })
  @ApiConsumes('application/json')
  @ApiBody({
    type: CreateCharityDto,
  })
  async create(
    @Body() createBody: CreateCharityDto,
    @Res() res: Response,
    @Headers('Authorization') authorization: string,
  ) {
    const result = await this.charityService.create(authorization, createBody);
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
    const result = await this.charityService.getProductList(authorization);
    const { code } = result;
    res.status(code).send(result);
  }

  @Get(':id/products')
  @ApiOperation({ summary: 'Find all charity products' })
  @ApiConsumes('application/x-www-form-urlencoded')
  async findAllProduct(
    @Param('id') id: number,
    @Query() request: FindAllCharityProductDto,
    @Res() res: Response,
    @Headers('Authorization') authorization: string,
  ) {
    const result = await this.charityService.findAllProduct(
      authorization,
      id,
      request,
    );
    const { code } = result;
    res.status(code).send(result);
  }

  @Get(':id/update-status')
  @ApiOperation({ summary: 'Update charity product' })
  @ApiConsumes('application/x-www-form-urlencoded')
  async updateStatus(
    @Param('id') id: number,
    @Res() res: Response,
    @Headers('Authorization') authorization: string,
  ) {
    const result = await this.charityService.updateStatus(authorization, id);
    const { code } = result;
    res.status(code).send(result);
  }

  @Post(':id/product')
  @ApiOperation({ summary: 'Add new charity product' })
  @ApiConsumes('application/json')
  @ApiBody({
    type: CreateCharityProductRequirementDto,
  })
  async addProduct(
    @Param('id') id: number,
    @Body() createBody: CreateCharityProductRequirementDto,
    @Res() res: Response,
    @Headers('Authorization') authorization: string,
  ) {
    const result = await this.charityService.addProduct(
      authorization,
      id,
      createBody,
    );
    const { code } = result;
    res.status(code).send(result);
  }

  @Put(':id/product/:productId')
  @ApiOperation({ summary: 'Update charity product' })
  @ApiConsumes('application/json')
  @ApiBody({
    type: CreateCharityProductRequirementDto,
  })
  async updateProduct(
    @Param('id') id: number,
    @Param('productId') productId: number,
    @Body() updateBody: CreateCharityProductRequirementDto,
    @Res() res: Response,
    @Headers('Authorization') authorization: string,
  ) {
    const result = await this.charityService.updateProduct(
      authorization,
      id,
      productId,
      updateBody,
    );
    const { code } = result;
    res.status(code).send(result);
  }

  @Post('product/delete')
  @ApiOperation({ summary: 'Delete charity products' })
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiBody({
    type: DeleteCharityProductDto,
  })
  async deleteProduct(
    @Body('ids') ids: [number],
    @Res() res: Response,
    @Headers('Authorization') authorization: string,
  ) {
    const result = await this.charityService.deleteProducts(authorization, ids);
    const { code } = result;
    res.status(code).send(result);
  }

  @Get('product/:id')
  @ApiOperation({ summary: 'Get charity product detail' })
  @ApiConsumes('application/x-www-form-urlencoded')
  async findProduct(
    @Param('id') id: number,
    @Res() res: Response,
    @Headers('Authorization') authorization: string,
  ) {
    const result = await this.charityService.findProduct(authorization, id);
    const { code } = result;
    res.status(code).send(result);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get charity detail' })
  @ApiConsumes('application/x-www-form-urlencoded')
  async findOne(
    @Param('id') id: number,
    @Res() res: Response,
    @Headers('Authorization') authorization: string,
  ) {
    const result = await this.charityService.findOne(authorization, id);
    const { code } = result;
    res.status(code).send(result);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update charity' })
  @ApiConsumes('application/json')
  @ApiBody({
    type: CreateCharityDto,
  })
  async update(
    @Param('id') id: number,
    @Body() updateBody: CreateCharityDto,
    @Res() res: Response,
    @Headers('Authorization') authorization: string,
  ) {
    const result = await this.charityService.update(
      authorization,
      id,
      updateBody,
    );
    const { code } = result;
    res.status(code).send(result);
  }

  @Post('delete')
  @ApiOperation({ summary: 'Delete charity' })
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiBody({
    type: DeleteCharityDto,
  })
  async delete(
    @Body('ids') ids: [number],
    @Res() res: Response,
    @Headers('Authorization') authorization: string,
  ) {
    const result = await this.charityService.delete(authorization, ids);
    const { code } = result;
    res.status(code).send(result);
  }
}
