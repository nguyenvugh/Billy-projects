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
import { InventoryService } from './inventory.service';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { FindAllInventoriesDto } from './dto/find-all-inventories.dto';
import { FindAllInventoryProductsDto } from './dto/find-all-inventory-products.dto';
import { DeleteMultiInventoriesDto } from './dto/delete-multi-inventories.dto';
import { DeleteMultiInventoryProductsDto } from './dto/delete-multi-inventory-products.dto';
import { DeleteMultiInventoryInputHistoriesDto } from './dto/delete-multi-inventory-input-histories.dto';
import { CreateInventoryInputHistoryDto } from './dto/create-inventory-input-history.dto';
import { UpdateInventoryInputHistoryDto } from './dto/update-inventory-input-history.dto';
import { FindAllInventoryInputHistoriesDto } from './dto/find-all-inventory-input-histories.dto';
import { FindOneInventoryInputHistoryDto } from './dto/find-one-inventory-input-history.dto';

@Controller('inventory')
@UseGuards(AuthGuard, PermissionsGuard)
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @MessagePattern('admin-inventory-find-all-inventories')
  @Permissions('inventory')
  async findAllInventories({ body }: { body: FindAllInventoriesDto }) {
    return await this.inventoryService.findAllInventories(body);
  }

  @MessagePattern('admin-inventory-create-one-inventory')
  @Permissions('inventory')
  async createOneInventory({ body }: { body: CreateInventoryDto }) {
    return await this.inventoryService.createOneInventory(body);
  }

  @MessagePattern('admin-inventory-update-one-inventory')
  @Permissions('inventory')
  async updateOneInventory({ body }: { body: UpdateInventoryDto }) {
    return await this.inventoryService.updateOneInventory(body);
  }

  @MessagePattern('admin-inventory-soft-delete-multi-inventories')
  @Permissions('inventory')
  async softDeleteMultiInventories({
    body,
    user_id,
  }: {
    body: DeleteMultiInventoriesDto;
    user_id: number;
  }) {
    return await this.inventoryService.softDeleteMultiInventories(
      user_id,
      body,
    );
  }

  @MessagePattern('admin-inventory-find-all-inventory-products')
  @Permissions('inventory')
  async findAllInventoryProducts({
    body,
  }: {
    body: FindAllInventoryProductsDto;
  }) {
    return await this.inventoryService.findAllInventoryProducts(body);
  }

  @MessagePattern('admin-inventory-create-one-inventory-input-history')
  @Permissions('inventory')
  async createOneInventoryInputHistory({
    body,
    user_id,
  }: {
    body: CreateInventoryInputHistoryDto;
    user_id: number;
  }) {
    return await this.inventoryService.createOneInventoryInputHistory(
      user_id,
      body,
    );
  }

  @MessagePattern('admin-inventory-update-one-inventory-input-history')
  @Permissions('inventory')
  async updateOneInventoryInputHistory({
    body,
    user_id,
  }: {
    body: UpdateInventoryInputHistoryDto;
    user_id: number;
  }) {
    return await this.inventoryService.updateOneInventoryInputHistory(
      user_id,
      body,
    );
  }

  @MessagePattern('admin-inventory-delete-multi-inventory-products')
  @Permissions('inventory')
  async deleteMultiInventoryProducts({
    body,
    user_id,
  }: {
    body: DeleteMultiInventoryProductsDto;
    user_id: number;
  }) {
    return await this.inventoryService.deleteMultiInventoryProducts(
      user_id,
      body,
    );
  }

  @MessagePattern('admin-inventory-find-all-inventory-input-histories')
  @Permissions('inventory')
  async findAllInventoryInputHistories({
    body,
  }: {
    body: FindAllInventoryInputHistoriesDto;
  }) {
    return await this.inventoryService.findAllInventoryInputHistories(body);
  }

  @MessagePattern('admin-inventory-find-one-inventory-input-history')
  @Permissions('inventory')
  async findOneInventoryInputHistory({
    body,
  }: {
    body: FindOneInventoryInputHistoryDto;
  }) {
    return await this.inventoryService.findOneInventoryInputHistory(body);
  }

  @MessagePattern('admin-inventory-soft-delete-multi-inventory-input-histories')
  @Permissions('inventory')
  async softDeleteMultiInventoryInputHistories({
    body,
    user_id,
  }: {
    body: DeleteMultiInventoryInputHistoriesDto;
    user_id: number;
  }) {
    return await this.inventoryService.softDeleteMultiInventoryInputHistories(
      user_id,
      body,
    );
  }

  /*
  @Post()
  create(@Body() createInventoryDto: CreateInventoryDto) {
    return this.inventoryService.create(createInventoryDto);
  }

  @Get()
  findAll() {
    return this.inventoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.inventoryService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateInventoryDto: UpdateInventoryDto,
  ) {
    return this.inventoryService.update(+id, updateInventoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.inventoryService.remove(+id);
  }
  */
}
