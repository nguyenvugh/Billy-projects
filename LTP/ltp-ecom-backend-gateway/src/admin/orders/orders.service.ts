import { Injectable } from '@nestjs/common';
import { MicroserviceService } from '../microservice/microservice.service';
import { FindByCriteriaDto } from './dto/find-by-criteria.dto';
import { UpdateDto } from './dto/update.dto';

@Injectable()
export class OrdersService {
  constructor(private adminMicroservice: MicroserviceService) {}

  findByCriteria(authorization, request: FindByCriteriaDto) {
    return this.adminMicroservice.call('admin-orders-find-by-criteria', {
      authorization,
      body: request,
    });
  }

  findOne(authorization, id: number) {
    return this.adminMicroservice.call('admin-orders-find-one', {
      authorization,
      body: {
        id,
      },
    });
  }

  update(authorization, id, reqData: UpdateDto) {
    return this.adminMicroservice.call('admin-orders-update-one', {
      authorization,
      body: {
        id,
        ...reqData,
      },
    });
  }

  delete(authorization, ids: [number]) {
    return this.adminMicroservice.call('admin-orders-delete', {
      authorization,
      body: {
        ids,
      },
    });
  }
}
