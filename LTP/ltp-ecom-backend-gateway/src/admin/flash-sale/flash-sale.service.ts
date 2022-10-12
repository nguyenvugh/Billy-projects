import { Injectable } from '@nestjs/common';
import { MicroserviceService } from '../microservice/microservice.service';
import { FindAllFlashSaleProductDto } from './dto/find-all-product.dto';
import { FindAllFlashSaleDto } from './dto/find-all.dto';

@Injectable()
export class FlashSaleService {
  constructor(private adminMicroservice: MicroserviceService) { }

  findAll(authorization, body: FindAllFlashSaleDto) {
    return this.adminMicroservice.call('admin-flash-sale-find-all', {
      authorization,
      body,
    });
  }

  create(authorization, body) {
    return this.adminMicroservice.call('admin-flash-sale-create', {
      authorization,
      body,
    });
  }

  update(authorization, id, body) {
    return this.adminMicroservice.call('admin-flash-sale-update', {
      authorization,
      body: {
        id,
        ...body,
      },
    });
  }

  findOne(authorization, id: number) {
    return this.adminMicroservice.call('admin-flash-sale-find-one', {
      authorization,
      body: {
        id,
      },
    });
  }

  delete(authorization, ids: [number]) {
    return this.adminMicroservice.call('admin-flash-sale-delete', {
      authorization,
      body: {
        ids,
      },
    });
  }

  getProductList(authorization) {
    return this.adminMicroservice.call('admin-flash-sale-get-product-list', {
      authorization,
    });
  }

  activate(authorization, id) {
    return this.adminMicroservice.call('admin-flash-sale-activate', {
      authorization,
      body: {
        id,
      },
    });
  }

  findAllProduct(authorization, id, body: FindAllFlashSaleProductDto) {
    return this.adminMicroservice.call('admin-flash-sale-find-all-products', {
      authorization,
      body: {
        id,
        ...body,
      },
    });
  }

  addProduct(authorization, id, body) {
    return this.adminMicroservice.call('admin-flash-sale-add-product', {
      authorization,
      body: {
        id,
        ...body,
      },
    });
  }

  updateProduct(authorization, id, body) {
    return this.adminMicroservice.call('admin-flash-sale-update-product', {
      authorization,
      body: {
        id,
        ...body,
      },
    });
  }

  findProduct(authorization, id: number) {
    return this.adminMicroservice.call('admin-flash-sale-find-product', {
      authorization,
      body: {
        id,
      },
    });
  }

  deleteProducts(authorization, ids: [number]) {
    return this.adminMicroservice.call('admin-flash-sale-delete-products', {
      authorization,
      body: {
        ids,
      },
    });
  }
}
