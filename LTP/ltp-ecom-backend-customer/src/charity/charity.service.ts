import { Injectable } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
import { CharityStatusConst } from 'src/common/constants/charity.constant';
import { processProductTranslateData } from 'src/common/helpers/product.helper';
import { processTranslateData } from 'src/common/helpers/translate.helper';
import { ProductRepository } from 'src/product/repository/product.repository';
import { CharityProductRepository } from './repository/charity-product.repository';
import { CharityRepository } from './repository/charity.repository';

@Injectable()
export class CharityService {
  constructor(
    private readonly charityRepository: CharityRepository,
    private readonly productRepository: ProductRepository,
    private readonly charityProductRepository: CharityProductRepository,
    private readonly i18n: I18nService,
  ) {}

  async getCharityOnHomePage(reqData) {
    const { lang } = reqData;
    const charity = await this.charityRepository.findOne({
      join: {
        alias: 'charity',
        leftJoinAndSelect: {
          translates: 'charity.translates',
          products: 'charity.products',
        },
      },
      where: (qb) => {
        const currentDate = this.getCurrentDateTimeFormatted();
        qb.where(
          'translates.language_code = :lang AND charity.status = :status AND products.quantity > 0 AND ((start_date < :date AND end_date > :date) OR (start_date < :date AND end_date IS NULL))',
          {
            date: currentDate,
            status: CharityStatusConst.ACTIVATED,
            lang,
          },
        );
      },
    });
    if (charity) {
      if (charity.products && charity.products.length) {
        const productIds = charity.products.map((product) => product.product);
        const products = await this.charityProductRepository
          .createQueryBuilder('products')
          .leftJoinAndSelect('products.product_obj', 'product')
          .leftJoinAndSelect('product.translates', 'translates')
          .leftJoinAndSelect(
            'product.images',
            'product_images',
            'is_thumbnail = :is_thumbnail',
            {
              is_thumbnail: 1,
            },
          )
          .where('product.id IN (:...product_ids) AND charity = :charityId', {
            product_ids: productIds,
            charityId: charity.id,
          })
          .getMany();
        charity.products = products.map((item) => {
          const processedTranslate = processProductTranslateData(
            item.product_obj.translates,
          );
          delete item.product_obj.translates;
          if (item.product_obj['images']) {
            item.product_obj['thumbnail'] = item.product_obj['images'][0]?.url;
          }
          delete item.product_obj.images;
          item.product_obj = {
            ...item.product_obj,
            ...processedTranslate[reqData.lang],
          };
          return item;
        });
      }
      const processedTranslate = processTranslateData(charity.translates);
      delete charity.translates;
      const products = charity.products.map((item) => ({
        product_price: item.price,
        quantity: item.quantity,
        percentage: item.percentage,
        charity_price: item.charity_price,
        charity_total_amount: item.total,
        charity_sold_amount: item.sold,
        charity_sold_quantity: item.sold / item.charity_price,
        product: {
          id: item.product_obj.id,
          code: item.product_obj.code,
          thumbnail: item.product_obj['thumbnail'] || null,
          category_id: item.product_obj.categoryId,
          name: item.product_obj['name'] || null,
          short_desc: item.product_obj['short_desc'] || null,
          description: item.product_obj['description'] || null,
          price: item.product_obj.price,
        },
      }));
      delete charity.products;
      return {
        data: {
          ...processedTranslate[reqData.lang],
          total_amount: charity.price,
          sold_amount: charity.total,
          start_date: charity.start_date,
          end_date: charity.end_date,
          products: products,
        },
      };
    } else {
      return {
        data: null,
      };
    }
  }

  getCurrentDateTimeFormatted = () => {
    const d = new Date();
    const year = d.getFullYear();
    const month = d.getMonth() + 1;
    const date = d.getDate();
    const hour = d.getHours();
    const min = d.getMinutes();
    const dateString = `${year}-${month < 10 ? '0' + month : month}-${
      date < 10 ? '0' + date : date
    } ${hour}:${min}`;
    return dateString;
  };

  getActivatingCharityQuery() {
    return (
      this.charityRepository
        .createQueryBuilder('charity')
        // TODO: make sure condition compatible with RDBMS drivers
        .addSelect(
          'CONVERT_TZ(CAST(start_date AS DATETIME), "+00:00", "+07:00") AS charity_start_at',
        )
        .addSelect(
          'CONVERT_TZ(CAST(end_date AS DATETIME), "+00:00", "+07:00") AS charity_end_at',
        )
        // TODO: check why need using CONVERT_TZ with NOW, server MySQL set timezone already
        .addSelect('CONVERT_TZ(NOW(), "+00:00", "+07:00") AS now')
        .innerJoinAndSelect('charity.products', 'charity_products')
        .where('charity.status = :status', {
          status: CharityStatusConst.ACTIVATED,
        })
        .andWhere('charity.price > charity.total')
        .andWhere('charity_products.quantity > charity_products.sold')
        // TODO: make sure condition compatible with RDBMS drivers
        .having(
          'charity_start_at <= now AND (end_date IS NULL OR now <= charity_end_at)',
        )
    );
  }
}
