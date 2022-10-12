import { Body, Controller, UseGuards } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AuthGuard } from '../common/guards/auth.guard';
import { PermissionsGuard } from '../common/guards/permissions.guard';
import { Permissions } from '../common/decorators/permissions.decorator';
import { DeleteProductReviewDto } from './dto/delete-product-review.dto';
import { FindProductReviewDto } from './dto/find-product-review.dto';
import { UpdateProductReviewDto } from './dto/update-product-review.dto';
import { ProductReviewService } from './product-review.service';

@Controller('product-review')
@UseGuards(AuthGuard, PermissionsGuard)
export class ProductReviewController {
  constructor(private readonly productReviewService: ProductReviewService) {}

  @MessagePattern('admin-product-review-find')
  @Permissions('product_review')
  findAll({ body }: { body: FindProductReviewDto }) {
    return this.productReviewService.findAll(body);
  }

  @MessagePattern('admin-product-review-find-one')
  @Permissions('product_review')
  findOne({ id }: { id: number }) {
    return this.productReviewService.findOne(id);
  }

  @MessagePattern('admin-product-review-update')
  @Permissions('product_review')
  update({ body }: { body: UpdateProductReviewDto }) {
    return this.productReviewService.update(body);
  }

  @MessagePattern('admin-product-review-delete')
  @Permissions('product_review')
  remove({ body }: { body: DeleteProductReviewDto }) {
    return this.productReviewService.remove(body);
  }
}
