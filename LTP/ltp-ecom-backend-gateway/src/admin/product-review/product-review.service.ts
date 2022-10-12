import { Injectable } from '@nestjs/common';
import { MicroserviceService } from '../microservice/microservice.service';
import { DeleteProductReviewDto } from './dto/delete-product-review.dto';
import { FindProductReviewDto } from './dto/find-product-review.dto';
import { UpdateProductReviewDto } from './dto/update-product-review.dto';

@Injectable()
export class ProductReviewService {
  constructor(private microserviceService: MicroserviceService) {}

  findAll(authorization, body: FindProductReviewDto) {
    return this.microserviceService.call('admin-product-review-find', {
      body,
      authorization,
    });
  }

  findOne(authorization, id: number) {
    return this.microserviceService.call('admin-product-review-find-one', {
      id,
      authorization,
    });
  }

  async update(authorization, updateProductReviewDto: UpdateProductReviewDto) {
    return await this.microserviceService.call('admin-product-review-update', {
      body: updateProductReviewDto,
      authorization,
    });
  }

  remove(authorization, body: DeleteProductReviewDto) {
    return this.microserviceService.call('admin-product-review-delete', {
      body,
      authorization,
    });
  }
}
