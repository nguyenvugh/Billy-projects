import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ClassSerializerInterceptor,
  UseInterceptors,
  UseGuards,
  Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiHeader,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiConsumes,
  ApiOkResponse,
} from '@nestjs/swagger';
import { MicroserviceConsts } from '../../common/constants/microservices';
import { CurrentLang } from '../../common/decorators/current-lang.decorator';
import { ProductCategoryService } from './product-category.service';
import { CustomerFindAllProductCategoryDto } from './dto/find-all-product-cataegory.dto';
import { FindSLugOtherLangDto } from './dto/find-slug-other-lang.dto';
import { CreateProductCategoryDto } from './dto/create-product-category.dto';
import { UpdateProductCategoryDto } from './dto/update-product-category.dto';
import { ListProductCategoriesEntity } from './entities/list.entity';
import { ProductCategoryEntity } from './entities/product-category.entity';

@Controller(`${MicroserviceConsts.PREFIX.CUSTOMER}/product-category`)
@ApiTags('Customer Product Category')
@UseInterceptors(ClassSerializerInterceptor)
export class ProductCategoryController {
  constructor(
    private readonly productCategoryService: ProductCategoryService,
  ) {}

  @Post()
  create(@Body() createProductCategoryDto: CreateProductCategoryDto) {
    return this.productCategoryService.create(createProductCategoryDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get list product categories on web customer' })
  @ApiConsumes('application/x-www-form-urlencoded')
  async findAll(
    @CurrentLang() curLang,
    @Query() reqData: CustomerFindAllProductCategoryDto,
  ) {
    return new ListProductCategoriesEntity(
      await this.productCategoryService.findAll(curLang, reqData),
    );
    //return await this.productCategoryService.findAll(curLang, reqData);
  }

  @Get('find-slug-other-lang')
  @ApiOperation({ summary: 'Get product category slug in other lang' })
  @ApiConsumes('application/x-www-form-urlencoded')
  async findSlugOtherLang(
    @CurrentLang() curLang,
    @Query() reqData: FindSLugOtherLangDto,
  ) {
    return await this.productCategoryService.findSlugOtherLang(
      curLang,
      reqData,
    );
  }

  @Get('slug/:slug')
  @ApiOperation({ summary: 'Get one product category by slug on web customer' })
  @ApiConsumes('application/x-www-form-urlencoded')
  async findOneBySlug(@CurrentLang() curLang, @Param('slug') slug: string) {
    return new ProductCategoryEntity(
      await this.productCategoryService.findOneBySlug(curLang, slug),
    );
    //return await this.productCategoryService.findAll(curLang, reqData);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productCategoryService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProductCategoryDto: UpdateProductCategoryDto,
  ) {
    return this.productCategoryService.update(+id, updateProductCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productCategoryService.remove(+id);
  }
}
