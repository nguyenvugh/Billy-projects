import { Controller, UseGuards } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { FindAllShopDto } from './dto/find-all.dto';

import { AuthGuard } from 'src/common/guards/auth.guard';
import { PermissionsGuard } from 'src/common/guards/permissions.guard';
import { Permissions } from 'src/common/decorators/permissions.decorator';
import { ShopService } from './shop.service';
import { CreateShopDto } from './dto/create.dto';
import { UpdateShopDto } from './dto/update.dto';

@Controller('shop')
@UseGuards(AuthGuard, PermissionsGuard)
export class ShopController {
  constructor(private readonly shopService: ShopService) { }

  @MessagePattern('admin-shop-find-all')
  @Permissions('store')
  async findAll({ body }: { body: FindAllShopDto }) {
    return {
      code: 200,
      data: await this.shopService.findAll(body),
    };
  }

  @MessagePattern('admin-shop-create')
  @Permissions('store')
  async create({ body }: { body: CreateShopDto }) {
    return await this.shopService.create(body);
  }

  @MessagePattern('admin-shop-find-one')
  @Permissions('store')
  async findOne({ body }) {
    const { id } = body;
    const result = await this.shopService.findOne(id);
    return {
      code: result ? 200 : 404,
      data: result || 'Shop not found',
    };
  }

  @MessagePattern('admin-shop-update-one')
  @Permissions('store')
  async updateOne({ body }: { body: UpdateShopDto }) {
    const result = await this.shopService.update(body);
    return result;
  }

  @MessagePattern('admin-shop-delete')
  @Permissions('store')
  async delete({ body }) {
    const { ids } = body;
    const result = await this.shopService.delete(ids);
    return result;
  }
}
