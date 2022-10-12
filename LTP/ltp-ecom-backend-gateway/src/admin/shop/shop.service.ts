import { Injectable } from '@nestjs/common';
import { MicroserviceService } from '../microservice/microservice.service';
import { FindAllShopDto } from './dto/find-all.dto';

@Injectable()
export class ShopService {
  constructor(private adminMicroservice: MicroserviceService) { }

  findAll(authorization, body: FindAllShopDto) {
    return this.adminMicroservice.call('admin-shop-find-all', {
      authorization,
      body,
    });
  }

  create(authorization, body) {
    return this.adminMicroservice.call('admin-shop-create', {
      authorization,
      body,
    });
  }

  findOne(authorization, id: number) {
    return this.adminMicroservice.call('admin-shop-find-one', {
      authorization,
      body: {
        id,
      },
    });
  }

  update(authorization, id, body) {
    return this.adminMicroservice.call('admin-shop-update-one', {
      authorization,
      body: {
        id,
        ...body,
      },
    });
  }

  delete(authorization, ids: [number]) {
    return this.adminMicroservice.call('admin-shop-delete', {
      authorization,
      body: {
        ids,
      },
    });
  }
}
