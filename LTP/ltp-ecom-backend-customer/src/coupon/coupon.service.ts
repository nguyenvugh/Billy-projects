import { Injectable } from '@nestjs/common';
import {
  CouponErrorCodes,
  CouponSearchStatusConst,
  CouponStatusConst,
  CouponTypeConst,
} from '../common/constants/coupon.constant';
import { parseOffsetAndLimit } from 'src/common/helpers/paginate.helper';
import { CouponRequirementRepository } from './repositories/coupon-requirement.repository';
import { CouponTranslateRepository } from './repositories/coupon-translate.repository';
import { CouponRepository } from './repositories/coupon.repository';
import { ProductRepository } from '../product/repository/product.repository';
import { getCurrentDateTimeFormatted } from '../common/helpers/date-time.helper';
import { FindCouponByCriteriaDto } from './dto/find-by-criteria.dto';
import { WhereExpression } from 'typeorm';

@Injectable()
export class CouponService {
  constructor(
    private readonly couponRepository: CouponRepository,
    private readonly couponTranslateRepository: CouponTranslateRepository,
    private readonly couponRequirementRepository: CouponRequirementRepository,
    private readonly productRepository: ProductRepository,
  ) {}

  async findByCriteria(findRequest: FindCouponByCriteriaDto): Promise<any> {
    const { page, limit: limitDto, lang } = findRequest;
    const { offset, limit } = parseOffsetAndLimit(page, limitDto);
    const currentDate = getCurrentDateTimeFormatted();
    const qb = this.couponRepository
      .createQueryBuilder('coupon')
      .innerJoinAndSelect(
        'coupon.translates',
        'translate',
        'translate.language_code = :couponLang',
        {
          couponLang: lang,
        },
      )
      .innerJoinAndSelect('coupon.requirements', 'requirements')
      .leftJoinAndSelect('requirements.product_obj', 'product')
      .leftJoinAndSelect(
        'product.translates',
        'product_translate',
        'product_translate.language_code = :productLang',
        {
          productLang: lang,
        },
      )
      .where((qb: WhereExpression) => {
        qb.where({});
        qb.andWhere(
          "concat(start_date,' ',start_time) < :date AND concat(end_date,' ',end_time) > :date",
          {
            date: currentDate,
          },
        );
        qb.andWhere('coupon.status = :status', {
          status: CouponStatusConst.ACTIVATED,
        });
      })
      .orderBy({ 'coupon.created_at': 'DESC' })
      .skip(offset)
      .take(limit);

    const [results, totalRecords] = await Promise.all([
      qb.getMany(),
      qb.getCount(),
    ]);

    return {
      code: 200,
      data: {
        results,
        totalRecords,
      },
    };
  }

  async getProductList(): Promise<any> {
    return {
      code: 200,
      data: await this.productRepository.find({
        relations: ['translates', 'product_inventory'],
      }),
    };
  }

  getActivatingCouponQuery() {
    return (
      this.couponRepository
        .createQueryBuilder('coupon')
        .innerJoinAndSelect('coupon.requirements', 'requirements')
        // TODO: make sure condition compatible with RDBMS drivers
        .addSelect(
          'CONVERT_TZ(CAST(CONCAT(start_date, " ", start_time) AS DATETIME), "+00:00", "+07:00") AS coupon_start_at',
        )
        .addSelect(
          'CONVERT_TZ(CAST(CONCAT(end_date, " ", end_time) AS DATETIME), "+00:00", "+07:00") AS coupon_end_at',
        )
        // TODO: check why need using CONVERT_TZ with NOW, server MySQL set timezone already
        .addSelect('CONVERT_TZ(NOW(), "+00:00", "+07:00") AS now')
        .where('coupon.status = :status', {
          status: CouponStatusConst.ACTIVATED,
        })
        .andWhere('coupon.limit > :limit', {
          limit: 0,
        })
        // TODO: make sure condition compatible with RDBMS drivers
        .having('coupon_start_at <= now AND now <= coupon_end_at')
    );
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
