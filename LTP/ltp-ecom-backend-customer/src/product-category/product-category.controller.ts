import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { ProductCategoryService } from './product-category.service';
import { FindAllProductCategoryDto } from './dto/find-all-product-cataegory.dto';
import { FindOneProductCategoryBySlugDto } from './dto/find-one-product-category-by-slug.dto';
import { CreateProductCategoryDto } from './dto/create-product-category.dto';
import { UpdateProductCategoryDto } from './dto/update-product-category.dto';

@Controller('product-category')
export class ProductCategoryController {
  constructor(
    private readonly productCategoryService: ProductCategoryService,
  ) {}

  @MessagePattern('customer-product-category-find-all')
  async findAll(reqData: FindAllProductCategoryDto) {
    return await this.productCategoryService.findAll(reqData);
  }

  @MessagePattern('customer-product-category-find-one-by-slug')
  async findOneBySlug(reqData: FindOneProductCategoryBySlugDto) {
    return await this.productCategoryService.findOneBySlug(reqData);
  }

  @MessagePattern('customer-product-category-find-slug-other-lang')
  async findSlugOtherLang({ lang, slug, otherLang }) {
    return await this.productCategoryService.findSlugOtherLang(
      lang,
      slug,
      otherLang,
    );
  }

  /*
  @Post()
  create(@Body() createProductCategoryDto: CreateProductCategoryDto) {
    return this.productCategoryService.create(createProductCategoryDto);
  }

  @Get()
  findAll() {
    return this.productCategoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productCategoryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductCategoryDto: UpdateProductCategoryDto) {
    return this.productCategoryService.update(+id, updateProductCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productCategoryService.remove(+id);
  }
  */
}
