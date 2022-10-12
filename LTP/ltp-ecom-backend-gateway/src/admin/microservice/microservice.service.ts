import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { MicroserviceConsts } from '../../common/constants/microservices';

@Injectable()
export class MicroserviceService {
  constructor(
    @Inject(MicroserviceConsts.IDENTITY.ADMIN)
    private adminMicroservice: ClientProxy,
  ) {}

  async call(msgPattern: string, data: any = {}) {
    return new Promise<any>((resolve, reject) => {
      this.adminMicroservice.send<string, any>(msgPattern, data).subscribe(
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
