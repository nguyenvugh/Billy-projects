import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { MicroserviceConsts } from '../../common/constants/microservices';
import { AuthReq } from '../../common/decorators/auth-req.decorator';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CreateProductReviewDto } from './dto/create-product-review.dto';
import { FindProductReviewDto } from './dto/find-product-review.dto';
import { ProductReviewService } from './product-review.service';

@Controller(`${MicroserviceConsts.PREFIX.CUSTOMER}/product-review`)
@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('Customer Product review')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ProductReviewController {
  constructor(private readonly productReviewService: ProductReviewService) {}

  @Post()
  create(
    @AuthReq() authReq: any,
    @Body() createProductReviewDto: CreateProductReviewDto,
  ) {
    return this.productReviewService.create(
      authReq['id'],
      createProductReviewDto,
    );
  }

  @Get()
  findAll(@Query() params: FindProductReviewDto) {
    return this.productReviewService.findAll(params);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productReviewService.findOne(+id);
  }
}
