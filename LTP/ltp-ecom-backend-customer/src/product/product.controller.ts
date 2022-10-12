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
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FindAllProductsDto } from './dto/find-all-products.dto';
import { FindOneProductDto } from './dto/find-one-product.dto';
import { FindOneProductBySlugDto } from './dto/find-one-product-by-slug.dto';
import { FindRelatedProductsDto } from './dto/find-related-products.dto';
import { FindProductReviewsDto } from './dto/find-product-reviews.dto';
import { FindProductReviewsBySlugDto } from './dto/find-product-reviews-by-slug.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @MessagePattern('customer-product-find-all')
  async findAll(reqData: FindAllProductsDto) {
    return await this.productService.findAll(reqData);
  }

  @MessagePattern('customer-product-find-one')
  async findOne(reqData: FindOneProductDto) {
    return await this.productService.findOne(reqData);
  }

  @MessagePattern('customer-product-find-one-by-slug')
  async findOneBySlug(reqData: FindOneProductBySlugDto) {
    return await this.productService.findOneBySlug(reqData);
  }

  @MessagePattern('customer-product-find-related')
  async findRelated(reqData: FindRelatedProductsDto) {
    return await this.productService.findRelated(reqData);
  }

  @MessagePattern('customer-product-find-reviews')
  async findReviews(reqData: FindProductReviewsDto) {
    return await this.productService.findReviews(reqData);
  }

  @MessagePattern('customer-product-find-reviews-by-slug')
  async findReviewsBySlug(reqData: FindProductReviewsBySlugDto) {
    return await this.productService.findReviewsBySlug(reqData);
  }

  @MessagePattern('customer-product-find-slug-other-lang')
  async findSlugOtherLang({ lang, slug, otherLang }) {
    return await this.productService.findSlugOtherLang(lang, slug, otherLang);
  }

  /*
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
  */
}
