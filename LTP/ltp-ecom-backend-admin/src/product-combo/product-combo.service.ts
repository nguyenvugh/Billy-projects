import { Injectable } from '@nestjs/common';
import { Not, In, Raw } from 'typeorm';
import { DeletedConst } from '../common/constants/soft-delete.constant';
import { OrderShippingStatusFilterConst } from '../common/constants/order-shipping.constant';
import { SliderTypeConst } from 'src/common/constants/slider.constant';
import { RpcErrorExc } from '../common/exceptions/custom.exception';
import { parseOffsetAndLimit } from '../common/helpers/paginate.helper';
import {
  generateMapArrayDataWithKeyPair,
  generateMapDataWithKeyFieldPair,
} from '../common/helpers/util.helper';
import { FindAllProductCombosDto } from './dto/find-all-product-combos.dto';
import { CreateOneProductComboDto } from './dto/create-one-product-combo.dto';
import { UpdateOneProductComboDto } from './dto/update-one-product-combo.dto';
import { UpdateOneProductComboStatusDto } from './dto/update-one-product-combo-status.dto';
import { DeleteMultiProductCombosDto } from './dto/delete-multi-product-combos.dto';
import { ProductComboRepository } from './repository/product-combo.repository';
import { ProductComboDetailRepository } from './repository/product-combo-detail.repository';
import { ProductComboImageRepository } from './repository/product-combo-image.repository';
import { ProductComboTranslateRepository } from './repository/product-combo-translate.repository';
import { ProductTranslateRepo } from '../product/repositories/product-translate.repository';
import { ProductRepository } from '../product/repositories/product.repository';
import { OrderDetailsRepository } from '../orders/repositories/order-details.repository';
import { CharityProductRepository } from '../charity/repositories/charity-product.repository';
import { FlashSaleProductRepository } from '../flash-sale/repositories/flash-sale-product.repository';
import { SliderRepository } from '../slider/repositories/slider.repository';

@Injectable()
export class ProductComboService {
  constructor(
    private productComboRepo: ProductComboRepository,
    private productComboDetailRepo: ProductComboDetailRepository,
    private productComboImageRepo: ProductComboImageRepository,
    private productComboTranslateRepo: ProductComboTranslateRepository,
    private productTranslateRepo: ProductTranslateRepo,
    private productRepo: ProductRepository,
    private orderDetailsRepo: OrderDetailsRepository,
    private charityProductRepo: CharityProductRepository,
    private flashSaleProductRepo: FlashSaleProductRepository,
    private sliderRepo: SliderRepository,
  ) {}

  async findAllProductCombos(reqData: FindAllProductCombosDto) {
    const { offset, limit } = parseOffsetAndLimit(reqData.page, reqData.limit);
    let queryFindAllProductCombos = this.productComboRepo
      .createQueryBuilder('product_combos')
      .leftJoinAndSelect('product_combos.details', 'product_combos_details')
      .leftJoinAndSelect(
        'product_combos_details.product',
        'product_combos_details_product',
      )
      .leftJoinAndSelect(
        'product_combos.translates',
        'product_combos_translates',
      )
      .leftJoin(
        'product_combos.translates',
        'product_combos_translates_filter',
      );
    if (reqData.search) {
      queryFindAllProductCombos = queryFindAllProductCombos
        .where('product_combos.code LIKE :code', {
          code: `%${reqData.search}%`,
        })
        .orWhere('product_combos_translates_filter.name LIKE :search', {
          search: `%${reqData.search}%`,
        });
    }

    const [results, count] = await queryFindAllProductCombos
      .orderBy({
        'product_combos.created_at': 'DESC',
      })
      .skip(offset)
      .take(limit)
      .getManyAndCount();
    const productIds: any[] = [];
    results.forEach((item) => {
      item.details.forEach((detail) => {
        productIds.push(detail.product_id);
      });
    });
    let mapProductTranslates: any = {};
    if (productIds.length) {
      const productTranslates = await this.productTranslateRepo.find({
        where: {
          product_id: In(productIds),
        },
      });
      mapProductTranslates = generateMapArrayDataWithKeyPair(
        'product_id',
        productTranslates,
      );
    }

    const finalResults = results.map((item) => {
      item.details = item.details.map((detail) => {
        if (
          mapProductTranslates.hasOwnProperty(detail.product_id) &&
          detail.product
        ) {
          detail.product['translates'] =
            mapProductTranslates[detail.product_id];
        }
        return detail;
      });
      return item;
    });
    const maxPage = Math.ceil(count / limit);
    return { results: finalResults, total: count, max_page: maxPage };
  }

  async getOneProductCombo(id: number) {
    const result = await this.productComboRepo
      .createQueryBuilder('product_combos')
      .leftJoinAndSelect('product_combos.details', 'product_combos_details')
      .leftJoinAndSelect(
        'product_combos_details.product',
        'product_combos_details_product',
      )
      .leftJoinAndSelect(
        'product_combos_details_product.images',
        'product_combos_details_product_images',
      )
      .leftJoinAndSelect(
        'product_combos_details_product_images.image',
        'product_combos_details_product_images_image',
      )
      .leftJoinAndSelect(
        'product_combos.translates',
        'product_combos_translates',
      )
      .leftJoinAndSelect('product_combos.images', 'product_combos_images')
      .leftJoinAndSelect(
        'product_combos_images.image',
        'product_combos_images_image',
      )
      .where('product_combos.id LIKE :id', {
        id: id,
      })
      .getOne();
    if (!result) {
      throw new RpcErrorExc(`not_found:Không tìm thấy combo sản phẩm`);
    }
    const productIds: any[] = [];
    result.details.forEach((detail) => {
      productIds.push(detail.product_id);
    });
    if (productIds.length) {
      const productTranslates = await this.productTranslateRepo.find({
        where: {
          product_id: In(productIds),
        },
      });
      const mapProductTranslates = generateMapArrayDataWithKeyPair(
        'product_id',
        productTranslates,
      );
      result.details = result.details.map((detail) => {
        if (
          mapProductTranslates.hasOwnProperty(detail.product_id) &&
          detail.product
        ) {
          detail.product['translates'] =
            mapProductTranslates[detail.product_id];
        }
        return detail;
      });
    }

    return result;
  }

  async createOneProductCombo(reqData: CreateOneProductComboDto) {
    await this.checkValidProductComboData(reqData);
    return await this.productComboRepo.save(reqData);
  }

  async updateOneProductCombo(
    id: number,
    reqData: UpdateOneProductComboDto,
    updatedBy: number,
  ) {
    const productComboGet = await this.productComboRepo.findOne({
      where: {
        id,
      },
      relations: ['details', 'details.product'],
    });
    if (!productComboGet) {
      throw new RpcErrorExc(`not_found:Không tìm thấy combo sản phẩm`);
    }
    await this.checkValidProductComboData({
      id,
      ...reqData,
    });
    let mapProducts: any = {};
    let mapNewProductComboDetails: any = {};
    if (reqData.details && reqData.details.length) {
      const productIds = reqData.details.map((item) => {
        return item.product_id;
      });
      const productsGet = await this.productRepo.findByIds(productIds);
      if (
        !productsGet ||
        !productsGet.length ||
        productsGet.length != productIds.length
      ) {
        throw new RpcErrorExc('bad_request:Không thể cập nhật combo sản phẩm');
      }
      mapProducts = generateMapDataWithKeyFieldPair('id', '', productsGet);
      mapNewProductComboDetails = generateMapDataWithKeyFieldPair(
        'product_id',
        '',
        reqData.details,
      );
      // TODO: temporary do not allow products of combo belong to any of items: Charity, FlashSale, Promotion and other combo
      /*
      const [
        checkCharity,
        checkFlashsale,
        checkPromotion,
        checkOtherProductCombo,
      ] = await Promise.all([
        this.charityProductRepo.find({
          where: {
            product: In(productIds),
          },
          take: 1,
        }),
        this.flashSaleProductRepo.find({
          where: {
            product: In(productIds),
          },
          take: 1,
        }),
        this.sliderRepo.find({
          where: {
            product: In(productIds),
            type: SliderTypeConst.PRODUCT,
          },
          take: 1,
        }),
        this.productComboDetailRepo.find({
          where: {
            product_id: In(productIds),
            product_combo_id: Not(id),
          },
          take: 1,
        }),
      ]);
      if (
        (checkCharity && checkCharity.length) ||
        (checkFlashsale && checkFlashsale.length) ||
        (checkPromotion && checkPromotion.length) ||
        (checkOtherProductCombo && checkOtherProductCombo.length)
      ) {
        throw new RpcErrorExc(
          'bad_request:Trùng sản phẩm với các chương trình khác',
        );
      }*/
    }

    const mapCurrentProductComboDetails = generateMapDataWithKeyFieldPair(
      'product_id',
      'id',
      productComboGet.details,
    );
    const productComboUpdated = await this.productComboRepo.manager.transaction(
      async (entityManager) => {
        const productComboRepo = entityManager.getCustomRepository(
          ProductComboRepository,
        );
        const productComboDetailRepo = entityManager.getCustomRepository(
          ProductComboDetailRepository,
        );
        const productComboImageRepo = entityManager.getCustomRepository(
          ProductComboImageRepository,
        );
        const productComboTranslateRepo = entityManager.getCustomRepository(
          ProductComboTranslateRepository,
        );

        const numberProductsInCombo = reqData.details
          ? reqData.details.length
          : 0;
        let productComboTotalPrice = 0;
        const productComboDetailsUpdate = {
          update: [],
          delete: [],
        };
        if (reqData.details && reqData.details.length) {
          reqData.details.forEach((element) => {
            if (
              mapCurrentProductComboDetails.hasOwnProperty(element.product_id)
            ) {
              productComboDetailsUpdate['update'].push({
                id: mapCurrentProductComboDetails[element.product_id],
                ...element,
              });
            } else {
              productComboDetailsUpdate['update'].push({
                product_combo_id: productComboGet.id,
                ...element,
              });
            }
            const originalPrice = mapProducts[element.product_id].price;
            productComboTotalPrice +=
              element.quantity *
              (originalPrice -
                Math.floor((element.percentage * originalPrice) / 100));
          });
        }
        if (productComboGet.details) {
          productComboGet.details.forEach((element) => {
            if (!mapNewProductComboDetails.hasOwnProperty(element.product_id)) {
              productComboDetailsUpdate['delete'].push(element.id);
              productComboDetailsUpdate['update'].push({
                id: element.id,
                deleted: DeletedConst.DELETED,
                deleted_by: updatedBy,
              });
            }
          });
        }
        // Delete old data
        const promisesDeleteOldData: any[] = [
          productComboImageRepo.delete({
            product_combo_id: productComboGet.id,
          }),
          productComboTranslateRepo.delete({
            product_combo_id: productComboGet.id,
          }),
        ];
        if (productComboDetailsUpdate.delete.length) {
          promisesDeleteOldData.push(
            productComboDetailRepo.softDelete({
              id: In(productComboDetailsUpdate.delete),
            }),
          );
        }
        await Promise.all(promisesDeleteOldData);
        // Save all data
        await Promise.all([
          productComboRepo.save(
            {
              id: productComboGet.id,
              code: reqData.code,
              status: reqData.status,
              number_products: numberProductsInCombo,
              total_price: productComboTotalPrice,
              images: reqData.images,
              translates: reqData.translates,
            },
            {
              transaction: false,
            },
          ),
          productComboDetailRepo.save(productComboDetailsUpdate['update'], {
            transaction: false,
          }),
        ]);

        return productComboGet;
      },
    );

    return productComboGet;
  }

  async updateOneProductComboStatus(
    id: number,
    reqData: UpdateOneProductComboStatusDto,
  ) {
    const productComboGet = await this.productComboRepo.findOne({
      where: {
        id,
      },
    });
    if (!productComboGet) {
      throw new RpcErrorExc(`not_found:Không tìm thấy combo sản phẩm`);
    }

    return await this.productComboRepo.save({
      id,
      status: reqData.status,
    });
  }

  async softDeleteMultiProductCombos(
    deletedBy: number,
    reqData: DeleteMultiProductCombosDto,
  ) {
    const canDelete = await this.checkCanDeleteProductCombo(reqData.ids);
    if (false == canDelete) {
      throw new RpcErrorExc(`bad_request:Không thể xóa`);
    }
    const softDeleted = await this.productComboRepo.softDelete({
      id: In(reqData.ids),
    });
    if (softDeleted) {
      await this.productComboRepo.update(
        {
          id: In(reqData.ids),
        },
        {
          deleted: DeletedConst.DELETED,
          deleted_by: deletedBy,
        },
      );
    }

    return 'Đã xóa thành công';
  }

  private async checkValidProductComboData(data: any) {
    if (!data.code || !data.translates || !data.translates.length) {
      throw new RpcErrorExc(`bad_request:Dữ liệu không hợp lệ`);
    }

    const codeCondition: any = {
      code: data.code,
    };
    if (data.hasOwnProperty('id')) {
      codeCondition['id'] = Not(data.id);
    }
    const nameCondition: any[] = [];
    // TODO: check data translate has both of langs: vi and en
    // TODO: check data detail not duplicate product id
    // TODO: check products in detail are valid
    // TODO: check product combo images are valid
    data.translates.map((translate) => {
      const condition: any = {
        name: translate.name,
        language_code: translate.language_code,
      };
      if (data.hasOwnProperty('id')) {
        condition['product_combo_id'] = Not(data.id);
      }
      nameCondition.push(condition);
    });
    const [productCombosGet, productComboTranslatesGet] = await Promise.all([
      this.productComboRepo.find({
        where: codeCondition,
        take: 1,
      }),
      this.productComboTranslateRepo.find({
        where: nameCondition,
        take: 1,
      }),
    ]);
    if (productCombosGet && productCombosGet.length) {
      throw new RpcErrorExc(`conflict:Mã combo đã tồn tại`);
    }
    if (productComboTranslatesGet && productComboTranslatesGet.length) {
      throw new RpcErrorExc(`conflict:Tên combo đã tồn tại`);
    }

    return;
  }

  private async checkCanDeleteProductCombo(ids: any[]) {
    if (!ids || !ids.length) {
      return false;
    }
    // TODO: check product combo has orders with shipping status: Đã xác nhận, Đang lấy hàng, Đang giao hàng
    return true;
  }
}
