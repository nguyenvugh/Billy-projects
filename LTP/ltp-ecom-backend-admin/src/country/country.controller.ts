import { Controller, UseGuards } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AuthGuard } from '../common/guards/auth.guard';
import { CountryService } from './country.service';

@Controller('country')
@UseGuards(AuthGuard)
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @MessagePattern('admin-country-find-all')
  async findAll() {
    return await this.countryService.findAll();
  }
}
