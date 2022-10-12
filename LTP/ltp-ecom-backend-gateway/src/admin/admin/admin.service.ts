import { Injectable } from '@nestjs/common';
import { MicroserviceService } from '../microservice/microservice.service';
import { FindAllAdmin } from './dto/find-all.dto';

@Injectable()
export class AdminService {
  constructor(private adminMicroservice: MicroserviceService) { }

  findAll(authorization, body: FindAllAdmin) {
    return this.adminMicroservice.call('admin-admin-find-all', {
      authorization,
      body,
    });
  }

  create(authorization, body) {
    return this.adminMicroservice.call('admin-admin-create', {
      authorization,
      body,
    });
  }

  findOne(authorization, id: number) {
    return this.adminMicroservice.call('admin-admin-find-one', {
      authorization,
      body: {
        id,
      },
    });
  }

  update(authorization, id, body) {
    return this.adminMicroservice.call('admin-admin-update-one', {
      authorization,
      body: {
        id,
        ...body,
      },
    });
  }

  delete(authorization, ids: [number]) {
    return this.adminMicroservice.call('admin-admin-delete', {
      authorization,
      body: {
        ids,
      },
    });
  }
}
