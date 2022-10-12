import { Injectable } from '@nestjs/common';
import { MicroserviceService } from '../microservice/microservice.service';

@Injectable()
export class UsersService {
  constructor(private adminMicroservice: MicroserviceService) { }

  findOne(authorization) {
    return this.adminMicroservice.call('admin-users-find-one', {
      authorization,
    });
  }

  update(authorization, body) {
    return this.adminMicroservice.call('admin-users-update-one', {
      authorization,
      body,
    });
  }
}
