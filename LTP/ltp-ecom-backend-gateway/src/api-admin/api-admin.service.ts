import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { MicroserviceConsts } from '../common/constants/microservices';

@Injectable()
export class ApiAdminService {
  constructor(
    @Inject(MicroserviceConsts.IDENTITY.ADMIN)
    private adminMicroservice: ClientProxy,
  ) {}

  test() {
    return this.adminMicroservice.send<string, string>('admin-auth-test', '');
  }
}
