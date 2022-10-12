import { Injectable } from '@nestjs/common';
import { CharityProductRepository } from 'src/charity/repositories/charity-product.repository';
import { CharityRepository } from 'src/charity/repositories/charity.repository';
import { DeletedConst } from 'src/common/constants';
import { CharityStatusConst } from 'src/common/constants/charity.constant';
import {
  FlashSaleStatusConst,
  FlashSaleProductStatusConst,
  FlashSaleSearchStatusConst,
} from 'src/common/constants/flash-sale.constant';
import { SliderStatusConst } from 'src/common/constants/slider.constant';
import { CommonErrorCodes } from 'src/common/error-codes/common.error-code';
import { FlashSaleErrorCodes } from 'src/common/error-codes/flash-sale.error-code';
import { getCurrentDateTimeFormatted } from 'src/common/helpers/date.helper';
import { parseOffsetAndLimit } from 'src/common/helpers/paginate.helper';
import { ProductRepository } from 'src/product/repositories/product.repository';
import { SliderRepository } from 'src/slider/repositories/slider.repository';
import { CreateFlashSaleProductDto } from './dto/create-product.dto';
import { CreateFlashSaleDto } from './dto/create.dto';
import { FindAllFlashSaleDto } from './dto/find-all.dto';
import { UpdateFlashSaleProductDto } from './dto/update-product.dto';
import { UpdateFlashSaleDto } from './dto/update.dto';
import { FlashSaleProductRepository } from './repositories/flash-sale-product.repository';
import { FlashSaleRepository } from './repositories/flash-sale.repository';

@Injectable()
export class FlashSaleService {
  constructor(
    private readonly flashSaleRepository: FlashSaleRepository,
    private readonly flashSaleProductRepository: FlashSaleProductRepository,
    private readonly productRepository: ProductRepository,
    private readonly sliderRepository: SliderRepository,
    private readonly charityRepository: CharityRepository,
    private readonly charityProductRepository: CharityProductRepository,
  ) {}

  async findAll(findRequest: FindAllFlashSaleDto): Promise<any> {
    try {
      const { search_value, status } = findRequest;
      const { offset, limit } = parseOffsetAndLimit(
        findRequest.page,
        findRequest.limit,
      );
      const [results, totalRecords] =
        await this.flashSaleRepository.findAndCount({
          relations: ['admin_obj'],
          where: (qb) => {
            const currentDate = getCurrentDateTimeFormatted();
            if (search_value && status) {
              if (status === FlashSaleSearchStatusConst.HAPPENING) {
                qb.where(
                  'name like :value AND (start_date < :date AND end_date > :date)',
                  {
                    date: currentDate,
                    value: `%${search_value}%`,
                  },
                );
              } else if (status === FlashSaleSearchStatusConst.UPCOMING) {
                qb.where('name like :value AND start_date > :date', {
                  date: currentDate,
                  value: `%${search_value}%`,
                });
              } else if (status === FlashSaleSearchStatusConst.EXPIRED) {
                qb.where('name like :value AND end_date < :date', {
                  date: currentDate,
                  value: `%${search_value}%`,
                });
              }
            } else {
              if (search_value) {
                qb.where('name like :value', {
                  name: 'name',
                  value: `%${search_value}%`,
                });
              }
              if (status) {
                if (status === FlashSaleSearchStatusConst.HAPPENING) {
                  qb.where('start_date < :date AND end_date > :date', {
                    date: currentDate,
                  });
                } else if (status === FlashSaleSearchStatusConst.UPCOMING) {
                  qb.where('start_date > :date', {
                    date: currentDate,
                  });
                } else if (status === FlashSaleSearchStatusConst.EXPIRED) {
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
    } catch (err) {
      return {
        results: [],
        totalRecords: 0,
      };
    }
  }

  async create(data: CreateFlashSaleDto, user_id: number): Promise<any> {
    try {
      const { start_date, end_date, name } = data;
      if (start_date > end_date) {
        const errorCode = 'flashSale::013';
        return {
          code: 500,
          errorCode,
          message: FlashSaleErrorCodes[errorCode],
        };
      }
      const payload = {
        start_date,
        end_date,
        name,
        status: FlashSaleStatusConst.OFF,
        admin: user_id,
      };
      const flashSaleCreated = await this.flashSaleRepository.save(payload);
      return {
        code: 200,
        data: flashSaleCreated,
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

  async update(data: UpdateFlashSaleDto): Promise<any> {
    try {
      const { id, start_date, end_date, name } = data;
      if (start_date > end_date) {
        const errorCode = 'flashSale::013';
        return {
          code: 500,
          errorCode,
          message: FlashSaleErrorCodes[errorCode],
        };
      }
      const flashSale = await this.flashSaleRepository.findOne(id);
      if (flashSale) {
        const payload = {
          id,
          start_date,
          end_date,
          name,
        };
        await this.flashSaleRepository.save(payload);
        return {
          code: 200,
          message: 'Update flash sale successfully',
        };
      } else {
        const errorCode = 'flashSale::002';
        return {
          code: 404,
          errorCode,
          message: FlashSaleErrorCodes[errorCode],
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

  async findOne(id: number): Promise<any> {
    try {
      const flashSale = await this.flashSaleRepository.findOne({
        relations: ['admin_obj'],
        where: {
          id,
        },
      });
      return flashSale || null;
    } catch (err) {
      return null;
    }
  }

  async addProduct(data: CreateFlashSaleProductDto): Promise<any> {
    try {
      const { id, product_id, quantity, percentage, status } = data;
      const flashSale = await this.flashSaleRepository.findOne(id);
      if (!this.validateStatus(status).value) {
        return this.validateStatus(status).error;
      }
      if (!product_id) {
        const errorCode = 'flashSale::005';
        return {
          code: 422,
          errorCode,
          message: FlashSaleErrorCodes[errorCode],
        };
      } else {
        const checkProduct = await this.productRepository
          .createQueryBuilder('product')
          .innerJoinAndSelect(
            'product.product_inventory',
            'product_product_inventory',
            'product_product_inventory.remaining_number > 0',
          )
          .innerJoin(
            'product_product_inventory.inventory',
            'product_product_inventory_inventory',
          )
          .where('product.id = :id', {
            id: product_id,
          })
          .getOne();
        if (!checkProduct) {
          const errorCode = 'flashSale::006';
          return {
            code: 422,
            errorCode,
            message: FlashSaleErrorCodes[errorCode],
          };
        } else {
          const checkExistProduct =
            await this.flashSaleProductRepository.findOne({
              where: {
                flash_sale: id,
                product: product_id,
              },
            });
          const currentDate = new Date().getTime();
          const startDateTime = new Date(flashSale.start_date).getTime();
          const endDateTime = new Date(flashSale.end_date).getTime();
          let isCanAddProduct = true;
          if (
            checkExistProduct &&
            flashSale.status === FlashSaleStatusConst.ON &&
            startDateTime <= currentDate &&
            currentDate <= endDateTime
          ) {
            isCanAddProduct = false;
          }
          if (!(await this.isCanAddProduct(product_id)) || !isCanAddProduct) {
            const errorCode = 'flashSale::011';
            return {
              code: 500,
              errorCode,
              message: FlashSaleErrorCodes[errorCode],
            };
          }
          let remainingNumber = 0;
          checkProduct.product_inventory.forEach((product) => {
            remainingNumber = remainingNumber + product.remaining_number;
          });
          if (remainingNumber < quantity) {
            const errorCode = 'flashSale::012';
            return {
              code: 500,
              errorCode,
              message: FlashSaleErrorCodes[errorCode],
            };
          }
        }
      }
      if (!quantity) {
        const errorCode = 'flashSale::007';
        return {
          code: 422,
          errorCode,
          message: FlashSaleErrorCodes[errorCode],
        };
      }
      if (!percentage) {
        const errorCode = 'flashSale::008';
        return {
          code: 422,
          errorCode,
          message: FlashSaleErrorCodes[errorCode],
        };
      } else if (percentage < 0 || percentage > 100) {
        const errorCode = 'flashSale::009';
        return {
          code: 500,
          errorCode,
          message: FlashSaleErrorCodes[errorCode],
        };
      }
      const payload = {
        flash_sale: id,
        product: product_id,
        quantity,
        percentage,
        status,
      };
      const flashSaleProductCreated =
        await this.flashSaleProductRepository.save(payload);
      return {
        code: 200,
        data: flashSaleProductCreated,
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

  async updateProduct(data: UpdateFlashSaleProductDto): Promise<any> {
    try {
      const { id, product_id, quantity, percentage, status } = data;
      const flashSaleProduct = await this.flashSaleProductRepository.findOne(
        id,
      );
      if (!flashSaleProduct) {
        const errorCode = 'flashSale::002';
        return {
          code: 404,
          errorCode,
          message: FlashSaleErrorCodes[errorCode],
        };
      }
      if (!this.validateStatus(status).value) {
        return this.validateStatus(status).error;
      }
      if (!product_id) {
        const errorCode = 'flashSale::005';
        return {
          code: 422,
          errorCode,
          message: FlashSaleErrorCodes[errorCode],
        };
      } else {
        const checkProduct = await this.productRepository
          .createQueryBuilder('product')
          .innerJoinAndSelect(
            'product.product_inventory',
            'product_product_inventory',
            'product_product_inventory.remaining_number > 0',
          )
          .innerJoin(
            'product_product_inventory.inventory',
            'product_product_inventory_inventory',
          )
          .where('product.id = :id', {
            id: product_id,
          })
          .getOne();
        if (!checkProduct) {
          const errorCode = 'flashSale::006';
          return {
            code: 422,
            errorCode,
            message: FlashSaleErrorCodes[errorCode],
          };
        } else {
          const checkExistProduct =
            await this.flashSaleProductRepository.findOne({
              where: {
                product: product_id,
                flash_sale: flashSaleProduct.flash_sale,
              },
            });
          const flashSale = await this.flashSaleRepository.findOne(
            flashSaleProduct.flash_sale,
          );
          const currentDate = new Date().getTime();
          const startDateTime = new Date(flashSale.start_date).getTime();
          const endDateTime = new Date(flashSale.end_date).getTime();
          let isCanAddProduct = true;
          if (
            checkExistProduct &&
            checkExistProduct.id !== id &&
            flashSale.status === FlashSaleStatusConst.ON &&
            startDateTime <= currentDate &&
            currentDate <= endDateTime
          ) {
            isCanAddProduct = false;
          }
          if (!(await this.isCanAddProduct(product_id)) || !isCanAddProduct) {
            const errorCode = 'flashSale::011';
            return {
              code: 500,
              errorCode,
              message: FlashSaleErrorCodes[errorCode],
            };
          }
          let remainingNumber = 0;
          checkProduct.product_inventory.forEach((product) => {
            remainingNumber = remainingNumber + product.remaining_number;
          });
          if (remainingNumber < quantity) {
            const errorCode = 'flashSale::012';
            return {
              code: 500,
              errorCode,
              message: FlashSaleErrorCodes[errorCode],
            };
          }
        }
      }
      if (!quantity) {
        const errorCode = 'flashSale::007';
        return {
          code: 422,
          errorCode,
          message: FlashSaleErrorCodes[errorCode],
        };
      }
      if (!percentage) {
        const errorCode = 'flashSale::008';
        return {
          code: 422,
          errorCode,
          message: FlashSaleErrorCodes[errorCode],
        };
      } else if (percentage < 0 || percentage > 100) {
        const errorCode = 'flashSale::009';
        return {
          code: 500,
          errorCode,
          message: FlashSaleErrorCodes[errorCode],
        };
      }
      const payload = {
        id,
        product: product_id,
        quantity,
        percentage,
        status,
      };
      await this.flashSaleProductRepository.save(payload);
      return {
        code: 200,
        message: 'Update flash sale product successfully',
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

  async delete(ids: string): Promise<any> {
    const idsArr = ids.split(',');
    const flashSale = await this.flashSaleRepository.findByIds(idsArr);
    if (flashSale && flashSale.length > 0) {
      flashSale.map(async (item) => {
        item.deleted_at = new Date();
        item.deleted = DeletedConst.DELETED;
        await this.flashSaleRepository.save(item);
      });
      return {
        code: 200,
        message: 'Selected flash sale deleted successfully',
      };
    } else {
      const errorCode = 'flashSale::002';
      return {
        code: 404,
        errorCode,
        message: FlashSaleErrorCodes[errorCode],
      };
    }
  }

  private validateStatus(status: FlashSaleProductStatusConst) {
    if (status) {
      const statuses = Object.keys(FlashSaleProductStatusConst);
      if (statuses.includes(status + '')) {
        return {
          value: true,
        };
      } else {
        const errorCode = 'flashSale::004';
        return {
          value: false,
          error: {
            code: 404,
            errorCode,
            message: FlashSaleErrorCodes[errorCode],
          },
        };
      }
    } else {
      const errorCode = 'flashSale::003';
      return {
        value: false,
        error: {
          code: 422,
          errorCode,
          message: FlashSaleErrorCodes[errorCode],
        },
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
      await this.flashSaleProductRepository.findAndCount({
        relations: [
          'product_obj',
          'product_obj.translates',
          'product_obj.product_inventory',
          'product_obj.images',
          'product_obj.images.image',
        ],
        where: {
          flash_sale: id,
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

  async findProduct(id: number): Promise<any> {
    try {
      const flashSaleProduct = await this.flashSaleProductRepository.findOne({
        relations: [
          'product_obj',
          'product_obj.translates',
          'product_obj.product_inventory',
          'product_obj.images',
          'product_obj.images.image',
        ],
        where: {
          id,
        },
      });
      return flashSaleProduct || null;
    } catch (err) {
      return null;
    }
  }

  async deleteProducts(ids: string): Promise<any> {
    const idsArr = ids.split(',');
    const flashSaleProducts = await this.flashSaleProductRepository.findByIds(
      idsArr,
    );
    if (flashSaleProducts && flashSaleProducts.length > 0) {
      for (const flashSaleProduct of flashSaleProducts) {
        flashSaleProduct.deleted_at = new Date();
        flashSaleProduct.deleted = DeletedConst.DELETED;
        await this.flashSaleProductRepository.save(flashSaleProduct);
      }
      return {
        code: 200,
        message: 'Selected flash sale product deleted successfully',
      };
    } else {
      const errorCode = 'flashSale::002';
      return {
        code: 404,
        errorCode,
        message: FlashSaleErrorCodes[errorCode],
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

  async activateFlashSale(data): Promise<any> {
    const { id } = data;
    try {
      const flashSale = await this.flashSaleRepository.findOne(id);
      if (flashSale) {
        const currentDate = new Date().getTime();
        const startDateTime = new Date(flashSale.start_date).getTime();
        const endDateTime = new Date(flashSale.end_date).getTime();
        let isHappening = false;
        if (startDateTime <= currentDate && currentDate <= endDateTime) {
          isHappening = true;
        }
        const status =
          flashSale.status === FlashSaleStatusConst.ON
            ? FlashSaleStatusConst.OFF
            : FlashSaleStatusConst.ON;
        const payload = {
          id,
          status,
        };
        if (!isHappening) {
          const errorCode = 'flashSale::014';
          return {
            code: 500,
            errorCode,
            message: FlashSaleErrorCodes[errorCode],
          };
        }
        if (status == FlashSaleStatusConst.ON) {
          const flashSaleProducts = await this.flashSaleProductRepository.find({
            where: { flash_sale: flashSale.id },
          });
          let isDuplicateProduct = 0;
          for (const product of flashSaleProducts) {
            const isCanAddProduct = await this.isCanAddProduct(product.product);
            if (!isCanAddProduct) {
              isDuplicateProduct = isDuplicateProduct + 1;
            }
          }
          if (isDuplicateProduct > 0) {
            const errorCode = 'flashSale::011';
            return {
              code: 500,
              errorCode,
              message: FlashSaleErrorCodes[errorCode],
            };
          }
          const activeRecord = await this.flashSaleRepository.findOne({
            where: {
              status: FlashSaleStatusConst.ON,
            },
          });
          if (activeRecord) {
            await this.flashSaleRepository.save({
              id: activeRecord.id,
              status: FlashSaleStatusConst.OFF,
            });
          }
        }
        await this.flashSaleRepository.save(payload);
        return {
          code: 200,
          message: `${
            status == FlashSaleStatusConst.ON ? 'Turn on' : 'Turn off'
          } flash sale successfully`,
        };
      } else {
        const errorCode = 'flashSale::002';
        return {
          code: 404,
          errorCode,
          message: FlashSaleErrorCodes[errorCode],
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
    if (!slider && !charity) {
      return true;
    } else {
      if (slider) {
        return false;
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
