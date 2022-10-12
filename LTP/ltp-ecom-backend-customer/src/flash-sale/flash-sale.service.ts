import { Injectable } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
import { processProductTranslateData } from '../common/helpers/product.helper';
import { generateMapDataWithKeyFieldPair } from '../common/helpers/util.helper';
import {
  FlashSaleStatusConst,
  FlashSaleProductStatusConst,
} from '../common/constants/flash-sale.constant';
import { GetFlashSaleHomePageDto } from './dto/get-flash-sale-home-page.dto';
import { FlashSaleRepository } from './repository/flash-sale.repository';
import { ProductRepository } from '../product/repository/product.repository';

@Injectable()
export class FlashSaleService {
  constructor(
    private flashSaleRepo: FlashSaleRepository,
    private productRepo: ProductRepository,
    private i18n: I18nService,
  ) {}

  async getFlashSaleOnHomePage(reqData: GetFlashSaleHomePageDto) {
    const result = await this.getCurrentFlashSaleQuery()
      .innerJoinAndSelect(
        'flash_sale_products.product',
        'flash_sale_products_product',
      )
      .leftJoinAndSelect(
        'flash_sale_products_product.translates',
        'flash_sale_products_product_translates',
        'flash_sale_products_product_translates.language_code= :productLang',
        {
          productLang: reqData.lang,
        },
      )
      // TODO: check why can not left join with images relation, it made data wrong
      /*
      .leftJoinAndSelect(
        'flash_sale_products_product.images',
        'flash_sale_products_product_images',
        'is_thumbnail = :is_thumbnail',
        {
          is_thumbnail: 1,
        },
      )
      */
      .getOne();
    if (!result) {
      return {};
    }
    if (result.products && result.products.length) {
      // TODO: after can use left join with images relation, delete it
      const productIds = result.products.map((item) => {
        return item.product_id;
      });
      const productsGet = await this.productRepo
        .createQueryBuilder('product')
        .leftJoinAndSelect(
          'product.images',
          'product_images',
          'is_thumbnail = :is_thumbnail',
          {
            is_thumbnail: 1,
          },
        )
        .where('product.id IN (:...product_ids)', {
          product_ids: productIds,
        })
        .getMany();
      const mapProductsGet = generateMapDataWithKeyFieldPair(
        'id',
        '',
        productsGet,
      );
      result.products = result.products.map((item) => {
        const processedTranslate = processProductTranslateData(
          item.product.translates,
        );
        delete item.product.translates;
        // TODO: after can use left join with images relation, delete it
        if (mapProductsGet.hasOwnProperty(item.product_id)) {
          item.product['images'] = mapProductsGet[item.product_id]['images'];
        }
        item.product = {
          ...item.product,
          ...processedTranslate[reqData.lang],
        };

        return item;
      });
    }
    const promisesGetProductStatusLabels: any[] = [];
    Object.keys(FlashSaleProductStatusConst).forEach((key) => {
      const id = FlashSaleProductStatusConst[key];
      if (!isNaN(id)) {
        promisesGetProductStatusLabels.push(
          this.i18n.t(`flash-sale.product_statuses.${id}`),
        );
      }
    });
    const productStatuses: any[] = [];
    const productStatusLabels = await Promise.all(
      promisesGetProductStatusLabels,
    );
    Object.keys(FlashSaleProductStatusConst).forEach((key) => {
      const id = FlashSaleProductStatusConst[key];
      if (!isNaN(id)) {
        const label = productStatusLabels[id - 1];
        productStatuses.push({
          id,
          label,
        });
      }
    });
    return {
      result,
      product_statuses: productStatuses,
    };
  }

  getCurrentFlashSaleQuery() {
    return (
      this.flashSaleRepo
        .createQueryBuilder('flash_sale')
        // TODO: make sure condition compatible with RDBMS drivers
        .addSelect(
          'CONVERT_TZ(CAST(start_date AS DATETIME), "+00:00", "+07:00") AS flash_sale_start_at',
        )
        .addSelect(
          'CONVERT_TZ(CAST(end_date AS DATETIME), "+00:00", "+07:00") AS flash_sale_end_at',
        )
        // TODO: check why need using CONVERT_TZ with NOW, server MySQL set timezone already
        .addSelect('CONVERT_TZ(NOW(), "+00:00", "+07:00") AS now')
        .innerJoinAndSelect('flash_sale.products', 'flash_sale_products')
        .where('flash_sale.status = :status', {
          status: FlashSaleStatusConst.ON,
        })
        .andWhere(
          'flash_sale_products.quantity > :flash_sale_products_quantity',
          {
            flash_sale_products_quantity: 0,
          },
        )
        // TODO: make sure condition compatible with RDBMS drivers
        .having('flash_sale_start_at <= now AND now <= flash_sale_end_at')
    );
  }
}
