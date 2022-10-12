import { Injectable } from '@nestjs/common';
import { MicroserviceService } from '../microservice/microservice.service';
import { FindAllGroupDto } from './dto/find-all.dto';

@Injectable()
export class GroupService {
  constructor(private adminMicroservice: MicroserviceService) { }

  findAll(authorization, body: FindAllGroupDto) {
    return this.adminMicroservice.call('admin-group-find-all', {
      authorization,
      body,
    });
  }

  create(authorization, body) {
    return this.adminMicroservice.call('admin-group-create', {
      authorization,
      body,
    });
  }

  findOne(authorization, id: number) {
    return this.adminMicroservice.call('admin-group-find-one', {
      authorization,
      body: {
        id,
      },
    });
  }

  update(authorization, id, body) {
    return this.adminMicroservice.call('admin-group-update-one', {
      authorization,
      body: {
        id,
        ...body,
      },
    });
  }

  delete(authorization, ids: [number]) {
    return this.adminMicroservice.call('admin-group-delete', {
      authorization,
      body: {
        ids,
      },
    });
  }
}
