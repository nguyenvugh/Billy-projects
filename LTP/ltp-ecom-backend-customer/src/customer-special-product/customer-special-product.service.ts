import { Injectable } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
import { MoreThan, In } from 'typeorm';
import { CustomerSpecialProductTypeConst } from '../common/constants/customer-special-product.constant';
import { RpcExc } from '../common/exceptions/custom.exception';
import { processProductTranslateData } from '../common/helpers/product.helper';
import { parseOffsetAndLimit } from '../common/helpers/paginate.helper';
import { FindAllCustomerFavouriteProductsDto } from './dto/find-all-customer-favourite-products.dto';
import { DeleteOneCustomerSpecialProductDto } from './dto/delete-one-customer-special-product.dto';
import { DeleteAllCustomerFavouriteProductsDto } from './dto/delete-all-customer-favourite-products.dto';
import { UpdateOneCustomerFavouriteProductDto } from './dto/update-one-customer-favourite-product.dto';
import { FindAllCustomerSeenProductsDto } from './dto/find-all-customer-seen-products.dto';
import { CustomerSpecialProductRepository } from './repository/customer-special-product.repository';
import { ProductRepository } from '../product/repository/product.repository';
import { Product } from '../product/schema/product.schema';

@Injectable()
export class CustomerSpecialProductService {
  constructor(
    private customerSpecialProductRepository: CustomerSpecialProductRepository,
    private productRepository: ProductRepository,
    private i18n: I18nService,
  ) {}

  async findAllCustomerFavouriteProducts(
    reqData: FindAllCustomerFavouriteProductsDto,
  ) {
    const { offset, limit } = parseOffsetAndLimit(reqData.page, reqData.limit);
    const [data, count] = await this.customerSpecialProductRepository
      .createQueryBuilder('customer_special_product')
      .innerJoinAndSelect(
        'customer_special_product.product',
        'customer_special_product_product',
      )
      .leftJoinAndSelect(
        'customer_special_product_product.images',
        'customer_special_product_product_images',
        'is_thumbnail = :is_thumbnail',
        {
          is_thumbnail: 1,
        },
      )
      .leftJoinAndSelect(
        'customer_special_product_product.translates',
        'customer_special_product_product_translates',
        'language_code= :lang',
        {
          lang: reqData.lang,
        },
      )
      .where('customer_special_product.customer_id= :customerId', {
        customerId: reqData.customer,
      })
      .andWhere('customer_special_product.type= :type', {
        type: CustomerSpecialProductTypeConst.FAVOURITE,
      })
      .orderBy({
        'customer_special_product.created_at': 'DESC',
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

  async deleteOneCustomerFavouriteProduct(
    data: DeleteOneCustomerSpecialProductDto,
  ) {
    const [customerSpecialProductGet, deletedMsg, deleteFailMsg] =
      await Promise.all([
        this.customerSpecialProductRepository.findOne({
          where: {
            id: data.id,
            customer_id: data.customer,
            type: CustomerSpecialProductTypeConst.FAVOURITE,
          },
        }),
        this.i18n.t('customer-special-product.message.fav_deleted'),
        this.i18n.t('customer-special-product.message.fav_delete_fail'),
      ]);
    if (!customerSpecialProductGet) {
      throw new RpcExc(`bad_request:${deleteFailMsg}`);
    }
    const [deletedCustomerFavouriteProduct, updateProductNumLike] =
      await Promise.all([
        this.customerSpecialProductRepository.delete({
          id: data.id,
          customer_id: data.customer,
          type: CustomerSpecialProductTypeConst.FAVOURITE,
        }),
        this.productRepository.manager
          .createQueryBuilder()
          .update(Product)
          .where({
            id: customerSpecialProductGet.product_id,
            num_like: MoreThan(0),
          })
          .set({ num_like: () => 'num_like - 1' })
          .execute(),
      ]);
    return {
      message: deletedMsg,
    };
  }

  async deleteAllCustomerFavouriteProducts(
    data: DeleteAllCustomerFavouriteProductsDto,
  ) {
    const [customerSpecialProductsGet, deletedMsg] = await Promise.all([
      this.customerSpecialProductRepository.find({
        where: {
          customer_id: data.customer,
          type: CustomerSpecialProductTypeConst.FAVOURITE,
        },
      }),
      this.i18n.t('customer-special-product.message.all_fav_deleted'),
    ]);
    if (!customerSpecialProductsGet || !customerSpecialProductsGet.length) {
      return {
        message: deletedMsg,
      };
    }
    const productIds = customerSpecialProductsGet.map((item) => {
      return item.product_id;
    });
    const [deletedAllCustomerFavouriteProducts, updateProductsNumLike] =
      await Promise.all([
        this.customerSpecialProductRepository.delete({
          customer_id: data.customer,
          type: CustomerSpecialProductTypeConst.FAVOURITE,
        }),
        this.productRepository.manager
          .createQueryBuilder()
          .update(Product)
          .where({
            id: In(productIds),
            num_like: MoreThan(0),
          })
          .set({ num_like: () => 'num_like - 1' })
          .execute(),
      ]);
    return {
      message: deletedMsg,
    };
  }

  async updateOneCustomerFavouriteProduct(
    data: UpdateOneCustomerFavouriteProductDto,
  ) {
    const dataQuery = {
      product_id: data.product,
      customer_id: data.customer,
      type: CustomerSpecialProductTypeConst.FAVOURITE,
    };
    const [checkExists, updatedMsg] = await Promise.all([
      this.customerSpecialProductRepository.find({
        where: dataQuery,
        take: 1,
      }),
      this.i18n.t('customer-special-product.message.fav_updated'),
    ]);
    if (checkExists && checkExists.length) {
      await Promise.all([
        this.customerSpecialProductRepository.delete(dataQuery),
        this.productRepository.manager
          .createQueryBuilder()
          .update(Product)
          .where({
            id: data.product,
            num_like: MoreThan(0),
          })
          .set({ num_like: () => 'num_like - 1' })
          .execute(),
      ]);
    } else {
      await Promise.all([
        this.customerSpecialProductRepository.save(dataQuery),
        this.productRepository.manager
          .createQueryBuilder()
          .update(Product)
          .where({
            id: data.product,
          })
          .set({ num_like: () => 'num_like + 1' })
          .execute(),
      ]);
    }

    return {
      message: updatedMsg,
    };
  }

  async findAllCustomerSeenProducts(reqData: FindAllCustomerSeenProductsDto) {
    const { offset, limit } = parseOffsetAndLimit(reqData.page, reqData.limit);
    const [data, count] = await this.customerSpecialProductRepository
      .createQueryBuilder('customer_special_product')
      .innerJoinAndSelect(
        'customer_special_product.product',
        'customer_special_product_product',
      )
      .leftJoinAndSelect(
        'customer_special_product_product.images',
        'customer_special_product_product_images',
        'is_thumbnail = :is_thumbnail',
        {
          is_thumbnail: 1,
        },
      )
      .leftJoinAndSelect(
        'customer_special_product_product.translates',
        'customer_special_product_product_translates',
        'language_code= :lang',
        {
          lang: reqData.lang,
        },
      )
      .where('customer_special_product.customer_id= :customerId', {
        customerId: reqData.customer,
      })
      .andWhere('customer_special_product.type= :type', {
        type: CustomerSpecialProductTypeConst.SEEN,
      })
      .orderBy({
        'customer_special_product.created_at': 'DESC',
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
}
