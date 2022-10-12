import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { MicroserviceConsts } from '../constants/microservices';

@Injectable()
export class LocalCustomerAuthGuard extends AuthGuard(
  MicroserviceConsts.STRATEGY.CUSTOMER,
) {}
