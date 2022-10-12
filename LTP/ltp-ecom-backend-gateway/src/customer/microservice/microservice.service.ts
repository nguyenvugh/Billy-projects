import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { MicroserviceConsts } from '../../common/constants/microservices';

@Injectable()
export class MicroserviceService {
  constructor(
    @Inject(MicroserviceConsts.IDENTITY.CUSTOMER)
    private customerMicroservice: ClientProxy,
  ) {}

  async call(msgPattern: string, data: any = {}) {
    return new Promise<any>((resolve, reject) => {
      this.customerMicroservice.send<string, any>(msgPattern, data).subscribe(
        (data) => {
          resolve(data);
        },
        (err) => {
          reject(err);
        },
      );
    });
  }
}
