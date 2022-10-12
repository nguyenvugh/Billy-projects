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
  UseGuards,
  Query,
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
import { CurrentLang } from '../../common/decorators/current-lang.decorator';
import { FindAllShopsDto } from './dto/find-all-shops.dto';
import { ListShopsEntity } from './entities/list-shops.entity';
import { ShopService } from './shop.service';

@Controller(`${MicroserviceConsts.PREFIX.CUSTOMER}/shop`)
@ApiTags('Customer Shop')
@UseInterceptors(ClassSerializerInterceptor)
export class ShopController {
  constructor(private readonly shopService: ShopService) {}

  @Get()
  @ApiOperation({ summary: 'Get list shops on web customer' })
  @ApiConsumes('application/x-www-form-urlencoded')
  async findAllShops(
    @CurrentLang() curLang,
    @Query() reqData: FindAllShopsDto,
  ) {
    return new ListShopsEntity(
      await this.shopService.findAllShops(curLang, reqData),
    );
  }
}
