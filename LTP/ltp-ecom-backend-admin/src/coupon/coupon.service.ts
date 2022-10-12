import { Injectable } from '@nestjs/common';
import { DeletedConst } from 'src/common/constants';
import {
  CouponSearchStatusConst,
  CouponStatusConst,
  CouponTypeConst,
} from 'src/common/constants/coupon.constant';
import { CommonErrorCodes } from 'src/common/error-codes/common.error-code';
import { CouponErrorCodes } from 'src/common/error-codes/coupon.error-code';
import { getCurrentDateTimeFormatted } from 'src/common/helpers/date.helper';
import { parseOffsetAndLimit } from 'src/common/helpers/paginate.helper';
import { ProductRepository } from 'src/product/repositories/product.repository';
import { CreateCouponDto } from './dto/create.dto';
import { UpdateCouponDto } from './dto/update.dto';
import { CouponRequirementRepository } from './repositories/coupon-requirement.repository';
import { CouponTranslateRepository } from './repositories/coupon-translate.repository';
import { CouponRepository } from './repositories/coupon.repository';

@Injectable()
export class CouponService {
  constructor(
    private readonly couponRepository: CouponRepository,
    private readonly couponTranslateRepository: CouponTranslateRepository,
    private readonly couponRequirementRepository: CouponRequirementRepository,
    private readonly productRepository: ProductRepository,
  ) { }

  async findByCriteria(findRequest): Promise<any> {
    const { search_value, status } = findRequest;
    const { offset, limit } = parseOffsetAndLimit(
      findRequest.page,
      findRequest.limit,
    );
    const [results, totalRecords] = await this.couponRepository.findAndCount({
      join: {
        alias: 'coupon',
        leftJoinAndSelect: {
          translates: 'coupon.translates',
          requirements: 'coupon.requirements',
        },
      },
      where: (qb) => {
        const currentDate = getCurrentDateTimeFormatted();
        if (search_value && status) {
          if (status === CouponSearchStatusConst.HAPPENING) {
            qb.where(
              "((translates.language_field = :name AND translates.language_value like :value) OR code like :value) AND (concat(start_date,' ',start_time) < :date AND concat(end_date,' ',end_time) > :date)",
              {
                name: 'name',
                date: currentDate,
                value: `%${search_value}%`,
              },
            );
          } else if (status === CouponSearchStatusConst.UPCOMING) {
            qb.where(
              "((translates.language_field = :name AND translates.language_value like :value) OR code like :value) AND concat(start_date,' ',start_time) > :date",
              {
                name: 'name',
                date: currentDate,
                value: `%${search_value}%`,
              },
            );
          } else if (status === CouponSearchStatusConst.EXPIRED) {
            qb.where(
              "((translates.language_field = :name AND translates.language_value like :value) OR code like :value) AND concat(end_date,' ',end_time) < :date",
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
              '(translates.language_field = :name AND translates.language_value like :value) OR code like :value',
              {
                name: 'name',
                value: `%${search_value}%`,
              },
            );
          }
          if (status) {
            if (status === CouponSearchStatusConst.HAPPENING) {
              qb.where(
                "concat(start_date,' ',start_time) < :date AND concat(end_date,' ',end_time) > :date",
                {
                  date: currentDate,
                },
              );
            } else if (status === CouponSearchStatusConst.UPCOMING) {
              qb.where("concat(start_date,' ',start_time) > :date", {
                date: currentDate,
              });
            } else if (status === CouponSearchStatusConst.EXPIRED) {
              qb.where("concat(end_date,' ',end_time) < :date", {
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
      code: 200,
      data: {
        results,
        totalRecords,
      },
    };
  }

  async create(data: CreateCouponDto): Promise<any> {
    try {
      const {
        code,
        quantity,
        limit,
        start_date,
        start_time,
        end_date,
        end_time,
        type,
        status,
      } = data;
      if (!this.validateType(type).value) {
        return this.validateType(type).error;
      }
      if (!this.validateStatus(status).value) {
        return this.validateStatus(status).error;
      }
      if (
        start_date > end_date ||
        (start_date === end_date && start_time > end_time)
      ) {
        const errorCode = 'coupon::007';
        return {
          code: 500,
          errorCode,
          message: CouponErrorCodes[errorCode],
        };
      }
      const checkExistCoupon = await this.couponRepository.findOne({
        where: {
          code,
        },
      });
      if (checkExistCoupon) {
        const errorCode = 'coupon::008';
        return {
          code: 500,
          errorCode,
          message: CouponErrorCodes[errorCode],
        };
      }
      const payload = {
        code,
        quantity,
        limit,
        start_date,
        start_time,
        end_date,
        end_time,
        type,
        status,
      };
      const couponCreated = await this.couponRepository.save(payload);
      const contents = data.contents.map((item) => ({
        ...item,
        coupon: couponCreated['id'],
      }));
      await this.couponTranslateRepository.save(contents);
      let requirementData = [];
      if (type === CouponTypeConst.ORDER) {
        requirementData = data.order_requirements;
      } else if (type === CouponTypeConst.PRODUCT_QUANTITY) {
        requirementData = data.product_requirements;
      }
      const requirements = requirementData.map((item) => ({
        ...item,
        coupon: couponCreated['id'],
      }));
      await this.couponRequirementRepository.save(requirements);
      return {
        code: 200,
        data: couponCreated,
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
      const coupon = await this.couponRepository.findOne({
        relations: ['translates', 'requirements'],
        where: {
          id,
        },
      });
      return coupon || null;
    } catch (err) {
      return null;
    }
  }

  async update(data: UpdateCouponDto): Promise<any> {
    try {
      const {
        id,
        code,
        quantity,
        limit,
        start_date,
        start_time,
        end_date,
        end_time,
        type,
        status,
      } = data;
      if (!this.validateType(type).value) {
        return this.validateType(type).error;
      }
      if (!this.validateStatus(status).value) {
        return this.validateStatus(status).error;
      }
      if (
        start_date > end_date ||
        (start_date === end_date && start_time > end_time)
      ) {
        const errorCode = 'coupon::007';
        return {
          code: 500,
          errorCode,
          message: CouponErrorCodes[errorCode],
        };
      }
      const checkExistCoupon = await this.couponRepository.findOne({
        where: {
          code,
        },
      });
      if (checkExistCoupon && checkExistCoupon.id !== id) {
        const errorCode = 'coupon::008';
        return {
          code: 500,
          errorCode,
          message: CouponErrorCodes[errorCode],
        };
      }
      const coupon = await this.couponRepository.findOne(id);
      if (coupon) {
        const payload = {
          id,
          code,
          quantity,
          limit,
          start_date,
          start_time,
          end_date,
          end_time,
          type,
          status,
        };
        await this.couponRepository.save(payload);
        await this.couponTranslateRepository.delete({ coupon: id });
        const contents = data.contents.map((item) => ({
          ...item,
          coupon: id,
        }));
        await this.couponTranslateRepository.save(contents);
        await this.couponRequirementRepository.delete({ coupon: id });
        let requirementData = [];
        if (type === CouponTypeConst.ORDER) {
          requirementData = data.order_requirements;
        } else if (type === CouponTypeConst.PRODUCT_QUANTITY) {
          requirementData = data.product_requirements;
        }
        const requirements = requirementData.map((item) => ({
          ...item,
          coupon: id,
        }));
        await this.couponRequirementRepository.save(requirements);
        return {
          code: 200,
          message: 'Update coupon successfully',
        };
      } else {
        const errorCode = 'coupon::002';
        return {
          code: 404,
          errorCode,
          message: CouponErrorCodes[errorCode],
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
    const coupons = await this.couponRepository.findByIds(idsArr);
    if (coupons && coupons.length > 0) {
      for (const coupon of coupons) {
        coupon.deleted_at = new Date();
        coupon.deleted = DeletedConst.DELETED;
        await this.couponRepository.save(coupon);
      }
      return {
        code: 200,
        message: 'Selected coupon deleted successfully',
      };
    } else {
      const errorCode = 'coupon::002';
      return {
        code: 404,
        errorCode,
        message: CouponErrorCodes[errorCode],
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

  private validateType(type: CouponTypeConst) {
    if (type) {
      const typies = Object.keys(CouponTypeConst);
      if (typies.includes(type + '')) {
        return {
          value: true,
        };
      } else {
        const errorCode = 'coupon::004';
        return {
          value: false,
          error: {
            code: 404,
            errorCode,
            message: CouponErrorCodes[errorCode],
          },
        };
      }
    } else {
      const errorCode = 'coupon::003';
      return {
        value: false,
        error: {
          code: 422,
          errorCode,
          message: CouponErrorCodes[errorCode],
        },
      };
    }
  }

  private validateStatus(status: CouponStatusConst) {
    if (status) {
      const statuses = Object.keys(CouponStatusConst);
      if (statuses.includes(status + '')) {
        return {
          value: true,
        };
      } else {
        const errorCode = 'coupon::006';
        return {
          value: false,
          error: {
            code: 404,
            errorCode,
            message: CouponErrorCodes[errorCode],
          },
        };
      }
    } else {
      const errorCode = 'coupon::005';
      return {
        value: false,
        error: {
          code: 422,
          errorCode,
          message: CouponErrorCodes[errorCode],
        },
      };
    }
  }
}
