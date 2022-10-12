import { Controller, UseGuards } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CreateFlashSaleProductDto } from './dto/create-product.dto';
import { FindAllFlashSaleDto } from './dto/find-all.dto';
import { UpdateFlashSaleProductDto } from './dto/update-product.dto';
import { FlashSaleService } from './flash-sale.service';

import { AuthGuard } from 'src/common/guards/auth.guard';
import { PermissionsGuard } from 'src/common/guards/permissions.guard';
import { Permissions } from 'src/common/decorators/permissions.decorator';
import { UpdateFlashSaleDto } from './dto/update.dto';
import { CreateFlashSaleDto } from './dto/create.dto';
import { FindAllFlashSaleProductDto } from './dto/find-all-product.dto';
@Controller('flash-sale')
@UseGuards(AuthGuard, PermissionsGuard)
export class FlashSaleController {
  constructor(private readonly flashSaleService: FlashSaleService) { }

  @MessagePattern('admin-flash-sale-find-all')
  @Permissions('flash_sale')
  async findAll({ body }: { body: FindAllFlashSaleDto }) {
    return {
      code: 200,
      data: await this.flashSaleService.findAll(body),
    };
  }

  @MessagePattern('admin-flash-sale-create')
  @Permissions('flash_sale')
  async create({
    body,
    user_id,
  }: {
    body: CreateFlashSaleDto;
    user_id: number;
  }) {
    return await this.flashSaleService.create(body, user_id);
  }

  @MessagePattern('admin-flash-sale-update')
  @Permissions('flash_sale')
  async update({ body }: { body: UpdateFlashSaleDto }) {
    return await this.flashSaleService.update(body);
  }

  @MessagePattern('admin-flash-sale-find-one')
  @Permissions('flash_sale')
  async findOne({ body }) {
    const { id } = body;
    const result = await this.flashSaleService.findOne(id);
    return {
      code: result ? 200 : 404,
      data: result || 'Flash sale not found',
    };
  }

  @MessagePattern('admin-flash-sale-delete')
  @Permissions('flash_sale')
  async delete({ body }) {
    const { ids } = body;
    const result = await this.flashSaleService.delete(ids);
    return result;
  }

  @MessagePattern('admin-flash-sale-get-product-list')
  @Permissions('flash_sale')
  async getProductList() {
    const result = await this.flashSaleService.getProductList();
    return result;
  }

  @MessagePattern('admin-flash-sale-find-all-products')
  @Permissions('flash_sale')
  async findAllProduct({ body }: { body: FindAllFlashSaleProductDto }) {
    return {
      code: 200,
      data: await this.flashSaleService.findAllProduct(body),
    };
  }

  @MessagePattern('admin-flash-sale-find-product')
  @Permissions('flash_sale')
  async findProduct({ body }) {
    const { id } = body;
    const result = await this.flashSaleService.findProduct(id);
    return {
      code: result ? 200 : 404,
      data: result || 'Flash sale product not found',
    };
  }

  @MessagePattern('admin-flash-sale-add-product')
  @Permissions('flash_sale')
  async addProduct({ body }: { body: CreateFlashSaleProductDto }) {
    return await this.flashSaleService.addProduct(body);
  }

  @MessagePattern('admin-flash-sale-update-product')
  @Permissions('flash_sale')
  async updateProduct({ body }: { body: UpdateFlashSaleProductDto }) {
    return await this.flashSaleService.updateProduct(body);
  }

  @MessagePattern('admin-flash-sale-delete-products')
  @Permissions('flash_sale')
  async deleteProducts({ body }) {
    const { ids } = body;
    const result = await this.flashSaleService.deleteProducts(ids);
    return result;
  }

  @MessagePattern('admin-flash-sale-activate')
  @Permissions('flash_sale')
  async activateFlashSale({ body }) {
    return await this.flashSaleService.activateFlashSale(body);
  }
}
