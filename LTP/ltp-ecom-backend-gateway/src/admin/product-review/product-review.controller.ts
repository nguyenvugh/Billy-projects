import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { MicroserviceConsts } from '../../common/constants/microservices';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { AuthToken } from '../../common/decorators/auth-token.decorator';
import { DeleteProductReviewDto } from './dto/delete-product-review.dto';
import { FindProductReviewDto } from './dto/find-product-review.dto';
import { UpdateProductReviewDto } from './dto/update-product-review.dto';
import { ProductReviewService } from './product-review.service';

@Controller(`${MicroserviceConsts.PREFIX.ADMIN}/product-review`)
@ApiTags('Admin product review')
@ApiBearerAuth()
export class ProductReviewController {
  constructor(private readonly productReviewService: ProductReviewService) {}

  @Get()
  findAll(
    @Query() params: FindProductReviewDto,
    @AuthToken() authorization: string,
  ) {
    return this.productReviewService.findAll(authorization, params);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @AuthToken() authorization: string) {
    return this.productReviewService.findOne(authorization, +id);
  }

  @Patch()
  update(
    @Body() updateProductReviewDto: UpdateProductReviewDto,
    @AuthToken() authorization: string,
  ) {
    return this.productReviewService.update(
      authorization,
      updateProductReviewDto,
    );
  }

  @Delete()
  remove(
    @Body() body: DeleteProductReviewDto,
    @AuthToken() authorization: string,
  ) {
    return this.productReviewService.remove(authorization, body);
  }
}
