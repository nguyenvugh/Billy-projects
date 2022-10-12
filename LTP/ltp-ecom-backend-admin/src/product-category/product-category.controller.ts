import {
  ClassSerializerInterceptor,
  Controller,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ProductCategoryService } from './product-category.service';
import { CreateProductCategoryDto } from './dto/create-product-category.dto';
import { UpdateProductCategoryDto } from './dto/update-product-category.dto';
import { UpdateProductCategoriesDisplayOrderDto } from './dto/update-product-categories-display-order.dto';
import { Express } from 'express';
import { FindAdminProductCategoryDto } from './dto/find-admin-product-category.dto';

import { AuthGuard } from 'src/common/guards/auth.guard';
import { PermissionsGuard } from 'src/common/guards/permissions.guard';
import { Permissions } from 'src/common/decorators/permissions.decorator';

@Controller()
@UseGuards(AuthGuard, PermissionsGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class ProductCategoryController {
  constructor(private readonly categoryService: ProductCategoryService) {}

  @MessagePattern('admin-product-category-init-slug-data')
  @Permissions('product_category')
  async initSlugData() {
    return await this.categoryService.initSlugData();
  }

  @MessagePattern('admin-product-category-create')
  @Permissions('product_category')
  create({ body }: { body: CreateProductCategoryDto }) {
    return this.categoryService.create(body);
  }

  @MessagePattern('admin-product-category-find-all')
  @Permissions('product_category')
  findAll({ body }: { body: FindAdminProductCategoryDto }) {
    return this.categoryService.findAll(body);
  }

  @MessagePattern('admin-product-category-find-one')
  @Permissions('product_category')
  findOne({ body }) {
    const { id } = body;
    return this.categoryService.findOne(id);
  }

  @MessagePattern('admin-product-category-update-one')
  @Permissions('product_category')
  update({ body }: { body: UpdateProductCategoryDto }) {
    return this.categoryService.update(body.id, body);
  }

  @MessagePattern('admin-product-category-remove-one')
  @Permissions('product_category')
  remove({ body }) {
    const { id } = body;
    return this.categoryService.remove(id);
  }

  @MessagePattern('admin-product-category-remove-multi')
  @Permissions('product_category')
  removeMulti({ body }) {
    const { ids } = body;
    return this.categoryService.removeMulti(ids);
  }

  @MessagePattern(
    'admin-product-category-update-many-product-categories-display-order',
  )
  @Permissions('product_category')
  updateProductCategoriesDisplayOrder({
    body,
  }: {
    body: UpdateProductCategoriesDisplayOrderDto;
  }) {
    return this.categoryService.updateProductCategoriesDisplayOrder(body);
  }
}
