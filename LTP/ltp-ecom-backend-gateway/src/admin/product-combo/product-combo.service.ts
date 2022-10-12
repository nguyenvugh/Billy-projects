import { Injectable } from '@nestjs/common';
import { FindAllProductCombosDto } from './dto/find-all-product-combos.dto';
import { CreateOneProductComboDto } from './dto/create-one-product-combo.dto';
import { UpdateOneProductComboDto } from './dto/update-one-product-combo.dto';
import { UpdateOneProductComboStatusDto } from './dto/update-one-product-combo-status.dto';
import { DeleteMultiProductCombosDto } from './dto/delete-multi-product-combos.dto';
import { MicroserviceService } from '../microservice/microservice.service';

@Injectable()
export class ProductComboService {
  constructor(private microserviceService: MicroserviceService) {}

  async findAllProductCombos(authorization, body: FindAllProductCombosDto) {
    return await this.microserviceService.call(
      'admin-product-combo-find-all-product-combos',
      {
        body,
        authorization,
      },
    );
  }

  async getOneProductCombo(authorization, id: number) {
    return await this.microserviceService.call(
      'admin-product-combo-get-one-product-combo',
      {
        id,
        authorization,
      },
    );
  }

  async createOneProductCombo(authorization, body: CreateOneProductComboDto) {
    return await this.microserviceService.call(
      'admin-product-combo-create-one-product-combo',
      {
        body,
        authorization,
      },
    );
  }

  async updateOneProductCombo(
    authorization,
    id: number,
    body: UpdateOneProductComboDto,
  ) {
    return await this.microserviceService.call(
      'admin-product-combo-update-one-product-combo',
      {
        id,
        body,
        authorization,
      },
    );
  }

  async updateOneProductComboStatus(
    authorization,
    id: number,
    body: UpdateOneProductComboStatusDto,
  ) {
    return await this.microserviceService.call(
      'admin-product-combo-update-one-product-combo-status',
      {
        id,
        body,
        authorization,
      },
    );
  }

  async softDeleteMultiProductCombos(
    authorization,
    body: DeleteMultiProductCombosDto,
  ) {
    return await this.microserviceService.call(
      'admin-product-combo-soft-delete-multi-product-combos',
      {
        body,
        authorization,
      },
    );
  }
}
