import { Injectable } from '@nestjs/common';
import { AdminMicroserviceService } from '../admin-microservice/admin-microservice.service';
import { CreateAdminProductDto } from './dto/create-admin-product.dto';
import { FindAdminProductDto } from './dto/find-admin-product.dto';
import { UpdateAdminProductDto } from './dto/update-admin-product.dto';

@Injectable()
export class AdminProductService {
  constructor(
    private microserviceService: AdminMicroserviceService, // private i18n: I18nService,
  ) {}

  async initSlugData(authorization) {
    const result = await this.microserviceService.call(
      'admin-product-init-slug-data',
      {
        authorization,
      },
    );

    return result;
  }

  async createConfigProductAttribute(authorization) {
    const result = await this.microserviceService.call(
      'admin-product-create-config-product-attribute',
      {
        authorization,
      },
    );

    return result;
  }

  async create(authorization, createAdminProductDto: CreateAdminProductDto) {
    // console.log('came here', createAdminProductDto);

    const result = await this.microserviceService.call('admin-product-create', {
      authorization,
      body: createAdminProductDto,
    });

    return result;
  }

  async findAll(authorization, params: FindAdminProductDto) {
    const result = await this.microserviceService.call(
      'admin-product-find-all',
      {
        authorization,
        body: params,
      },
    );

    return result;
  }

  async findOne(authorization, id: number) {
    const result = await this.microserviceService.call(
      'admin-product-find-one',
      {
        authorization,
        body: {
          id,
        },
      },
    );

    return result;
  }

  async update(
    authorization,
    id: number,
    updateAdminProductDto: UpdateAdminProductDto,
  ) {
    const result = await this.microserviceService.call(
      'admin-product-update-one',
      {
        authorization,
        body: {
          id,
          ...updateAdminProductDto,
        },
      },
    );
    return result;
  }

  async remove(authorization, id: number) {
    const result = await this.microserviceService.call(
      'admin-product-remove-one',
      {
        authorization,
        body: {
          id,
        },
      },
    );

    return result;
  }

  async removeMulti(authorization, ids: number[]) {
    const result = await this.microserviceService.call(
      'admin-product-remove-multi',
      {
        authorization,
        body: {
          ids,
        },
      },
    );

    return result;
  }
}
