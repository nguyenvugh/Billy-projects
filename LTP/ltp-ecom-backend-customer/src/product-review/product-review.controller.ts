import { Body, Controller, Param } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CreateProductReviewDto } from './dto/create-product-review.dto';
import { FindProductReviewDto } from './dto/find-product-review.dto';
import { ProductReviewService } from './product-review.service';

@Controller('product-review')
export class ProductReviewController {
  constructor(private readonly productReviewService: ProductReviewService) {}

  @MessagePattern('customer-product-review-create')
  create(@Body() createProductReviewDto: CreateProductReviewDto) {
    return this.productReviewService.create(createProductReviewDto);
  }

  @MessagePattern('customer-product-review-find')
  findAll(@Body() body: FindProductReviewDto) {
    return this.productReviewService.findAll(body);
  }

  @MessagePattern('customer-product-review-find-one')
  findOne(@Body() body: any) {
    return this.productReviewService.findOne(body.id);
  }
}
