import { Injectable } from '@nestjs/common';
import { MicroserviceService } from '../microservice/microservice.service';
import { FindByCriteriaDto } from '../orders/dto/find-by-criteria.dto';
import { FindCustomersByCriteriaDto } from './dto/find-by-criterial.dto';

@Injectable()
export class CustomersService {
  constructor(private adminMicroservice: MicroserviceService) { }

  findByCriteria(authorization, body: FindCustomersByCriteriaDto) {
    return this.adminMicroservice.call('admin-customers-find-by-criteria', {
      authorization,
      body,
    });
  }

  activate(authorization, id: number) {
    return this.adminMicroservice.call('admin-customers-activate', {
      authorization,
      body: {
        id,
      },
    });
  }

  deactivate(authorization, id: number, reason: string) {
    return this.adminMicroservice.call('admin-customers-deactivate', {
      authorization,
      body: {
        id,
        reason,
      },
    });
  }

  findOne(authorization, id: number) {
    return this.adminMicroservice.call('admin-customers-find-one', {
      authorization,
      body: {
        id,
      },
    });
  }

  update(authorization, id, body) {
    return this.adminMicroservice.call('admin-customers-update-one', {
      authorization,
      body: {
        id,
        ...body,
      },
    });
  }

  delete(authorization, id: number) {
    return this.adminMicroservice.call('admin-customers-delete-one', {
      authorization,
      body: {
        id,
      },
    });
  }

  getOrders(authorization, id, body: FindByCriteriaDto) {
    return this.adminMicroservice.call('admin-customers-get-orders', {
      authorization,
      body: {
        id,
        ...body,
      },
    });
  }
}
