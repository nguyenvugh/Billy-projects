import { Injectable } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
import { In } from 'typeorm';
import { BooleanValue } from '../common/constants/global.constant';
import { CustomerSpecialProductTypeConst } from '../common/constants/customer-special-product.constant';
import { RpcExc } from '../common/exceptions/custom.exception';
import { parseOffsetAndLimit } from '../common/helpers/paginate.helper';
import { processProductTranslateData } from '../common/helpers/product.helper';
import {
  checkObjectIsEmpty,
  generateMapDataWithKeyFieldPair,
} from '../common/helpers/util.helper';
import { CustomerFindAllProductCombosDto } from './dto/find-all-product-combos.dto';
import { FindOneProductComboDto } from './dto/find-one-product-combo.dto';
import { ValidateProductsOrderDto } from '../order/dto/validate-products-order.dto';
import { OrderProductDto } from '../order/dto/order-product.dto';
import { ProductComboRepository } from './repository/product-combo.repository';
import { CustomerSpecialProductRepository } from '../customer-special-product/repository/customer-special-product.repository';
import { CustomerSpecialProductComboRepository } from '../customer-special-product-combo/repository/customer-special-product.repository';
import { OrderService } from '../order/order.service';

@Injectable()
export class ProductComboService {
  constructor(
    private productComboRepo: ProductComboRepository,
    private customerSpecialProductRepo: CustomerSpecialProductRepository,
    private customerSpecialProductComboRepo: CustomerSpecialProductComboRepository,
    private orderService: OrderService,
    private i18n: I18nService,
  ) {}

  async findAllProductCombos(reqData: CustomerFindAllProductCombosDto) {
    const { offset, limit } = parseOffsetAndLimit(reqData.page, reqData.limit);
    const sorting: any = {};
    sorting[`product_combos.${reqData.sort_field}`] = reqData.sort_value;
    const [data, count] = await this.productComboRepo
      .createQueryBuilder('product_combos')
      .leftJoinAndSelect('product_combos.details', 'product_combos_details')
      .leftJoinAndSelect(
        'product_combos_details.product',
        'product_combos_details_product',
      )
      .leftJoinAndSelect(
        'product_combos.translates',
        'product_combos_translates',
        'product_combos_translates.language_code = :language_code',
        {
          language_code: reqData.lang,
        },
      )
      .leftJoinAndSelect(
        'product_combos.images',
        'product_combos_images',
        'is_thumbnail = :is_thumbnail',
        {
          is_thumbnail: 1,
        },
      )
      .where('product_combos_details.product_id = :product', {
        product: reqData.product,
      })
      .andWhere('product_combos.status = :status', {
        status: BooleanValue.TRUE,
      })
      .orderBy(sorting)
      .skip(offset)
      .take(limit)
      .getManyAndCount();
    let mapFavouriteProductCombosOfCustomer: any = {};
    if (reqData.customer) {
      const favProductCombosOfCustomer =
        await this.customerSpecialProductComboRepo.find({
          where: {
            customer_id: reqData.customer,
            type: CustomerSpecialProductTypeConst.FAVOURITE,
          },
        });
      if (favProductCombosOfCustomer && favProductCombosOfCustomer.length) {
        mapFavouriteProductCombosOfCustomer = generateMapDataWithKeyFieldPair(
          'product_combo_id',
          '',
          favProductCombosOfCustomer,
        );
      }
    }
    const maxPage = Math.ceil(count / limit);
    const results = data.map((item) => {
      const processedTranslate = processProductTranslateData(
        item['translates'],
      );
      delete item['translates'];
      item['is_favourite'] = false;
      if (mapFavouriteProductCombosOfCustomer.hasOwnProperty(item.id)) {
        item['is_favourite'] = true;
      }
      // TODO: check can buy product combo
      // TODO: check each product in combo with inventory product
      item['can_buy'] = true;

      return {
        ...item,
        ...processedTranslate[reqData.lang],
      };
    });
    return { results, total: count, max_page: maxPage };
  }

  async findOneProductCombo(reqData: FindOneProductComboDto) {
    const { id, lang, customer } = reqData;
    const [detail, errMsg] = await Promise.all([
      this.productComboRepo
        .createQueryBuilder('product_combos')
        .leftJoinAndSelect('product_combos.details', 'product_combos_details')
        .leftJoinAndSelect(
          'product_combos_details.product',
          'product_combos_details_product',
        )
        .leftJoinAndSelect(
          'product_combos.translates',
          'product_combos_translates',
          'product_combos_translates.language_code = :language_code',
          {
            language_code: lang,
          },
        )
        .leftJoinAndSelect('product_combos.images', 'product_combos_images')
        .where('product_combos.id = :id', {
          id: id,
        })
        .getOne(),
      this.i18n.t('product-combo.validate.not_found'),
    ]);
    if (!detail) {
      throw new RpcExc(`not_found:${errMsg}`);
    }
    const processedTranslate = processProductTranslateData(
      detail['translates'],
    );
    delete detail['translates'];
    detail['is_favourite'] = false;
    const productIds = detail.details.map((item) => {
      return item.product_id;
    });
    let mapFavouriteProductsOfCustomer: any = {};
    if (customer) {
      const [customerSpecialProducts, customerSpecialProductCombos] =
        await Promise.all([
          this.customerSpecialProductRepo.find({
            where: {
              customer_id: customer,
              product_id: In(productIds),
              type: CustomerSpecialProductTypeConst.FAVOURITE,
            },
          }),
          this.customerSpecialProductComboRepo.find({
            where: {
              customer_id: customer,
              product_combo_id: id,
              type: CustomerSpecialProductTypeConst.FAVOURITE,
            },
          }),
        ]);
      if (customerSpecialProductCombos && customerSpecialProductCombos.length) {
        detail['is_favourite'] = true;
      }
      mapFavouriteProductsOfCustomer = generateMapDataWithKeyFieldPair(
        'product_id',
        '',
        customerSpecialProducts,
      );
    }

    detail.details = detail.details.map((item) => {
      item.product['is_favourite'] = false;
      if (mapFavouriteProductsOfCustomer.hasOwnProperty(item.product.id)) {
        item.product['is_favourite'] = true;
      }
      return item;
    });
    // TODO: check can buy product combo
    // TODO: check each product in combo with inventory product
    detail['can_buy'] = false;
    if (detail.details && detail.details.length) {
      const dataValidateOrder: ValidateProductsOrderDto = {
        products: [],
      };
      detail.details.forEach((detail) => {
        const productOrder: OrderProductDto = {
          productId: detail.product_id,
          product: null,
          comboId: detail.product_combo_id,
          number: detail.quantity,
        };
        dataValidateOrder.products.push(productOrder);
      });
      const validateOrder = await this.orderService.validateProductsOrder(
        dataValidateOrder,
      );
      if (
        checkObjectIsEmpty(validateOrder['products']) &&
        checkObjectIsEmpty(validateOrder['combos'])
      ) {
        detail['can_buy'] = true;
      }
    }

    return {
      ...detail,
      ...processedTranslate[lang],
    };
  }
}
