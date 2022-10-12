import { Injectable } from '@nestjs/common';
import { MicroserviceService } from '../microservice/microservice.service';

@Injectable()
export class AuthService {
  constructor(private adminMicroservice: MicroserviceService) { }

  login(info) {
    const { username, password } = info;
    return this.adminMicroservice.call('admin-auth', {
      username,
      password,
    });
  }
}
