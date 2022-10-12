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
import { FindAllWardsDto } from './dto/find-all-wards.dto';
import { ListWardsEntity } from './entities/list-wards.entity';
import { WardService } from './ward.service';

@Controller(`${MicroserviceConsts.PREFIX.ADMIN}/ward`)
@ApiTags('Admin Ward')
@ApiBearerAuth()
@UseInterceptors(ClassSerializerInterceptor)
export class WardController {
  constructor(private readonly wardService: WardService) {}

  @Get('/')
  @ApiOperation({ summary: 'Admin get list wards' })
  @ApiConsumes('application/x-www-form-urlencoded')
  async findAll(
    @AuthToken() authorization: string,
    @Query() reqData: FindAllWardsDto,
  ) {
    return new ListWardsEntity(
      await this.wardService.findAll(authorization, reqData),
    );
  }
}
