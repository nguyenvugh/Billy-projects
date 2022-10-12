import { Injectable } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { FindAllInventoryCitiesDto } from './dto/find-all-inventory-cities.dto';
import { InventoryRepository } from './repository/inventory.repository';

@Injectable()
export class InventoryService {
  constructor(
    private inventoryRepository: InventoryRepository,
    private i18n: I18nService,
  ) {}

  create(createInventoryDto: CreateInventoryDto) {
    return 'This action adds a new inventory';
  }

  findAll() {
    return `This action returns all inventory`;
  }

  async findAllCities(reqData: FindAllInventoryCitiesDto) {
    const results = await this.inventoryRepository
      .createQueryBuilder('inventory')
      .leftJoinAndSelect('inventory.city', 'inventory_city')
      .select(['inventory_city'])
      .distinct(true)
      .orderBy({
        'inventory_city.name': 'ASC',
      })
      .getRawMany();

    return { results };
  }

  findOne(id: number) {
    return `This action returns a #${id} inventory`;
  }

  update(id: number, updateInventoryDto: UpdateInventoryDto) {
    return `This action updates a #${id} inventory`;
  }

  remove(id: number) {
    return `This action removes a #${id} inventory`;
  }
}
