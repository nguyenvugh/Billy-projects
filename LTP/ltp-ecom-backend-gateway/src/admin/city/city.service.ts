import { Injectable } from '@nestjs/common';
import { FindAllCitiesDto } from './dto/find-all-cities.dto';
import { MicroserviceService } from '../microservice/microservice.service';

@Injectable()
export class CityService {
  constructor(private microserviceService: MicroserviceService) {}

  async findAll(authorization: string, body: FindAllCitiesDto) {
    return await this.microserviceService.call('admin-city-find-all', {
      authorization,
      body,
    });
  }
}
