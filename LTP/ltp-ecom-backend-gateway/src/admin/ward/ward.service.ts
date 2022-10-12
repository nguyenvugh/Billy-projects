import { Injectable } from '@nestjs/common';
import { FindAllWardsDto } from './dto/find-all-wards.dto';
import { MicroserviceService } from '../microservice/microservice.service';

@Injectable()
export class WardService {
  constructor(private microserviceService: MicroserviceService) {}

  async findAll(authorization: string, body: FindAllWardsDto) {
    return await this.microserviceService.call('admin-ward-find-all', {
      authorization,
      body,
    });
  }
}
