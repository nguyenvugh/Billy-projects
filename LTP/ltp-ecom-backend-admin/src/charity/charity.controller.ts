import { Controller, UseGuards } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

import { AuthGuard } from 'src/common/guards/auth.guard';
import { PermissionsGuard } from 'src/common/guards/permissions.guard';
import { Permissions } from 'src/common/decorators/permissions.decorator';
import { CharityService } from './charity.service';
import { FindCharityByCriteriaDto } from './dto/find-by-criteria.dto';
import { CreateCharityDto } from './dto/create.dto';
import { UpdateCharityDto } from './dto/update.dto';
import { CreateCharityProductRequirementDto } from './dto/create-product.dto';
import { UpdateCharityProductRequirementDto } from './dto/update-product.dto';
import { FindAllCharityProductDto } from './dto/find-all-product.dto';

@Controller('charity')
@UseGuards(AuthGuard, PermissionsGuard)
export class CharityController {
  constructor(private readonly charityService: CharityService) { }

  @MessagePattern('admin-charity-find-by-criteria')
  @Permissions('charity')
  async findAll({ body }: { body: FindCharityByCriteriaDto }) {
    return {
      code: 200,
      data: await this.charityService.findByCriteria(body),
    };
  }

  @MessagePattern('admin-charity-create')
  @Permissions('charity')
  async create({ body }: { body: CreateCharityDto }) {
    return await this.charityService.create(body);
  }

  @MessagePattern('admin-charity-find-one')
  @Permissions('charity')
  async findOne({ body }) {
    const { id } = body;
    const result = await this.charityService.findOne(id);
    return {
      code: result ? 200 : 404,
      data: result || 'Charity not found',
    };
  }

  @MessagePattern('admin-charity-find-all-products')
  @Permissions('charity')
  async findAllProduct({ body }: { body: FindAllCharityProductDto }) {
    return {
      code: 200,
      data: await this.charityService.findAllProduct(body),
    };
  }

  @MessagePattern('admin-charity-add-product')
  @Permissions('charity')
  async addProduct({ body }: { body: CreateCharityProductRequirementDto }) {
    return await this.charityService.addProduct(body);
  }

  @MessagePattern('admin-charity-find-product')
  @Permissions('charity')
  async findProduct({ body }) {
    const { id } = body;
    const result = await this.charityService.findProduct(id);
    return {
      code: result ? 200 : 404,
      data: result || 'Charity product not found',
    };
  }

  @MessagePattern('admin-charity-update-product')
  @Permissions('charity')
  async updateProduct({ body }: { body: UpdateCharityProductRequirementDto }) {
    return await this.charityService.updateProduct(body);
  }

  @MessagePattern('admin-charity-remove-products')
  @Permissions('charity')
  async removeProducts({ body }) {
    const { ids } = body;
    const result = await this.charityService.removeProducts(ids);
    return result;
  }

  @MessagePattern('admin-charity-update-one')
  @Permissions('charity')
  async updateOne({ body }: { body: UpdateCharityDto }) {
    const result = await this.charityService.update(body);
    return result;
  }

  @MessagePattern('admin-charity-delete')
  @Permissions('charity')
  async delete({ body }) {
    const { ids } = body;
    const result = await this.charityService.delete(ids);
    return result;
  }

  @MessagePattern('admin-charity-update-status')
  @Permissions('charity')
  async updateStatue({ body }) {
    const { id } = body;
    const result = await this.charityService.updateStatus(id);
    return result;
  }
}
