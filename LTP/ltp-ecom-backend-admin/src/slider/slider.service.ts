import { Injectable } from '@nestjs/common';
import { CharityProductRepository } from 'src/charity/repositories/charity-product.repository';
import { CharityRepository } from 'src/charity/repositories/charity.repository';
import { DeletedConst, SortValueConst } from 'src/common/constants';
import { CharityStatusConst } from 'src/common/constants/charity.constant';
import { FlashSaleStatusConst } from 'src/common/constants/flash-sale.constant';
import {
  SliderStatusConst,
  SliderTypeConst,
} from 'src/common/constants/slider.constant';
import { CommonErrorCodes } from 'src/common/error-codes/common.error-code';
import { SliderErrorCodes } from 'src/common/error-codes/slider.error-code';
import { getCurrentDateTimeFormatted } from 'src/common/helpers/date.helper';
import { parseOffsetAndLimit } from 'src/common/helpers/paginate.helper';
import { FlashSaleProductRepository } from 'src/flash-sale/repositories/flash-sale-product.repository';
import { FlashSaleRepository } from 'src/flash-sale/repositories/flash-sale.repository';
import { ProductRepository } from 'src/product/repositories/product.repository';
import { FindManyOptions } from 'typeorm';
import { CreateSliderDto } from './dto/create.dto';
import { FindSliderByCriteriaDto } from './dto/find-by-criteria.dto';
import { UpdateSliderDto } from './dto/update.dto';
import { SliderTranslateRepository } from './repositories/slider-translate.repository';
import { SliderRepository } from './repositories/slider.repository';
import { Slider } from './schemas/slider.schema';

@Injectable()
export class SliderService {
  constructor(
    private readonly sliderRepository: SliderRepository,
    private readonly sliderTranslateRepository: SliderTranslateRepository,
    private readonly productRepository: ProductRepository,
    private readonly flashSaleRepository: FlashSaleRepository,
    private readonly flashSaleProductRepository: FlashSaleProductRepository,
    private readonly charityRepository: CharityRepository,
    private readonly charityProductRepository: CharityProductRepository,
  ) { }

  async findByCriteria(findRequest: FindSliderByCriteriaDto): Promise<any> {
    try {
      const { sort_field, sort_type } = findRequest;
      const { offset, limit } = parseOffsetAndLimit(
        findRequest.page,
        findRequest.limit,
      );
      const order = {};
      if (sort_field && sort_type) {
        const columns = Object.keys(
          this.sliderRepository.metadata.propertiesMap,
        );
        if (!columns.includes(sort_field)) {
          const errorCode = 'common::002';
          return {
            code: 404,
            errorCode,
            message: CommonErrorCodes[errorCode],
          };
        }
        if (![SortValueConst.ASC, SortValueConst.DESC].includes(sort_type)) {
          const errorCode = 'common::003';
          return {
            code: 404,
            errorCode,
            message: CommonErrorCodes[errorCode],
          };
        }
        order[sort_field] = sort_type;
      } else {
        order['created_at'] = SortValueConst.DESC;
      }
      const query: FindManyOptions<Slider> = {
        relations: [
          'translates',
          'thumbnail_obj',
          'product_obj',
          'product_obj.translates',
        ],
        order: order,
        skip: offset,
        take: limit,
      };
      const [results, totalRecords] = await Promise.all([
        this.sliderRepository.find(query),
        this.sliderRepository.count(query),
      ]);
      return {
        results,
        totalRecords,
      };
    } catch (err) {
      return {
        results: [],
        totalRecords: 0,
      };
    }
  }

  async create(data: CreateSliderDto): Promise<any> {
    try {
      const {
        product_id,
        percentage,
        type,
        thumbnail_id,
        link,
        start_date,
        start_time,
        end_date,
        end_time,
        buy_button,
        is_active,
      } = data;
      let productId = product_id;
      if (!this.validateType(type).value) {
        return this.validateType(type).error;
      }
      if (type == SliderTypeConst.PRODUCT) {
        if (!product_id) {
          const errorCode = 'slider::005';
          return {
            code: 422,
            errorCode,
            message: SliderErrorCodes[errorCode],
          };
        } else {
          const checkProduct = await this.productRepository.findOne(product_id);
          if (!checkProduct) {
            const errorCode = 'slider::006';
            return {
              code: 422,
              errorCode,
              message: SliderErrorCodes[errorCode],
            };
          } else {
            const isCanAddProduct = await this.isCanAddProduct(product_id);
            const checkExistProduct = await this.sliderRepository.findOne({
              where: {
                product: checkProduct.id,
              },
            });
            if (
              !isCanAddProduct ||
              (checkExistProduct && is_active === SliderStatusConst.ON)
            ) {
              const errorCode = 'slider::011';
              return {
                code: 500,
                errorCode,
                message: SliderErrorCodes[errorCode],
              };
            }
          }
        }
        if (!percentage) {
          const errorCode = 'slider::008';
          return {
            code: 422,
            errorCode,
            message: SliderErrorCodes[errorCode],
          };
        } else if (percentage < 0 || percentage > 100) {
          const errorCode = 'slider::009';
          return {
            code: 500,
            errorCode,
            message: SliderErrorCodes[errorCode],
          };
        }
      } else {
        productId = null;
      }
      if (
        start_date > end_date ||
        (start_date === end_date && start_time > end_time)
      ) {
        const errorCode = 'slider::010';
        return {
          code: 500,
          errorCode,
          message: SliderErrorCodes[errorCode],
        };
      }
      const payload = {
        product: productId,
        type,
        thumbnail: thumbnail_id,
        link,
        percentage,
        start_date,
        start_time,
        end_date,
        end_time,
        buy_button,
        is_active,
      };
      const sliderCreated = await this.sliderRepository.save(payload);
      const contents = data.contents.map((item) => ({
        ...item,
        slider: sliderCreated['id'],
      }));
      await this.sliderTranslateRepository.save(contents);
      return {
        code: 200,
        data: sliderCreated,
      };
    } catch (err) {
      const errorCode = 'common::001';
      return {
        code: 500,
        errorCode,
        message: CommonErrorCodes[errorCode],
      };
    }
  }

  async findOne(id: number): Promise<any> {
    try {
      const slider = await this.sliderRepository.findOne({
        relations: [
          'translates',
          'thumbnail_obj',
          'product_obj',
          'product_obj.translates',
        ],
        where: {
          id,
        },
      });
      return slider || null;
    } catch (err) {
      return null;
    }
  }

  async update(data: UpdateSliderDto): Promise<any> {
    try {
      const {
        id,
        product_id,
        percentage,
        type,
        thumbnail_id,
        link,
        start_date,
        start_time,
        end_date,
        end_time,
        buy_button,
        is_active,
      } = data;
      let productId = product_id;
      if (!this.validateType(type).value) {
        return this.validateType(type).error;
      }
      const slider = await this.sliderRepository.findOne(id);
      if (type == SliderTypeConst.PRODUCT) {
        if (!product_id) {
          const errorCode = 'slider::005';
          return {
            code: 422,
            errorCode,
            message: SliderErrorCodes[errorCode],
          };
        } else {
          const checkProduct = await this.productRepository.findOne(product_id);
          if (!checkProduct) {
            const errorCode = 'slider::006';
            return {
              code: 422,
              errorCode,
              message: SliderErrorCodes[errorCode],
            };
          } else {
            const checkExistProduct = await this.sliderRepository.findOne({
              where: {
                product: checkProduct.id,
              },
            });
            const isCanAddProduct = await this.isCanAddProduct(product_id);
            // const currentDate = new Date().getTime();
            // const startDateTime = new Date(
            //   `${start_date} ${start_time}`,
            // ).getTime();
            // const endDateTime = new Date(`${end_date} ${end_time}`).getTime();
            const isDuplicateProduct = checkExistProduct && checkExistProduct.id !== id;
            if (
              !isCanAddProduct ||
              (isDuplicateProduct &&
                is_active === SliderStatusConst.ON &&
                slider.is_active === SliderStatusConst.OFF)
            ) {
              const errorCode = 'slider::011';
              return {
                code: 500,
                errorCode,
                message: SliderErrorCodes[errorCode],
              };
            }
          }
        }
        if (!percentage) {
          const errorCode = 'slider::008';
          return {
            code: 422,
            errorCode,
            message: SliderErrorCodes[errorCode],
          };
        } else if (percentage < 0 || percentage > 100) {
          const errorCode = 'slider::009';
          return {
            code: 500,
            errorCode,
            message: SliderErrorCodes[errorCode],
          };
        }
      } else {
        productId = null;
      }
      if (slider) {
        const payload = {
          id,
          product: productId,
          type,
          thumbnail: thumbnail_id,
          link,
          percentage,
          start_date,
          start_time,
          end_date,
          end_time,
          buy_button,
          is_active,
        };
        await this.sliderRepository.save(payload);
        await this.sliderTranslateRepository.delete({ slider: id });
        const contents = data.contents.map((item) => ({
          ...item,
          slider: id,
        }));
        await this.sliderTranslateRepository.save(contents);
        return {
          code: 200,
          message: 'Update slider successfully',
        };
      } else {
        const errorCode = 'slider::002';
        return {
          code: 404,
          errorCode,
          message: SliderErrorCodes[errorCode],
        };
      }
    } catch (err) {
      const errorCode = 'common::001';
      return {
        code: 500,
        errorCode,
        message: CommonErrorCodes[errorCode],
      };
    }
  }

  async delete(ids: string): Promise<any> {
    const idsArr = ids.split(',');
    const slider = await this.sliderRepository.findByIds(idsArr);
    if (slider && slider.length > 0) {
      slider.map(async (item) => {
        item.deleted_at = new Date();
        item.deleted = DeletedConst.DELETED;
        await this.sliderRepository.save(item);
      });
      return {
        code: 200,
        message: 'Selected slider deleted successfully',
      };
    } else {
      const errorCode = 'slider::002';
      return {
        code: 404,
        errorCode,
        message: SliderErrorCodes[errorCode],
      };
    }
  }

  private validateType(type: SliderTypeConst) {
    if (type) {
      const typies = Object.keys(SliderTypeConst);
      if (typies.includes(type + '')) {
        return {
          value: true,
        };
      } else {
        const errorCode = 'slider::004';
        return {
          value: false,
          error: {
            code: 404,
            errorCode,
            message: SliderErrorCodes[errorCode],
          },
        };
      }
    } else {
      const errorCode = 'slider::003';
      return {
        value: false,
        error: {
          code: 422,
          errorCode,
          message: SliderErrorCodes[errorCode],
        },
      };
    }
  }

  async isCanAddProduct(id): Promise<boolean> {
    const currentDate = getCurrentDateTimeFormatted();
    const flashSale = await this.flashSaleRepository.findOne({
      where: (qb) => {
        qb.where(
          'status = :status AND (start_date < :date AND end_date > :date)',
          {
            date: currentDate,
            status: FlashSaleStatusConst.ON,
          },
        );
      },
    });
    const charity = await this.charityRepository.findOne({
      where: (qb) => {
        qb.where(
          'status = :status AND (start_date < :date AND end_date > :date)',
          {
            date: currentDate,
            status: CharityStatusConst.ACTIVATED,
          },
        );
      },
    });
    if (!flashSale && !charity) {
      return true;
    } else {
      if (flashSale) {
        const flashSaleProduct = await this.flashSaleProductRepository.findOne({
          where: {
            flash_sale: flashSale.id,
            product: id,
          },
        });
        if (flashSaleProduct) {
          return false;
        }
      }
      if (charity) {
        const charityProduct = await this.charityProductRepository.findOne({
          where: {
            charity: charity.id,
            product: id,
          },
        });
        if (charityProduct) {
          return false;
        }
      }
      return true;
    }
  }
}
