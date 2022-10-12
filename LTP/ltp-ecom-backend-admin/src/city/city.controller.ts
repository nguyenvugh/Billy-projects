import { Controller, UseGuards } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AuthGuard } from '../common/guards/auth.guard';
import { FindAllCitiesDto } from './dto/find-all-cities.dto';
import { CityService } from './city.service';

@Controller('city')
@UseGuards(AuthGuard)
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @MessagePattern('admin-city-find-all')
  async findAll({ body }: { body: FindAllCitiesDto }) {
    return await this.cityService.findAll(body);
  }
}
