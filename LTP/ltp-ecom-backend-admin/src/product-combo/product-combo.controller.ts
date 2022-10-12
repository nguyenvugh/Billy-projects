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
import { MessagePattern } from '@nestjs/microservices';
import { AuthGuard } from '../common/guards/auth.guard';
import { PermissionsGuard } from '../common/guards/permissions.guard';
import { Permissions } from '../common/decorators/permissions.decorator';
import { FindAllProductCombosDto } from './dto/find-all-product-combos.dto';
import { CreateOneProductComboDto } from './dto/create-one-product-combo.dto';
import { UpdateOneProductComboDto } from './dto/update-one-product-combo.dto';
import { UpdateOneProductComboStatusDto } from './dto/update-one-product-combo-status.dto';
import { DeleteMultiProductCombosDto } from './dto/delete-multi-product-combos.dto';
import { ProductComboService } from './product-combo.service';

@Controller('product-combo')
@UseGuards(AuthGuard, PermissionsGuard)
export class ProductComboController {
  constructor(private readonly productComboService: ProductComboService) {}

  @MessagePattern('admin-product-combo-find-all-product-combos')
  @Permissions('product_combo')
  async findAllInventories({ body }: { body: FindAllProductCombosDto }) {
    return await this.productComboService.findAllProductCombos(body);
  }

  @MessagePattern('admin-product-combo-get-one-product-combo')
  @Permissions('product_combo')
  async getOneProductCombo({ id }: { id: number }) {
    return await this.productComboService.getOneProductCombo(id);
  }

  @MessagePattern('admin-product-combo-create-one-product-combo')
  @Permissions('product_combo')
  async createOneProductCombo({ body }: { body: CreateOneProductComboDto }) {
    return await this.productComboService.createOneProductCombo(body);
  }

  @MessagePattern('admin-product-combo-update-one-product-combo')
  @Permissions('product_combo')
  async updateOneProductCombo({
    id,
    body,
    user_id,
  }: {
    id: number;
    body: UpdateOneProductComboDto;
    user_id: number;
  }) {
    return await this.productComboService.updateOneProductCombo(
      id,
      body,
      user_id,
    );
  }

  @MessagePattern('admin-product-combo-update-one-product-combo-status')
  @Permissions('product_combo')
  async updateOneProductComboStatus({
    id,
    body,
  }: {
    id: number;
    body: UpdateOneProductComboStatusDto;
  }) {
    return await this.productComboService.updateOneProductComboStatus(id, body);
  }

  @MessagePattern('admin-product-combo-soft-delete-multi-product-combos')
  @Permissions('product_combo')
  async softDeleteMultiProductCombos({
    body,
    user_id,
  }: {
    body: DeleteMultiProductCombosDto;
    user_id: number;
  }) {
    return await this.productComboService.softDeleteMultiProductCombos(
      user_id,
      body,
    );
  }
}
