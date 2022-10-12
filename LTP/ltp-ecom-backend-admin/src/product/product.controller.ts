import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { FindProductDto } from './dto/find-product.dto';

import { AuthGuard } from 'src/common/guards/auth.guard';
import { PermissionsGuard } from 'src/common/guards/permissions.guard';
import { Permissions } from 'src/common/decorators/permissions.decorator';

@Controller('product')
@UseGuards(AuthGuard, PermissionsGuard)
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @MessagePattern('admin-product-init-slug-data')
  @Permissions('product')
  initSlugData() {
    return this.productService.initSlugData();
  }

  @MessagePattern('admin-product-create-config-product-attribute')
  @Permissions('product')
  createConfigProductAttribute() {
    return this.productService.createConfigProductAttribute();
  }

  @MessagePattern('admin-product-create')
  @Permissions('product')
  create({ body }: { body: CreateProductDto }) {
    return this.productService.create(body);
  }

  @MessagePattern('admin-product-find-all')
  @Permissions('product')
  findAll({ body }: { body: FindProductDto }) {
    return this.productService.findAll(body);
  }

  @MessagePattern('admin-product-find-one')
  @Permissions('product')
  findOne({ body }) {
    const { id } = body;
    return this.productService.findOne(id);
  }

  @MessagePattern('admin-product-update-one')
  @Permissions('product')
  update({ body }: { body: UpdateProductDto }) {
    return this.productService.update(body.id, body);
  }

  @MessagePattern('admin-product-remove-one')
  @Permissions('product')
  remove({ body }) {
    const { id } = body;
    return this.productService.remove(id);
  }

  @MessagePattern('admin-product-remove-multi')
  @Permissions('product')
  removeMulti({ body }) {
    const { ids } = body;
    return this.productService.removeMulti(ids);
  }
}
