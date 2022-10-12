import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { FindAllCustomerReviewsDto } from './dto/find-all-customer-reviews.dto';
import { CreateOneCustomerReview } from './dto/create-one-customer-review.dto';
import { CustomerReviewService } from './customer-review.service';

@Controller('customer-review')
export class CustomerReviewController {
  constructor(private readonly customerReviewService: CustomerReviewService) {}

  @MessagePattern('customer-customer-review-find-all-customer-reviews')
  async findAllCustomerReviews(reqData: FindAllCustomerReviewsDto) {
    return await this.customerReviewService.findAllCustomerReviews(reqData);
  }

  @MessagePattern('customer-customer-review-create-one-customer-review')
  async createOneCustomerReview(reqData: CreateOneCustomerReview) {
    return await this.customerReviewService.createOneCustomerReview(reqData);
  }
}
