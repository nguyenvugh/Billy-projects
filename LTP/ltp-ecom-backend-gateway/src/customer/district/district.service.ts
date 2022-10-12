import { Injectable } from '@nestjs/common';
import { CustomerFindAllDistrictsDto } from './dto/find-all-districts.dto';
import { MicroserviceService } from '../microservice/microservice.service';

@Injectable()
export class DistrictService {
  constructor(private microserviceService: MicroserviceService) {}

  async findAll(reqData: CustomerFindAllDistrictsDto) {
    const results = await this.microserviceService.call(
      'customer-district-find-all',
      reqData,
    );
    return { results };
  }
}
