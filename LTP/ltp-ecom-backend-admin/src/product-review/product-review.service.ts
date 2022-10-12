import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindConditions, In, Repository, WhereExpression } from 'typeorm';
import { CustomerReviewStatus } from '../common/constants/product.constant';
import { InternalServerErrorExc } from '../common/exceptions/custom.exception';
import { generateMapArrayDataWithKeyPair } from '../common/helpers/util.helper';
import { calculateProductAvgRating } from '../common/helpers/product-review.helper';
import { DeleteProductReviewDto } from './dto/delete-product-review.dto';
import { FindProductReviewDto } from './dto/find-product-review.dto';
import { UpdateProductReviewDto } from './dto/update-product-review.dto';
import { ProductReview } from './schema/product-review.schema';
import { ProductRepository } from '../product/repositories/product.repository';

@Injectable()
export class ProductReviewService {
  constructor(
    @InjectRepository(ProductReview)
    private productReviewRepo: Repository<ProductReview>,
    private productRepo: ProductRepository,
  ) {}

  async findAll(body: FindProductReviewDto) {
    const { page, limit, status, q, product_id } = body;
    const skip = (page - 1) * limit;
    const opts: FindConditions<ProductReview> = {
      ...(status && { status }),
      ...(product_id && { product_id }),
    };

    const [results, totalRecords] = await this.productReviewRepo
      .createQueryBuilder('product_review')
      .leftJoinAndSelect('product_review.customer', 'customer')
      .leftJoinAndSelect('product_review.product', 'product')
      .leftJoinAndSelect('product.translates', 'translate')
      .where((qb: WhereExpression) => {
        qb.where(opts);
        qb.andWhere('translate.language_code = :lang', { lang: 'vi' });
        if (q) qb.andWhere('translate.name LIKE :q', { q: `%${q}%` });
      })
      .skip(skip)
      .take(limit)
      .getManyAndCount();

    return { results, totalRecords };
  }

  findOne(id: number) {
    return this.productReviewRepo
      .createQueryBuilder('product_review')
      .leftJoinAndSelect('product_review.customer', 'customer')
      .leftJoinAndSelect('product_review.product', 'product')
      .leftJoinAndSelect('product.translates', 'translate')
      .where((qb: WhereExpression) => {
        qb.where({ id });
        qb.andWhere('translate.language_code = :lang', { lang: 'vi' });
      })
      .getOne();
  }

  async update(body: UpdateProductReviewDto) {
    const { ids, status } = body;
    const [results, productsReviews] = await Promise.all([
      this.productReviewRepo.update({ id: In(ids) }, { status }),
      this.productReviewRepo.find({
        where: {
          id: In(ids),
        },
      }),
    ]);
    const productIds: any[] = productsReviews.map((productReview) => {
      return productReview.product_id;
    });

    if (!results.affected) throw new InternalServerErrorExc();
    await this.calculateProductsAvgRating(productIds);
    return 'updated';
  }

  async remove(body: DeleteProductReviewDto) {
    const productsReviews = await this.productReviewRepo.find({
      where: {
        id: In(body.ids),
      },
    });
    const productIds: any[] = productsReviews.map((productReview) => {
      return productReview.product_id;
    });
    const results = await this.productReviewRepo.delete(body.ids);
    if (!results.affected) throw new InternalServerErrorExc();
    await this.calculateProductsAvgRating(productIds);
    return 'deleted';
  }

  async calculateProductsAvgRating(productIds: any[]) {
    if (!productIds.length) {
      return;
    }
    const promisesUpdateProductsAvgRating: any[] = [];
    productIds.forEach((productId) => {
      promisesUpdateProductsAvgRating.push(
        this.calculateProductAvgRating(productId),
      );
    });
    await Promise.all(promisesUpdateProductsAvgRating);
  }

  async calculateProductAvgRating(productId: number) {
    if (!productId) {
      return;
    }
    const productsReviews = await this.productReviewRepo.find({
      where: {
        product_id: productId,
        status: CustomerReviewStatus.APPROVED,
      },
    });
    const dataUpdateProductAvgRating = {
      id: productId,
      avg_rating: calculateProductAvgRating(productsReviews),
    };
    await this.productRepo.save(dataUpdateProductAvgRating);
  }
}
