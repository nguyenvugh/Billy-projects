import { Injectable } from '@nestjs/common';
import { Express } from 'express';
import { AdminMicroserviceService } from '../admin-microservice/admin-microservice.service';
import { CreateAdminProductCategoryDto } from './dto/create-admin-product-category.dto';
import { FindAdminProductCategoryDto } from './dto/find-admin-product-category.dto';
import { UpdateAdminProductCategoryDto } from './dto/update-admin-product-category.dto';
import { UpdateProductCategoriesDisplayOrderDto } from './dto/update-product-categories-display-order.dto';

@Injectable()
export class AdminProductCategoryService {
  constructor(
    private microserviceService: AdminMicroserviceService, // private i18n: I18nService,
  ) {}

  async initSlugData(authorization) {
    return await this.microserviceService.call(
      'admin-product-category-init-slug-data',
      {
        authorization,
      },
    );
  }

  async create(
    authorization,
    createAdminProductCategoryDto: CreateAdminProductCategoryDto,
  ) {
    const result = await this.microserviceService.call(
      'admin-product-category-create',
      {
        authorization,
        body: createAdminProductCategoryDto,
      },
    );

    return result;
  }

  async findAll(authorization, params: FindAdminProductCategoryDto) {
    const result = await this.microserviceService.call(
      'admin-product-category-find-all',
      {
        authorization,
        body: params,
      },
    );

    return result;
  }

  async findOne(authorization, id: number) {
    const result = await this.microserviceService.call(
      'admin-product-category-find-one',
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
    updateAdminProductCategoryDto: UpdateAdminProductCategoryDto,
  ) {
    const result = await this.microserviceService.call(
      'admin-product-category-update-one',
      {
        authorization,
        body: {
          id,
          ...updateAdminProductCategoryDto,
        },
      },
    );

    return result;
  }

  async remove(authorization, id: number) {
    const result = await this.microserviceService.call(
      'admin-product-category-remove-one',
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
      'admin-product-category-remove-multi',
      {
        authorization,
        body: {
          ids,
        },
      },
    );

    return result;
  }

  async updateProductCategoriesDisplayOrder(
    authorization,
    body: UpdateProductCategoriesDisplayOrderDto,
  ) {
    const result = await this.microserviceService.call(
      'admin-product-category-update-many-product-categories-display-order',
      {
        authorization,
        body,
      },
    );

    return result;
  }
}
