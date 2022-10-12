import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ClassSerializerInterceptor,
  UseInterceptors,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiHeader,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiConsumes,
  ApiOkResponse,
} from '@nestjs/swagger';
import { MicroserviceConsts } from '../../common/constants/microservices';
import { ListCountriesEntity } from './entities/list-countries.entity';
import { CountryService } from './country.service';

@Controller(`${MicroserviceConsts.PREFIX.CUSTOMER}/country`)
@ApiTags('Customer Country')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('country')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Get('/')
  @ApiOperation({ summary: 'Customer get list countries' })
  async register() {
    return new ListCountriesEntity(await this.countryService.findAll());
  }
}
