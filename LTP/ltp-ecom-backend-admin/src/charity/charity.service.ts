import { Injectable } from '@nestjs/common';
import { DeletedConst } from 'src/common/constants';
import {
  CharitySearchStatusConst,
  CharityStatusConst,
} from 'src/common/constants/charity.constant';
import { FlashSaleStatusConst } from 'src/common/constants/flash-sale.constant';
import { SliderStatusConst } from 'src/common/constants/slider.constant';
import { CharityErrorCodes } from 'src/common/error-codes/charity.error-code';
import { CommonErrorCodes } from 'src/common/error-codes/common.error-code';
import { getCurrentDateTimeFormatted } from 'src/common/helpers/date.helper';
import { parseOffsetAndLimit } from 'src/common/helpers/paginate.helper';
import { FlashSaleProductRepository } from 'src/flash-sale/repositories/flash-sale-product.repository';
import { FlashSaleRepository } from 'src/flash-sale/repositories/flash-sale.repository';
import { ProductRepository } from 'src/product/repositories/product.repository';
import { SliderRepository } from 'src/slider/repositories/slider.repository';
import { Not } from 'typeorm';
import { CreateCharityDto } from './dto/create.dto';
import { UpdateCharityDto } from './dto/update.dto';
import { CharityProductRepository } from './repositories/charity-product.repository';
import { CharityTranslateRepository } from './repositories/charity-translate.repository';
import { CharityRepository } from './repositories/charity.repository';

@Injectable()
export class CharityService {
  constructor(
    private readonly charityRepository: CharityRepository,
    private readonly charityTranslateRepository: CharityTranslateRepository,
    private readonly charityProductRepository: CharityProductRepository,
    private readonly productRepository: ProductRepository,
    private readonly sliderRepository: SliderRepository,
    private readonly flashSaleRepository: FlashSaleRepository,
    private readonly flashSaleProductRepository: FlashSaleProductRepository,
  ) { }

  async findByCriteria(findRequest): Promise<any> {
    const { search_value, status } = findRequest;
    const { offset, limit } = parseOffsetAndLimit(
      findRequest.page,
      findRequest.limit,
    );
    const [results, totalRecords] = await this.charityRepository.findAndCount({
      join: {
        alias: 'charity',
        leftJoinAndSelect: {
          translates: 'charity.translates',
        },
      },
      where: (qb) => {
        const currentDate = getCurrentDateTimeFormatted();
        if (search_value && status) {
          if (status === CharitySearchStatusConst.HAPPENING) {
            qb.where(
              '(translates.language_field = :name AND translates.language_value like :value) AND (start_date < :date AND end_date > :date)',
              {
                name: 'name',
                date: currentDate,
                value: `%${search_value}%`,
              },
            );
          } else if (status === CharitySearchStatusConst.UPCOMING) {
            qb.where(
              '(translates.language_field = :name AND translates.language_value like :value) AND start_date > :date',
              {
                name: 'name',
                date: currentDate,
                value: `%${search_value}%`,
              },
            );
          } else if (status === CharitySearchStatusConst.EXPIRED) {
            qb.where(
              '(translates.language_field = :name AND translates.language_value like :value) AND end_date < :date',
              {
                name: 'name',
                date: currentDate,
                value: `%${search_value}%`,
              },
            );
          }
        } else {
          if (search_value) {
            qb.where(
              'translates.language_field = :name AND translates.language_value like :value',
              {
                name: 'name',
                value: `%${search_value}%`,
              },
            );
          }
          if (status) {
            if (status === CharitySearchStatusConst.HAPPENING) {
              qb.where('start_date < :date AND end_date > :date', {
                date: currentDate,
              });
            } else if (status === CharitySearchStatusConst.UPCOMING) {
              qb.where('start_date > :date', {
                date: currentDate,
              });
            } else if (status === CharitySearchStatusConst.EXPIRED) {
              qb.where('end_date < :date', {
                date: currentDate,
              });
            }
          }
        }
      },
      order: {
        created_at: 'DESC',
      },
      skip: offset,
      take: limit,
    });
    return {
      results,
      totalRecords,
    };
  }

  async create(data: CreateCharityDto): Promise<any> {
    try {
      const { start_date, end_date, price } = data;
      // if (!this.validateStatus(status).value) {
      //   return this.validateStatus(status).error;
      // }
      if (start_date > end_date) {
        const errorCode = 'charity::005';
        return {
          code: 500,
          errorCode,
          message: CharityErrorCodes[errorCode],
        };
      }
      const payload = {
        start_date,
        end_date,
        price,
        status: CharityStatusConst.INACTIVATED,
      };
      const charityCreated = await this.charityRepository.save(payload);
      const contents = data.contents.map((item) => ({
        ...item,
        charity: charityCreated['id'],
      }));
      await this.charityTranslateRepository.save(contents);
      return {
        code: 200,
        data: charityCreated,
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

  async addProduct(data): Promise<any> {
    const { id, product, quantity, percentage } = data;
    const productExist = await this.productRepository.findOne(product, {
      relations: ['product_inventory'],
    });
    const charity = await this.charityRepository.findOne(id);
    if (productExist) {
      const checkDuplicated = await this.charityProductRepository.findOne({
        where: {
          charity: id,
          product,
        },
      });
      const currentDate = new Date().getTime();
      const startDateTime = new Date(charity.start_date).getTime();
      const endDateTime = new Date(charity.end_date).getTime();
      let isCanAddProduct = true;
      if (
        checkDuplicated &&
        charity.status === CharityStatusConst.ACTIVATED &&
        startDateTime <= currentDate &&
        currentDate <= endDateTime
      ) {
        isCanAddProduct = false;
      }
      if (!(await this.isCanAddProduct(product)) || !isCanAddProduct) {
        const errorCode = 'charity::008';
        return {
          code: 500,
          errorCode,
          message: CharityErrorCodes[errorCode],
        };
      } else {
        const productInventory = productExist.product_inventory;
        let remainingProduct = 0;
        productInventory.forEach((item) => {
          remainingProduct = remainingProduct + item.remaining_number;
        });
        if (quantity > remainingProduct) {
          const errorCode = 'charity::010';
          return {
            code: 500,
            errorCode,
            message: `${CharityErrorCodes[errorCode]}:${remainingProduct}`,
          };
        }
        const productPrice = productExist.price;
        const charityPrice = productPrice * (percentage / 100);
        const charityProductCreated = await this.charityProductRepository.save({
          charity: id,
          product,
          price: productPrice,
          quantity,
          percentage,
          charity_price: charityPrice,
          total: charityPrice * quantity,
          sold: 0,
        });
        return {
          code: 200,
          data: charityProductCreated,
        };
      }
    } else {
      const errorCode = 'charity::006';
      return {
        code: 404,
        errorCode,
        message: CharityErrorCodes[errorCode],
      };
    }
  }

  async findAllProduct(findRequest): Promise<any> {
    const { id } = findRequest;
    const { offset, limit } = parseOffsetAndLimit(
      findRequest.page,
      findRequest.limit,
    );
    const [results, totalRecords] =
      await this.charityProductRepository.findAndCount({
        relations: [
          'product_obj',
          'product_obj.translates',
          'product_obj.product_inventory',
          'product_obj.images',
          'product_obj.images.image',
        ],
        where: {
          charity: id,
        },
        order: {
          id: 'DESC',
        },
        skip: offset,
        take: limit,
      });
    return {
      results,
      totalRecords,
    };
  }

  async updateProduct(data): Promise<any> {
    const { id, charity_product_id, product, quantity, percentage } = data;
    const charityProductExist = await this.charityProductRepository.findOne(
      charity_product_id,
    );
    if (charityProductExist) {
      const productExist = await this.productRepository.findOne(product);
      if (productExist) {
        const checkDuplicated = await this.charityProductRepository.findOne({
          where: {
            charity: charityProductExist.charity,
            product,
          },
        });
        const charity = await this.charityRepository.findOne(
          charityProductExist.charity,
        );
        const currentDate = new Date().getTime();
        const startDateTime = new Date(charity.start_date).getTime();
        const endDateTime = new Date(charity.end_date).getTime();
        let isCanAddProduct = true;
        if (
          checkDuplicated && checkDuplicated.id !== charity_product_id &&
          charity.status === CharityStatusConst.ACTIVATED &&
          startDateTime <= currentDate &&
          currentDate <= endDateTime
        ) {
          isCanAddProduct = false;
        }
        if (!(await this.isCanAddProduct(product)) || !isCanAddProduct) {
          const errorCode = 'charity::008';
          return {
            code: 500,
            errorCode,
            message: CharityErrorCodes[errorCode],
          };
        } else {
          const productPrice = productExist.price;
          const charityPrice = productPrice * (percentage / 100);
          await this.charityProductRepository.save({
            id: charityProductExist.id,
            charity: id,
            product,
            price: productPrice,
            quantity,
            percentage,
            charity_price: charityPrice,
            total: charityPrice * quantity,
          });
          return {
            code: 200,
            data: 'Update charity product successfully',
          };
        }
      } else {
        const errorCode = 'charity::006';
        return {
          code: 404,
          errorCode,
          message: CharityErrorCodes[errorCode],
        };
      }
    } else {
      const errorCode = 'charity::007';
      return {
        code: 404,
        errorCode,
        message: CharityErrorCodes[errorCode],
      };
    }
  }

  async removeProducts(ids: string): Promise<any> {
    const idsArr = ids.split(',');
    const charities = await this.charityProductRepository.findByIds(idsArr);
    if (charities && charities.length > 0) {
      for (const charity of charities) {
        await this.charityProductRepository.remove(charity);
      }
      return {
        code: 200,
        message: 'Selected charity product deleted successfully',
      };
    } else {
      const errorCode = 'charity::007';
      return {
        code: 404,
        errorCode,
        message: CharityErrorCodes[errorCode],
      };
    }
  }

  async findProduct(id: number): Promise<any> {
    try {
      const charityProduct = await this.charityProductRepository.findOne({
        relations: [
          'product_obj',
          'product_obj.translates',
          'product_obj.product_inventory',
        ],
        where: {
          id,
        },
      });
      return charityProduct || null;
    } catch (err) {
      return null;
    }
  }

  async findOne(id: number): Promise<any> {
    try {
      const charity = await this.charityRepository.findOne({
        relations: [
          'translates',
          'products',
          'products.product_obj',
          'products.product_obj.translates',
        ],
        where: {
          id,
        },
      });
      return charity || null;
    } catch (err) {
      return null;
    }
  }

  async update(data: UpdateCharityDto): Promise<any> {
    try {
      const { id, start_date, end_date, price } = data;
      // if (!this.validateStatus(status).value) {
      //   return this.validateStatus(status).error;
      // }
      if (start_date > end_date) {
        const errorCode = 'charity::005';
        return {
          code: 500,
          errorCode,
          message: CharityErrorCodes[errorCode],
        };
      }
      const charity = await this.charityRepository.findOne(id);
      if (charity) {
        const payload = {
          id,
          start_date,
          end_date,
          price,
        };
        await this.charityRepository.save(payload);
        await this.charityTranslateRepository.delete({ charity: id });
        const contents = data.contents.map((item) => ({
          ...item,
          charity: id,
        }));
        await this.charityTranslateRepository.save(contents);
        // if (status === CharityStatusConst.ACTIVATED) {
        //   const allCharity = await this.charityRepository.find({
        //     where: { id: Not(id) },
        //   });
        //   for (const charity of allCharity) {
        //     await this.charityRepository.update(charity.id, {
        //       status: CharityStatusConst.INACTIVATED,
        //     });
        //   }
        // }
        return {
          code: 200,
          message: 'Update charity successfully',
        };
      } else {
        const errorCode = 'charity::002';
        return {
          code: 404,
          errorCode,
          message: CharityErrorCodes[errorCode],
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
    const charities = await this.charityRepository.findByIds(idsArr);
    if (charities && charities.length > 0) {
      for (const charity of charities) {
        charity.deleted_at = new Date();
        charity.deleted = DeletedConst.DELETED;
        await this.charityRepository.save(charity);
      }
      return {
        code: 200,
        message: 'Selected charity deleted successfully',
      };
    } else {
      const errorCode = 'charity::002';
      return {
        code: 404,
        errorCode,
        message: CharityErrorCodes[errorCode],
      };
    }
  }

  async getProductList(): Promise<any> {
    return {
      code: 200,
      data: await this.productRepository.find({
        relations: ['translates', 'product_inventory'],
      }),
    };
  }

  private validateStatus(status: CharityStatusConst) {
    if (status) {
      const statuses = Object.keys(CharityStatusConst);
      if (statuses.includes(status + '')) {
        return {
          value: true,
        };
      } else {
        const errorCode = 'charity::004';
        return {
          value: false,
          error: {
            code: 404,
            errorCode,
            message: CharityErrorCodes[errorCode],
          },
        };
      }
    } else {
      const errorCode = 'charity::003';
      return {
        value: false,
        error: {
          code: 422,
          errorCode,
          message: CharityErrorCodes[errorCode],
        },
      };
    }
  }

  async updateStatus(id): Promise<any> {
    try {
      const charity = await this.charityRepository.findOne(id);
      if (charity) {
        const currentDate = new Date().getTime();
        const startDateTime = new Date(charity.start_date).getTime();
        const endDateTime = new Date(charity.end_date).getTime();
        let isHappening = false;
        if (startDateTime <= currentDate && currentDate <= endDateTime) {
          isHappening = true;
        }
        if (!isHappening) {
          const errorCode = 'charity::011';
          return {
            code: 500,
            errorCode,
            message: CharityErrorCodes[errorCode],
          };
        }
        if (charity.status === CharityStatusConst.ACTIVATED) {
          charity.status = CharityStatusConst.INACTIVATED;
          await this.charityRepository.update(id, charity);
        } else {
          const charityProducts = await this.charityProductRepository.find({
            where: { charity: charity.id },
          });
          let isDuplicateProduct = 0;
          for (const product of charityProducts) {
            const isCanAddProduct = await this.isCanAddProduct(product.product);
            if (!isCanAddProduct) {
              isDuplicateProduct = isDuplicateProduct + 1;
            }
          }
          if (isDuplicateProduct > 0) {
            const errorCode = 'charity::008';
            return {
              code: 500,
              errorCode,
              message: CharityErrorCodes[errorCode],
            };
          }
          const currentActive = await this.charityRepository.findOne({
            where: { status: CharityStatusConst.ACTIVATED },
          });
          if (currentActive) {
            currentActive.status = CharityStatusConst.INACTIVATED;
            await this.charityRepository.update(
              currentActive.id,
              currentActive,
            );
          }
          charity.status = CharityStatusConst.ACTIVATED;
          await this.charityRepository.update(id, charity);
        }
        return {
          code: 200,
          message: 'Update charity status successfully',
        };
      } else {
        const errorCode = 'charity::002';
        return {
          code: 404,
          errorCode,
          message: CharityErrorCodes[errorCode],
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

  async isCanAddProduct(id): Promise<boolean> {
    const currentDate = getCurrentDateTimeFormatted();
    const slider = await this.sliderRepository.findOne({
      where: (qb) => {
        qb.where(
          "product = :product AND is_active = :status AND (concat(start_date,' ',start_time) < :date AND concat(end_date,' ',end_time) > :date)",
          {
            product: id,
            date: currentDate,
            status: SliderStatusConst.ON,
          },
        );
      },
    });
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
    if (!slider && !flashSale) {
      return true;
    } else {
      if (slider) {
        return false;
      }
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
      return true;
    }
  }
}
