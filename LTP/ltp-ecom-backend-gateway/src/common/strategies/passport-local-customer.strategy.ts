import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { Injectable } from '@nestjs/common';
import { MicroserviceConsts } from '../constants/microservices';
import { MicroserviceService } from '../../customer/microservice/microservice.service';

@Injectable()
export class LocalCustomerStrategy extends PassportStrategy(
  Strategy,
  MicroserviceConsts.STRATEGY.CUSTOMER,
) {
  constructor(private microserviceService: MicroserviceService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<any> {
    const customerGet = await this.microserviceService.call('customer-login', {
      email: email,
      password: password,
    });
    return customerGet;
  }
}
