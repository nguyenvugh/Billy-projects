import {
  Controller,
  ClassSerializerInterceptor,
  UseInterceptors,
  UseGuards,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Headers,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiConsumes,
} from '@nestjs/swagger';
import { MicroserviceConsts } from '../../common/constants/microservices';
import { AuthToken } from '../../common/decorators/auth-token.decorator';
import { FindAllProductCombosDto } from './dto/find-all-product-combos.dto';
import { CreateOneProductComboDto } from './dto/create-one-product-combo.dto';
import { UpdateOneProductComboDto } from './dto/update-one-product-combo.dto';
import { UpdateOneProductComboStatusDto } from './dto/update-one-product-combo-status.dto';
import { DeleteMultiProductCombosDto } from './dto/delete-multi-product-combos.dto';
import { ProductComboService } from './product-combo.service';

@Controller(`${MicroserviceConsts.PREFIX.ADMIN}/product-combo`)
@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('Admin Product Combos Management')
@ApiBearerAuth()
export class ProductComboController {
  constructor(private readonly productComboService: ProductComboService) {}

  @Get()
  @ApiOperation({ summary: 'Get list product combos' })
  @ApiConsumes('application/x-www-form-urlencoded')
  async findAllProductCombos(
    @Query() reqData: FindAllProductCombosDto,
    @AuthToken() authorization: string,
  ) {
    return await this.productComboService.findAllProductCombos(
      authorization,
      reqData,
    );
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get one product combo' })
  async getOneProductCombo(
    @Param('id') id: number,
    @AuthToken() authorization: string,
  ) {
    return await this.productComboService.getOneProductCombo(authorization, id);
  }

  @Post()
  @ApiOperation({ summary: 'Create one product combo' })
  async createOneInventory(
    @Body() reqData: CreateOneProductComboDto,
    @AuthToken() authorization: string,
  ) {
    return await this.productComboService.createOneProductCombo(
      authorization,
      reqData,
    );
  }

  @Put('/:id')
  @ApiOperation({ summary: 'Update one product combo' })
  async updateOneProductCombo(
    @Param('id') id: number,
    @Body() reqData: UpdateOneProductComboDto,
    @AuthToken() authorization: string,
  ) {
    return await this.productComboService.updateOneProductCombo(
      authorization,
      id,
      reqData,
    );
  }

  @Put('/:id/status')
  @ApiOperation({ summary: 'Update one product combo status' })
  @ApiConsumes('application/x-www-form-urlencoded')
  async updateOneProductComboStatus(
    @Param('id') id: number,
    @Body() reqData: UpdateOneProductComboStatusDto,
    @AuthToken() authorization: string,
  ) {
    return await this.productComboService.updateOneProductComboStatus(
      authorization,
      id,
      reqData,
    );
  }

  @Delete()
  @ApiOperation({ summary: 'Delete multi product combos' })
  @ApiConsumes('application/x-www-form-urlencoded')
  async softDeleteMultiProductCombos(
    @Query() reqData: DeleteMultiProductCombosDto,
    @AuthToken() authorization: string,
  ) {
    return await this.productComboService.softDeleteMultiProductCombos(
      authorization,
      reqData,
    );
  }
}
