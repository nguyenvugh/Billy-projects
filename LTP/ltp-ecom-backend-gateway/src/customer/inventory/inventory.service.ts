import { Injectable } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { MicroserviceService } from '../microservice/microservice.service';

@Injectable()
export class InventoryService {
  constructor(
    private microserviceService: MicroserviceService,
    private i18n: I18nService,
  ) {}

  create(createInventoryDto: CreateInventoryDto) {
    return 'This action adds a new inventory';
  }

  findAll() {
    return `This action returns all inventory`;
  }

  async findAllCities(curLang: string) {
    const result = await this.microserviceService.call(
      'customer-inventory-city-find-all',
      {
        lang: curLang,
      },
    );

    return result;
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
