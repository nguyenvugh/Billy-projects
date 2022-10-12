import { Injectable } from '@nestjs/common';
import { MicroserviceService } from '../microservice/microservice.service';

@Injectable()
export class CountryService {
  constructor(private microserviceService: MicroserviceService) {}

  async findAll(authorization: string) {
    return await this.microserviceService.call('admin-country-find-all', {
      authorization,
    });
  }
}
