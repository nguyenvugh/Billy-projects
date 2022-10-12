import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { I18nService } from 'nestjs-i18n';
import { FindConditions, Repository, WhereExpression } from 'typeorm';
import { ProductReviewStatus } from '../common/constants/product.constant';
import { RpcExc } from '../common/exceptions/custom.exception';
import { CreateProductReviewDto } from './dto/create-product-review.dto';
import { FindProductReviewDto } from './dto/find-product-review.dto';
import { ProductReview } from './schema/product-review.schema';

@Injectable()
export class ProductReviewService {
  constructor(
    @InjectRepository(ProductReview)
    private productReviewRepo: Repository<ProductReview>,
    private i18n: I18nService,
  ) {}

  async create(createProductReviewDto: CreateProductReviewDto) {
    const { content, rating, productId, customerId } = createProductReviewDto;

    console.log('createProductReviewDto', createProductReviewDto);
    const exist = await this.productReviewRepo.findOne({
      productId,
      customerId,
    });
    const errMsg = await this.i18n.t('customer.product_review.existed');
    if (exist) throw new RpcExc(`conflict:${errMsg}`);

    const productReview = this.productReviewRepo.create({
      content,
      rating,
      productId,
      customerId,
    });
    return this.productReviewRepo.save(productReview);
  }

  async findAll(body: FindProductReviewDto) {
    const { page, limit } = body;
    const skip = (page - 1) * limit;
    const opts: FindConditions<ProductReview> = {
      status: ProductReviewStatus.APPROVED,
    };
    const [results, total] = await this.productReviewRepo
      .createQueryBuilder('product_review')
      .leftJoinAndSelect('product_review.customer', 'customer')
      .leftJoinAndSelect('customer.avatar', 'avatar')
      .where((qb: WhereExpression) => {
        qb.where(opts);
        // if (q) qb.andWhere('translate.name LIKE :q', { q: `%${q}%` });
      })
      .skip(skip)
      .take(limit)
      .getManyAndCount();

    return { results, total };
  }

  async findOne(id: number) {
    const opts: FindConditions<ProductReview> = {
      status: ProductReviewStatus.APPROVED,
      id,
    };
    return this.productReviewRepo
      .createQueryBuilder('product_review')
      .leftJoinAndSelect('product_review.customer', 'customer')
      .leftJoinAndSelect('customer.avatar', 'avatar')
      .where((qb: WhereExpression) => {
        qb.where(opts);
        // if (q) qb.andWhere('translate.name LIKE :q', { q: `%${q}%` });
      })
      .getOne();
  }
}
