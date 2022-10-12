import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  ParseArrayPipe,
  Query,
  Headers,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { MicroserviceConsts } from 'src/common/constants/microservices';
import { AdminProductService } from './admin-product.service';
import { CreateAdminProductDto } from './dto/create-admin-product.dto';
import { FindAdminProductDto } from './dto/find-admin-product.dto';
import { UpdateAdminProductDto } from './dto/update-admin-product.dto';

@Controller(`${MicroserviceConsts.PREFIX.ADMIN}/product`)
@ApiTags('Admin Product')
@ApiBearerAuth()
export class AdminProductController {
  constructor(private readonly adminProductService: AdminProductService) {}

  @Get('init-slug-data')
  initSlugData(@Headers('Authorization') authorization: string) {
    return this.adminProductService.initSlugData(authorization);
  }

  @Post('init-config-product-attribute')
  createConfigProductAttribute(
    @Headers('Authorization') authorization: string,
  ) {
    return this.adminProductService.createConfigProductAttribute(authorization);
  }

  @Post()
  create(
    @Body() createAdminProductCategoryDto: CreateAdminProductDto,
    @Headers('Authorization') authorization: string,
  ) {
    return this.adminProductService.create(
      authorization,
      createAdminProductCategoryDto,
    );
  }

  @Get()
  findAll(
    @Query() params: FindAdminProductDto,
    @Headers('Authorization') authorization: string,
  ) {
    return this.adminProductService.findAll(authorization, params);
  }

  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number,
    @Headers('Authorization') authorization: string,
  ) {
    return this.adminProductService.findOne(authorization, id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAdminProductCategoryDto: UpdateAdminProductDto,
    @Headers('Authorization') authorization: string,
  ) {
    return this.adminProductService.update(
      authorization,
      id,
      updateAdminProductCategoryDto,
    );
  }

  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe) id: number,
    @Headers('Authorization') authorization: string,
  ) {
    return this.adminProductService.remove(authorization, id);
  }

  @Delete()
  removeMulti(
    @Query('ids', ParseArrayPipe) ids: number[],
    @Headers('Authorization') authorization: string,
  ) {
    return this.adminProductService.removeMulti(authorization, ids);
  }
}
