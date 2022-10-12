import { Injectable } from '@nestjs/common';
import { FindAllInventoriesDto } from './dto/find-all-inventories.dto';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { DeleteMultiInventoriesDto } from './dto/delete-multi-inventories.dto';
import { DeleteMultiInventoryProductsDto } from './dto/delete-multi-inventory-products.dto';
import { DeleteMultiInventoryInputHistoriesDto } from './dto/delete-multi-inventory-input-histories.dto';
import { FindAllInventoryProductsDto } from './dto/find-all-inventory-products.dto';
import { CreateInventoryInputHistoryDto } from './dto/create-inventory-input-history.dto';
import { FindAllInventoryInputHistoriesDto } from './dto/find-all-inventory-input-histories.dto';
import { MicroserviceService } from '../microservice/microservice.service';

@Injectable()
export class InventoryService {
  constructor(private microserviceService: MicroserviceService) {}

  async findAllInventories(authorization, body: FindAllInventoriesDto) {
    return await this.microserviceService.call(
      'admin-inventory-find-all-inventories',
      {
        body,
        authorization,
      },
    );
  }

  async createOneInventory(authorization, body: CreateInventoryDto) {
    return await this.microserviceService.call(
      'admin-inventory-create-one-inventory',
      {
        body,
        authorization,
      },
    );
  }

  async updateOneInventory(
    authorization,
    id: number,
    body: UpdateInventoryDto,
  ) {
    return await this.microserviceService.call(
      'admin-inventory-update-one-inventory',
      {
        body: {
          ...body,
          id,
        },
        authorization,
      },
    );
  }

  async softDeleteMultiInventories(
    authorization,
    body: DeleteMultiInventoriesDto,
  ) {
    return await this.microserviceService.call(
      'admin-inventory-soft-delete-multi-inventories',
      {
        body,
        authorization,
      },
    );
  }

  async findAllInventoryProducts(
    authorization,
    id: number,
    body: FindAllInventoryProductsDto,
  ) {
    return await this.microserviceService.call(
      'admin-inventory-find-all-inventory-products',
      {
        body: {
          ...body,
          inventory: id,
        },
        authorization,
      },
    );
  }

  async createOneInventoryInputHistory(
    authorization,
    inventory: number,
    body: CreateInventoryInputHistoryDto,
  ) {
    return await this.microserviceService.call(
      'admin-inventory-create-one-inventory-input-history',
      {
        body: {
          ...body,
          inventory,
        },
        authorization,
      },
    );
  }

  async updateOneInventoryInputHistory(
    authorization,
    inventory: number,
    inputHistory: number,
    body: CreateInventoryInputHistoryDto,
  ) {
    return await this.microserviceService.call(
      'admin-inventory-update-one-inventory-input-history',
      {
        body: {
          ...body,
          inventory,
          input_history: inputHistory,
        },
        authorization,
      },
    );
  }

  async deleteMultiInventoryProducts(
    authorization,
    inventory: number,
    body: DeleteMultiInventoryProductsDto,
  ) {
    return await this.microserviceService.call(
      'admin-inventory-delete-multi-inventory-products',
      {
        body: {
          ...body,
          inventory,
        },
        authorization,
      },
    );
  }

  async findAllInventoryInputHistories(
    authorization,
    body: FindAllInventoryInputHistoriesDto,
  ) {
    return await this.microserviceService.call(
      'admin-inventory-find-all-inventory-input-histories',
      {
        body,
        authorization,
      },
    );
  }

  async findOneInventoryInputHistory(
    authorization,
    inventory: number,
    inputHistory: number,
  ) {
    return await this.microserviceService.call(
      'admin-inventory-find-one-inventory-input-history',
      {
        body: {
          inventory,
          input_history: inputHistory,
        },
        authorization,
      },
    );
  }

  async softDeleteMultiInventoryInputHistories(
    authorization,
    inventory: number,
    body: DeleteMultiInventoryInputHistoriesDto,
  ) {
    return await this.microserviceService.call(
      'admin-inventory-soft-delete-multi-inventory-input-histories',
      {
        body: {
          ...body,
          inventory,
        },
        authorization,
      },
    );
  }
}
