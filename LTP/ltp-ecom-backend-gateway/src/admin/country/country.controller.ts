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
import { AuthToken } from '../../common/decorators/auth-token.decorator';
import { ListCountriesEntity } from './entities/list-countries.entity';
import { CountryService } from './country.service';

@Controller(`${MicroserviceConsts.PREFIX.ADMIN}/country`)
@ApiTags('Admin Country')
@ApiBearerAuth()
@UseInterceptors(ClassSerializerInterceptor)
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Get('/')
  @ApiOperation({ summary: 'Admin get list countries' })
  async findAll(@AuthToken() authorization: string) {
    return new ListCountriesEntity(
      await this.countryService.findAll(authorization),
    );
  }
}
