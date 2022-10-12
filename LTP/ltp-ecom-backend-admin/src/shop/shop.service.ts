import { Injectable } from '@nestjs/common';
import { DeletedConst } from 'src/common/constants';
import { CommonErrorCodes } from 'src/common/error-codes/common.error-code';
import { ShopErrorCodes } from 'src/common/error-codes/shop.error-code';
import { parseOffsetAndLimit } from 'src/common/helpers/paginate.helper';
import { CreateShopDto } from './dto/create.dto';
import { FindAllShopDto } from './dto/find-all.dto';
import { UpdateShopDto } from './dto/update.dto';
import { ShopRepository } from './repositories/shop.repository';

@Injectable()
export class ShopService {
  constructor(private readonly shopRepository: ShopRepository) { }

  async findAll(findRequest: FindAllShopDto): Promise<any> {
    try {
      const { offset, limit } = parseOffsetAndLimit(
        findRequest.page,
        findRequest.limit,
      );
      const [results, totalRecords] = await this.shopRepository.findAndCount({
        relations: ['thumbnail_obj', 'city', 'district', 'ward'],
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

  async create(data: CreateShopDto): Promise<any> {
    try {
      const {
        thumbnail_id,
        name,
        phone_number,
        email,
        fax,
        start_working_date,
        end_working_date,
        start_working_time,
        end_working_time,
        lat,
        long,
        city,
        district,
        ward,
        address,
      } = data;
      if (
        start_working_date > end_working_date ||
        start_working_time > end_working_time
      ) {
        const errorCode = 'shop::003';
        return {
          code: 500,
          errorCode,
          message: ShopErrorCodes[errorCode],
        };
      }
      const checkExisted = await this.shopRepository.findOne({
        where: {
          name,
        },
      });
      if (!checkExisted) {
        const payload = {
          thumbnail: thumbnail_id,
          name,
          phone_number,
          email,
          fax,
          start_working_date,
          end_working_date,
          start_working_time,
          end_working_time,
          lat,
          long,
          cityId: city,
          districtId: district,
          wardId: ward,
          address,
        };
        const shopCreated = await this.shopRepository.save(payload);
        return {
          code: 200,
          data: shopCreated,
        };
      } else {
        const errorCode = 'shop::004';
        return {
          code: 500,
          errorCode,
          message: ShopErrorCodes[errorCode],
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

  async update(data: UpdateShopDto): Promise<any> {
    try {
      const {
        id,
        thumbnail_id,
        name,
        phone_number,
        email,
        fax,
        start_working_date,
        end_working_date,
        start_working_time,
        end_working_time,
        lat,
        long,
        city,
        district,
        ward,
        address,
      } = data;
      if (
        start_working_date > end_working_date ||
        start_working_time > end_working_time
      ) {
        const errorCode = 'shop::003';
        return {
          code: 500,
          errorCode,
          message: ShopErrorCodes[errorCode],
        };
      }
      const checkExisted = await this.shopRepository.findOne({
        where: {
          name,
        },
      });
      if (checkExisted && checkExisted.id !== id) {
        const errorCode = 'shop::004';
        return {
          code: 500,
          errorCode,
          message: ShopErrorCodes[errorCode],
        };
      } else {
        const shop = await this.shopRepository.findOne(id);
        if (shop) {
          const payload = {
            id,
            thumbnail: thumbnail_id,
            name,
            phone_number,
            email,
            fax,
            start_working_date,
            end_working_date,
            start_working_time,
            end_working_time,
            lat,
            long,
            cityId: city,
            districtId: district,
            wardId: ward,
            address,
          };
          await this.shopRepository.save(payload);
          return {
            code: 200,
            message: 'Update shop successfully',
          };
        } else {
          const errorCode = 'shop::002';
          return {
            code: 404,
            errorCode,
            message: ShopErrorCodes[errorCode],
          };
        }
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
      const shop = await this.shopRepository.findOne({
        relations: ['thumbnail_obj', 'city', 'district', 'ward'],
        where: {
          id,
        },
      });
      return shop || null;
    } catch (err) {
      return null;
    }
  }

  async delete(ids: string): Promise<any> {
    const idsArr = ids.split(',');
    const shop = await this.shopRepository.findByIds(idsArr);
    if (shop && shop.length > 0) {
      shop.map(async (item) => {
        item.deleted_at = new Date();
        item.deleted = DeletedConst.DELETED;
        await this.shopRepository.save(item);
      });
      return {
        code: 200,
        message: 'Selected shop deleted successfully',
      };
    } else {
      const errorCode = 'shop::002';
      return {
        code: 404,
        errorCode,
        message: ShopErrorCodes[errorCode],
      };
    }
  }
}
