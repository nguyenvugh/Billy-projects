import { Injectable } from '@nestjs/common';
import { FindAllWardsDto } from './dto/find-all-wards.dto';
import { MicroserviceService } from '../microservice/microservice.service';

@Injectable()
export class WardService {
  constructor(private microserviceService: MicroserviceService) {}

  async findAll(reqData: FindAllWardsDto) {
    const results = await this.microserviceService.call(
      'customer-ward-find-all',
      reqData,
    );
    return { results };
  }
}
