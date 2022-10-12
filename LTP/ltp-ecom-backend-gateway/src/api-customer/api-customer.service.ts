import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { MicroserviceConsts } from '../common/constants/microservices';

@Injectable()
export class ApiCustomerService {
  constructor(
    @Inject(MicroserviceConsts.IDENTITY.CUSTOMER)
    private customerMicroservice: ClientProxy,
  ) {}

  async test() {
    const pro: any[] = [];
    for (let index = 0; index < 10; index++) {
      pro.push(this.testFunc(index));
    }
    await Promise.all(pro);
  }

  async testFunc(param: number): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 500);
    });
  }
}
