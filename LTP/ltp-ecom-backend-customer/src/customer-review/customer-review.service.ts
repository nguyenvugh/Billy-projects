import { Injectable } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
import { CustomerReviewStatus } from '../common/constants/customer-review.constant';
import {
  OrderShippingStatusConst,
  OrderShippingStatusFilterConst,
} from '../common/constants/order-shipping.constant';
import { processProductTranslateData } from '../common/helpers/product.helper';
import { parseOffsetAndLimit } from '../common/helpers/paginate.helper';
import { roundNumber } from '../common/helpers/util.helper';
import { RpcExc } from '../common/exceptions/custom.exception';
import { FindAllCustomerReviewsDto } from './dto/find-all-customer-reviews.dto';
import { CreateOneCustomerReview } from './dto/create-one-customer-review.dto';
import { CustomerReviewRepository } from './repository/customer-review.repository';
import { ProductRepository } from '../product/repository/product.repository';
import { OrderRepository } from '../order/repository/order.repository';
import { OrderShippingDriverConst } from '../order-shipping/driver/base.driver';

@Injectable()
export class CustomerReviewService {
  constructor(
    private customerReviewRepository: CustomerReviewRepository,
    private productRepo: ProductRepository,
    private orderRepo: OrderRepository,
    private i18n: I18nService,
  ) {}

  async findAllCustomerReviews(reqData: FindAllCustomerReviewsDto) {
    const { offset, limit } = parseOffsetAndLimit(reqData.page, reqData.limit);
    const [data, count] = await this.customerReviewRepository
      .createQueryBuilder('customer_review')
      .innerJoinAndSelect('customer_review.product', 'customer_review_product')
      .leftJoinAndSelect(
        'customer_review_product.images',
        'customer_review_product_images',
        'is_thumbnail = :is_thumbnail',
        {
          is_thumbnail: 1,
        },
      )
      .leftJoinAndSelect(
        'customer_review_product.translates',
        'customer_review_product_translates',
        'language_code= :lang',
        {
          lang: reqData.lang,
        },
      )
      .where('customer_review.customer_id= :customer_id', {
        customer_id: reqData.customer,
      })
      .andWhere('customer_review.status= :status', {
        status: CustomerReviewStatus.APPROVED,
      })
      .orderBy({
        'customer_review.created_at': 'DESC',
      })
      .skip(offset)
      .take(limit)
      .getManyAndCount();
    const maxPage = Math.ceil(count / limit);
    const results = data.map((item) => {
      const processedTranslate = processProductTranslateData(
        item['product']['translates'],
      );
      delete item['product']['translates'];
      item['product'] = {
        ...item['product'],
        ...processedTranslate[reqData.lang],
      };

      return item;
    });
    return { results, total: count, max_page: maxPage };
  }

  async createOneCustomerReview(reqData: CreateOneCustomerReview) {
    const [customerReviewsGet, orderGet, existedMsg, successMsg, failMsg] =
      await Promise.all([
        this.customerReviewRepository.find({
          where: {
            customer_id: reqData.customer_id,
            product_id: reqData.product_id,
          },
          take: 1,
        }),
        this.orderRepo
          .createQueryBuilder('order')
          .innerJoinAndSelect('order.shippings', 'order_shippings')
          .innerJoinAndSelect(
            'order.detail',
            'order_detail',
            'order_detail.productId = :product',
            {
              product: reqData.product_id,
            },
          )
          .where('order.customerId = :customer', {
            customer: reqData.customer_id,
          })
          // TODO: check with order shipping has status is DELIVERED_NOT_FULL
          .andWhere(
            '(order_shippings.driver = :ltp AND order_shippings.status = :ltp_delivered_status) OR (order_shippings.driver = :ghtk AND order_shippings.status = :ghtk_delivered_status)',
            {
              ltp: OrderShippingDriverConst.LTP,
              ltp_delivered_status:
                OrderShippingStatusFilterConst.DELIVERED_FULL,
              ghtk: OrderShippingDriverConst.GHTK,
              ghtk_delivered_status: OrderShippingStatusConst.DELIVERED,
            },
          )
          .getOne(),
        this.i18n.t(`customer-review.validate.existed`),
        this.i18n.t(`customer-review.message.created`),
        this.i18n.t(`customer-review.message.create_fail`),
      ]);
    if (!orderGet) {
      throw new RpcExc(`bad_request:${failMsg}`);
    }
    if (customerReviewsGet && customerReviewsGet.length) {
      throw new RpcExc(`conflict:${existedMsg}`);
    }
    const [customerReviewCreated] = await Promise.all([
      this.customerReviewRepository.save(reqData),
    ]);
    if (!customerReviewCreated) {
      throw new RpcExc(`bad_request:${failMsg}`);
    }

    return customerReviewCreated;
  }
}
