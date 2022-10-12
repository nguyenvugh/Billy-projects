import { Injectable } from '@nestjs/common';
import { MicroserviceService } from '../microservice/microservice.service';

@Injectable()
export class OfficeService {
  constructor(private microserviceService: MicroserviceService) {}

  async findAllOffices() {
    const result = await this.microserviceService.call(
      'customer-office-find-all-offices',
    );

    return result;
  }
}
