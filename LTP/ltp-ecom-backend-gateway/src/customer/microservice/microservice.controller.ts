import { Controller } from '@nestjs/common';
import { MicroserviceService } from './microservice.service';

@Controller('microservice')
export class MicroserviceController {
  constructor(private readonly microserviceService: MicroserviceService) {}
}
