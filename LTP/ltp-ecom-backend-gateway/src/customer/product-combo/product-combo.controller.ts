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
import { AuthReq } from '../../common/decorators/auth-req.decorator';
import { JwtAuthenticateIsOptional } from '../../common/decorators/jwt-authenticate-is-optional.decorator';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CustomerFindAllProductCombosDto } from './dto/find-all-product-combos.dto';
import { ListProductCombosEntity } from './entities/list-product-combos.entity';
import { ProductComboEntity } from './entities/product-combo.entity';
import { ProductComboService } from './product-combo.service';

@Controller(`${MicroserviceConsts.PREFIX.CUSTOMER}/product-combo`)
@UseGuards(JwtAuthGuard)
@ApiTags('Customer Product Combo')
@ApiBearerAuth()
@UseInterceptors(ClassSerializerInterceptor)
export class ProductComboController {
  constructor(private readonly productComboService: ProductComboService) {}

  @Get()
  @JwtAuthenticateIsOptional()
  @ApiOperation({ summary: 'Get list product combos on web customer' })
  @ApiConsumes('application/x-www-form-urlencoded')
  async findAll(
    @CurrentLang() curLang,
    @AuthReq() authReq: any,
    @Query() reqData: CustomerFindAllProductCombosDto,
  ) {
    return new ListProductCombosEntity(
      await this.productComboService.findAllProductCombos(
        curLang,
        reqData,
        authReq ? authReq['id'] : 0,
      ),
    );
  }

  @Get(':id')
  @JwtAuthenticateIsOptional()
  @ApiOperation({ summary: 'Get detail product combo on web customer' })
  async findOneProductCombo(
    @CurrentLang() curLang,
    @Param('id') id: number,
    @AuthReq() authReq: any,
  ) {
    return new ProductComboEntity(
      await this.productComboService.findOneProductCombo(
        id,
        curLang,
        authReq ? authReq['id'] : 0,
      ),
    );
  }
}
