import { Injectable } from '@nestjs/common';
import { CustomerFindAllCitiesDto } from './dto/find-all-cities.dto';
import { MicroserviceService } from '../microservice/microservice.service';

@Injectable()
export class CityService {
  constructor(private microserviceService: MicroserviceService) {}

  async findAll(reqData: CustomerFindAllCitiesDto) {
    const results = await this.microserviceService.call(
      'customer-city-find-all',
      reqData,
    );
    return { results };
  }
}
