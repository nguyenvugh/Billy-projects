import { Injectable } from '@nestjs/common';
import { FindAllDistrictsDto } from './dto/find-all-districts.dto';
import { MicroserviceService } from '../microservice/microservice.service';

@Injectable()
export class DistrictService {
  constructor(private microserviceService: MicroserviceService) {}

  async findAll(authorization: string, body: FindAllDistrictsDto) {
    return await this.microserviceService.call('admin-district-find-all', {
      authorization,
      body,
    });
  }
}
