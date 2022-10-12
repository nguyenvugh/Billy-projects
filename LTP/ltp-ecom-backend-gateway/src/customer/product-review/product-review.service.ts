import { Injectable } from '@nestjs/common';
import { MicroserviceService } from '../microservice/microservice.service';
import { CreateProductReviewDto } from './dto/create-product-review.dto';
import { FindProductReviewDto } from './dto/find-product-review.dto';

@Injectable()
export class ProductReviewService {
  constructor(private microserviceService: MicroserviceService) {}

  create(customerId: number, createProductReviewDto: CreateProductReviewDto) {
    return this.microserviceService.call('customer-product-review-create', {
      ...createProductReviewDto,
      customerId,
    });
  }

  findAll(params: FindProductReviewDto) {
    return this.microserviceService.call(
      'customer-product-review-find',
      params,
    );
  }

  findOne(id: number) {
    return this.microserviceService.call('customer-product-review-find-one', {
      id,
    });
  }
}
