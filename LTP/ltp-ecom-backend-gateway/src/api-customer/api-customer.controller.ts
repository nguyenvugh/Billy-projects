import { Controller, Get } from '@nestjs/common';
import {
  ApiConsumes,
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
} from '@nestjs/swagger';
import { ApiCustomerService } from './api-customer.service';

@Controller('api-customer')
@ApiTags('Manage APIs customer')
export class ApiCustomerController {
  constructor(private readonly apiCustomerService: ApiCustomerService) {}

  @Get('/test')
  @ApiOperation({ summary: 'Test' })
  async test() {
    return await this.apiCustomerService.test();
  }
}
