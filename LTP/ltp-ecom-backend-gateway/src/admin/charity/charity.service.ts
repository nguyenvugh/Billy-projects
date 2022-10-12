import { Injectable } from '@nestjs/common';
import { MicroserviceService } from '../microservice/microservice.service';
import { FindAllCharityProductDto } from './dto/find-all-product.dto';
import { FindCharityByCriteriaDto } from './dto/find-by-criteria.dto';

@Injectable()
export class CharityService {
  constructor(private adminMicroservice: MicroserviceService) { }

  findByCriteria(authorization, body: FindCharityByCriteriaDto) {
    return this.adminMicroservice.call('admin-charity-find-by-criteria', {
      authorization,
      body,
    });
  }

  create(authorization, body) {
    return this.adminMicroservice.call('admin-charity-create', {
      authorization,
      body,
    });
  }

  findOne(authorization, id: number) {
    return this.adminMicroservice.call('admin-charity-find-one', {
      authorization,
      body: {
        id,
      },
    });
  }

  update(authorization, id, body) {
    return this.adminMicroservice.call('admin-charity-update-one', {
      authorization,
      body: {
        id,
        ...body,
      },
    });
  }

  delete(authorization, ids: [number]) {
    return this.adminMicroservice.call('admin-charity-delete', {
      authorization,
      body: {
        ids,
      },
    });
  }

  getProductList(authorization) {
    return this.adminMicroservice.call('admin-charity-get-product-list', {
      authorization,
    });
  }

  findAllProduct(authorization, id, body: FindAllCharityProductDto) {
    return this.adminMicroservice.call('admin-charity-find-all-products', {
      authorization,
      body: {
        id,
        ...body,
      },
    });
  }

  addProduct(authorization, id, body) {
    return this.adminMicroservice.call('admin-charity-add-product', {
      authorization,
      body: {
        id,
        ...body,
      },
    });
  }

  updateProduct(authorization, id, charity_product_id, body) {
    return this.adminMicroservice.call('admin-charity-update-product', {
      authorization,
      body: {
        id,
        charity_product_id,
        ...body,
      },
    });
  }

  findProduct(authorization, id: number) {
    return this.adminMicroservice.call('admin-charity-find-product', {
      authorization,
      body: {
        id,
      },
    });
  }

  deleteProducts(authorization, ids: [number]) {
    return this.adminMicroservice.call('admin-charity-remove-products', {
      authorization,
      body: {
        ids,
      },
    });
  }

  updateStatus(authorization, id: number) {
    return this.adminMicroservice.call('admin-charity-update-status', {
      authorization,
      body: {
        id,
      },
    });
  }
}
