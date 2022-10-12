import { Injectable } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
import { MoreThan, In } from 'typeorm';
import { CustomerSpecialProductComboTypeConst } from '../common/constants/customer-special-product-combo.constant';
import { RpcExc } from '../common/exceptions/custom.exception';
import { processProductTranslateData } from '../common/helpers/product.helper';
import { parseOffsetAndLimit } from '../common/helpers/paginate.helper';
import { UpdateOneCustomerFavouriteProductComboDto } from './dto/update-one-customer-favourite-product-combo.dto';
import { DeleteOneCustomerSpecialProductComboDto } from './dto/delete-one-customer-special-product-combo.dto';
import { DeleteAllCustomerFavouriteProductCombosDto } from './dto/delete-all-customer-favourite-product-combos.dto';
import { FindAllCustomerFavouriteProductCombosDto } from './dto/find-all-customer-favourite-product-combos.dto';
import { CustomerSpecialProductComboRepository } from './repository/customer-special-product.repository';
import { ProductComboRepository } from '../product-combo/repository/product-combo.repository';
import { ProductCombo } from '../product-combo/schema/product-combo.schema';

@Injectable()
export class CustomerSpecialProductComboService {
  constructor(
    private customerSpecialProductComboRepo: CustomerSpecialProductComboRepository,
    private productComboRepo: ProductComboRepository,
    private i18n: I18nService,
  ) {}

  async findAllCustomerFavouriteProductCombos(
    reqData: FindAllCustomerFavouriteProductCombosDto,
  ) {
    const { offset, limit } = parseOffsetAndLimit(reqData.page, reqData.limit);
    const [data, count] = await this.customerSpecialProductComboRepo
      .createQueryBuilder('customer_special_product_combo')
      .innerJoinAndSelect(
        'customer_special_product_combo.product_combo',
        'customer_special_product_combo_product_combo',
      )
      .leftJoinAndSelect(
        'customer_special_product_combo_product_combo.images',
        'customer_special_product_combo_product_combo_images',
        'is_thumbnail = :is_thumbnail',
        {
          is_thumbnail: 1,
        },
      )
      .leftJoinAndSelect(
        'customer_special_product_combo_product_combo.translates',
        'customer_special_product_combo_product_combo_translates',
        'language_code= :lang',
        {
          lang: reqData.lang,
        },
      )
      .where('customer_special_product_combo.customer_id= :customerId', {
        customerId: reqData.customer,
      })
      .andWhere('customer_special_product_combo.type= :type', {
        type: CustomerSpecialProductComboTypeConst.FAVOURITE,
      })
      .orderBy({
        'customer_special_product_combo.created_at': 'DESC',
      })
      .skip(offset)
      .take(limit)
      .getManyAndCount();
    const maxPage = Math.ceil(count / limit);
    const results = data.map((item) => {
      const processedTranslate = processProductTranslateData(
        item['product_combo']['translates'],
      );
      delete item['product_combo']['translates'];
      item['product_combo'] = {
        ...item['product_combo'],
        ...processedTranslate[reqData.lang],
      };

      return item;
    });
    return { results, total: count, max_page: maxPage };
  }

  async updateOneCustomerFavouriteProductCombo(
    data: UpdateOneCustomerFavouriteProductComboDto,
  ) {
    const dataQuery = {
      product_combo_id: data.product_combo,
      customer_id: data.customer,
      type: CustomerSpecialProductComboTypeConst.FAVOURITE,
    };
    const [checkExists, updatedMsg] = await Promise.all([
      this.customerSpecialProductComboRepo.find({
        where: dataQuery,
        take: 1,
      }),
      this.i18n.t('customer-special-product-combo.message.fav_updated'),
    ]);
    if (checkExists && checkExists.length) {
      await Promise.all([
        this.customerSpecialProductComboRepo.delete(dataQuery),
        this.productComboRepo.manager
          .createQueryBuilder()
          .update(ProductCombo)
          .where({
            id: data.product_combo,
            num_like: MoreThan(0),
          })
          .set({ num_like: () => 'num_like - 1' })
          .execute(),
      ]);
    } else {
      await Promise.all([
        this.customerSpecialProductComboRepo.save(dataQuery),
        this.productComboRepo.manager
          .createQueryBuilder()
          .update(ProductCombo)
          .where({
            id: data.product_combo,
          })
          .set({ num_like: () => 'num_like + 1' })
          .execute(),
      ]);
    }

    return {
      message: updatedMsg,
    };
  }

  async deleteOneCustomerFavouriteProductCombo(
    data: DeleteOneCustomerSpecialProductComboDto,
  ) {
    const [customerSpecialProductComboGet, deletedMsg, deleteFailMsg] =
      await Promise.all([
        this.customerSpecialProductComboRepo.findOne({
          where: {
            id: data.id,
            customer_id: data.customer,
            type: CustomerSpecialProductComboTypeConst.FAVOURITE,
          },
        }),
        this.i18n.t('customer-special-product-combo.message.fav_deleted'),
        this.i18n.t('customer-special-product-combo.message.fav_delete_fail'),
      ]);
    if (!customerSpecialProductComboGet) {
      throw new RpcExc(`bad_request:${deleteFailMsg}`);
    }
    const [deletedCustomerFavouriteProduct, updateProductNumLike] =
      await Promise.all([
        this.customerSpecialProductComboRepo.delete({
          id: data.id,
          customer_id: data.customer,
          type: CustomerSpecialProductComboTypeConst.FAVOURITE,
        }),
        this.productComboRepo.manager
          .createQueryBuilder()
          .update(ProductCombo)
          .where({
            id: customerSpecialProductComboGet.product_combo_id,
            num_like: MoreThan(0),
          })
          .set({ num_like: () => 'num_like - 1' })
          .execute(),
      ]);
    return {
      message: deletedMsg,
    };
  }

  async deleteAllCustomerFavouriteProductCombos(
    data: DeleteAllCustomerFavouriteProductCombosDto,
  ) {
    const [customerSpecialProductsGet, deletedMsg] = await Promise.all([
      this.customerSpecialProductComboRepo.find({
        where: {
          customer_id: data.customer,
          type: CustomerSpecialProductComboTypeConst.FAVOURITE,
        },
      }),
      this.i18n.t('customer-special-product-combo.message.all_fav_deleted'),
    ]);
    if (!customerSpecialProductsGet || !customerSpecialProductsGet.length) {
      return {
        message: deletedMsg,
      };
    }
    const productComboIds = customerSpecialProductsGet.map((item) => {
      return item.product_combo_id;
    });
    const [deletedAllCustomerFavouriteProducts, updateProductsNumLike] =
      await Promise.all([
        this.customerSpecialProductComboRepo.delete({
          customer_id: data.customer,
          type: CustomerSpecialProductComboTypeConst.FAVOURITE,
        }),
        this.productComboRepo.manager
          .createQueryBuilder()
          .update(ProductCombo)
          .where({
            id: In(productComboIds),
            num_like: MoreThan(0),
          })
          .set({ num_like: () => 'num_like - 1' })
          .execute(),
      ]);
    return {
      message: deletedMsg,
    };
  }
}
