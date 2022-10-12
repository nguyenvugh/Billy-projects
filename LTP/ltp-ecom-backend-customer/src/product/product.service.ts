import { Injectable } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
import { In } from 'typeorm';
import { BooleanValue } from '../common/constants/global.constant';
import {
  FindRelatedProductsLimit,
  ProductStatusDisplayConst,
} from '../common/constants/product.constant';
import { RpcExc } from '../common/exceptions/custom.exception';
import { CustomerReviewStatus } from '../common/constants/customer-review.constant';
import { CustomerSpecialProductTypeConst } from '../common/constants/customer-special-product.constant';
import { FlashSaleStatusConst } from '../common/constants/flash-sale.constant';
import {
  SliderStatusConst,
  SliderTypeConst,
} from '../common/constants/slider.constant';
import { processTranslateData } from '../common/helpers/translate.helper';
import { processProductTranslateData } from '../common/helpers/product.helper';
import { parseOffsetAndLimit } from '../common/helpers/paginate.helper';
import {
  generateMapDataWithKeyFieldPair,
  checkItemInArray,
  removeDuplicateItemsFromArray,
} from '../common/helpers/util.helper';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FindAllProductsDto } from './dto/find-all-products.dto';
import { FindOneProductDto } from './dto/find-one-product.dto';
import { FindOneProductBySlugDto } from './dto/find-one-product-by-slug.dto';
import { FindRelatedProductsDto } from './dto/find-related-products.dto';
import { FindProductReviewsDto } from './dto/find-product-reviews.dto';
import { FindProductReviewsBySlugDto } from './dto/find-product-reviews-by-slug.dto';
import { ProductRepository } from './repository/product.repository';
import { CustomerReviewRepository } from '../customer-review/repository/customer-review.repository';
import { ProductCategoryTranslateRepository } from '../product-category-translate/repository/product-category-translate.repository';
import { ProductTranslateRepository } from '../product-translate/repository/product-translate.repository';
import { ProductSlugHistoryRepo } from './repository/product-slug-history.repository';
import { CustomerSpecialProductRepository } from '../customer-special-product/repository/customer-special-product.repository';
import { FlashSaleService } from '../flash-sale/flash-sale.service';
import { PromotionService } from '../promotion/promotion.service';
import { CharityService } from '../charity/charity.service';

@Injectable()
export class ProductService {
  constructor(
    private productRepository: ProductRepository,
    private customerReviewRepository: CustomerReviewRepository,
    private productTranslateRepository: ProductTranslateRepository,
    private productSlugHistoryRepo: ProductSlugHistoryRepo,
    private productCategoryTranslateRepository: ProductCategoryTranslateRepository,
    private customerSpecialProductRepo: CustomerSpecialProductRepository,
    private flashSaleService: FlashSaleService,
    private promotionService: PromotionService,
    private charityService: CharityService,
    private i18n: I18nService,
  ) {}

  create(createProductDto: CreateProductDto) {
    return 'This action adds a new product';
  }

  async findAll(reqData: FindAllProductsDto) {
    const { offset, limit } = parseOffsetAndLimit(reqData.page, reqData.limit);
    const [currentFlashSale, activatingProductPromotions, activeCharity] =
      await Promise.all([
        this.flashSaleService.getCurrentFlashSaleQuery().getOne(),
        this.promotionService
          .getActivatingPromotionQuery()
          .andWhere('slider.type = :type', {
            type: SliderTypeConst.PRODUCT,
          })
          .getMany(),
        this.charityService.getActivatingCharityQuery().getOne(),
      ]);
    let flashSaleProductIds: any[] = [];
    let promotionProductIds: any[] = [];
    const mapFlashSaleProducts: any = {};
    const mapProductPromitions: any = {};
    let charityProductIds: any[] = [];
    const mapCharityProducts: any = {};
    if (
      currentFlashSale &&
      currentFlashSale.products &&
      currentFlashSale.products.length
    ) {
      currentFlashSale.products.forEach((productFlashSale) => {
        if (
          !checkItemInArray(flashSaleProductIds, productFlashSale.product_id)
        ) {
          flashSaleProductIds.push(productFlashSale.product_id);
        }

        mapFlashSaleProducts[productFlashSale.product_id] = productFlashSale;
      });
    }
    if (activatingProductPromotions && activatingProductPromotions.length) {
      activatingProductPromotions.forEach((promotion) => {
        if (!checkItemInArray(promotionProductIds, promotion.product)) {
          promotionProductIds.push(promotion.product);
        }
        mapProductPromitions[promotion.product] = promotion;
      });
    }
    if (
      activeCharity &&
      activeCharity.products &&
      activeCharity.products.length
    ) {
      activeCharity.products.forEach((productCharity) => {
        if (!checkItemInArray(charityProductIds, productCharity.product)) {
          charityProductIds.push(productCharity.product);
        }
        charityProductIds.push(productCharity.product);
        mapCharityProducts[productCharity.product] = productCharity;
      });
    }
    let query = this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.category', 'product_category')
      .leftJoinAndSelect(
        'product.translates',
        'product_translates',
        'product_translates.language_code= :productLang',
        {
          productLang: reqData.lang,
        },
      )
      .leftJoinAndSelect(
        'product.images',
        'product_images',
        'is_thumbnail = :is_thumbnail',
        {
          is_thumbnail: 1,
        },
      )
      /*.leftJoinAndSelect(
        'product.inventory_products',
        'product_inventory_products',
        'product_inventory_products.remaining_number > 0',
      )
      .innerJoin(
        'product_inventory_products.inventory',
        'product_inventory_products_inventory',
      )*/
      .where('product.status_display= :statusDisplay', {
        statusDisplay: ProductStatusDisplayConst.SHOW,
      })
      .orderBy({
        'product.price': reqData.sort_value,
        'product_translates.name': 'ASC',
      })
      .skip(offset)
      .take(limit);
    // API called from home page -> feature product (limit = 4)
    if (BooleanValue.TRUE == reqData.is_homepage_feature_products) {
      query = query
        .innerJoinAndSelect(
          'product.inventory_products',
          'product_inventory_products',
          'product_inventory_products.remaining_number > 0',
        )
        .innerJoin(
          'product_inventory_products.inventory',
          'product_inventory_products_inventory',
        );
    }
    if (reqData.is_flash_sale) {
      if (!flashSaleProductIds.length) {
        flashSaleProductIds = [-1];
      }
      query = query.andWhere('product.id IN (:...product_flashsale_ids)', {
        product_flashsale_ids: flashSaleProductIds,
      });
    }
    if (reqData.is_promotion) {
      if (!promotionProductIds.length) {
        promotionProductIds = [-1];
      }
      query = query.andWhere('product.id IN (:...product_promotion_ids)', {
        product_promotion_ids: promotionProductIds,
      });
    }
    if (reqData.is_charity) {
      if (!charityProductIds.length) {
        charityProductIds = [-1];
      }
      query = query.andWhere('product.id IN (:...product_charity_ids)', {
        product_charity_ids: charityProductIds,
      });
    }
    if (reqData.search) {
      query = query.andWhere('product_translates.name LIKE :search', {
        search: `%${reqData.search}%`,
      });
    }
    if (reqData.category) {
      query = query.andWhere('category IN (:...category)', {
        category: reqData.category,
      });
    }
    if (reqData.is_feature) {
      query = query.andWhere('product.is_feature= :is_feature', {
        is_feature: reqData.is_feature,
      });
    }
    if (reqData.price_from) {
      query = query.andWhere('price>= :price_from', {
        price_from: reqData.price_from,
      });
    }
    if (reqData.price_to) {
      query = query.andWhere('price<= :price_to', {
        price_to: reqData.price_to,
      });
    }
    if (reqData.city) {
      query = query
        .leftJoin('product.inventories', 'product_inventories')
        .andWhere('product_inventories.city IN (:...city)', {
          city: reqData.city,
        });
    }
    let mapFavouriteProductsOfCustomer: any = {};
    if (reqData.customer) {
      const favProductsOfCustomer = await this.customerSpecialProductRepo.find({
        where: {
          customer_id: reqData.customer,
          type: CustomerSpecialProductTypeConst.FAVOURITE,
        },
      });
      let favProductIds = [-1];
      if (favProductsOfCustomer && favProductsOfCustomer.length) {
        favProductIds = favProductsOfCustomer.map((item) => {
          return item.product_id;
        });
        mapFavouriteProductsOfCustomer = generateMapDataWithKeyFieldPair(
          'product_id',
          '',
          favProductsOfCustomer,
        );
      }
      if (reqData.is_favourite) {
        query = query.andWhere('product.id IN (:...fav_product_ids)', {
          fav_product_ids: favProductIds,
        });
      }
    }
    const [data, count] = await query.getManyAndCount();
    let categoryIds: any[] = data.map((item) => {
      return item.categoryId;
    });
    categoryIds = removeDuplicateItemsFromArray(categoryIds);
    const productCateTranslates =
      await this.productCategoryTranslateRepository.find({
        where: {
          language_code: reqData.lang,
          language_field: 'name',
          product_category_id: In(categoryIds),
        },
      });
    const mapProductCateTranslates: any = generateMapDataWithKeyFieldPair(
      'product_category_id',
      '',
      productCateTranslates,
    );
    const maxPage = Math.ceil(count / limit);
    const results = data.map((item) => {
      const processedTranslate = processProductTranslateData(
        item['translates'],
      );
      delete item['translates'];
      if (mapProductCateTranslates.hasOwnProperty(item.categoryId)) {
        const processedCateTranslate = processTranslateData([
          mapProductCateTranslates[item.categoryId],
        ]);
        item.category = {
          ...item.category,
          ...processedCateTranslate[reqData.lang],
        };
      }
      item['is_favourite'] = false;
      if (mapFavouriteProductsOfCustomer.hasOwnProperty(item.id)) {
        item['is_favourite'] = true;
      }
      if (mapFlashSaleProducts.hasOwnProperty(item.id)) {
        item['flash_sale'] = mapFlashSaleProducts[item.id];
      }
      if (mapProductPromitions.hasOwnProperty(item.id)) {
        item['promotion'] = mapProductPromitions[item.id];
      }
      if (mapCharityProducts.hasOwnProperty(item.id)) {
        const charityProduct = mapCharityProducts[item.id];
        if (charityProduct['quantity'] > charityProduct['sold']) {
          item['charity'] = mapCharityProducts[item.id];
        }
      }
      // Don't check product out of stock
      item['can_buy'] = true;
      /*
      if (item.inventory_products && item.inventory_products.length) {
        item['can_buy'] = true;
      }*/

      return {
        ...item,
        ...processedTranslate[reqData.lang],
      };
    });
    return { results, total: count, max_page: maxPage };
  }

  async findOne(reqData: FindOneProductDto) {
    const { id, lang, customer } = reqData;
    const [
      detail,
      currentFlashSale,
      activatingProductPromotion,
      activeCharity,
    ] = await Promise.all([
      this.productRepository
        .createQueryBuilder('product')
        .leftJoinAndSelect('product.translates', 'product_translates')
        .leftJoinAndSelect('product.images', 'product_images')
        .leftJoinAndSelect(
          'product.inventory_products',
          'product_inventory_products',
        )
        .leftJoinAndSelect(
          'product_inventory_products.inventory',
          'product_inventory_products_inventory',
        )
        .where('product.id = :id', {
          id: id,
        })
        .andWhere('product_translates.language_code= :lang', {
          lang: lang,
        })
        .getOne(),
      this.flashSaleService.getCurrentFlashSaleQuery().getOne(),
      this.promotionService
        .getActivatingPromotionQuery()
        .andWhere('slider.product = :product', {
          product: id,
        })
        .getOne(),
      this.charityService
        .getActivatingCharityQuery()
        .andWhere(
          'charity_products.product = :product AND charity_products.quantity > charity_products.sold',
          {
            product: id,
          },
        )
        .getOne(),
    ]);
    const processedTranslate = processProductTranslateData(
      detail['translates'],
    );
    delete detail['translates'];
    detail['is_favourite'] = false;
    if (customer) {
      const customerSpecialProducts =
        await this.customerSpecialProductRepo.find({
          where: {
            customer_id: customer,
            product_id: id,
          },
        });
      let isSeen = false;
      let isFav = false;
      if (customerSpecialProducts && customerSpecialProducts.length) {
        customerSpecialProducts.forEach((customerSpecialProduct) => {
          if (
            CustomerSpecialProductTypeConst.FAVOURITE ==
            customerSpecialProduct.type
          ) {
            isFav = true;
          }
          if (
            CustomerSpecialProductTypeConst.SEEN == customerSpecialProduct.type
          ) {
            isSeen = true;
          }
        });
      }
      if (!isSeen) {
        await this.customerSpecialProductRepo.save({
          customer_id: customer,
          product_id: id,
          type: CustomerSpecialProductTypeConst.SEEN,
        });
      }
      if (isFav) {
        detail['is_favourite'] = true;
      }
    }
    if (
      currentFlashSale &&
      currentFlashSale.products &&
      currentFlashSale.products.length
    ) {
      const mapFlashSaleProducts = generateMapDataWithKeyFieldPair(
        'product_id',
        '',
        currentFlashSale.products,
      );
      if (mapFlashSaleProducts.hasOwnProperty(detail.id)) {
        detail['flash_sale'] = mapFlashSaleProducts[detail.id];
        detail['flash_sale']['start_date'] = currentFlashSale.start_date;
        detail['flash_sale']['end_date'] = currentFlashSale.end_date;
      }
    }
    if (
      activeCharity &&
      activeCharity.products &&
      activeCharity.products.length
    ) {
      const mapCharityProducts = generateMapDataWithKeyFieldPair(
        'product',
        '',
        activeCharity.products,
      );
      if (mapCharityProducts.hasOwnProperty(detail.id)) {
        detail['charity'] = mapCharityProducts[detail.id];
        detail['charity']['start_date'] = activeCharity.start_date;
        detail['charity']['end_date'] = activeCharity.end_date;
      }
    }
    if (activatingProductPromotion) {
      detail['promotion'] = activatingProductPromotion;
    }
    detail['can_buy'] = false;
    if (detail.inventory_products && detail.inventory_products.length) {
      const inventoryProductFilter = detail.inventory_products.filter(
        (item) => {
          return item.remaining_number > 0;
        },
      );
      detail['can_buy'] = inventoryProductFilter.length ? true : false;
    }
    return {
      ...detail,
      ...processedTranslate[lang],
    };
  }

  async findOneBySlug(reqData: FindOneProductBySlugDto) {
    const { slug, lang, customer } = reqData;
    const productFindBySlug = await this.productTranslateRepository.findOne({
      where: {
        slug: slug,
        language_code: lang,
      },
    });
    if (!productFindBySlug) {
      const redirectSlug = await this.productSlugHistoryRepo
        .createQueryBuilder('product_slug_history')
        .innerJoinAndSelect(
          'product_slug_history.product',
          'product_slug_history_product',
        )
        .innerJoinAndSelect(
          'product_slug_history_product.translates',
          'product_slug_history_product_translates',
          'product_slug_history_product_translates.language_code = :lang',
          {
            lang: lang,
          },
        )
        .where(
          'product_slug_history.language_code = :lang AND product_slug_history.slug = :slug',
          {
            lang: lang,
            slug: slug,
          },
        )
        .getOne();
      if (!redirectSlug) {
        throw new RpcExc(`not_found:Not found`);
      } else {
        throw new RpcExc(`redirect:${redirectSlug.product.translates[0].slug}`);
      }
    }
    return await this.findOne({
      id: productFindBySlug.productId,
      lang: lang,
      customer: customer,
    });
  }

  async findSlugOtherLang(lang = 'vi', slug: string, otherLang: string) {
    const findProductBySlug = await this.productTranslateRepository.findOne({
      where: {
        slug: slug,
      },
    });
    if (!findProductBySlug) {
      throw new RpcExc(`not_found:Not found`);
    }
    const findSlugInOtherLang = await this.productTranslateRepository.findOne({
      where: {
        productId: findProductBySlug.productId,
        language_code: otherLang,
      },
    });
    if (!findSlugInOtherLang) {
      throw new RpcExc(`not_found:Not found`);
    }

    return findSlugInOtherLang.slug;
  }

  async findRelated(reqData: FindRelatedProductsDto) {
    const query = this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.translates', 'product_translates')
      .leftJoinAndSelect(
        'product.images',
        'product_images',
        'is_thumbnail = :is_thumbnail',
        {
          is_thumbnail: 1,
        },
      )
      .where('product_translates.language_code= :lang', {
        lang: reqData.lang,
      })
      .andWhere('category IN (:...category)', {
        category: reqData.category,
      })
      .orderBy({
        'product_translates.name': 'ASC',
      })
      .skip(0)
      .take(FindRelatedProductsLimit);
    const data = await query.getMany();
    const results = data.map((item) => {
      const processedTranslate = processProductTranslateData(
        item['translates'],
      );
      delete item['translates'];
      // Don't check product out of stock
      item['can_buy'] = true;
      return {
        ...item,
        ...processedTranslate[reqData.lang],
      };
    });
    return { results };
  }

  async findReviewsBySlug(reqData: FindProductReviewsBySlugDto) {
    const { slug, lang } = reqData;
    const productFindBySlug = await this.productTranslateRepository.findOne({
      where: {
        slug: slug,
        language_code: lang,
      },
    });
    if (!productFindBySlug) {
      const redirectSlug = await this.productSlugHistoryRepo
        .createQueryBuilder('product_slug_history')
        .innerJoinAndSelect(
          'product_slug_history.product',
          'product_slug_history_product',
        )
        .innerJoinAndSelect(
          'product_slug_history_product.translates',
          'product_slug_history_product_translates',
          'product_slug_history_product_translates.language_code = :lang',
          {
            lang: lang,
          },
        )
        .where(
          'product_slug_history.language_code = :lang AND product_slug_history.slug = :slug',
          {
            lang: lang,
            slug: slug,
          },
        )
        .getOne();
      if (!redirectSlug) {
        throw new RpcExc(`not_found:Not found`);
      } else {
        throw new RpcExc(`redirect:${redirectSlug.product.translates[0].slug}`);
      }
    }
    return await this.findReviews({
      ...reqData,
      product: productFindBySlug.productId,
    });
  }

  async findReviews(reqData: FindProductReviewsDto) {
    const { offset, limit } = parseOffsetAndLimit(reqData.page, reqData.limit);
    const query = this.customerReviewRepository
      .createQueryBuilder('customer_review')
      .leftJoinAndSelect('customer_review.customer', 'customer_review_customer')
      .leftJoinAndSelect(
        'customer_review_customer.avatar',
        'customer_review_customer_avatar',
      )
      .leftJoinAndSelect('customer_review.image', 'customer_review_image')
      .where({
        status: CustomerReviewStatus.APPROVED,
        product_id: reqData.product,
      })
      .orderBy({
        'customer_review.created_at': 'DESC',
      })
      .skip(offset)
      .take(limit);
    const [results, count] = await query.getManyAndCount();
    const maxPage = Math.ceil(count / limit);
    return { results, total: count, max_page: maxPage };
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
