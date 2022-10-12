import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { OfficeService } from './office.service';

@Controller('office')
export class OfficeController {
  constructor(private readonly officeService: OfficeService) {}

  @MessagePattern('customer-office-find-all-offices')
  async findAllOffices() {
    return await this.officeService.findAllOffices();
  }
}
