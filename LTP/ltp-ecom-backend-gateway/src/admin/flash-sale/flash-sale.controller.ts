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
import { CreateFlashSaleProductDto } from './dto/create-product.dto';
import { CreateFlashSaleDto } from './dto/create.dto';
import { DeleteFlashSaleProductDto } from './dto/delete-product.dto';
import { DeleteFlashSaleDto } from './dto/delete.dto';
import { FindAllFlashSaleProductDto } from './dto/find-all-product.dto';
import { FindAllFlashSaleDto } from './dto/find-all.dto';
import { FlashSaleService } from './flash-sale.service';

@Controller(`${MicroserviceConsts.PREFIX.ADMIN}/flash-sale`)
@ApiTags('Admin Flash Sale Management')
@ApiBearerAuth()
export class FlashSaleController {
  constructor(private readonly flashSaleService: FlashSaleService) { }

  @Get()
  @ApiOperation({ summary: 'Find all flash sale' })
  @ApiConsumes('application/x-www-form-urlencoded')
  async findByCriteria(
    @Query() request: FindAllFlashSaleDto,
    @Res() res: Response,
    @Headers('Authorization') authorization: string,
  ) {
    const result = await this.flashSaleService.findAll(authorization, request);
    const { code } = result;
    res.status(code).send(result);
  }

  @Post()
  @ApiOperation({ summary: 'Create new flash sale' })
  @ApiConsumes('application/json')
  @ApiBody({
    type: CreateFlashSaleDto,
  })
  async create(
    @Body() createBody: CreateFlashSaleDto,
    @Res() res: Response,
    @Headers('Authorization') authorization: string,
  ) {
    const result = await this.flashSaleService.create(
      authorization,
      createBody,
    );
    const { code } = result;
    res.status(code).send(result);
  }

  @Get(':id/products')
  @ApiOperation({ summary: 'Find all flash sale products' })
  @ApiConsumes('application/x-www-form-urlencoded')
  async findAllProduct(
    @Param('id') id: number,
    @Query() request: FindAllFlashSaleProductDto,
    @Res() res: Response,
    @Headers('Authorization') authorization: string,
  ) {
    const result = await this.flashSaleService.findAllProduct(
      authorization,
      id,
      request,
    );
    const { code } = result;
    res.status(code).send(result);
  }

  @Post(':id/product')
  @ApiOperation({ summary: 'Add new flash sale product' })
  @ApiConsumes('application/json')
  @ApiBody({
    type: CreateFlashSaleProductDto,
  })
  async addProduct(
    @Param('id') id: number,
    @Body() createBody: CreateFlashSaleProductDto,
    @Res() res: Response,
    @Headers('Authorization') authorization: string,
  ) {
    const result = await this.flashSaleService.addProduct(
      authorization,
      id,
      createBody,
    );
    const { code } = result;
    res.status(code).send(result);
  }

  @Put(':flashSaleId/product/:flashSaleProductId')
  @ApiOperation({ summary: 'Update flash sale product' })
  @ApiConsumes('application/json')
  @ApiBody({
    type: CreateFlashSaleProductDto,
  })
  async updateProduct(
    @Param('flashSaleId') flashSaleId: number,
    @Param('flashSaleProductId') flashSaleProductId: number,
    @Body() updateBody: CreateFlashSaleProductDto,
    @Res() res: Response,
    @Headers('Authorization') authorization: string,
  ) {
    const result = await this.flashSaleService.updateProduct(
      authorization,
      flashSaleProductId,
      updateBody,
    );
    const { code } = result;
    res.status(code).send(result);
  }

  @Post('product/delete')
  @ApiOperation({ summary: 'Delete flash sale products' })
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiBody({
    type: DeleteFlashSaleProductDto,
  })
  async deleteProduct(
    @Body('ids') ids: [number],
    @Res() res: Response,
    @Headers('Authorization') authorization: string,
  ) {
    const result = await this.flashSaleService.deleteProducts(
      authorization,
      ids,
    );
    const { code } = result;
    res.status(code).send(result);
  }

  @Get('product/:id')
  @ApiOperation({ summary: 'Get flash sale product detail' })
  @ApiConsumes('application/x-www-form-urlencoded')
  async findProduct(
    @Param('id') id: number,
    @Res() res: Response,
    @Headers('Authorization') authorization: string,
  ) {
    const result = await this.flashSaleService.findProduct(authorization, id);
    const { code } = result;
    res.status(code).send(result);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update flash sale' })
  @ApiConsumes('application/json')
  @ApiBody({
    type: CreateFlashSaleDto,
  })
  async update(
    @Param('id') id: number,
    @Body() updateBody: CreateFlashSaleDto,
    @Res() res: Response,
    @Headers('Authorization') authorization: string,
  ) {
    const result = await this.flashSaleService.update(
      authorization,
      id,
      updateBody,
    );
    const { code } = result;
    res.status(code).send(result);
  }

  @Post('delete')
  @ApiOperation({ summary: 'Delete flash sale' })
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiBody({
    type: DeleteFlashSaleDto,
  })
  async delete(
    @Body('ids') ids: [number],
    @Res() res: Response,
    @Headers('Authorization') authorization: string,
  ) {
    const result = await this.flashSaleService.delete(authorization, ids);
    const { code } = result;
    res.status(code).send(result);
  }

  @Post(':id/activate')
  @ApiOperation({ summary: 'Activate flash sale' })
  @ApiConsumes('application/x-www-form-urlencoded')
  async activate(
    @Param('id') id: number,
    @Res() res: Response,
    @Headers('Authorization') authorization: string,
  ) {
    const result = await this.flashSaleService.activate(authorization, id);
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
    const result = await this.flashSaleService.getProductList(authorization);
    const { code } = result;
    res.status(code).send(result);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get flash sale detail' })
  @ApiConsumes('application/x-www-form-urlencoded')
  async findOne(
    @Param('id') id: number,
    @Res() res: Response,
    @Headers('Authorization') authorization: string,
  ) {
    const result = await this.flashSaleService.findOne(authorization, id);
    const { code } = result;
    res.status(code).send(result);
  }
}
