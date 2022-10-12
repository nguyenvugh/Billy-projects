import {
  Controller,
  ClassSerializerInterceptor,
  UseInterceptors,
  UseGuards,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Headers,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiConsumes,
} from '@nestjs/swagger';
import { MicroserviceConsts } from '../../common/constants/microservices';
import { AuthToken } from '../../common/decorators/auth-token.decorator';
import { FindAllInventoriesDto } from './dto/find-all-inventories.dto';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { DeleteMultiInventoriesDto } from './dto/delete-multi-inventories.dto';
import { DeleteMultiInventoryProductsDto } from './dto/delete-multi-inventory-products.dto';
import { DeleteMultiInventoryInputHistoriesDto } from './dto/delete-multi-inventory-input-histories.dto';
import { FindAllInventoryProductsDto } from './dto/find-all-inventory-products.dto';
import { CreateInventoryInputHistoryDto } from './dto/create-inventory-input-history.dto';
import { FindAllInventoryInputHistoriesDto } from './dto/find-all-inventory-input-histories.dto';
import { ListInventoriesOnlyEntity } from './entities/list-inventories-only.entity';
import { InventoryOnlyEntity } from './entities/inventory-only.entity';
import { ListInventoryProductsOnlyEntity } from './entities/list-inventory-products.entity';
import { InventoryInputHistoryEntity } from './entities/inventory-input-history.entity';
import { ListInventoryInputHistoriesEntity } from './entities/list-inventory-input-histories.entity';
import { InventoryService } from './inventory.service';

@Controller(`${MicroserviceConsts.PREFIX.ADMIN}/inventory`)
@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('Admin Inventories Management')
@ApiBearerAuth()
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Get()
  @ApiOperation({ summary: 'Get list inventories' })
  @ApiConsumes('application/x-www-form-urlencoded')
  async findAllInventories(
    @Query() reqData: FindAllInventoriesDto,
    @AuthToken() authorization: string,
  ) {
    return new ListInventoriesOnlyEntity(
      await this.inventoryService.findAllInventories(authorization, reqData),
    );
  }

  @Post()
  @ApiOperation({ summary: 'Create one inventory' })
  @ApiConsumes('application/x-www-form-urlencoded')
  async createOneInventory(
    @Query() reqData: CreateInventoryDto,
    @AuthToken() authorization: string,
  ) {
    return new InventoryOnlyEntity(
      await this.inventoryService.createOneInventory(authorization, reqData),
    );
  }

  @Put(`/:id`)
  @ApiOperation({ summary: 'Update one inventory' })
  @ApiConsumes('application/x-www-form-urlencoded')
  async updateOneInventory(
    @Param('id') id: number,
    @Body() data: UpdateInventoryDto,
    @AuthToken() authorization: string,
  ) {
    return new InventoryOnlyEntity(
      await this.inventoryService.updateOneInventory(authorization, id, data),
    );
  }

  @Delete()
  @ApiOperation({ summary: 'Delete multi inventories' })
  @ApiConsumes('application/x-www-form-urlencoded')
  async softDeleteMultiInventories(
    @Query() reqData: DeleteMultiInventoriesDto,
    @AuthToken() authorization: string,
  ) {
    return await this.inventoryService.softDeleteMultiInventories(
      authorization,
      reqData,
    );
  }

  @Get(`/:id/products`)
  @ApiOperation({ summary: 'Get list inventory products' })
  @ApiConsumes('application/x-www-form-urlencoded')
  async findAllInventoryProducts(
    @Param('id') id: number,
    @Query() data: FindAllInventoryProductsDto,
    @AuthToken() authorization: string,
  ) {
    return new ListInventoryProductsOnlyEntity(
      await this.inventoryService.findAllInventoryProducts(
        authorization,
        id,
        data,
      ),
    );
  }

  @Post(`/:id/input`)
  @ApiOperation({ summary: 'Create one inventory input history' })
  async createOneInventoryInputHistory(
    @Param('id') id: number,
    @Body() data: CreateInventoryInputHistoryDto,
    @AuthToken() authorization: string,
  ) {
    return new InventoryInputHistoryEntity(
      await this.inventoryService.createOneInventoryInputHistory(
        authorization,
        id,
        data,
      ),
    );
  }

  @Put(`/:id/input/:input`)
  @ApiOperation({ summary: 'Update one inventory input history' })
  async updateOneInventoryInputHistory(
    @Param('id') id: number,
    @Param('input') input: number,
    @Body() data: CreateInventoryInputHistoryDto,
    @AuthToken() authorization: string,
  ) {
    return new InventoryInputHistoryEntity(
      await this.inventoryService.updateOneInventoryInputHistory(
        authorization,
        id,
        input,
        data,
      ),
    );
  }

  @Delete('/:id/products')
  @ApiOperation({ summary: 'Delete multi inventory products' })
  @ApiConsumes('application/x-www-form-urlencoded')
  async deleteMultiInventoryProducts(
    @Param('id') id: number,
    @Query() reqData: DeleteMultiInventoryProductsDto,
    @AuthToken() authorization: string,
  ) {
    return await this.inventoryService.deleteMultiInventoryProducts(
      authorization,
      id,
      reqData,
    );
  }

  @Get('/input')
  @ApiOperation({ summary: 'Get list inventory input histories' })
  @ApiConsumes('application/x-www-form-urlencoded')
  async findAllInventoryInputHistories(
    @Query() reqData: FindAllInventoryInputHistoriesDto,
    @AuthToken() authorization: string,
  ) {
    return new ListInventoryInputHistoriesEntity(
      await this.inventoryService.findAllInventoryInputHistories(
        authorization,
        reqData,
      ),
    );
  }

  @Get(`/:id/input/:input`)
  @ApiOperation({ summary: 'Get one inventory input history' })
  async findOneInventoryInputHistory(
    @Param('id') id: number,
    @Param('input') input: number,
    @AuthToken() authorization: string,
  ) {
    return new InventoryInputHistoryEntity(
      await this.inventoryService.findOneInventoryInputHistory(
        authorization,
        id,
        input,
      ),
    );
  }

  @Delete('/:id/input')
  @ApiOperation({ summary: 'Delete multi inventory input histories' })
  @ApiConsumes('application/x-www-form-urlencoded')
  async softDeleteMultiInventoryInputHistories(
    @Param('id') id: number,
    @Query() reqData: DeleteMultiInventoryInputHistoriesDto,
    @AuthToken() authorization: string,
  ) {
    return await this.inventoryService.softDeleteMultiInventoryInputHistories(
      authorization,
      id,
      reqData,
    );
  }
}
