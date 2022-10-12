import { Injectable } from '@nestjs/common';
import { MicroserviceService } from '../microservice/microservice.service';

@Injectable()
export class CountryService {
  constructor(private microserviceService: MicroserviceService) {}

  async findAll() {
    const results = await this.microserviceService.call(
      'customer-country-find-all',
    );
    return { results };
  }
}
