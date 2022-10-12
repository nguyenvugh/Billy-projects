import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
  ParseIntPipe,
  ParseArrayPipe,
  Query,
  Headers,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiProperty,
  ApiTags,
} from '@nestjs/swagger';
import { MicroserviceConsts } from 'src/common/constants/microservices';
import { FileToBodyInterceptor } from 'src/common/intercepters/file-to-body.intercepter';
import { MultiFileToBodyInterceptor } from 'src/common/intercepters/multi-file-to-body.intercepter';
import { AuthToken } from '../../common/decorators/auth-token.decorator';
import { AdminProductCategoryService } from './admin-product-category.service';
import { CreateAdminProductCategoryDto } from './dto/create-admin-product-category.dto';
import { FindAdminProductCategoryDto } from './dto/find-admin-product-category.dto';
import { UpdateAdminProductCategoryDto } from './dto/update-admin-product-category.dto';
import { UpdateProductCategoriesDisplayOrderDto } from './dto/update-product-categories-display-order.dto';
// import { Express } from 'express';

@Controller(`${MicroserviceConsts.PREFIX.ADMIN}/product-category`)
@ApiTags('Admin Product Category')
@ApiBearerAuth()
export class AdminProductCategoryController {
  constructor(
    private readonly adminProductCategoryService: AdminProductCategoryService,
  ) {}

  @Get('init-slug-data')
  @ApiConsumes('application/x-www-form-urlencoded')
  async initSlugData(@Headers('Authorization') authorization: string) {
    return await this.adminProductCategoryService.initSlugData(authorization);
  }

  @Post()
  create(
    @Body() createAdminProductCategoryDto: CreateAdminProductCategoryDto,
    @Headers('Authorization') authorization: string,
  ) {
    return this.adminProductCategoryService.create(
      authorization,
      createAdminProductCategoryDto,
    );
  }

  @Get()
  findAll(
    @Query() params: FindAdminProductCategoryDto,
    @Headers('Authorization') authorization: string,
  ) {
    return this.adminProductCategoryService.findAll(authorization, params);
  }

  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number,
    @Headers('Authorization') authorization: string,
  ) {
    return this.adminProductCategoryService.findOne(authorization, id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAdminProductCategoryDto: UpdateAdminProductCategoryDto,
    @Headers('Authorization') authorization: string,
  ) {
    return this.adminProductCategoryService.update(
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
    return this.adminProductCategoryService.remove(authorization, id);
  }

  @Delete()
  removeMulti(
    @Query('ids', ParseArrayPipe) ids: number[],
    @Headers('Authorization') authorization: string,
  ) {
    return this.adminProductCategoryService.removeMulti(authorization, ids);
  }

  @Post('/orders')
  updateProductCategoriesDisplayOrder(
    @Body() reqData: UpdateProductCategoriesDisplayOrderDto,
    @AuthToken() authorization: string,
  ) {
    return this.adminProductCategoryService.updateProductCategoriesDisplayOrder(
      authorization,
      reqData,
    );
  }
}
