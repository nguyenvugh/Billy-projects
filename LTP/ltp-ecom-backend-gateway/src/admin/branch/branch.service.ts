import { Injectable } from '@nestjs/common';
import { MicroserviceService } from '../microservice/microservice.service';
import { FindAllBranchDto } from './dto/find-all.dto';

@Injectable()
export class BranchService {
  constructor(private adminMicroservice: MicroserviceService) { }

  findAll(authorization, body: FindAllBranchDto) {
    return this.adminMicroservice.call('admin-branch-find-all', {
      authorization,
      body,
    });
  }

  create(authorization, body) {
    return this.adminMicroservice.call('admin-branch-create', {
      authorization,
      body,
    });
  }

  findOne(authorization, id: number) {
    return this.adminMicroservice.call('admin-branch-find-one', {
      authorization,
      body: {
        id,
      },
    });
  }

  update(authorization, id, body) {
    return this.adminMicroservice.call('admin-branch-update-one', {
      authorization,
      body: {
        id,
        ...body,
      },
    });
  }

  delete(authorization, ids: [number]) {
    return this.adminMicroservice.call('admin-branch-delete', {
      authorization,
      body: {
        ids,
      },
    });
  }
}
