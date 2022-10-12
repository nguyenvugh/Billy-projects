import { Injectable } from '@nestjs/common';
import { MicroserviceService } from '../microservice/microservice.service';
import { FindCouponByCriteriaDto } from './dto/find-by-criteria.dto';

@Injectable()
export class CouponService {
  constructor(private adminMicroservice: MicroserviceService) { }

  findByCriteria(authorization, body: FindCouponByCriteriaDto) {
    return this.adminMicroservice.call('admin-coupon-find-by-criteria', {
      authorization,
      body,
    });
  }

  create(authorization, body) {
    return this.adminMicroservice.call('admin-coupon-create', {
      authorization,
      body,
    });
  }

  findOne(authorization, id: number) {
    return this.adminMicroservice.call('admin-coupon-find-one', {
      authorization,
      body: {
        id,
      },
    });
  }

  update(authorization, id, body) {
    return this.adminMicroservice.call('admin-coupon-update-one', {
      authorization,
      body: {
        id,
        ...body,
      },
    });
  }

  delete(authorization, ids: [number]) {
    return this.adminMicroservice.call('admin-coupon-delete', {
      authorization,
      body: {
        ids,
      },
    });
  }

  getProductList(authorization) {
    return this.adminMicroservice.call('admin-coupon-get-product-list', {
      authorization,
    });
  }
}
